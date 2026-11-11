/**
 * Kezdőlap „Iskolai projektek” blokkja: a Pollákban csapatban készült projektek (content/projects.ts, school: true),
 * a Munkáim után, külön, hogy ne keveredjenek az ügyfélmunkákkal. Ugyanazok a projektkártyák, két oszlopban
 * (telefonon egymás alatt); mindegyik a saját projektoldalára visz. A listát a views/Kezdolap.astro adja át.
 */

import type { CSSProperties } from "react";

import { messages, type Lang } from "../i18n/index.ts";
import type { Project } from "../types/project.ts";
import { ProjectCard } from "../components/ui/ProjectCard.tsx";
import { SectionHeading } from "../components/ui/SectionHeading.tsx";

export function IskolaiProjektek({ lang, projects }: { lang: Lang; projects: Project[] }) {
  const t = messages(lang);

  return (
    <section id="iskolai" className="border-t border-line">
      <div className="mx-auto max-w-280 px-5 py-18 md:px-8 md:py-24 xl:px-0">
        <SectionHeading eyebrow={t.school.eyebrow} title={t.school.title} lead={t.school.lead} />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.slug} data-reveal style={{ "--i": index } as CSSProperties}>
              <ProjectCard project={project} lang={lang} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
