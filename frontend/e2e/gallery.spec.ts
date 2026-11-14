// A projektoldal képgalériája (ui/Gallery.tsx): az admin képek mindig elöl, a nagyító ablak lapozása (a végeken
// megáll), nagyítása, bezárása és a görgetészár; mindhárom projektoldalon és angolul is.
import { expect, test, type Page } from "@playwright/test";

import { collectErrors, hydrate } from "./helpers.ts";

const KUNMADARAS = "/munkak/kunmadaras-drift/";

const thumbs = (page: Page) => page.locator('button[aria-haspopup="dialog"]');
const lightbox = (page: Page) => page.locator("dialog.lightbox");
const counter = (page: Page) => lightbox(page).locator("p").first();

async function openGallery(page: Page, path: string) {
  await page.goto(path);
  await hydrate(page, "Gallery", 'button[aria-haspopup="dialog"]');
}

test.describe("galéria csoportjai", () => {
  // A csoportcímek sorrendje projektenként: az admin (ha van) mindig az első.
  const cases = [
    { path: KUNMADARAS, groups: ["Admin felület", "Nyilvános oldal"], count: 9, first: "Statisztika" },
    { path: "/munkak/pollakfind/", groups: ["Nyilvános oldal"], count: 1, first: "Az útvonal 3D nézetben" },
    { path: "/en/work/kunmadaras-drift/", groups: ["Admin interface", "Public site"], count: 9, first: "Statistics" },
  ];
  for (const { path, groups, count, first } of cases) {
    test(`${path}: ${groups.join(" → ")}`, async ({ page }) => {
      const errors = await collectErrors(page);
      await page.goto(path);
      await expect(page.locator("h3")).toHaveText(groups);
      await expect(thumbs(page)).toHaveCount(count);
      await expect(thumbs(page).first()).toContainText(first);
      expect(errors).toEqual([]);
    });
  }

  test("a Kunmadaras oldalán ott a mintaadat-megjegyzés", async ({ page }) => {
    await page.goto(KUNMADARAS);
    await expect(page.getByText("A képek bemutató adatokkal készültek, a nevek kitaláltak.")).toBeVisible();
  });
});

