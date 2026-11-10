/**
 * Adatvédelmi tájékoztató (magyar és angol). A kapcsolati űrlap miatt kell. VÁZLAT: élesítés előtt
 * jogilag át kell nézni. Ha az adatkezelés változik (új mező, szolgáltató, analitika), ezt is frissíteni kell.
 */

import type { Lang } from "../i18n/index.ts";
import { CONTACT_EMAIL } from "../utils/contact.ts";

const UPDATED = "2026-11-10";

const CONTENT: Record<Lang, { title: string; updated: string; sections: { heading: string; text: string }[] }> = {
  hu: {
    title: "Adatvédelmi tájékoztató",
    updated: "Utolsó frissítés",
    sections: [
      { heading: "Adatkezelő", text: `Szántó Dávid, e-mail: ${CONTACT_EMAIL}.` },
      {
        heading: "Milyen adatokat kezelek?",
        text: "A kapcsolati űrlapon megadott nevet, e-mail-címet és üzenetet. Az oldal nem használ sütiket, nem követi a látogatókat, és nem tölt be külső szolgáltatást (a betűtípusok is az oldalról töltődnek be). A nyelvet az oldal címe (URL) határozza meg, a böngésződben semmit nem tárolok.",
      },
      {
        heading: "Mire használom?",
        text: "Kizárólag a megkeresésed megválaszolására. Az adatkezelés jogalapja a hozzájárulásod, amelyet az üzenet elküldésével adsz meg.",
      },
      {
        heading: "Hol tárolódik és meddig?",
        text: "Az üzenetet a weboldal nem menti el, csak e-mailben továbbítja hozzám (Gmail). A leveleket a megkeresés lezárása után legfeljebb egy évig őrzöm meg.",
      },
      {
        heading: "Adatfeldolgozók",
        text: "Az oldalt a Cloudflare, Inc. (USA) szolgálja ki, és ő továbbítja az űrlap üzenetét e-mailben. A kiszolgáláshoz a Cloudflare technikailag látja a látogató IP-címét; ezt az oldal csak a túl sok üzenet kiszűrésére használja, nem tárolja. A leveleket a Google (Gmail) tárolja. Mindkét cég részt vesz az EU–USA adatvédelmi keretrendszerben.",
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
        text: "The name, e-mail address and message you enter in the contact form. The site uses no cookies, does not track visitors and loads no third-party services (fonts are loaded from the site itself). The language is set by the page address (URL); nothing is stored in your browser.",
      },
      {
        heading: "What for?",
        text: "Only to answer your inquiry. The legal basis is your consent, given by sending the message.",
      },
      {
        heading: "Where is it stored, and for how long?",
        text: "The website does not store the message; it only forwards it to me by e-mail (Gmail). I keep the e-mails for at most one year after the inquiry is closed.",
      },
      {
        heading: "Processors",
        text: "The site is served by Cloudflare, Inc. (USA), which also forwards the contact form message by e-mail. To serve the site, Cloudflare technically sees the visitor's IP address; the site uses it only to block too many messages and does not store it. The e-mails are stored by Google (Gmail). Both companies participate in the EU–U.S. Data Privacy Framework.",
      },
      {
        heading: "Your rights",
        text: `You can request access to, correction or deletion of your data, and withdraw your consent, at ${CONTACT_EMAIL}. You can lodge a complaint with the Hungarian data protection authority (NAIH, naih.hu).`,
      },
    ],
  },
};

export function Adatvedelem({ lang }: { lang: Lang }) {
  const content = CONTENT[lang];

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
