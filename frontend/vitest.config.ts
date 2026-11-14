// Egységtesztek (npm test): csak a tests/ mappa; az e2e/ mappa böngészős tesztjei a Playwrighté (npm run e2e).
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { include: ["tests/**/*.test.ts"] },
});
