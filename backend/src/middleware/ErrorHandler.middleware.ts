/**
 * Központi hibakezelő. Minden hibaválasz { message } alakú, magyar szöveggel.
 * Az 5xx hibák részletei csak a szerver naplójába kerülnek, a kliens általános üzenetet kap.
 */

import type { ErrorRequestHandler } from "express";

// A controllerek ezt dobják, ha a kérés hibás vagy egy szolgáltatás nem érhető el.
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (res.headersSent) return;

  if (error instanceof HttpError) {
    res.status(error.status).json({ message: error.message });
    return;
  }

  // Az Express/body-parser hibái (hibás JSON: 400, túl nagy kérés: 413) status mezőt hordoznak.
  const status = typeof error?.status === "number" ? error.status : 500;

  if (status >= 400 && status < 500) {
    const message =
      error?.type === "entity.parse.failed" ? "A kérés törzse nem érvényes JSON." : status === 413 ? "A kérés túl nagy." : "Hibás kérés.";
    res.status(status).json({ message });
    return;
  }

  console.error("Backend hiba:", error);
  res.status(500).json({ message: "Váratlan szerverhiba történt." });
};
