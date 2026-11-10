/**
 * Felső navigáció. Nagy képernyőn három rész: balra a logó (kezdőlap link), középen egy lebegő „pirula” a
 * kezdőlap blokkjaira mutató horgonyokkal (az éppen látható blokk kiemelve), jobbra nyelvválasztó és
 * „Írj nekem” link. Mobilon (lg alatt) hamburger menü, teljes szélességű panellel.
 * React-sziget (client:load a Layout.astro-ban). A nyelvváltó sima link ugyanannak az oldalnak a másik
 * nyelvű változatára (alternates: az Astro oldal adja át).
 */

import { useEffect, useState } from "react";

import { LANGUAGES, messages, paths, type Lang } from "../../i18n/index.ts";
import { buttonPrimary } from "../ui/Button.tsx";
import { Logo } from "../ui/Logo.tsx";

interface Props {
  lang: Lang;
  alternates: Record<Lang, string>;
}

const SECTIONS = ["munkak", "rolam", "tapasztalat", "stack", "kapcsolat"] as const;
type SectionId = (typeof SECTIONS)[number];

export function Navbar({ lang, alternates }: Props) {
  const t = messages(lang);
  const home = paths(lang).home;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Melyik blokk van éppen a képernyő közepén: az kap kiemelést a menüben (csak a kezdőlapon vannak ilyen blokkok).
  useEffect(() => {
    const sections = SECTIONS.map((id) => document.getElementById(id)).filter((el) => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
          else setActive((current) => (current === entry.target.id ? null : current));
        }
      },
      // Egy vékony sáv a képernyő közepén: mindig legfeljebb egy blokk metszi.
      { rootMargin: "-45% 0px -55% 0px" },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const labels: Record<SectionId, string> = {
    munkak: t.nav.work,
    rolam: t.nav.about,
    tapasztalat: t.nav.experience,
    stack: t.nav.stack,
    kapcsolat: t.nav.contact,
  };

  const languageSwitch = (
    <div role="group" aria-label={t.nav.language} className="flex rounded-full border border-line bg-midnight/70 p-0.5 font-mono text-xs backdrop-blur-md">
      {LANGUAGES.map((item) => (
        <a
          key={item.code}
          href={alternates[item.code]}
          hrefLang={item.code}
          lang={item.code}
          aria-current={lang === item.code ? "page" : undefined}
          title={item.name}
          className={`rounded-full px-2.5 py-1.5 transition-colors ${
            lang === item.code ? "bg-card-navy-hi text-ice-white" : "text-slate lg:hover:text-ice-white"
          }`}
        >
          {item.short}
        </a>
      ))}
    </div>
  );

  return (
    <header
      // Nagy képernyőn az oldal tetején átlátszó a sáv (csak a középső pirula látszik), görgetés után sötét hátteret
      // kap, hogy a logó és a nyelvváltó ne lógjon a tartalom fölé.
      className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
        scrolled || open
          ? "border-line bg-midnight/85 backdrop-blur-md"
          : "border-transparent bg-midnight/60 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none"
      }`}
    >
      <nav className="mx-auto grid h-16 max-w-[1120px] grid-cols-[1fr_auto] items-center px-5 md:px-8 lg:h-20 lg:grid-cols-[1fr_auto_1fr] xl:px-0">
        {/* A kezdőlapon a logó nem tölti újra az oldalt, hanem simán a tetejére görget (mint a menüpontok). */}
        <a
          href={home}
          aria-label={`Szántó Dávid – ${t.nav.home}`}
          className="justify-self-start"
          onClick={(event) => {
            if (window.location.pathname !== home) return;
            event.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0 });
            history.replaceState(null, "", home);
          }}
        >
          <Logo />
        </a>

        {/* Középső pirula: görgetés után kap erősebb hátteret, hogy a tartalom fölött is olvasható legyen. */}
        <ul
          className={`hidden items-center gap-1 rounded-full border p-1.5 text-[0.9375rem] backdrop-blur-md transition-colors duration-200 lg:flex ${
            scrolled ? "border-line bg-midnight/85" : "border-line/70 bg-midnight/50"
          }`}
        >
          {SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`${home}#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`block rounded-full px-4 py-2 transition-colors duration-200 ${
                  active === id ? "bg-card-navy-hi text-ice-white" : "text-mist hover:text-ice-white"
                }`}
              >
                {labels[id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 justify-self-end lg:flex">
          {languageSwitch}
          <a
            href={`${home}#kapcsolat`}
            className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-midnight/70 px-4 py-2 text-sm font-medium text-ice-white backdrop-blur-md transition-colors hover:border-signal-blue hover:text-signal-blue"
          >
            {t.nav.cta}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>

        <button
          type="button"
          className="-mr-2 flex h-10 w-10 items-center justify-center justify-self-end rounded-lg text-ice-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setOpen((value) => !value)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line px-5 pt-4 pb-8 md:px-8 lg:hidden">
          <ul className="flex flex-col">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a
                  href={`${home}#${id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 text-center text-lg text-ice-white"
                >
                  {labels[id]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col items-center gap-5">
            {languageSwitch}
            <a href={`${home}#kapcsolat`} onClick={() => setOpen(false)} className={`${buttonPrimary} w-full`}>
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
