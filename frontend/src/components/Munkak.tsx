// Kezdőlap „01 / Munkák” blokkja: a content/projects.ts projektjei kártyákon (tablet 2, laptop/asztal 3 oszlop).

import { projects } from "../content/projects.ts";
import { useI18n } from "../i18n/I18nProvider.tsx";
import { ProjectCard } from "./ui/ProjectCard.tsx";
import { SectionHeading } from "./ui/SectionHeading.tsx";

export function Munkak() {
  const { t } = useI18n();

  return (
    <section id="munkak" className="border-t border-line">
      <div className="mx-auto max-w-[1120px] px-5 py-[72px] md:px-8 md:py-24 xl:px-0">
        <SectionHeading eyebrow={t.work.eyebrow} title={t.work.title} lead={t.work.lead} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