test.describe("nagyító ablak", () => {
  test("megnyílik, a képernyőn belül marad, alatta az oldal nem görög", async ({ page }) => {
    const errors = await collectErrors(page);
    await openGallery(page, KUNMADARAS);
    await thumbs(page).first().click();
    await expect(lightbox(page)).toHaveJSProperty("open", true);
    // Megnyitáskor az ablak kapja a fókuszt, nem a nagyítás gomb (Safariban kiemelve úgy nézne ki, mintha be lenne kapcsolva).
    await expect(lightbox(page)).toBeFocused();
    await expect(counter(page)).toHaveText("1 / 9 · Admin felület");
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe("hidden");
    const image = lightbox(page).locator("img");
    await expect(image).toHaveAttribute("alt", /^Statisztika/);
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    const box = (await image.boundingBox())!;
    const viewport = page.viewportSize()!;
    expect(box.width).toBeLessThanOrEqual(viewport.width);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
    expect(errors).toEqual([]);
  });

  // A lapozó gombok sosem takarják a képet. Széles képernyőn (md-től) a kép mellett, a két szélén, a kép sávjának
  // függőleges közepén állnak; telefonon, ahol a kép mellett nincs hely, közvetlenül a kép alatt, balra és jobbra.
  test("a lapozó gombok nem takarják a képet: széles képernyőn a két szélén középen, telefonon a kép alatt", async ({ page }) => {
    await openGallery(page, KUNMADARAS);
    await thumbs(page).first().click();
    const { width, height } = page.viewportSize()!;
    const wide = width >= 768;
    const image = lightbox(page).locator("img");
    const buttons = ["Előző kép", "Következő kép"].map((name) => lightbox(page).getByRole("button", { name }));
    const overlaps = (a: { x: number; y: number; width: number; height: number }, b: typeof a) =>
      a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;

    const check = async (zoomed: boolean) => {
      // A kép sávja (a kép szülője) és maga a kép.
      const stage = (await image.locator("..").boundingBox())!;
      const picture = (await image.boundingBox())!;
      for (const [index, button] of buttons.entries()) {
        const box = (await button.boundingBox())!;
        const name = index === 0 ? "Előző kép" : "Következő kép";
        expect(box.y >= 0 && box.y + box.height <= height, `${name} a képernyőn belül`).toBe(true);
        const centerX = box.x + box.width / 2;
        if (wide) {
          expect(Math.abs(box.y + box.height / 2 - (stage.y + stage.height / 2)), name).toBeLessThan(2);
          expect(index === 0 ? centerX : width - centerX, name).toBeLessThan(60);
        } else {
          // Telefonon a kép alatt (nagyítva a görgethető kép sávja alatt), a bal, illetve a jobb oldalon.
          // A kép látható alja (nagyítva a görgethető sáv levágja).
          const under = Math.min(picture.y + picture.height, stage.y + stage.height);
          expect(box.y, `${name} a kép alatt`).toBeGreaterThanOrEqual(under - 1);
          expect(box.y - under, `${name} közvetlenül a kép alatt, nem a képernyő alján`).toBeLessThan(40);
          expect(index === 0 ? centerX < width / 2 : centerX > width / 2, name).toBe(true);
        }
        // Nagyítva a kép a görgethető sávon túlnyúlik, ott a sáv látható része számít.
        expect(overlaps(box, zoomed ? stage : picture), `${name} nem takarja a képet`).toBe(false);
      }
    };
    await check(false);
    await lightbox(page).getByRole("button", { name: "Nagyítás" }).click();
    await check(true);
  });

  test("nyilakkal és gombokkal lapoz, a lista két végén megáll", async ({ page }) => {
    await openGallery(page, KUNMADARAS);
    await thumbs(page).first().click();
    const prev = lightbox(page).getByRole("button", { name: "Előző kép" });
    const next = lightbox(page).getByRole("button", { name: "Következő kép" });
    await expect(prev).toBeDisabled();
    await page.keyboard.press("ArrowLeft");
    await expect(counter(page)).toHaveText(/^1 \/ 9/);
    await page.keyboard.press("ArrowRight");
    await expect(counter(page)).toHaveText(/^2 \/ 9/);
    await next.click();
    await expect(counter(page)).toHaveText(/^3 \/ 9/);
    for (let i = 0; i < 10; i++) await page.keyboard.press("ArrowRight");
    await expect(counter(page)).toHaveText("9 / 9 · Nyilvános oldal");
    await expect(next).toBeDisabled();
    await prev.click();
    await expect(counter(page)).toHaveText(/^8 \/ 9/);
  });

  test("a nagyítás kétszeres és görgethető, közben a nyíl nem lapoz", async ({ page }) => {
    await openGallery(page, KUNMADARAS);
    await thumbs(page).nth(2).click();
    await lightbox(page).getByRole("button", { name: "Nagyítás" }).click();
    const zoom = await lightbox(page)
      .locator("img")
      .evaluate((img) => ({ width: img.getBoundingClientRect().width, box: img.parentElement!.clientWidth, scrolls: img.parentElement!.scrollWidth > img.parentElement!.clientWidth }));
    expect(Math.abs(zoom.width - 2 * zoom.box)).toBeLessThan(2);
    expect(zoom.scrolls).toBe(true);
    await expect(lightbox(page).getByRole("button", { name: "Kicsinyítés" })).toHaveAttribute("aria-pressed", "true");
    await page.keyboard.press("ArrowRight");
    await expect(counter(page)).toHaveText(/^3 \/ 9/);
  });

  test("Esc bezárja, a nagyítás alaphelyzetbe áll, a fókusz visszakerül a képre (billentyűzettel nyitva)", async ({ page }) => {
    await openGallery(page, KUNMADARAS);
    const thumb = thumbs(page).nth(1);
    await thumb.focus();
    await page.keyboard.press("Enter");
    await expect(lightbox(page)).toHaveJSProperty("open", true);
    await lightbox(page).getByRole("button", { name: "Nagyítás" }).click();
    await page.keyboard.press("Escape");
    await expect(lightbox(page)).toHaveJSProperty("open", false);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe("hidden");
    await expect(thumb).toBeFocused();
    await thumb.click();
    await expect(lightbox(page).getByRole("button", { name: "Nagyítás" })).toHaveAttribute("aria-pressed", "false");
  });

  test("a sötét háttérre kattintva bezárul, a képre kattintva nem", async ({ page }) => {
    await openGallery(page, KUNMADARAS);
    await thumbs(page).nth(7).click();
    await expect(counter(page)).toHaveText(/^8 \/ 9/);
    await lightbox(page).locator("img").click();
    await expect(lightbox(page)).toHaveJSProperty("open", true);
    await page.mouse.click(page.viewportSize()!.width / 2, 8);
    await expect(lightbox(page)).toHaveJSProperty("open", false);
  });

  test("angolul angol a felirat és a gombok", async ({ page }) => {
    await openGallery(page, "/en/work/kunmadaras-drift/");
    await thumbs(page).first().click();
    await expect(counter(page)).toHaveText("1 / 9 · Admin interface");
    await expect(lightbox(page).getByRole("button", { name: "Next image" })).toBeEnabled();
    await expect(lightbox(page).getByRole("button", { name: "Close" })).toBeVisible();
  });
});
