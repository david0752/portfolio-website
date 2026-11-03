/**
 * Adatvédelmi tájékoztató (magyar és angol). A kapcsolati űrlap miatt kell. VÁZLAT: élesítés előtt
 * jogilag át kell nézni. Ha az adatkezelés változik (új mező, szolgáltató, analitika), ezt is frissíteni kell.
 */

import { usePageTitle } from "../hooks/usePageTitle.ts";
import { useI18n, type Lang } from "../i18n/I18nProvider.tsx";
import { CONTACT_EMAIL } from "../utils/contact.ts";

const UPDATED = "2026-11-03";

const CONTENT: Record<Lang, { title: string; updated: string; sections: { heading: string; text: string }[] }> = {
  hu: {
    title: "Adatvédelmi tájékoztató",
    updated: "Utolsó frissítés",
    sections: [
      { heading: "Adatkezelő", text: `Szántó Dávid, e-mail: ${CONTACT_EMAIL}.` },
      {
        heading: "Milyen adatokat kezelek?",
        text: "A kapcsolati űrlapon megadott nevet, e-mail-címet és üzenetet. Az oldal nem használ sütiket, nem követi a látogatókat, és nem tölt be külső szolgáltatást (a betűtípusok is a saját szerverről jönnek). A nyelvválasztást a böngésző helyi tárhelye őrzi meg, ez nem kerül hozzám.",
      },
      {
        heading: "Mire használom?",
        text: "Kizárólag a megkeresésed megválaszolására. Az adatkezelés jogalapja a hozzájárulásod, amelyet az üzenet elküldésével adsz meg.",
      },
      {
        heading: "Hol tárolódik és meddig?",
        text: "Az üzenetet a weboldal szervere nem menti el, csak e-mailben továbbítja hozzám (Gmail). A leveleket a megkeresés lezárása után legfeljebb egy évig őrzöm meg.",
      },
      {
        heading: "Jogaid",
        text: `Kérheted az adataid megismerését, helyesbítését vagy törlését, és visszavonhatod a hozzájárulásodat a(z) ${CONTACT_EMAIL} címen. Panasszal a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH, naih.hu) fordulhatsz.`,
      },
    ],
  },
  en: {
    title: "Privacy notice",
    updated: "Last updated",
    sections: [
      { heading: "Data controller", text: `Dávid Szántó, e-mail: ${CONTACT_EMAIL}.` },
      {
        heading: "What data do I process?",
        text: "The name, e-mail address and message you enter in the contact form. The site uses no cookies, does not track visitors and loads no third-party services (fonts are served from my own server). Your language choice is kept in your browser's local storage and never reaches me.",
      },
      {
        heading: "What for?",
        text: "Only to answer your inquiry. The legal basis is your consent, given by sending the message.",
      },
      {
        heading: "Where is it stored, and for how long?",
        text: "The website server does not store the message; it only forwards it to me by e-mail (Gmail). I keep the e-mails for at most one year after the inquiry is closed.",
      },
      {
        heading: "Your rights",
        text: `You can request access to, correction or deletion of your data, and withdraw your consent, at ${CONTACT_EMAIL}. You can lodge a complaint with the Hungarian data protection authority (NAIH, naih.hu).`,
      },
    ],
  },
};

export function Adatvedelem() {
  const { lang, t } = useI18n();
  const content = CONTENT[lang];
  usePageTitle(t.pageTitles.privacy);

  return (
    <article className="mx-auto max-w-3xl px-5 py-24 md:px-8 md:py-32">
      <h1 className="text-[clamp(1.75rem,2vw+1rem,2.5rem)] font-semibold tracking-[-0.02em]">{content.title}</h1>
      <p className="mt-3 font-mono text-xs tracking-[0.08em] text-slate uppercase">
        {content.updated}: {UPDATED}
      </p>
      <div className="mt-12 space-y-10">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold">{section.heading}</h2>
            <p className="mt-3">{section.text}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
