// 404-es oldal: rövid üzenet és vissza a kezdőlapra.

import { Link } from "react-router";

import { buttonPrimary } from "../components/ui/Button.tsx";
import { usePageTitle } from "../hooks/usePageTitle.ts";
import { useI18n } from "../i18n/I18nProvider.tsx";

export function NotFound() {
  const { t } = useI18n();
  usePageTitle(t.pageTitles.notFound);

  return (
    <section className="mx-auto max-w-[1120px] px-5 py-32 text-center md:px-8 xl:px-0">
      <p className="font-mono text-xs tracking-[0.08em] text-slate uppercase">{t.notFound.code}</p>
      <h1 className="mt-4 text-[clamp(1.75rem,2vw+1rem,2.5rem)] font-semibold tracking-[-0.02em]">{t.notFound.title}</h1>
      <p className="mx-auto mt-4 max-w-md">{t.notFound.lead}</p>
      <Link to="/" className={`${buttonPrimary} mt-10`}>
        {t.notFound.back}
      </Link>
    </section>
  );
}
