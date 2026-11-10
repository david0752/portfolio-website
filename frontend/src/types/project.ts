// Egy portfólióprojekt adatai (content/projects.ts). A szövegek nyelvenként. A kezdőlap kártyája és a projekt saját
// oldala (views/Projekt.astro) is ebből épül.
import type { Lang } from "../i18n/index.ts";

export interface Project {
  slug: string;
  title: string;
  year: string;
  type: Record<Lang, string>;
  // Egysoros alcím: a kártya alján és a projektoldal címe alatt.
  tagline: Record<Lang, string>;
  // Két-három mondatos leírás a projektoldal tetején (és az llms.txt-ben).
  summary: Record<Lang, string>;
  // Mi volt a fejlesztő szerepe (pl. „Tervezés és fejlesztés”).
  role: Record<Lang, string>;
  // Fő funkciók röviden; a kártya és a projektoldal ezt listázza, amíg nincs képernyőkép.
  features: Record<Lang, string[]>;
  // Projektoldal: kiemelt funkciók és technikai döntések, pontokba szedve.
  highlights: Record<Lang, string[]>;
  decisions: Record<Lang, string[]>;
  tags: string[];
  // Az élő oldal címe, ha már elérhető; ha nincs, a status szövege látszik helyette.
  url?: string;
  status?: Record<Lang, string>;
  // Képernyőkép (src/assets/projects/<slug>/); amíg nincs, terminálpanel jelenik meg helyette.
  image?: string;
  // Van-e saját projektoldal (a kártya csak akkor link, és csak akkor készül oldal).
  hasCaseStudy: boolean;
}
