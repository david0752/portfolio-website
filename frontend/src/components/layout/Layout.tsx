/**
 * Közös keret minden oldalhoz: navbar, tartalom, lábléc. Oldalváltáskor a horgonyra (#munkak)
 * vagy az oldal tetejére görget, mert a React Router ezt magától nem teszi meg.
 */

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

import { Footer } from "./Footer.tsx";
import { Navbar } from "./Navbar.tsx";

export function Layout() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#tartalom"
        className="sr-only z-50 rounded-lg bg-signal-blue px-4 py-2 text-midnight focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Ugrás a tartalomhoz
      </a>
      <Navbar />
      <main id="tartalom" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
