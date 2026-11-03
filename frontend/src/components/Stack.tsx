// Kezdőlap „03 / Stack” blokkja: csak a legfontosabb, valóban használt technológiák, csoportosítva.
// Nagy képernyőn a blokk háttere kéken felizzik az egér körül (.spotlight, index.css).

import { useI18n } from "../i18n/I18nProvider.tsx";
import { trackPointer } from "../utils/pointer.ts";
import { SectionHeading } from "./ui/SectionHeading.tsx";

const GROUPS = {
  frontend: ["React", "TypeScript", "Tailwind CSS"],
  backend: ["Node.js", "Express", "REST API"],
  ops: ["PostgreSQL", "Linux VPS", "nginx"],
} as const;

export function Stack() {
  const { t } = useI18n();

  return (
    <section id="stack" className="border-t border-line bg-deep-navy">
      <div className="mx-auto max-w-[1120px] px-5 py-[72px] md:px-8 md:py-24 xl:px-0 xl:py-32">
        <SectionHeading eyebrow={t.stack.eyebrow} title={t.stack.title} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-[14px] border border-line bg-line md:grid-cols-3">
          {(Object.keys(GROUPS) as (keyof typeof GROUPS)[]).map((group) => (
            <div key={group} onPointerMove={trackPointer} className="spotlight bg-card-navy p-6">
              <h3 className="font-mono text-xs font-medium tracking-[0.08em] text-slate uppercase">{t.stack.groups[group]}</h3>
              <ul className="mt-5 space-y-2.5 text-[0.9375rem] text-ice-white">
                {GROUPS[group].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
