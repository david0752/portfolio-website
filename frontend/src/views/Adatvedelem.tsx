/**
 * Adatvédelmi tájékoztató (magyar és angol). A kapcsolati űrlap miatt kell. VÁZLAT: élesítés előtt
 * jogilag át kell nézni. Ha az adatkezelés változik (új mező, szolgáltató, analitika), ezt is frissíteni kell.
 */

import type { Lang } from "../i18n/index.ts";
import { CONTACT_EMAIL } from "../utils/contact.ts";

const UPDATED = "2026-11-12";

const CONTENT: Record<Lang, { title: string; updated: string; sections: { heading: string; text: string }[] }> = {
  hu: {
    title: "Adatvédelmi tájékoztató",
    updated: "Utolsó frissítés",
    sections: [
      { heading: "Adatkezelő", text: `Szántó Dávid, e-mail: ${CONTACT_EMAIL}.` },
      {
        heading: "Milyen adatokat kezelek?",
        text: "A kapcsolati űrlapon megadott nevet, e-mail-címet és üzenetet. Az oldal nem követi a látogatókat, nincs rajta látogatottság-mérés, és nem tölt be külső szolgáltatást (a betűtípusok is innen érkeznek). Saját sütit nem használ; az egyetlen kivétel a Cloudflare biztonsági ellenőrzése, lásd lent. Ha kívülről, nem magyar nyelvű böngészővel nyitod meg az oldalt, a böngésződ nyelvi beállítása alapján az angol változatot kapod; ezt a beállítást csak a választáshoz olvasom, nem tárolom. Utána a nyelvet az oldal címe (URL) határozza meg, a böngésződben semmit nem tárolok.",
      },
      {
        heading: "Mit csinál a Cloudflare?",
        text: "Az oldal a Cloudflare hálózatán fut: amikor megnyitod, a hozzád legközelebbi szerveréről kapod meg. Ehhez a Cloudflare technikailag látja az IP-címedet, a böngésződ adatait és a kért oldal címét, és ezeket a kiszolgáláson túl arra használja, hogy megvédje az oldalt a túlterheléses (DDoS) támadásoktól és a rosszindulatú forgalomtól. Én ezekből csak összesített statisztikát látok (például a napi kérések számát); egyedi IP-cím csak akkor jelenik meg nálam, ha a Cloudflare egy gyanús kérést megállít, a biztonsági eseménynaplóban. Ha egy kérésed gyanúsnak tűnik, ellenőrző oldalt mutathat; ha átmész rajta, egy szükséges technikai sütit (cf_clearance) helyez el, amely 30 percig csak azt igazolja, hogy az ellenőrzés megtörtént. Az űrlap elküldésekor az IP-címed alapján számolja, hány üzenetet küldtél (percenként legfeljebb kettő mehet át), hogy kiszűrje a tömeges küldést; ezt a számot nem tárolom. Végül ő továbbítja az üzenetet e-mailben a postafiókomba.",
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
        text: "Cloudflare, Inc. (USA): az oldal kiszolgálása, védelme és az üzenet továbbítása, a fent leírt módon; a hálózata világszerte működik, így az adatok az EU-n kívül is feldolgozhatók. Saját tájékoztatója: cloudflare.com/privacypolicy. Google (Gmail): a levelek tárolása. Mindkét cég részt vesz az EU–USA adatvédelmi keretrendszerben, az USA-ba továbbítás ezen alapul.",
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
        text: "The name, e-mail address and message you enter in the contact form. The site does not track visitors, has no analytics and loads no third-party services (fonts come from the site itself). It sets no cookies of its own; the only exception is Cloudflare's security check, see below. If you open the site from elsewhere with a browser that is not set to Hungarian, your browser's language setting sends you to the English version; I only read this setting to make that choice and do not store it. After that, the language is set by the page address (URL); nothing is stored in your browser.",
      },
      {
        heading: "What does Cloudflare do?",
        text: "The site runs on Cloudflare's network: when you open it, you receive it from the server closest to you. To do this, Cloudflare technically sees your IP address, your browser details and the address of the page you request, and besides delivering the site it uses them to protect it from overload (DDoS) attacks and malicious traffic. I only see aggregated statistics from this (such as the number of requests per day); an individual IP address appears for me only when Cloudflare stops a suspicious request, in its security event log. If a request of yours looks suspicious, it may show a check page; once you pass it, it sets a necessary technical cookie (cf_clearance) that, for 30 minutes, only proves the check was completed. When you send the form, it counts your messages by IP address (at most two per minute get through) to stop bulk sending; I do not store this count. Finally, Cloudflare forwards the message to my mailbox by e-mail.",
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
        text: "Cloudflare, Inc. (USA): delivering and protecting the site and forwarding the message, as described above; its network operates worldwide, so data may be processed outside the EU. Its own notice: cloudflare.com/privacypolicy. Google (Gmail): storing the e-mails. Both companies participate in the EU–U.S. Data Privacy Framework, which is the basis for the transfer to the USA.",
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
