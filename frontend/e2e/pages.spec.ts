// Minden oldal mindkét nyelven: betölt, egy főcíme van, nincs konzolhiba, CSP-sértés és vízszintes görgetés, a nyelvi
// párja létezik. Plusz a 404 oldal és a „Következő projekt” lépegetés (csoporton belül, a lista végén megáll).
import { expect, test } from "@playwright/test";

import { collectErrors } from "./helpers.ts";

const PAGES = [
  "/",
  "/adatvedelem/",
  "/munkak/",
  "/munkak/kunmadaras-drift/",
  "/munkak/pollakfind/",
  "/en/",
  "/en/privacy/",
  "/en/work/",
  "/en/work/kunmadaras-drift/",
  "/en/work/pollakfind/",
];

for (const path of PAGES) {
  test(`${path} hibátlanul betölt`, async ({ page, request }) => {
    const errors = await collectErrors(page);
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    // Végiggörgetve a client:visible szigetek is betöltődnek, a hibájuk is ide fut be.
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForLoadState("networkidle");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "vízszintes görgetés").toBe(true);
    // A nyelvváltó és a hreflang ugyanarra a párra mutat, és az a pár létezik.
    const other = await page.locator(`link[rel="alternate"][hreflang="${path.startsWith("/en/") ? "hu" : "en"}"]`).getAttribute("href");
    expect((await request.get(new URL(other!).pathname)).status()).toBe(200);
    expect(errors).toEqual([]);
  });
}

test("nem létező címre 404 oldal jön, főcímmel", async ({ page }) => {
  const response = await page.goto("/nincs-ilyen-oldal/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveCount(1);
});

// Csoportjában (ügyfél / iskolai) egyetlen projektnél nincs „Következő projekt”, helyette a saját listájába visz vissza.
for (const { path, list } of [
  { path: "/munkak/kunmadaras-drift/", list: "Összes munka" },
  { path: "/munkak/pollakfind/", list: "Iskolai projektek" },
]) {
  test(`${path}: a lista végén nincs következő, a lista gombja van helyette`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByText("Következő projekt")).toHaveCount(0);
    await expect(page.locator("article footer").getByRole("link", { name: list })).toBeVisible();
  });
}
