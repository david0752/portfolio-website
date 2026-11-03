/**
 * Projektkártya a Munkák blokkban: képernyőkép (vagy helyőrző), év · típus, cím, leírás, technológiák.
 * Ha az esettanulmány elkészült, az egész kártya link; addig „hamarosan” címkét mutat.
 */

import { Link } from "react-router";

import { useI18n } from "../../i18n/I18nProvider.tsx";
import type { Project } from "../../types/project.ts";

export function ProjectCard({ project }: { project: Project }) {
  const { t, lang } = useI18n();

  const body = (
    <>
      <div className="aspect-video overflow-hidden border-b border-line bg-deep-navy">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out-soft lg:group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs tracking-[0.08em] text-slate uppercase">
            {t.work.screenshotSoon}
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="font-mono text-xs tracking-[0.08em] text-slate uppercase">
          {project.year} · {project.type[lang]}
        </p>
        <h3 className="mt-2 text-lg leading-snug font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed">{project.summary[lang]}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-mist">
              {tag}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm font-medium text-signal-blue">
          {project.hasCaseStudy ? (
            <>
              {t.work.caseStudy} <span className="inline-block transition-transform lg:group-hover:translate-x-0.5">→</span>
            </>
          ) : (
            <span className="text-slate">{t.work.caseStudySoon}</span>
          )}
        </p>
      </div>
    </>
  );

  const cardClass =
    "project-card group block overflow-hidden rounded-[14px] border border-line bg-card-navy transition-[border-color,box-shadow] duration-200";

  return project.hasCaseStudy ? (
    <Link to={`/munkak/${project.slug}`} className={cardClass}>
      {body}
    </Link>
  ) : (
    <article className={cardClass}>{body}</article>
  );
}
