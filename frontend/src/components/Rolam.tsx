/**
 * Kezdőlap „Rólam” blokkja: bal oldalt a bemutatkozás (cím + rövid bekezdések), nagy képernyőn sticky, jobbra
 * kisebb sorokban az „Amire figyelek” három elve ikonnal. Telefonon egymás alatt.
 * A szövegek az i18n about.intro és about.values tömbjében, az ikonok sorrendje a values-hoz igazodik.
 */

import type { CSSProperties, ReactNode } from "react";

import { messages, type Lang } from "../i18n/index.ts";
import { SectionHeading } from "./ui/SectionHeading.tsx";

const ICONS: ReactNode[] = [
  <path key="code" d="M8 7l-5 5 5 5M16 7l5 5-5 5" />,
  <path key="shield" d="M12 3l8 3v6c0 4.500-3.400 8.300-8 9-4.600-.700-8-4.500-8-9V6z" />,
  <g key="screens">
    <rect x="3" y="4" width="13" height="10" rx="1.5" />
    <rect x="15" y="9" width="6" height="11" rx="1.5" />
    <path d="M7 18h5" />
  </g>,
];

export function Rolam({ lang }: { lang: Lang }) {
  const t = messages(lang);

  return (
    <section id="rolam" className="border-t border-line bg-deep-navy">
      <div className="mx-auto grid max-w-[1120px] gap-12 px-5 py-[72px] md:px-8 md:py-24 lg:grid-cols-12 lg:gap-16 xl:px-0">
        <div className="lg:sticky lg:top-28 lg:col-span-7 lg:self-start">
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
          <div data-reveal className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-mist">
            {t.about.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <h3 className="font-mono text-sm text-slate">{t.about.valuesTitle}</h3>
          <ul className="mt-4 border-b border-line">
            {t.about.values.map((value, index) => (
              <li
                key={value.title}
                data-reveal
                style={{ "--i": index } as CSSProperties}
                className="group border-t border-line py-5"
              >
                <p className="flex items-center gap-3 text-lg leading-tight font-semibold transition-colors duration-200 lg:group-hover:text-signal-blue">
                  <svg
                    className="h-5 w-5 shrink-0 text-signal-blue"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONS[index]}
                  </svg>
                  {value.title}
                </p>
                <p className="mt-1.5 pl-8 text-[0.9375rem] leading-relaxed">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
