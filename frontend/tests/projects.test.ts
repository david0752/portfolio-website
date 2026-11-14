// A projektadatok (content/projects.ts) szabályai: minden szöveg mindkét nyelven, a keresőkbe kerülő cím és leírás
// hossza, a galéria limitje és képei, a kiemelések limitje. Új projekt felvételekor ezek őrzik a szabályokat.
import { describe, expect, it } from "vitest";

import { projects, SCREENSHOT_LIMIT } from "../src/content/projects.ts";
import { OWNER } from "../src/content/site.ts";
import { messages } from "../src/i18n/index.ts";
import { HOME_LIMIT } from "../src/utils/featured.ts";

const LANGS = ["hu", "en"] as const;

describe("projektek", () => {
  it("a slugok egyediek", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("minden szöveg mindkét nyelven ki van töltve, a listák egyforma hosszúak", () => {
    for (const project of projects) {
      for (const lang of LANGS) {
        for (const text of [project.type, project.tagline, project.summary, project.role]) expect(text[lang].trim(), project.slug).not.toBe("");
        for (const list of [project.features, project.highlights, project.decisions]) {
          expect(list[lang].length, project.slug).toBeGreaterThan(0);
          expect(list[lang].length, project.slug).toBe(list.hu.length);
        }
      }
    }
  });

  it("a projektoldal címe legfeljebb 60, a leírása (meta description) legfeljebb 155 karakter", () => {
    for (const project of projects) {
      for (const lang of LANGS) {
        const title = `${project.title} – ${messages(lang).work.caseStudy} | ${OWNER.name[lang]}`;
        expect(title.length, title).toBeLessThanOrEqual(60);
        expect(project.summary[lang].length, `${project.slug} (${lang})`).toBeLessThanOrEqual(155);
      }
    }
  });

  it(`projektenként legfeljebb ${SCREENSHOT_LIMIT} galériakép, mindegyik két nyelvű felirattal és méretváltozatokkal`, () => {
    for (const project of projects) {
      const shots = project.screenshots ?? [];
      expect(shots.length, project.slug).toBeLessThanOrEqual(SCREENSHOT_LIMIT);
      for (const shot of shots) {
        for (const lang of LANGS) expect(shot.caption[lang].trim(), project.slug).not.toBe("");
        expect(shot.src, project.slug).toMatch(/\.webp$/);
        expect(shot.srcSet, `${project.slug}: ${shot.caption.hu}`).toMatch(/^\S+ 800w, \S+ \d{4}w$/);
      }
      if (project.screenshotNote) for (const lang of LANGS) expect(project.screenshotNote[lang].trim()).not.toBe("");
    }
  });

  it(`csoportonként (ügyfél / iskolai) legfeljebb ${HOME_LIMIT} kiemelt projekt`, () => {
    for (const school of [false, true]) {
      expect(projects.filter((project) => Boolean(project.school) === school && project.featured).length).toBeLessThanOrEqual(HOME_LIMIT);
    }
  });
});
