// A felső menü (nagy képernyőn a középső pirula) azt a menüpontot emeli ki, amelyik blokk éppen a képernyő közepén
// van. A menü csak négy pontos (Főoldal, Munkáim, Rólam, Kapcsolat): az Automatizálás és az Iskolai projektek a Munkáim,
// a Tapasztalat és a Technológiák a Rólam része, ezért ott is a szülő pont marad kiemelve.
import { expect, test } from "@playwright/test";

test("a pirula menüben csak a négy fő pont van", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 1024, "a pirula menü csak lg-től látszik");
  await page.goto("/");
  await expect(page.locator("header nav ul").first().getByRole("link")).toHaveText(["Főoldal", "Munkáim", "Rólam", "Kapcsolat"]);
});

for (const { section, item } of [
  { section: "#automatizalas", item: "Munkáim" },
  { section: "#munkak", item: "Munkáim" },
  { section: "#iskolai", item: "Munkáim" },
  { section: "#rolam", item: "Rólam" },
  { section: "#tapasztalat", item: "Rólam" },
  { section: "#stack", item: "Rólam" },
  { section: "#kapcsolat", item: "Kapcsolat" },
]) {
  test(`a menü kiemeli a(z) ${item} pontot a(z) ${section} blokknál`, async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) < 1024, "a pirula menü csak lg-től látszik");
    await page.goto("/");
    await page.waitForSelector('astro-island[component-url*="/Navbar."]:not([ssr])', { state: "attached" });
    // A blokk közepe kerül a képernyő közepére (ott a figyelt sáv). Azonnal, mert sima görgetésnél útközben más blokkok
    // is áthaladnak a sávon, és a teszt egy átmeneti állapotot fogadna el.
    await page.locator(section).evaluate((element) => element.scrollIntoView({ block: "center", behavior: "instant" }));
    await page.waitForTimeout(300);
    const pill = page.locator("header nav ul").first();
    await expect(pill.getByRole("link", { name: item, exact: true })).toHaveAttribute("aria-current", "true");
    await expect(pill.locator('[aria-current="true"]')).toHaveCount(1);
  });
}
