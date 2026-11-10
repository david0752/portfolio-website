/**
 * Az űrlap üzenetének továbbítása e-mailben a Cloudflare levélküldőjével (send_email binding, wrangler.jsonc).
 * Sima szöveges levél a tulajdonosnak, fontosként jelölve; a válasz (Reply-To) a feladónak megy.
 * Ha a binding nincs beállítva, 503-as HttpError.
 */

import { HttpError } from "../middleware/ErrorHandler.middleware.js";
import type { ContactInput } from "../utils/validation.js";

export async function sendContactMail(env: Env, { topic, name, email, message }: ContactInput): Promise<void> {
  if (!env.CONTACT_MAIL || !env.MAIL_FROM || !env.MAIL_TO) {
    throw new HttpError(503, "Az üzenetküldés jelenleg nem elérhető. Írj közvetlenül e-mailben.");
  }

  await env.CONTACT_MAIL.send({
    from: { name: "Portfólió weboldal", email: env.MAIL_FROM },
    to: env.MAIL_TO,
    replyTo: { name, email },
    subject: `${topic} – ${name}`,
    // Fontosként jelölve, mint minden látogatótól érkező levél a tulajdonosnak.
    headers: { Importance: "high", "X-Priority": "1" },
    text: `Téma: ${topic}\nNév: ${name}\nE-mail: ${email}\n\n${message}\n\n– Válaszolj erre a levélre, és a feladónak megy.`,
  });
}
