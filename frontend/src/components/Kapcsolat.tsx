// Kezdőlap „Kapcsolat” blokkja: elérhetőség és profilok balra (nagy képernyőn megáll görgetés közben), űrlap jobbra;
// mobilon egymás alatt. Az űrlapot (ContactForm, React-sziget) az Astro oldal adja be children-ként, mert a
// client:visible csak .astro-ban adható meg.

import type { ReactNode } from "react";

import { messages, type Lang } from "../i18n/index.ts";
import { CONTACT_EMAIL } from "../utils/contact.ts";
import { SectionHeading } from "./ui/SectionHeading.tsx";
import { SocialLinks } from "./ui/SocialLinks.tsx";

export function Kapcsolat({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = messages(lang);

  return (
    <section id="kapcsolat" className="border-t border-line">
      <div className="mx-auto grid max-w-[1120px] gap-12 px-5 py-[72px] md:px-8 md:py-24 lg:grid-cols-12 xl:px-0 xl:py-32">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead} />
          <dl className="mt-10 border-b border-line">
            <div className="border-t border-line py-5">
              <dt className="font-mono text-xs tracking-[0.08em] text-slate uppercase">{t.contact.emailLabel}</dt>
              <dd className="mt-2">
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg break-all text-signal-blue underline-offset-4 hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </dd>
            </div>
            <div className="border-t border-line py-5">
              <dt className="font-mono text-xs tracking-[0.08em] text-slate uppercase">{t.contact.profilesLabel}</dt>
              <dd className="mt-3">
                <SocialLinks withLabels />
              </dd>
            </div>
          </dl>
        </div>
        <div data-reveal className="lg:col-span-7">
          {children}
        </div>
      </div>
    </section>
  );
}
