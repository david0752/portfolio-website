// Lábléc: név, e-mail, adatvédelmi link, évszám.

import { Link } from "react-router";

import { useI18n } from "../../i18n/I18nProvider.tsx";
import { CONTACT_EMAIL } from "../../utils/contact.ts";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-line bg-deep-navy">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-4 px-5 py-10 text-sm text-slate md:flex-row md:justify-between md:px-8 xl:px-0">
        <p>
          © {new Date().getFullYear()} Szántó Dávid. {t.footer.rights}
        </p>
        <div className="flex items-center gap-6">
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-ice-white">
            {CONTACT_EMAIL}
          </a>
          <Link to="/adatvedelem" className="transition-colors hover:text-ice-white">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
