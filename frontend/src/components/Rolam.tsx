/**
 * Kezdőlap „02 / Rólam” blokkja: „Amire figyelek” cím alatt három értékkártya ikonnal
 * (tiszta kód, biztonság, minden képernyőn). Telefonon egymás alatt, tablettől 3 oszlopban.
 * A szövegek az i18n about.values tömbjében, az ikonok sorrendje ahhoz igazodik.
 */

import type { ReactNode } from "react";

import { useI18n } from "../i18n/I18nProvider.tsx";
import { SectionHeading } from "./ui/SectionHeading.tsx";

const ICONS: ReactNode[] = [
  <path key="code" d="M8 7l-5 5 5 5M16 7l5 5-5 5" />,
  <path key="shield" d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />,
  <g key="screens">
    <rect x="3" y="4" width="13" height="10" rx="1.5" />
    <rect x="15" y="9" width="6" height="11" rx="1.5" />
    <path d="M7 18h5" />
  </g>,
];

export function Rolam() {
  const { t } = useI18n();

  return (
    <section id="rolam" className="border-t border-line bg-deep-navy">
      <div className="mx-auto max-w-[1120px] px-5 py-[72px] md:px-8 md:py-24 xl:px-0">
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {t.about.values.map((value, index) => (
            <li key={value.title} className="rounded-[14px] border border-line bg-card-navy p-6">
              <svg
                className="h-6 w-6 text-signal-blue"
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
              <h3 className="mt-5 text-lg font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{value.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
