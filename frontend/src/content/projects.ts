/**
 * A portfólió projektjei, a kezdőlap Munkák blokkja ebből épül. Új projekt = új elem a tömbben.
 * Csak valós, jóváhagyott tartalom kerülhet ide (docs/projects/<slug>.md a vázlat).
 */

import type { Project } from "../types/project.ts";

export const projects: Project[] = [
  {
    slug: "kunmadaras-drift",
    title: "Kunmadaras Drift",
    year: "2026",
    type: { hu: "Weboldal + adminrendszer", en: "Website + admin system" },
    summary: {
      hu: "Egy driftverseny-sorozat új weboldala: eseménynaptár, pilótanevezés, eredmények, galéria, hírlevél és egy nem technikai szervezőnek tervezett admin.",
      en: "The new website of a drift event series: event calendar, pilot registration, results, gallery, newsletter and an admin built for a non-technical organizer.",
    },
    tags: ["React", "TypeScript", "Tailwind CSS", "Express", "PostgreSQL"],
    hasCaseStudy: false,
  },
];
