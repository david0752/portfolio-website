// Az előtte / utána csúszka (ui/BeforeAfter.tsx) a Kunmadaras projektoldalon: billentyűzettel mozdul, a nézetváltó
// asztali és mobil képpár között vált.
import { expect, test } from "@playwright/test";

import { hydrate } from "./helpers.ts";

test("billentyűzettel mozgatható, és mobil nézetre vált", async ({ page }) => {
  await page.goto("/munkak/kunmadaras-drift/");
  await hydrate(page, "BeforeAfter", 'input[type="range"]');
  const slider = page.getByRole("slider");
  await expect(slider).toHaveValue("50");
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveValue("51");
  await page.keyboard.press("Home");
  await expect(slider).toHaveValue("0");

  const after = page.getByAltText("Az új oldal kezdőlapja asztali nézetben");
  await expect(after).toBeVisible();
  await page.getByRole("button", { name: "Mobil" }).click();
  await expect(page.getByRole("button", { name: "Mobil" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByAltText("Az új oldal kezdőlapja telefonon")).toBeVisible();
});
