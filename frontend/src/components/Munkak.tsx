// Kezdőlap „01 / Munkák” blokkja: a content/projects.ts projektjei kártyákon, asztalon 2 oszlopban.

import { projects } from "../content/projects.ts";
import { useI18n } from "../i18n/I18nProvider.tsx";
import { ProjectCard } from "./ui/ProjectCard.tsx";
import { SectionHeading } from "./ui/SectionHeading.tsx";

export function Munkak() {
  const { t } = useI18n();

  return (
    <section id="munkak" className="border-t border-line">
      <div className="mx-auto max-w-[1120px] px-5 py-[72px] md:px-8 md:py-24 xl:px-0 xl:py-32">
        <SectionHeading eyebrow={t.work.eyebrow} title={t.work.title} lead={t.work.lead} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
