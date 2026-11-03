// Kezdőlap „02 / Rólam” blokkja: cím balra, rövid bemutatkozás jobbra (mobilon egymás alatt).

import { useI18n } from "../i18n/I18nProvider.tsx";
import { SectionHeading } from "./ui/SectionHeading.tsx";

export function Rolam() {
  const { t } = useI18n();

  return (
    <section id="rolam" className="border-t border-line bg-deep-navy">
      <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-[72px] md:px-8 md:py-24 lg:grid-cols-12 lg:gap-12 xl:px-0 xl:py-32">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
        </div>
        <div className="space-y-5 lg:col-span-7 lg:pt-10">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-[65ch]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
