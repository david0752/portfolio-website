/**
 * Egy projekt saját oldala (munkak/<slug>, en/work/<slug>): vissza link, szerep · év, cím, alcím, leírás,
 * élő oldal gomb (vagy az állapota, ha még nincs élesben) és a forráskód gomb (ha van nyilvános repó), mellette a projekt látványa; alatta a kiemelt
 * funkciók és a technikai döntések két oszlopban, a stack logós címkékkel, végül a következő projekt és a
 * kapcsolatfelvétel. Statikus HTML (Astro), a görgetési beúszás a data-reveal elemeken fut.
 */

import type { CSSProperties } from "react";

import { messages, paths, type Lang } from "../i18n/index.ts";
import type { Project } from "../types/project.ts";
import { buttonPrimary, buttonSecondary } from "./ui/Button.tsx";
import { ProjectVisual } from "./ui/ProjectVisual.tsx";
import { ICONS } from "./ui/SocialLinks.tsx";
import { TechChip } from "./ui/TechChip.tsx";

interface Props {
  project: Project;
  lang: Lang;
  // A sorban következő projekt; ha csak egy projekt van, nincs.
  next?: Project;
}

// Kis, kódkomment stílusú blokkcím (h2), mint a kezdőlap szekcióinak címkéje.
function Label({ children }: { children: string }) {
  return (
    <h2 className="font-mono text-sm font-normal text-slate">
      <span aria-hidden="true" className="text-signal-blue">
        {"// "}
      </span>
      {children}
    </h2>
  );
}

export function CaseStudy({ project, lang, next }: Props) {
  const t = messages(lang);
  const home = paths(lang).home;

  return (
    <article className="mx-auto max-w-[1120px] px-5 pt-10 pb-24 md:px-8 md:pt-14 xl:px-0">
      <a href={`${home}#munkak`} className="inline-flex items-center gap-2 font-mono text-sm text-slate transition-colors hover:text-ice-white">
        <span aria-hidden="true">←</span>
        {t.work.allWork}
      </a>

      <header className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <p className="font-mono text-xs tracking-[0.08em] text-slate uppercase">
            {project.role[lang]} · {project.year}
          </p>
          <h1 className="mt-5 text-[clamp(2.5rem,3vw+1rem,3.75rem)] leading-[1.05] font-semibold tracking-[-0.03em]">{project.title}</h1>
          <p className="mt-4 text-xl text-mist">{project.tagline[lang]}</p>
          <p className="mt-6 max-w-[60ch] leading-relaxed">{project.summary[lang]}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            {project.url ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
                {t.work.live}
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              project.status && (
                <p className="inline-flex items-center gap-3 text-sm text-mist">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal-blue" />
                  {project.status[lang]}
                </p>
              )
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
                <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  {ICONS.github}
                </svg>
                {t.work.source}
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>

        <div data-reveal className="aspect-[16/10] overflow-hidden rounded-[14px] border border-line lg:col-span-6">
          <ProjectVisual project={project} lang={lang} alt={project.title} />
        </div>
      </header>

      <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-16 lg:mt-28">
        <section data-reveal>
          <Label>{t.work.highlights}</Label>
          <ul className="mt-6 space-y-5">
            {project.highlights[lang].map((item) => (
              <li key={item} className="border-l-2 border-signal-blue/50 pl-4 leading-relaxed text-ice-white/90">
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section data-reveal style={{ "--i": 1 } as CSSProperties}>
          <Label>{t.work.decisions}</Label>
          <ul className="mt-6 space-y-5">
            {project.decisions[lang].map((item) => (
              <li key={item} className="border-l-2 border-line pl-4 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section data-reveal className="mt-20">
        <Label>{t.work.stack}</Label>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TechChip key={tag} name={tag} />
          ))}
        </ul>
      </section>

      <footer className="mt-20 flex flex-col-reverse gap-10 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
        <a href={`${home}#kapcsolat`} className={buttonSecondary}>
          {t.work.discuss}
        </a>
        {next ? (
          <a href={paths(lang).project(next.slug)} className="group text-right sm:ml-auto">
            <span className="block font-mono text-xs tracking-[0.08em] text-slate uppercase">{t.work.next}</span>
            <span className="mt-1 inline-flex items-center gap-2 text-lg font-semibold text-ice-white transition-colors group-hover:text-signal-blue">
              {next.title}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </a>
        ) : (
          <a href={`${home}#munkak`} className={`${buttonPrimary} sm:ml-auto`}>
            {t.work.allWork}
          </a>
        )}
      </footer>
    </article>
  );
}
