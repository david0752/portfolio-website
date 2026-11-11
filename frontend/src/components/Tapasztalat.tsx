/**
 * Kezdőlap „03 / Tapasztalat” blokkja: idővonal a content/experience.ts adataiból.
 * Laptopon/asztalon középső függőleges vonal, a kártyák felváltva balra és jobbra, a jobb oszlop lejjebb
 * kezdődik (cikcakk). Telefonon/tableten egy oszlop, a vonal bal oldalt. A pont a vonalon ül, egy
 * vízszintes összekötő viszi a kártyáig; a folyamatban lévő munka pontja kitöltött kék.
 */

import { experience, type Experience } from "../content/experience.ts";
import { messages, type Lang } from "../i18n/index.ts";
import { SectionHeading } from "./ui/SectionHeading.tsx";

type Side = "left" | "right" | "mobile";

// A pont és az összekötő helye oldalanként (a vonal a kártya szélétől 40px-re van).
const DOT_POSITION: Record<Side, string> = {
  left: "right-[-47.5px]",
  right: "left-[-47.5px]",
  mobile: "-left-10",
};
const CONNECTOR_POSITION: Record<Side, string> = {
  left: "-right-10",
  right: "-left-10",
  mobile: "-left-8",
};

function TimelineItem({ item, side, lang }: { item: Experience; side: Side; lang: Lang }) {
  const t = messages(lang);
  const ongoing = !item.end;

  return (
    <li data-reveal className="relative">
      <span aria-hidden="true" className={`absolute top-7.75 h-px w-10 bg-line ${CONNECTOR_POSITION[side]}`} />
      <span
        aria-hidden="true"
        className={`absolute top-6 h-3.75 w-3.75 rounded-full border-2 border-signal-blue ${DOT_POSITION[side]} ${
          ongoing ? "bg-signal-blue shadow-[0_0_0_4px_rgb(91_155_255/0.15)]" : "bg-midnight"
        }`}
      />

      <article className="rounded-[14px] border border-line bg-card-navy p-5 transition-colors duration-200 lg:hover:border-signal-blue/60">
        <p className="font-mono text-xs tracking-[0.08em] text-signal-blue uppercase">
          {item.start ? `${item.start} – ${item.end ?? t.experience.present}` : (item.end ?? t.experience.present)}
        </p>
        <h3 className="mt-2 text-lg leading-snug font-semibold">{item.role[lang]}</h3>
        <p className="text-[0.9375rem] text-ice-white/80">{item.company}</p>
        {item.points && (
          <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm leading-relaxed">
            {item.points[lang].map((point) => (
              <li key={point} className="flex gap-2.5">
                <span aria-hidden="true" className="text-slate">
                  –
                </span>
                {point}
              </li>
            ))}
          </ul>
        )}
      </article>
    </li>
  );
}

export function Tapasztalat({ lang }: { lang: Lang }) {
  const t = messages(lang);
  const left = experience.filter((_, index) => index % 2 === 0);
  const right = experience.filter((_, index) => index % 2 === 1);

  return (
    <section id="tapasztalat" className="border-t border-line">
      <div className="mx-auto max-w-280 px-5 py-18 md:px-8 md:py-24 xl:px-0">
        <SectionHeading eyebrow={t.experience.eyebrow} title={t.experience.title} lead={t.experience.lead} />

        <div className="relative mt-12">
          {/* A függőleges vonal: telefonon bal oldalt, nagy képernyőn középen; a végein elhalványul. */}
          <div
            aria-hidden="true"
            className="timeline-line absolute top-0 bottom-0 left-1.75 w-px bg-linear-to-b from-transparent via-signal-blue/35 to-transparent lg:left-1/2 lg:-translate-x-1/2"
          />

          <ol className="space-y-8 pl-10 lg:hidden">
            {experience.map((item) => (
              <TimelineItem key={`${item.company}-${item.role.hu}`} item={item} side="mobile" lang={lang} />
            ))}
          </ol>

          <div className="hidden grid-cols-2 gap-x-20 lg:grid">
            <ol className="space-y-12 py-4">
              {left.map((item) => (
                <TimelineItem key={`${item.company}-${item.role.hu}`} item={item} side="left" lang={lang} />
              ))}
            </ol>
            <ol className="space-y-12 pt-28 pb-4">
              {right.map((item) => (
                <TimelineItem key={`${item.company}-${item.role.hu}`} item={item} side="right" lang={lang} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
