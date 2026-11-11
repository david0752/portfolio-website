/**
 * „Minden projektem” oldal (/munkak/, /en/work/): vissza link a kezdőlapra, cím, bevezető, majd a két csoport külön:
 * a rendes munkák (id munkaim) és az iskolai csapatprojektek (id iskolai), a kezdőlap projektkártyáival, csoportonként
 * sorszámozva. Itt minden projekt látszik; a kezdőlapon csoportonként legfeljebb 4 (utils/featured.ts).
 * Statikus HTML (Astro), a görgetési beúszás a data-reveal elemeken fut.
 */

import type { CSSProperties } from "react";

import { ProjectCard } from "../components/ui/ProjectCard.tsx";
import { messages, paths, type Lang } from "../i18n/index.ts";
import type { Project } from "../types/project.ts";

interface Props {
  lang: Lang;
  work: Project[];
  school: Project[];
}

export function MindenProjekt({ lang, work, school }: Props) {
  const t = messages(lang);
  const groups = [
    { id: "munkaim", title: t.projects.workTitle, lead: undefined, items: work },
    { id: "iskolai", title: t.school.title, lead: t.school.lead, items: school },
  ].filter((group) => group.items.length > 0);

  return (
    <article className="mx-auto max-w-280 px-5 pt-10 pb-24 md:px-8 md:pt-14 xl:px-0">
      <a href={paths(lang).home} className="inline-flex items-center gap-2 font-mono text-sm text-slate transition-colors hover:text-ice-white">
        <span aria-hidden="true">←</span>
        {t.nav.home}
      </a>

      <header className="mt-10 max-w-2xl">
        <h1 className="text-[1.875rem] leading-[1.1] font-semibold tracking-[-0.03em] md:text-[clamp(2.5rem,3vw+1rem,3.75rem)] md:leading-[1.05]">
          {t.projects.title}
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist md:mt-5 md:text-[1.0625rem]">{t.projects.lead}</p>
      </header>

      {groups.map((group) => (
        <section key={group.id} id={group.id} className="mt-16 md:mt-20">
          <h2 className="flex items-baseline gap-3 text-2xl leading-tight font-semibold tracking-[-0.02em] md:text-[1.75rem]">
            {group.title}
            <span className="font-mono text-sm font-normal text-slate">{group.items.length}</span>
          </h2>
          {group.lead && <p className="mt-2 text-[0.9375rem] text-mist">{group.lead}</p>}
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {group.items.map((project, index) => (
              <li key={project.slug} data-reveal style={{ "--i": index % 2 } as CSSProperties}>
                <ProjectCard project={project} lang={lang} index={index} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
