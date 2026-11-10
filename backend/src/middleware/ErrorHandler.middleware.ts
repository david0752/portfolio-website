/**
 * Központi hibakezelés a Workerhez. Minden válasz { message } alakú JSON, magyar szöveggel.
 * Az 5xx hibák részletei csak a Cloudflare naplójába kerülnek (személyes adat nélkül), a kliens általános üzenetet kap.
 */

// A controllerek ezt dobják, ha a kérés hibás vagy egy szolgáltatás nem érhető el.
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}

export function jsonResponse(status: number, message: string): Response {
  return Response.json(
    { message },
    { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } },
  );
}

export function errorResponse(error: unknown): Response {
  if (error instanceof HttpError) return jsonResponse(error.status, error.message);

  // Csak a hiba neve és kódja kerül a naplóba, az üzenet tartalma (személyes adat) nem.
  const code = (error as { code?: unknown } | null)?.code;
  console.error("Backend hiba:", error instanceof Error ? error.name : typeof error, code ?? "");
  return jsonResponse(500, "Váratlan szerverhiba történt.");
}
