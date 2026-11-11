// 404-es oldal: rövid üzenet és vissza a kezdőlapra.


import { buttonPrimary } from "../components/ui/Button.tsx";
import { messages, paths, type Lang } from "../i18n/index.ts";

export function NotFound({ lang }: { lang: Lang }) {
  const t = messages(lang);

  return (
    <section className="mx-auto max-w-280 px-5 py-32 text-center md:px-8 xl:px-0">
      <p className="font-mono text-xs tracking-[0.08em] text-slate uppercase">{t.notFound.code}</p>
      <h1 className="mt-4 text-[clamp(1.75rem,2vw+1rem,2.5rem)] font-semibold tracking-[-0.02em]">{t.notFound.title}</h1>
      <p className="mx-auto mt-4 max-w-md">{t.notFound.lead}</p>
      <a href={paths(lang).home} className={`${buttonPrimary} mt-10`}>
        {t.notFound.back}
      </a>
    </section>
  );
}
