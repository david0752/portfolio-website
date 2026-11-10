/**
 * A Cloudflare Worker belépési pontja. A statikus oldalt a Cloudflare a Worker nélkül szolgálja ki
 * (wrangler.jsonc assets); ide csak az /api/* kérések érkeznek: POST /api/contact, minden más 404 / 405.
 */

import { handleContact } from "./controllers/Contact.controller.js";
import { jsonResponse } from "./middleware/ErrorHandler.middleware.js";

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    // Perjellel és anélkül is (az oldal minden címe perjelre végződik).
    if (pathname === "/api/contact" || pathname === "/api/contact/") {
      if (request.method !== "POST") return jsonResponse(405, "Ez a végpont csak POST kérést fogad.");
      return handleContact(request, env);
    }

    return jsonResponse(404, "Nincs ilyen végpont.");
  },
} satisfies ExportedHandler<Env>;
