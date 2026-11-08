/**
 * Az űrlap üzenetének továbbítása e-mailben (nodemailer, SMTP a .env-ből). Sima szöveges levél;
 * a válasz (Reply-To) a feladónak megy. Ha nincs beállítva az SMTP, 503-as HttpError.
 */

import nodemailer from "nodemailer";

import { HttpError } from "../middleware/ErrorHandler.middleware.js";
import type { ContactInput } from "../utils/validation.js";

export async function sendContactMail({ topic, name, email, message }: ContactInput): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    throw new HttpError(503, CONTACT_TO
        ? `Az üzenetküldés jelenleg nem elérhető. Írj közvetlenül ide: ${CONTACT_TO}`
        : "Az üzenetküldés jelenleg nem elérhető. Írj közvetlenül e-mailben.");
  }

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: { name: "Portfólió weboldal", address: SMTP_USER },
    to: CONTACT_TO,
    priority: "high", // fontosként jelölve (X-Priority / Importance fejléc)
    replyTo: { name, address: email },
    subject: `${topic} – ${name}`,
    text: `Téma: ${topic}\nNév: ${name}\nE-mail: ${email}\n\n${message}\n\n– Válaszolj erre a levélre, és a feladónak megy.`,
  });
}
