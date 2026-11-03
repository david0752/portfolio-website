/**
 * Szakmai tapasztalat és tanulmányok a kezdőlap Tapasztalat idővonalához, a legfrissebb elöl.
 * Csak valós, a fejlesztő által megadott adat kerülhet ide.
 * start üresen = nincs kiírt kezdőév; end üresen = jelenleg is tart; points elhagyható.
 */

import type { Lang } from "../i18n/I18nProvider.tsx";

export interface Experience {
  start?: string;
  end?: string;
  role: Record<Lang, string>;
  company: string;
  points?: Record<Lang, string[]>;
}

export const experience: Experience[] = [
  {
    role: { hu: "Végzős diák", en: "Final-year student" },
    company: "HSZC Szentesi Pollák Antal Technikum",
  },
];
