// Kezdőlap: Hero, Munkák, Rólam, Tapasztalat, Stack, Kapcsolat.

import { Hero } from "../components/Hero.tsx";
import { Kapcsolat } from "../components/Kapcsolat.tsx";
import { Munkak } from "../components/Munkak.tsx";
import { Rolam } from "../components/Rolam.tsx";
import { Stack } from "../components/Stack.tsx";
import { Tapasztalat } from "../components/Tapasztalat.tsx";
import { usePageTitle } from "../hooks/usePageTitle.ts";
import { useI18n } from "../i18n/I18nProvider.tsx";

export function Kezdolap() {
  const { t } = useI18n();
  usePageTitle(t.pageTitles.home);

  return (
    <>
      <Hero />
      <Munkak />
      <Rolam />
      <Tapasztalat />
      <Stack />
      <Kapcsolat />
    </>
  );
}
