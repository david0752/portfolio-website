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
  // A projekt nyilvános GitHub-repója („Forráskód” gomb a projektoldalon). Csak nyilvános repó kerülhet ide,
  // különben a látogató 404-et kap; ha nincs, a gomb nem jelenik meg.
  repo?: string;
  // Képernyőkép (src/assets/projects/<slug>/); amíg nincs, terminálpanel jelenik meg helyette.
  image?: string;
  // Felújított oldalnál: a régi és az új kezdőlap képernyőképe, asztali és mobil nézetben. Ha van, a projektoldal
  // tetején az előtte / utána csúszka áll a projektkép helyett (ui/BeforeAfter.tsx).
  comparison?: Comparison;
  // Iskolai csapatprojekt: a kezdőlapon az „Iskolai projektek” szekcióba kerül (nem a Munkáim közé), és a projektoldalon
  // a decisions oszlop címe „az én részem” (mit csinált a fejlesztő a csapatban).
  school?: boolean;
  // Van-e saját projektoldal (a kártya csak akkor link, és csak akkor készül oldal).
  hasCaseStudy: boolean;
}

export type ComparisonView = "desktop" | "mobile";

// Egy képernyőkép: a src a tartalék, a srcSet a méretváltozatok (szélességgel, pl. „… 1200w, … 2400w”).
export interface ComparisonShot {
  src: string;
  srcSet?: string;
}

export type Comparison = Record<ComparisonView, { before: ComparisonShot; after: ComparisonShot }>;
