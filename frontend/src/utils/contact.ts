/**
 * A kapcsolati űrlap beküldése (POST /api/contact) és a mezőlimitek.
 * A limitek csak a megjelenítéshez kellenek; a backend utils/validation.ts CONTACT_LIMITS a forrás, a kettő egyezzen.
 */

export const CONTACT_LIMITS = { name: 100, email: 254, messageMin: 10, message: 3000 } as const;

export const CONTACT_EMAIL = "szanto.david12@gmail.com";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  // Rejtett mező a spambotok ellen; ember üresen hagyja.
  website: string;
}

// Siker esetén a backend üzenetét adja vissza, hibánál Error-t dob a backend (magyar) üzenetével.
export async function sendContact(payload: ContactPayload): Promise<string> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as { message?: string };

  if (!response.ok) throw new Error(data.message ?? "");
  return data.message ?? "";
}
