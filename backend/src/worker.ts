/**
 * A Cloudflare Worker belépési pontja. A statikus fájlok nagy részét a Cloudflare a Worker nélkül szolgálja ki
 * (wrangler.jsonc assets); ide két fajta kérés érkezik (run_worker_first):
 * - /api/*: POST /api/contact, minden más 404 / 405;
 * - a magyar oldalak: nem magyar böngészőnél átirányítás az angol párra (LanguageRedirect), különben a statikus oldal
 *   a biztonsági fejlécekkel (SecurityHeaders).
 */

import { handleContact } from "./controllers/Contact.controller.js";
import { jsonResponse } from "./middleware/ErrorHandler.middleware.js";
import { languageRedirect } from "./middleware/LanguageRedirect.middleware.js";
import { withSecurityHeaders } from "./middleware/SecurityHeaders.middleware.js";

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname.startsWith("/api/")) {
      // Perjellel és anélkül is (az oldal minden címe perjelre végződik).
      if (pathname === "/api/contact" || pathname === "/api/contact/") {
        if (request.method !== "POST") return jsonResponse(405, "Ez a végpont csak POST kérést fogad.");
        return handleContact(request, env);
      }
      return jsonResponse(404, "Nincs ilyen végpont.");
    }

    return languageRedirect(request) ?? withSecurityHeaders(await env.ASSETS.fetch(request));
  },
} satisfies ExportedHandler<Env>;
