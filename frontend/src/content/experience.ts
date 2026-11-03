/**
 * Szakmai tapasztalat a kezdőlap Tapasztalat idővonalához, a legfrissebb elöl.
 * HELYŐRZŐ ADATOK: a valódi munkahelyeket a fejlesztő adja meg; kitalált adat nem kerülhet ide.
 * end üresen = jelenleg is tart.
 */

import type { Lang } from "../i18n/I18nProvider.tsx";

export interface Experience {
  start: string;
  end?: string;
  role: Record<Lang, string>;
  company: string;
  points: Record<Lang, string[]>;
}

const placeholder = (start: string, end?: string): Experience => ({
  start,
  end,
  role: { hu: "Pozíció neve", en: "Job title" },
  company: "Cég neve",
  points: {
    hu: ["Ide jön, mit csináltál ennél a munkahelyen.", "Második feladat vagy eredmény."],
    en: ["What you did at this job goes here.", "A second task or result."],
  },
});

export const experience: Experience[] = [placeholder("2024"), placeholder("2023", "2024"), placeholder("2021", "2023")];
