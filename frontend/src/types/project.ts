// Egy portfólióprojekt adatai (content/projects.ts). A szövegek nyelvenként.
import type { Lang } from "../i18n/I18nProvider.tsx";

export interface Project {
  slug: string;
  title: string;
  year: string;
  type: Record<Lang, string>;
  summary: Record<Lang, string>;
  tags: string[];
  // Képernyőkép (src/assets/projects/<slug>/); amíg nincs, helyőrző keret jelenik meg.
  image?: string;
  // Az esettanulmány oldala elkészült-e (addig a kártya nem link).
  hasCaseStudy: boolean;
}
