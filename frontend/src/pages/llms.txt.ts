/**
 * llms.txt: rövid, géppel jól olvasható összefoglaló az AI-keresőknek (ChatGPT, Claude, Perplexity stb.) arról,
 * ki a tulajdonos, mit csinál, milyen munkái vannak és hogyan érhető el. Az oldal saját adataiból készül
 * (i18n, content/), így nem tud eltérni attól, ami az oldalon látszik.
 */
import type { APIRoute } from "astro";

import { projects } from "../content/projects.ts";
import { ALL_TECH, OWNER, PROFILES } from "../content/site.ts";
import { messages, paths, type Lang } from "../i18n/index.ts";
import { CONTACT_EMAIL } from "../utils/contact.ts";

const LABELS = {
  hu: { heading: "Magyarul", where: "Hely", stack: "Technológiák", work: "Munkák", contact: "Kapcsolat", form: "Kapcsolati űrlap", privacy: "Adatvédelem" },
  en: { heading: "In English", where: "Location", stack: "Technologies", work: "Work", contact: "Contact", form: "Contact form", privacy: "Privacy" },
} satisfies Record<Lang, Record<string, string>>;

function section(lang: Lang, site: URL | undefined): string {
  const t = messages(lang);
  const labels = LABELS[lang];
  const url = (path: string) => new URL(path, site).href;

  return [
    `## ${labels.heading}`,
    "",
    `${OWNER.name[lang]} – ${t.hero.role}. ${t.hero.lead}`,
    "",
    `- ${labels.where}: ${OWNER.locality}, ${OWNER.country[lang]}`,
    `- ${labels.stack}: ${ALL_TECH.join(", ")}`,
    "",
    `### ${labels.work}`,
    "",
    ...projects.map((project) => {
      const name = project.hasCaseStudy ? `[${project.title}](${url(paths(lang).project(project.slug))})` : project.title;
      return `- ${name} (${project.year}, ${project.type[lang]}): ${project.summary[lang]}`;
    }),
    "",
    `### ${labels.contact}`,
    "",
    `- E-mail: ${CONTACT_EMAIL}`,
    `- [${labels.form}](${url(paths(lang).home)}#kapcsolat)`,
    ...PROFILES.map((profile) => `- [${profile.label}](${profile.url})`),
    `- [${labels.privacy}](${url(paths(lang).privacy)})`,
  ].join("\n");
}

export const GET: APIRoute = ({ site }) => {
  const title = `# ${OWNER.name.en} (${OWNER.name.hu})`;
  const summary = `> ${messages("en").descriptions.home}`;
  const body = [title, "", summary, "", section("en", site), "", section("hu", site), ""].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
