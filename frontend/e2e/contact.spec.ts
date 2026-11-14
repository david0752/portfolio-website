// A kapcsolati űrlap (ui/ContactForm.tsx) a kezdőlapon: kötelező téma, böngészős ellenőrzés, az üzenet hosszlimitje és
// számlálója, sikeres és hibás küldés. A backendet a teszt helyettesíti (page.route), valódi levél nem megy ki.
import { expect, test, type Page } from "@playwright/test";

import { hydrate } from "./helpers.ts";

const LIMIT = 3000;

// Az /api/contact/ kéréseit elkapja, a megadott válasszal felel, és visszaadja a beküldött tartalmakat.
async function fakeBackend(page: Page, status: number, message: string) {
  const sent: unknown[] = [];
  await page.route("**/api/contact/", async (route) => {
    sent.push(route.request().postDataJSON());
    await route.fulfill({ status, contentType: "application/json", body: JSON.stringify({ message }) });
  });
  return sent;
}

async function openForm(page: Page, path = "/") {
  await page.goto(path);
  await hydrate(page, "ContactForm", "form");
}

async function fill(page: Page, topic: string, labels = { name: "Név", email: "E-mail-cím", message: "Üzenet" }) {
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: topic }).click();
  await page.getByLabel(labels.name).fill("Teszt Elek");
  await page.getByLabel(labels.email).fill("teszt.elek@example.com");
  await page.getByLabel(labels.message).fill("Szeretnék egy új weboldalt az egyesületünknek.");
}

test("téma nélkül nem küld, a hibaüzenet a témánál látszik", async ({ page }) => {
  const sent = await fakeBackend(page, 200, "ok");
  await openForm(page);
  await page.getByLabel("Név").fill("Teszt Elek");
  await page.getByLabel("E-mail-cím").fill("teszt.elek@example.com");
  await page.getByLabel("Üzenet").fill("Szeretnék egy új weboldalt.");
  await page.getByRole("button", { name: "Üzenet küldése" }).click();
  await expect(page.getByText("Válaszd ki, milyen ügyben írsz.")).toBeVisible();
  await expect(page.getByRole("combobox")).toBeFocused();
  expect(sent).toEqual([]);
});

test("hibás e-mail-címmel a böngésző nem engedi elküldeni", async ({ page }) => {
  const sent = await fakeBackend(page, 200, "ok");
  await openForm(page);
  await fill(page, "Új weboldal");
  await page.getByLabel("E-mail-cím").fill("nem-email");
  await page.getByRole("button", { name: "Üzenet küldése" }).click();
  expect(await page.getByLabel("E-mail-cím").evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(false);
  expect(sent).toEqual([]);
});

test(`az üzenet legfeljebb ${LIMIT} karakter, a számláló mutatja`, async ({ page }) => {
  await openForm(page);
  const message = page.getByLabel("Üzenet");
  await message.fill("a".repeat(LIMIT));
  await message.press("End");
  await message.pressSequentially("bbb");
  await expect(message).toHaveValue("a".repeat(LIMIT));
  await expect(page.getByText(`${LIMIT} / ${LIMIT}`)).toBeVisible();
});

test("sikeres küldés: a mezőket küldi, köszön, és kiüríti az űrlapot", async ({ page }) => {
  const sent = await fakeBackend(page, 200, "ok");
  await openForm(page);
  await fill(page, "Új weboldal");
  await page.getByRole("button", { name: "Üzenet küldése" }).click();
  await expect(page.getByText("Köszönöm, megkaptam az üzenetedet!")).toBeVisible();
  expect(sent).toEqual([
    { topic: "new-site", name: "Teszt Elek", email: "teszt.elek@example.com", message: "Szeretnék egy új weboldalt az egyesületünknek.", website: "" },
  ]);
  await expect(page.getByLabel("Név")).toHaveValue("");
  await expect(page.getByLabel("Üzenet")).toHaveValue("");
});

test("hibánál magyarul a backend üzenete látszik", async ({ page }) => {
  await fakeBackend(page, 429, "Túl sok üzenet rövid időn belül, próbáld újra később.");
  await openForm(page);
  await fill(page, "Egyéb");
  await page.getByRole("button", { name: "Üzenet küldése" }).click();
  await expect(page.getByRole("alert")).toHaveText("Túl sok üzenet rövid időn belül, próbáld újra később.");
});

test("hibánál angolul az általános angol szöveg látszik", async ({ page }) => {
  await fakeBackend(page, 429, "Túl sok üzenet rövid időn belül, próbáld újra később.");
  await openForm(page, "/en/");
  await fill(page, "Other", { name: "Name", email: "E-mail address", message: "Message" });
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("alert")).toHaveText("The message could not be sent. Please try again later, or send me an e-mail.");
});
