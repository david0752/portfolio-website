/**
 * Egy projekt saját oldala (munkak/<slug>, en/work/<slug>): vissza link, szerep · év, cím, alcím, leírás,
 * élő oldal gomb (vagy az állapota, ha még nincs élesben) és a forráskód gomb (ha van nyilvános repó), mellette a projekt
 * látványa. Felújított oldalnál (project.comparison) a cím alatt teljes szélességben az előtte / utána csúszka áll, és a
 * leírás meg a gombok alá kerülnek. Ezek alatt a kiemelt funkciók és a technikai döntések két oszlopban, a stack logós
 * címkékkel, végül a következő projekt és a kapcsolatfelvétel. Statikus HTML (Astro), a görgetési beúszás a data-reveal elemeken fut.
 */

import type { CSSProperties, ReactNode } from "react";

import { messages, paths, type Lang } from "../i18n/index.ts";
import type { Project } from "../types/project.ts";
import { buttonPrimary, buttonSecondary } from "../components/ui/Button.tsx";
import { ProjectVisual } from "../components/ui/ProjectVisual.tsx";
import { ICONS } from "../components/ui/SocialLinks.tsx";
import { TechChip } from "../components/ui/TechChip.tsx";

interface Props {
  project: Project;
  lang: Lang;
  // A sorban következő projekt; ha csak egy projekt van, nincs.
  next?: Project;
  // Felújított oldalnál az előtte / utána csúszka (ui/BeforeAfter.tsx); szigetként az Astro oldal adja be.
  children?: ReactNode;
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

export function CaseStudy({ project, lang, next, children }: Props) {
  const t = messages(lang);
  const home = paths(lang).home;
  // Az iskolai és a rendes munkák külön listák: a vissza link a projekt saját szekciójába visz a kezdőlapon.
  const list = project.school
    ? { href: `${home}#iskolai`, label: t.school.title }
    : { href: `${home}#munkak`, label: t.work.allWork };

  // Szerep · év, cím és alcím: mindkét elrendezés teteje.
  const title = (
    <>
      <p className="font-mono text-xs tracking-[0.08em] text-slate uppercase">
        {project.role[lang]} · {project.year}
      </p>
      {/* Telefonon kisebb betűk: a cím a kezdőlap szekciócímeihez, a szöveg a kártyákhoz igazodik. */}
      <h1 className="mt-5 text-[1.875rem] leading-[1.1] font-semibold tracking-[-0.03em] md:text-[clamp(2.5rem,3vw+1rem,3.75rem)] md:leading-[1.05]">
        {project.title}
      </h1>
      <p className="mt-3 text-lg text-mist md:mt-4 md:text-xl">{project.tagline[lang]}</p>
    </>
  );

  // Leírás és gombok: a projektkép mellett, vagy felújított oldalnál az összehasonlítás alatt.
  const intro = (
    <>
      <p className="mt-5 max-w-[60ch] text-[0.9375rem] leading-relaxed md:mt-6 md:text-[1.0625rem]">{project.summary[lang]}</p>

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
            <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              {ICONS.github}
            </svg>
            {t.work.source}
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </>
  );

  return (
    <article className="mx-auto max-w-280 px-5 pt-10 pb-24 md:px-8 md:pt-14 xl:px-0">
      <a href={list.href} className="inline-flex items-center gap-2 font-mono text-sm text-slate transition-colors hover:text-ice-white">
        <span aria-hidden="true">←</span>
        {list.label}
      </a>

      {project.comparison ? (
        <>
          {/* Felújított oldal: a cím alatt teljes szélességben az előtte / utána csúszka, utána a leírás. */}
          <header className="mt-10">
            {title}
          </header>
          <section data-reveal className="mt-10 md:mt-12">
            <Label>{t.work.compare}</Label>
            <div className="mt-5">{children}</div>
          </section>
          <div className="mt-6 md:mt-8">{intro}</div>
        </>
      ) : (
        <header className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            {title}
            {intro}
          </div>

          <div data-reveal className="aspect-16/10 overflow-hidden rounded-[14px] border border-line lg:col-span-6">
            <ProjectVisual project={project} lang={lang} alt={project.title} />
          </div>
        </header>
      )}

      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-16 lg:mt-28">
        <section data-reveal>
          <Label>{t.work.highlights}</Label>
          <ul className="mt-5 space-y-4 md:mt-6 md:space-y-5">
            {project.highlights[lang].map((item) => (
              <li key={item} className="border-l-2 border-signal-blue/50 pl-4 text-[0.9375rem] leading-relaxed text-ice-white/90 md:text-[1.0625rem]">
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section data-reveal style={{ "--i": 1 } as CSSProperties}>
          <Label>{project.school ? t.work.myPart : t.work.decisions}</Label>
          <ul className="mt-5 space-y-4 md:mt-6 md:space-y-5">
            {project.decisions[lang].map((item) => (
              <li key={item} className="border-l-2 border-line pl-4 text-[0.9375rem] leading-relaxed md:text-[1.0625rem]">
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
          <a href={list.href} className={`${buttonPrimary} sm:ml-auto`}>
            {list.label}
          </a>
        )}
      </footer>
    </article>
  );
}
