/**
 * Projektkártya a Munkák blokk vízszintes sávjában: nagy látvány (képernyőkép vagy terminálpanel), nagy képernyőn
 * alul sötét átmenettel, rajta sorszám, cím és egysoros alcím; kisebb képernyőn a szöveg a kép alatt áll.
 * Ha van projektoldal, az egész kártya link oda.
 * Nagy képernyőn hoverre a kép kicsit nagyobb lesz és a keret kék (Neon szabály 4, .project-card).
 */

import { messages, paths, type Lang } from "../../i18n/index.ts";
import type { Project } from "../../types/project.ts";
import { ProjectVisual } from "./ProjectVisual.tsx";

interface Props {
  project: Project;
  lang: Lang;
  // Sorszám a kártyán (01, 02 …): a projektek a sávban sorrendben követik egymást.
  index: number;
}

export function ProjectCard({ project, lang, index }: Props) {
  const t = messages(lang);

  const body = (
    <>
      <div className="aspect-[16/10] overflow-hidden border-b border-line lg:absolute lg:inset-0 lg:aspect-auto lg:border-b-0">
        <ProjectVisual compact project={project} lang={lang} className="transition-transform duration-700 ease-out-soft lg:group-hover:scale-[1.03]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-midnight via-midnight/85 via-40% to-transparent to-75% lg:block"
      />
      <div className="p-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:p-6">
        <p className="font-mono text-xs text-signal-blue">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="mt-1.5 text-2xl leading-tight font-semibold tracking-[-0.02em] lg:text-[1.625rem]">{project.title}</h3>
        <p className="mt-1 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[0.9375rem] text-mist">
          {project.tagline[lang]}
          <span className="font-mono text-xs text-slate">
            {project.hasCaseStudy ? (
              <span className="text-signal-blue">
                {t.work.caseStudy} <span className="inline-block transition-transform lg:group-hover:translate-x-1">→</span>
              </span>
            ) : (
              t.work.caseStudySoon
            )}
          </span>
        </p>
      </div>
    </>
  );

  const cardClass =
    "project-card group relative block overflow-hidden rounded-[14px] border border-line bg-card-navy transition-[border-color,box-shadow] duration-200 lg:aspect-[16/11]";

  return project.hasCaseStudy ? (
    <a href={paths(lang).project(project.slug)} className={cardClass}>
      {body}
    </a>
  ) : (
    <article className={cardClass}>{body}</article>
  );
}
