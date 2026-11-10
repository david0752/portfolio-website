/**
 * Kapcsolati űrlap: POST /api/contact. Ellenőrzi a kérés eredetét, méretét, a küldési gyakoriságot, a spamcsapdát
 * és a mezőket, majd e-mailben továbbítja az üzenetet (Mail.service.ts). Semmit nem ment el. Válasz: { message }.
 */

import { HttpError, errorResponse, jsonResponse } from "../middleware/ErrorHandler.middleware.js";
import { sendContactMail } from "../services/Mail.service.js";
import { validateContact } from "../utils/validation.js";

const SUCCESS = "Köszönöm, megkaptam az üzenetedet! Hamarosan válaszolok.";

// A teljes kérés legfeljebb 20 KB lehet (a leghosszabb érvényes üzenet is jóval kisebb).
const MAX_BODY_BYTES = 20 * 1024;

export async function handleContact(request: Request, env: Env): Promise<Response> {
  try {
    // Csak a saját oldalról érkező kérést fogadja el (más oldalról beküldött űrlap ellen).
    const origin = request.headers.get("Origin");
    if (origin && origin !== new URL(request.url).origin) {
      throw new HttpError(403, "A kérés nem erről az oldalról érkezett.");
    }

    const ip = request.headers.get("CF-Connecting-IP") ?? "ismeretlen";
    const { success } = await env.CONTACT_LIMITER.limit({ key: ip });
    if (!success) throw new HttpError(429, "Túl sok üzenetet küldtél. Próbáld újra később.");

    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) throw new HttpError(413, "A kérés túl nagy.");

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      throw new HttpError(400, "A kérés törzse nem érvényes JSON.");
    }
    if (typeof body !== "object" || body === null || Array.isArray(body)) throw new HttpError(400, "Hibás kérés.");
    const fields = body as Record<string, unknown>;

    // Rejtett mező: ember nem tölti ki, a botok igen. Ilyenkor csendben „sikeres” a válasz.
    if (typeof fields.website === "string" && fields.website.trim()) return jsonResponse(200, SUCCESS);

    const input = validateContact(fields);
    try {
      await sendContactMail(env, input);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      console.error("Nem sikerült elküldeni a kapcsolati üzenetet:", (error as { code?: unknown })?.code ?? "");
      throw new HttpError(502, "Nem sikerült elküldeni az üzenetet. Próbáld újra később, vagy írj e-mailt.");
    }
    return jsonResponse(200, SUCCESS);
  } catch (error) {
    return errorResponse(error);
  }
}
