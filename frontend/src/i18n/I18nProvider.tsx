/**
 * Az oldal nyelve (magyar, angol). Alapból magyar; a látogató a navbar nyelvválasztójával vált,
 * a választás a böngészőben marad (localStorage, nem süti).
 *
 *   const { t, lang } = useI18n();
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { en } from "./en.ts";
import { hu, type Messages } from "./hu.ts";

export type Lang = "hu" | "en";

export const LANGUAGES: { code: Lang; short: string; name: string }[] = [
  { code: "hu", short: "HU", name: "Magyar" },
  { code: "en", short: "EN", name: "English" },
];

const MESSAGES: Record<Lang, Messages> = { hu, en };
const STORAGE_KEY = "sd-lang";

function readLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "hu";
  } catch {
    return "hu";
  }
}

interface I18nContextValue {
  lang: Lang;
  t: Messages;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);

  function setLang(next: Lang) {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Letiltott tárhelynél a választás csak erre a látogatásra érvényes.
    }
  }

  // A <html lang> a felolvasóprogramoknak és a böngésző fordítójának.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <I18nContext.Provider value={{ lang, t: MESSAGES[lang], setLang }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n csak I18nProvideren belül használható.");
  return context;
}
