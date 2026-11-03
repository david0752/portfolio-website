/**
 * Kapcsolati űrlap: POST /api/contact. Ellenőrzi a mezőket, a spamcsapdát és a küldési gyakoriságot,
 * majd e-mailben továbbítja az üzenetet (Mail.service.ts). Semmit nem ment el. Válasz: { message }.
 */

import { Router } from "express";
import { rateLimit } from "express-rate-limit";

import { HttpError } from "../middleware/ErrorHandler.middleware.js";
import { sendContactMail } from "../services/Mail.service.js";
import { validateContact } from "../utils/validation.js";

export const contactRouter = Router();

const SUCCESS = "Köszönöm, megkaptam az üzenetedet! Hamarosan válaszolok.";

// Spam ellen: IP-címenként legfeljebb 5 üzenet óránként.
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Túl sok üzenetet küldtél. Próbáld újra később." },
});

contactRouter.post("/", contactLimiter, async (req, res, next) => {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>;

    // Rejtett mező: ember nem tölti ki, a botok igen. Ilyenkor csendben „sikeres” a válasz.
    if (typeof body.website === "string" && body.website.trim()) {
      res.json({ message: SUCCESS });
      return;
    }

    const input = validateContact(body);
    await sendContactMail(input);
    res.json({ message: SUCCESS });
  } catch (error) {
    if (error instanceof HttpError) {
      next(error);
      return;
    }
    console.error("Nem sikerült elküldeni a kapcsolati üzenetet:", error);
    next(new HttpError(502, "Nem sikerült elküldeni az üzenetet. Próbáld újra később, vagy írj e-mailt."));
  }
});
