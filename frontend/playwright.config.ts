/**
 * Böngészős (E2E) tesztek: npm run e2e. Előtte mindig friss build készül, amit az astro preview szolgál ki (a CSP
 * meta tag így él, mint élesben). Minden teszt lefut Chromiumban, Firefoxban és WebKitben (Safari), laptop (1536 px,
 * a fejlesztő gépe 125%-on) és telefon (390 px) méretben, magyar nyelvű böngészővel. A kapcsolati űrlap kéréseit a
 * tesztek maguk válaszolják meg (page.route), levél nem megy ki.
 */
import { defineConfig, devices } from "@playwright/test";

const PORT = 4329;
const SIZES = {
  laptop: { width: 1536, height: 864 },
  phone: { width: 390, height: 844 },
};
const ENGINES = {
  chromium: devices["Desktop Chrome"],
  firefox: devices["Desktop Firefox"],
  webkit: devices["Desktop Safari"],
};

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: `http://127.0.0.1:${PORT}`, locale: "hu-HU" },
  projects: Object.entries(ENGINES).flatMap(([engine, device]) =>
    Object.entries(SIZES).map(([size, viewport]) => ({ name: `${engine}-${size}`, use: { ...device, viewport } })),
  ),
  webServer: {
    command: `npm run build && npx astro preview --host 127.0.0.1 --port ${PORT}`,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
