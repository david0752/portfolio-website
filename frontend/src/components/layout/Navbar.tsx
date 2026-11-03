/**
 * Felső navigáció: név (kezdőlap link), horgonyok a kezdőlap blokkjaira, nyelvválasztó és „Írj nekem” gomb.
 * Görgetés után kap alsó keretet. Mobilon (lg alatt) hamburger menü, teljes szélességű panellel.
 */

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import { LANGUAGES, useI18n } from "../../i18n/I18nProvider.tsx";
import { buttonPrimary } from "../ui/Button.tsx";
import { Logo } from "../ui/Logo.tsx";

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Oldalváltáskor (vagy horgonyra kattintáskor) a mobilmenü bezárul.
  useEffect(() => setOpen(false), [location]);

  const links = [
    { hash: "munkak", label: t.nav.work },
    { hash: "rolam", label: t.nav.about },
    { hash: "tapasztalat", label: t.nav.experience },
    { hash: "stack", label: t.nav.stack },
    { hash: "kapcsolat", label: t.nav.contact },
  ];

  const languageSwitch = (
    <div role="group" aria-label={t.nav.language} className="flex rounded-lg border border-line p-0.5 font-mono text-xs">
      {LANGUAGES.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLang(item.code)}
          aria-pressed={lang === item.code}
          title={item.name}
          className={`rounded-md px-2.5 py-1.5 transition-colors ${
            lang === item.code ? "bg-card-navy-hi text-ice-white" : "text-slate lg:hover:text-ice-white"
          }`}
        >
          {item.short}
        </button>
      ))}
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200 ${
        scrolled || open ? "border-line bg-midnight/85" : "border-transparent bg-midnight/60"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5 md:px-8 xl:px-0">
        <Link to="/" aria-label={`Szántó Dávid – ${t.nav.home}`}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7 text-[0.9375rem]">
            {links.map((link) => (
              <li key={link.hash}>
                <Link to={{ pathname: "/", hash: link.hash }} className="text-mist transition-colors hover:text-ice-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {languageSwitch}
          <Link to={{ pathname: "/", hash: "kapcsolat" }} className={`${buttonPrimary} px-4 py-2`}>
            {t.nav.cta}
          </Link>
        </div>

        <button
          type="button"
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-lg text-ice-white lg:hidden"
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
            {links.map((link) => (
              <li key={link.hash}>
                <Link
                  to={{ pathname: "/", hash: link.hash }}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 text-center text-lg text-ice-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col items-center gap-5">
            {languageSwitch}
            <Link to={{ pathname: "/", hash: "kapcsolat" }} onClick={() => setOpen(false)} className={`${buttonPrimary} w-full`}>
              {t.nav.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
