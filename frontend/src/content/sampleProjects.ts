/**
 * PÉLDAKÁRTYÁK a Munkák blokkhoz: NEM a fejlesztő munkái, hanem mások valós oldalainak képernyőképei, csak azért,
 * hogy látszódjon, hogyan néz ki a blokk és a projektoldal több, képes projekttel.
 * Kizárólag fejlesztői módban (npm run dev) töltődik be (views/Kezdolap.astro és a munkak/[slug] oldalak csak
 * import.meta.env.DEV esetén importálják), így az éles buildbe sem a szöveg, sem a képek nem kerülnek be.
 * TÖRLENDŐ, amint valódi projektek és képernyőképek vannak (a képekkel együtt: assets/projects/_samples/).
 */

import aahil from "../assets/projects/_samples/aahil-khan-xyz.jpg?url";
import astro from "../assets/projects/_samples/astro-build.jpg?url";
import yash from "../assets/projects/_samples/yashahire-info.jpg?url";
import type { Project } from "../types/project.ts";

const SAMPLES = [
  { domain: "yashahire.info", image: yash },
  { domain: "aahil-khan.xyz", image: aahil },
  { domain: "astro.build", image: astro },
];

const placeholder = (hu: string, en: string, count: number) => ({
  hu: Array.from({ length: count }, (_, i) => `${hu} ${i + 1}: helykitöltő pont, a valódi projekt szövege kerül ide.`),
  en: Array.from({ length: count }, (_, i) => `${en} ${i + 1}: placeholder point, the real project's text goes here.`),
});

export const sampleProjects: Project[] = SAMPLES.map(({ domain, image }, index) => ({
  slug: `pelda-${index + 1}`,
  title: domain,
  year: "Példa",
  type: { hu: "nem saját munka, csak az elrendezéshez", en: "not my work, layout preview only" },
  tagline: { hu: "Példa – nem saját munka", en: "Sample – not my work" },
  summary: {
    hu: "Helykitöltő projekt egy valós oldal képernyőképével, hogy látszódjon az elrendezés képpel. Valódi projekt kerül a helyére, két-három mondatos leírással.",
    en: "A placeholder project with a screenshot of a real site, to show the layout with an image. A real project will replace it, with a two or three sentence summary.",
  },
  role: { hu: "Példa", en: "Sample" },
  features: { hu: [], en: [] },
  highlights: placeholder("Funkció", "Feature", 3),
  decisions: placeholder("Döntés", "Decision", 2),
  tags: ["React", "TypeScript", "Node.js"],
  url: `https://${domain}/`,
  image,
  hasCaseStudy: true,
}));
