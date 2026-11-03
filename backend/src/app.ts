/**
 * Az Express alkalmazás összeállítása: biztonsági fejlécek, CORS, JSON-feldolgozás, útvonalak, hibakezelő.
 * Az indítást az index.ts végzi (a tesztek így szerver nélkül használhatják az appot).
 */

import cors from "cors";
import express from "express";
import helmet from "helmet";

import { contactRouter } from "./controllers/Contact.controller.js";
import { errorHandler } from "./middleware/ErrorHandler.middleware.js";

export const app = express();

app.disable("x-powered-by");

// nginx mögött kell, hogy a rate limit a valódi látogatói IP-t lássa.
if (process.env.TRUST_PROXY) {
  app.set("trust proxy", Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY);
}

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/contact", contactRouter);

app.use("/api", (_req, res) => {
  res.status(404).json({ message: "Nincs ilyen végpont." });
});

app.use(errorHandler);
