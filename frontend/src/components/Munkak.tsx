/**
 * Kezdőlap „Munkák” blokkja: a projektek nagy kártyákon, egy vízszintes sávban.
 * Nagy képernyőn (és ha nem kértek csökkentett mozgást) a blokk görgetés közben megáll a képernyőn, és a függőleges
 * görgetés a sávot csúsztatja oldalra (data-hscroll, utils/hscroll.ts + .hscroll szabályok az index.css-ben).
 * Csökkentett mozgásnál a sáv sima, oldalra görgethető sor; telefonon és tableten a kártyák egymás alatt állnak.
 * A projektlistát a views/Kezdolap.astro adja át (content/projects.ts allProjects).
 */

import { messages, type Lang } from "../i18n/index.ts";
import type { Project } from "../types/project.ts";
import { ProjectCard } from "./ui/ProjectCard.tsx";
import { SectionHeading } from "./ui/SectionHeading.tsx";

export function Munkak({ lang, projects }: { lang: Lang; projects: Project[] }) {
  const t = messages(lang);

  return (
    <section id="munkak" data-hscroll className="hscroll border-t border-line">
      <div className="hscroll-stage">
        <div className="mx-auto max-w-280 px-5 pt-18 md:px-8 md:pt-24 xl:px-0">
          <SectionHeading eyebrow={t.work.eyebrow} title={t.work.title} lead={t.work.lead} />
        </div>

        <div className="hscroll-viewport mt-10 lg:mt-8">
          <ul data-hscroll-track className="hscroll-track mx-auto grid max-w-280 gap-6 px-5 pb-18 md:px-8 md:pb-24 xl:px-0">
            {projects.map((project, index) => (
              <li key={project.slug} className="hscroll-item">
                <ProjectCard project={project} lang={lang} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
