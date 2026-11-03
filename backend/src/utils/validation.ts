/**
 * A kapcsolati űrlap mezőinek ellenőrzése és limitjei. A frontend utils/contact.ts CONTACT_LIMITS
 * ezekből a számokból dolgozik (csak megjelenítésre); ha itt változik, ott is.
 */

import { HttpError } from "../middleware/ErrorHandler.middleware.js";

export const CONTACT_LIMITS = { name: 100, email: 254, messageMin: 10, message: 3000 } as const;

// Egyszerű, de szigorú e-mail-forma: nincs szóköz, egy @, pont a domainben.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A megkeresés témái: azonosító → a levél tárgyába kerülő magyar felirat.
// A frontend utils/contact.ts CONTACT_TOPICS ugyanezeket az azonosítókat használja.
export const CONTACT_TOPICS = {
  "new-site": "Új weboldal",
  "existing-site": "Meglévő oldal fejlesztése, javítása",
  "web-app": "Webes alkalmazás, adminrendszer",
  other: "Egyéb",
} as const;

export interface ContactInput {
  topic: string;
  name: string;
  email: string;
  message: string;
}

function requiredString(value: unknown, label: string, max: number): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new HttpError(400, `A(z) ${label} megadása kötelező.`);
  }
  const trimmed = value.trim();
  if (trimmed.length > max) {
    throw new HttpError(400, `A(z) ${label} legfeljebb ${max} karakter lehet.`);
  }
  return trimmed;
}

// Csak a whitelistelt mezőket veszi át; a sortöréseket a névből és az e-mailből kiszedi (levélfejléc-injekció ellen).
export function validateContact(body: Record<string, unknown>): ContactInput {
  if (typeof body.topic !== "string" || !Object.hasOwn(CONTACT_TOPICS, body.topic)) {
    throw new HttpError(400, "Válaszd ki, milyen ügyben írsz.");
  }
  const topic = CONTACT_TOPICS[body.topic as keyof typeof CONTACT_TOPICS];

  const name = requiredString(body.name, "név", CONTACT_LIMITS.name).replace(/[\r\n]+/g, " ");
  const email = requiredString(body.email, "e-mail-cím", CONTACT_LIMITS.email);
  const message = requiredString(body.message, "üzenet", CONTACT_LIMITS.message);

  if (!EMAIL_PATTERN.test(email)) {
    throw new HttpError(400, "Az e-mail-cím formátuma nem megfelelő.");
  }
  if (message.length < CONTACT_LIMITS.messageMin) {
    throw new HttpError(400, `Az üzenet legyen legalább ${CONTACT_LIMITS.messageMin} karakter.`);
  }

  return { topic, name, email, message };
}
