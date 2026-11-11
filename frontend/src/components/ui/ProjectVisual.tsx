/**
 * Egy projekt látványa: a képernyőképe, vagy amíg nincs, egy terminálpanel, amely a projekt funkcióit listázza
 * (`$ ls <projekt>/`). A kezdőlap projektkártyája és a projektoldal is ezt használja; a szülő adja a méretet.
 */

import { messages, type Lang } from "../../i18n/index.ts";
import type { Project } from "../../types/project.ts";

interface Props {
  project: Project;
  lang: Lang;
  // A kép alt szövege: a kártyán üres (a cím mellette áll), a projektoldalon a projekt neve.
  alt?: string;
  className?: string;
  // Tömörebb terminálpanel (kisebb betű és térköz) a kezdőlap kártyáihoz, ahol a cím is ráfekszik.
  compact?: boolean;
}

export function ProjectVisual({ project, lang, alt = "", className = "", compact = false }: Props) {
  const t = messages(lang);

  if (project.image) {
    // Balra-fentre igazítva vágódik: a képernyőképeken a tartalom (menü, cím, kereső) bal oldalt kezdődik.
    return <img src={project.image} alt={alt} loading="lazy" className={`h-full w-full object-cover object-top-left ${className}`} />;
  }

  return (
    <div className={`flex h-full flex-col bg-deep-navy font-mono ${compact ? "gap-4 p-5 text-xs sm:p-6" : "gap-5 p-6 text-sm sm:p-8"} ${className}`}>
      <p aria-hidden="true" className="text-slate">
        <span className="text-signal-blue">$</span> ls {project.slug}/
      </p>
      <ul aria-label={t.work.features} className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-ice-white sm:grid-cols-3">
        {project.features[lang].map((feature) => (
          <li key={feature}>
            {feature.replaceAll(" ", "-")}
            <span aria-hidden="true" className="text-slate">
              /
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate">
        <span aria-hidden="true"># </span>
        {t.work.screenshotSoon}
      </p>
    </div>
  );
}
