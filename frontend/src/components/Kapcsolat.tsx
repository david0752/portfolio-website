// Kezdőlap „04 / Kapcsolat” blokkja: elérhetőség balra, űrlap jobbra (mobilon egymás alatt).

import { useI18n } from "../i18n/I18nProvider.tsx";
import { CONTACT_EMAIL } from "../utils/contact.ts";
import { ContactForm } from "./ui/ContactForm.tsx";
import { SectionHeading } from "./ui/SectionHeading.tsx";

export function Kapcsolat() {
  const { t } = useI18n();

  return (
    <section id="kapcsolat" className="border-t border-line">
      <div className="mx-auto grid max-w-[1120px] gap-12 px-5 py-[72px] md:px-8 md:py-24 lg:grid-cols-12 xl:px-0 xl:py-32">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead} />
          <dl className="mt-10">
            <dt className="font-mono text-xs tracking-[0.08em] text-slate uppercase">{t.contact.emailLabel}</dt>
            <dd className="mt-2">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg break-all text-signal-blue underline-offset-4 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </dd>
          </dl>
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
