// Lábléc: név, közösségi profilok, e-mail, adatvédelmi link, évszám.


import { messages, paths, type Lang } from "../../i18n/index.ts";
import { CONTACT_EMAIL } from "../../utils/contact.ts";
import { SocialLinks } from "../ui/SocialLinks.tsx";

export function Footer({ lang }: { lang: Lang }) {
  const t = messages(lang);

  return (
    <footer className="border-t border-line bg-deep-navy">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-4 px-5 py-10 text-sm text-slate md:flex-row md:justify-between md:px-8 xl:px-0">
        <p>
          © {new Date().getFullYear()} Szántó Dávid. {t.footer.rights}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <SocialLinks />
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-ice-white">
            {CONTACT_EMAIL}
          </a>
          <a href={paths(lang).privacy} className="transition-colors hover:text-ice-white">
            {t.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
