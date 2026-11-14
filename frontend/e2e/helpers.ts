// Közös segédek az E2E-tesztekhez: hibagyűjtés (konzolhiba, CSP-sértés, kivétel) és egy sziget hidratálásának bevárása.
import type { Page } from "@playwright/test";

// Összegyűjti az oldal hibáit (az első oldalbetöltés előtt kell hívni); a teszt végén üres listát várunk.
export async function collectErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => console.error(`CSP: ${event.violatedDirective} ${event.blockedURI}`));
  });
  return errors;
}

// A client:visible sziget csak a képernyőre érve töltődik be: odagörget, és megvárja, amíg az Astro hidratálja.
export async function hydrate(page: Page, component: string, scrollTo: string): Promise<void> {
  await page.locator(scrollTo).first().scrollIntoViewIfNeeded();
  await page.waitForSelector(`astro-island[component-url*="/${component}."]:not([ssr])`, { state: "attached" });
}
