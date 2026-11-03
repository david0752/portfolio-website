# Developer Profile

A portable description of how I (David) like software to be built and how I expect AI coding assistants to work with me. It is **not** a project instruction file: every project keeps its own `CLAUDE.md` for project-specific rules. Copy this file into a new project as-is, and keep it updated when I state a new preference.

**This file is important: never delete, move or empty it, under any circumstances.** Its purpose is that an AI assistant gets to know me better and better over time, so it must keep growing (see H.7 for how).

**How the statements are marked**

- No marker: a preference I stated explicitly, or one I confirmed by approving or correcting work in a real project (the evidence is in section F).
- *(observed)*: a convention that consistently appears in my accepted code, but that I never stated as a rule. Treat it as a strong default, not a law.
- *(assumption)*: a reasonable inference. Confirm it with me before relying on it for an important decision.

Last updated: 2026-11-02 (source project: Kunmadaras Drift website rebuild). Section I: my Claude Code toolkit and how to reinstall it.

---

## A. Development philosophy

- **Clean, understandable and maintainable code over clever or heavily abstracted code.** I explicitly prefer avoiding unnecessary abstractions and over-engineering. In practice:
  - Add a shared component, hook or utility only when the same thing is actually used in two or more places, or clearly will be.
  - No speculative layers (repositories, factories, DI containers, generic "manager" classes) unless the project already uses them.
  - A small amount of local duplication is better than a premature abstraction that couples unrelated features.
- **Security is a default, not a feature.** Every endpoint that writes data or accepts uploads must validate input on the server, check authorization on the server, and fail safely. The frontend hiding a button is never enough (see D).
- **Privacy by default.** No cookies or tracking unless they are actually needed; anonymous, cookie-free analytics; third-party services that leak the visitor's IP (Google Maps, YouTube, Google Fonts) only after consent; self-hosted fonts.
- **Real content, nothing invented.** No made-up numbers, testimonials, sponsors or claims on a public site; the content comes from the real data or from the client.
- **Scale for realistic peaks.** Lists that can grow (events, photos, results, FAQ, subscribers) need limits or progressive disclosure, and the app should be tested with far more data than today's (I asked for a load/simulation test that checks many events, 50+ newsletter subscribers and page speed with lots of data).
- **Limits on everything, and tested.** Every field and everything that can grow (text fields, lists, uploads, counts) needs a sensible upper limit, based on what the content really needs, not a technical maximum. Enforce it on the server, show it in the UI (character counter, limit meter), and test it: a value over the limit must be rejected, and existing data and test scripts must still pass. When adding or changing a field, propose the limit and say why. I asked for this to apply always.
- **Performance on modest hardware.** I host on small VPS instances (e.g. a 2 GB Linode). Keep memory use modest: optimize images on upload, avoid large in-memory caches, query only the fields you need.
- **Modern stack, current docs.** Use the current versions of tools and follow the official, up-to-date documentation (I once asked for all Tailwind warnings to be fixed "according to the current official documentation").
- **Always the latest versions, for security.** Reusing patterns from my earlier projects is welcome, but never their pinned versions: install the latest stable release of every package, and check `npm outdated` and `npm audit` so no known vulnerability stays in (I asked for this in the portfolio project).
- **Frontend is always React.** When I was offered Astro for a static portfolio, I answered "frontend mindig react".
- **I judge design on the real page.** A palette or a design document is the starting point, not the thing I approve; build it, show it, and I give feedback on what I see.

## B. Coding preferences

### Files and folders

- Clear separation: `frontend/` and `backend/` (lowercase) as independent projects, each with its own `package.json`, `.env.example` and `CLAUDE.md`. This applies to **every** project, even a small one: in the portfolio project I asked for this split although the first plan was a static site without a backend.
- Backend layered by responsibility *(observed)*: `controllers/` (routing + request parsing), `services/` (business logic, external services), `models/`, `middleware/`, `migrations/`, `utils/`, `types/`, `scripts/`.
- Frontend *(observed)*: `pages/` (one file per route), `sections/` (large page sections), `components/layout` and `components/ui`, `hooks/`, `utils/`, `types/`, `i18n/`; an admin area gets its own `pages/admin/` folder with one file per panel.
- Folder names are consistently lowercase; mixed casing breaks builds on Linux servers (this actually happened in git: the same folder was tracked as both `Backend/` and `backend/`).
- Do not reorganize just to make the tree look different. Only fix real problems.

### Naming

- Match the project's existing language and naming. In my Hungarian projects, UI text, comments and page names are Hungarian (`Kezdolap.tsx`, `Versenyeredmenyek.tsx`); keep that consistent rather than mixing languages.
- Backend file suffixes describe the role *(observed)*: `*.controller.ts`, `*.service.ts`, `*.middleware.ts`, `*.model.ts`.
- React components and their files in PascalCase, hooks as `useSomething`, utilities in camelCase *(observed)*.

### Components and reuse

- One component per responsibility; when a page file grows large, extract sections into their own files.
- Shared UI building blocks for repeated patterns (admin fields, dialogs, "show more" button, limit meters) so every panel looks and behaves the same.
- Use one shared confirmation dialog (designed, centered) everywhere. **Never `window.confirm`.**
- Use one notification system (toasts) for success and error feedback.

### TypeScript

- Strict TypeScript on both sides; no `any`, no `@ts-ignore`.
- Respect the project's compiler constraints (e.g. `erasableSyntaxOnly` in the frontend: no enums, no constructor parameter properties).
- Types for API data live in `types/` and must match what the backend actually returns.

### Comments and documentation

- I want every file to have a short header comment explaining what it does, and comments on non-obvious logic, "so I know what each file does". I asked for this explicitly; it is not optional.
- Comments explain *why* and *what a block is for*, in the project's language. No comments that only repeat the code.
- Each project has a `CLAUDE.md` (and per-folder `CLAUDE.md` files) that are kept up to date when behavior changes.
- **Every Markdown file that AI assistants read is written in English**, even in a Hungarian project: all `CLAUDE.md` files, `README.md`, `docs/` (product, architecture, design, decision log), this profile and the assistant's memory files. Code comments and UI text still follow the project language. The exception is documents written for a non-technical reader (e.g. the client's admin handbook or operations notes): they stay in that reader's language. Quoted UI strings inside an English document stay verbatim, so they can still be found in the code.
- Non-technical documentation in Markdown, not Word (I could not open the Word file reliably and asked for `.md`). For example, I asked for an admin handbook that contains only what the site operator needs.

### Error handling

- The backend has a central error handler; every error response has the same shape (here `{ message }`), with a human-readable message in the user's language.
- 4xx for client errors with a clear explanation; 5xx details are logged on the server only, and the client gets a generic message.
- Expected failures (mail server down, translation API down) must not break the main action. For example, a registration is saved even if the confirmation e-mail fails, and the response tells the admin what happened.
- The frontend handles loading, empty, error and success states explicitly, with friendly wording (I corrected an empty state from "no such registration" to simply "No registrations").

### Frontend / backend responsibilities

- The backend is the source of truth for validation, limits, permissions and business rules. The frontend mirrors limits only for display (counters, disabled buttons) and must stay in sync with the backend constants.
- Content shown on the public site should be editable from the admin wherever practical. I asked for the events, schedules, info cards, FAQ and newsletter templates to be managed there instead of hard-coded. A few sections stay static on purpose; the project's `CLAUDE.md` lists them.

## C. Frontend and UI/UX preferences

- **Polished, distinctive, on-brand.** Use the project's own design language consistently (in my last project: a dark, motorsport look, a condensed display font for headings and one accent red). New screens (admin, login, 404, e-mails) must follow the same design, not a generic template.
- **Restraint.** I removed decorative effects I did not like (red glow on the gallery page, gold/silver/bronze podium backgrounds that "did not fit the page"). Before adding a decoration, ask whether it fits; when in doubt, keep it plain.
- **No oversized or undersized blocks.** I repeatedly asked for cards that were too big (or text too small) to be resized so more fits on a laptop screen. Check density at real sizes.
- **Responsive at every size, mobile designed on purpose.** Check phone, tablet, laptop and desktop. My laptop runs at 125% scaling (about a 1536 px wide viewport), so layouts must work at that width. A mobile layout should be designed for mobile (e.g. centered button labels, stacked layouts), not just a shrunken desktop.
- **Device-appropriate behavior.** A phone number is a clickable `tel:` link on phones only. On laptops it is plain text ("I won't call anyone from a laptop"). Likewise hover effects and animations: none on small screens, but on large screens they must always work, regardless of what the browser reports about touch input (I noticed that no hover worked on my laptop). Decide by screen size, the way I think about the device, not by an abstract capability flag.
- **Progressive disclosure for long lists.** Show a first row or batch and a "show more" button with the remaining count instead of endless pages.
- **Textareas grow with their content.** No manual resize handle; the field starts at a sensible height, grows with the text up to a limit, and only then becomes scrollable (I asked for this on the portfolio contact form).
- **Forms that protect work.** Long forms keep a draft so nothing is lost when the user navigates away; sensible defaults are pre-filled; repeated content (rules, info cards) is compact and expandable rather than long.
- **Dialogs and lightboxes stay on the page.** An image opens in an in-page lightbox with a close (X) control, not in a new tab.
- **Smooth, purposeful motion** *(observed)*: short transitions and slide-ins, respecting `prefers-reduced-motion`.
- **Accessibility, with real people in mind.** I asked for posters (which replace the schedule) to be zoomable "for those who see less well", and then for zoom on every enlarged image. Think about visitors with weaker eyesight: content that only exists as an image must be readable (zoom, pan, large buttons, not only gestures). Also *(observed in accepted work)*: semantic buttons, `aria-expanded` and `aria-pressed` states, visible focus rings, labeled controls, sufficient contrast in both themes.
- **Themes and languages when the project needs them.** I asked for light and dark themes (public site and admin) and for a language switcher. Dynamic content entered in the admin must be translated too ("it's weird that this part stays Hungarian").
- **Admin UX for a non-technical operator.** Explanatory text, safe defaults, confirmation before irreversible steps, clear indicators (e.g. a warning icon in the menu while e-mail is not configured), a menu order the client can rearrange, and highly visible limits (counters and progress bars, not just a sentence).
- **E-mails match the website design**, use the full width, and have readable type sizes. A transactional confirmation (e.g. a newsletter opt-in) stays a plain text mail, and its landing page just says "Confirmed – you can close this page."

## D. Backend and security expectations

- **Authentication:** passwords hashed with bcrypt (adequate cost, timing-safe login that does not reveal whether a username exists), signed JWTs with a fixed algorithm and issuer in an httpOnly `SameSite=Strict` cookie (not `localStorage`) plus a CSRF header on state-changing requests, the user and role re-checked in the database on every request, a minimum secret length enforced at startup, self-registration disabled by default and enforced on the server.
- **Authorization:** every admin route behind one server-side middleware; role checks on the server; public endpoints return only public fields of published records.
- **API design:** REST-style routes grouped by area; consistent JSON responses; long-running jobs (e.g. sending a newsletter to hundreds of people) run in the background with a status endpoint instead of holding a request open.
- **Database:** PostgreSQL with migrations only (no `sync()` in production); transactions and row locks where concurrency matters (registration capacity, newsletter de-duplication); cascade rules chosen deliberately; snapshots of data that can change later (e.g. the fee at registration time).
- **Input validation:** whitelist fields per resource (no mass assignment), length limits on every text field, type and format checks (UUID, e-mail, dates), escaping for `LIKE` patterns, HTML escaping in generated e-mails.
- **File uploads:** in-memory, size and type limited, re-encoded with an image library (which strips metadata and proves the file is an image), stored under random names, served with `nosniff`, and deleted when no record references them.
- **Abuse protection:** rate limits on login, forms, newsletter and analytics; honeypot fields on public forms; double opt-in for newsletters.
- **Secrets:** only in `.env` (never committed; `.env.example` documents every variable); secrets entered in the admin (SMTP app password, API keys) are encrypted at rest, never sent back to the browser, and can be deleted, not just replaced.
- **Behind a proxy:** configure `trust proxy` so rate limits see real client IPs; restrict CORS to the real frontend origin; use security headers (helmet).
- **Logging:** server-side logs for unexpected errors and background jobs; no secrets or personal data in logs.
- **Legal:** the privacy notice must be updated in the same change whenever data processing changes (new form, stored field, external service, analytics, retention). I asked for this to happen automatically, without me having to remember it.

## E. Development workflow with AI assistants

1. **Ask before coding.** For every request, read the relevant code first. If anything important is ambiguous, ask concrete questions with concrete options, then implement. I asked for this to apply to every prompt. If nothing is ambiguous, say so briefly and proceed.
2. **Inspect before changing.** Understand the architecture and the existing behavior; do not assume what a function or page does. Verify against the actual code.
3. **Do everything that was asked.** I have had to point out skipped items ("you didn't do some of the changes I asked for"). Work through multi-item requests item by item and confirm each one at the end.
4. **Plan complex changes,** then work systematically, one area at a time, without unrelated changes.
5. **Verify.** Run type-checking, lint and build; run the app or a browser check for UI changes; run the simulation test for backend changes. Never claim something works without having checked it, and report failures honestly.
6. **Explain decisions** that affect architecture, data or behavior, especially anything destructive (automatic deletion, data migrations) or anything the client will notice.
7. **Stop before risky actions:** data loss, production-breaking changes or architectural decisions need my confirmation first. Never delete databases, uploads or `.env` files.
8. **Keep documentation in sync:** the project's `CLAUDE.md` files, the admin handbook and the privacy notice are updated in the same change as the code.
9. **Commit only when I ask.** A safety commit before a large refactor is welcome when I approve it. Do not push unless I ask.
   - **My GitHub structure: one repo, three branches, `dev` → `main` → `release`.** `dev` is where development happens, and every commit/push goes there. `main` gets a presentable state when I test and finalize it with the client. `release` holds only the final, client-approved version, and the production server pulls and runs that branch. Promotion is a merge that I ask for explicitly; never merge into `main` or `release` on your own. In a new project I set up `main` and `release` empty at first, and they fill up as the work matures. This shows I want a clear separation between "work in progress", "shown to the client" and "live", so the live site only ever runs what the client approved.
10. **Answer in my language.** I write in Hungarian and want summaries in Hungarian; code comments and UI follow the project language; Markdown files for AI assistants are in English (see B, Comments and documentation).
11. **Use the installed tools.** I install design, quality and documentation plugins and skills and expect them to be used. Section I lists them, with their roles and priorities.

## F. Lessons learned from the Kunmadaras Drift project

Requirements, decisions and corrections I gave during this project. They show how I think. They are **not** rules to copy into an unrelated project.

**Features I requested**

- Admin-editable Programs page: events with schedules, info cards, pilots, cover posters; past events show only name and image; expired events move to "past" automatically; two events may fall on the same day (e.g. drift and rally).
- Pilot registration per event (options with fees, categories, capacity, deadline before the event start, rules as cards), with accept/reject (rejection reason e-mailed) and auto-fill of the result form from the registration.
- Contact page (info left, form right), with SMTP settings entered by the site owner in the admin.
- Statistics page in the admin (cookie-free analytics, registrations), with a reset button.
- Newsletter in the footer (double opt-in), templates (free text / new event / registration open), preview, test send, background sending, optional automatic sends with a cancel option.
- Light/dark themes, Hungarian/English (German was added and then removed: "English is enough"), DeepL translation of admin content with the API key entered in the admin and the real usage limit shown ("DeepL says the limit is 1 million characters lifetime": show what the API reports, do not assume plan limits).
- Event draft auto-save, default event description editable in the admin, compact rules and info cards.
- YouTube video section (privacy-friendly embed after consent), FAQ section managed in the admin.
- "Show more" buttons wherever long lists appear, and visible limit meters in the admin.
- Limits: 12 gallery photos per driver, 50 mood photos, 300 in total; results per category = accepted registrations + 5 (50 when there are no accepted registrations); at most 12 past events, after which the oldest is deleted with all its data.
- A simulation/load test for large data volumes, and a Markdown handbook for the site operator.

**Design decisions I approved or rejected**

- Rejected: red glow effects on the gallery page; gold/silver/bronze podium backgrounds; designed newsletter-confirmation pages (keep them plain).
- Approved: thin `h-0.5` full-width red line above the footer on inner pages; login-style 404 page; designed centered confirm dialogs; the privacy/consent prompt as a full-width bottom bar; limit meters with color stages (green → amber → red).
- Asked to redesign anything that "doesn't fit its surroundings" (ticket block, phone callout, podium styling, time picker, date picker).

**Things I emphasized repeatedly**

- Laptop sizing (too large fonts and blocks, navbar responsiveness) and mobile details.
- Do not lose user input (drafts), do not show irrelevant controls (hide the register button when registration is closed, no checkboxes where they are not needed).
- Keep the privacy notice current.

**Corrections and edge cases**

- When a request had several items, some were skipped; I had to ask again. Go through every item.
- A link from the home page calendar must scroll to the specific event, not just open the page.
- Number inputs should not show spinner arrows when they are not useful; events without a schedule show their poster instead.
- The site must work after deployment (links point to the public domain, not localhost).

## G. Current project context (Kunmadaras Drift)

**What it is:** the official website of the Kunmadaras Drift / DRIFT OVER FEST event series, replacing a WordPress site. Two audiences: spectators (when and where is the next event?) and drift pilots (registration). The admin is used by a non-technical organizer.

**Stack:** React 19 + Vite + Tailwind CSS 4 + React Router (SPA, React Compiler); Express 5 + TypeScript (ESM) + Sequelize + PostgreSQL; sharp for images, nodemailer (Gmail SMTP), DeepL API, umzug migrations. Planned hosting: one Akamai/Linode 2 GB server with nginx and a single backend instance.

**Architecture:** the SPA calls `/api/*` (Vite proxy in development, nginx in production). The backend layers are controllers → services → Sequelize models. Images are stored in `backend/uploads` as optimized WebP, with their paths in the database. Authentication: JWT in an httpOnly cookie, CSRF header on writes, user and editor role re-checked in the database by middleware.

**Main pages (implemented):** Home (hero, schedule calendar, video, FAQ), Programs, Pilots (registration), Results, Gallery, Contact, Privacy notice, Newsletter confirm/unsubscribe, Login/Register (hidden editor route), 404.

**Admin (implemented):** Statistics, Registrations, Events (editor with schedule, info and rule cards, registration settings, translations, drafts), Info cards, Drivers (with cars), Gallery, Results (with podium photos), Categories, FAQ, Newsletter, Settings (e-mail, DeepL, menu order, statistics reset); light/dark theme; content limits.

**Important endpoints:** `GET /api/competition/programs|results|drivers|faq`, `GET /api/gallery`, `POST /api/registrations`, `POST /api/contact`, `/api/newsletter/subscribe|confirm|unsubscribe`, `POST /api/analytics/pageview`, `/api/v1/auth/login|register`, `/api/competition/admin/*` (editor only).

**Status:** functionally complete for launch. Verified with type-checking (TypeScript 7), lint, builds, a vitest + supertest unit test suite and a simulation test.

**Planned / unfinished / known limitations:**

- Deployment to the Linode server is not done yet (planned; there is a separate operations document).
- The unit test suite covers the security-critical backend parts only (validation, auth cookie, authorization); no frontend tests.
- The Content-Security-Policy is prepared in `deploy/nginx.conf.example` and has to be applied on the server at deployment.
- Questions still open with the client: whether registration needs more data, and who provides the pilot photos.

## H. Instructions for future AI assistants

1. **Read this file before any significant work** (new feature, refactor, audit, design change), together with the project's `CLAUDE.md` files.
2. **Precedence:** the current project's `CLAUDE.md` and my explicit instructions in the conversation override this file. This file describes general preferences; `CLAUDE.md` describes the project.
3. **Do not copy project specifics.** Section F and section G describe one project (Kunmadaras Drift). Do not carry its architecture, limits, colors, language, wording or features into an unrelated project. Use them only to understand how I think.
4. **Translate the preferences to the new stack.** For example, "server-side validation with a central error handler" applies whether the backend is Express, Next.js or something else. Use the idioms of the actual technology.
5. **Respect the markers.** Treat *(observed)* items as defaults and *(assumption)* items as things to confirm.
6. **Ask when something important is unclear**, with concrete options (see E.1). Do not guess on data handling, deletion, security trade-offs or visible design changes.
7. **Keep this file current, and never delete it.** It exists so that you know me better and better, so extend it continuously: when I state a new general preference, request a feature, approve or reject a design, or correct your approach in a way that says something about me, add it here (and keep project-only facts in `CLAUDE.md`). Write down the *pattern*, not the exact value: not "I like the hero 1500px tall", but "I asked for X in project Y, which shows that I like / need Z". Feature requests, approvals, rejections and repeated corrections are the best evidence of how I think. Mark inferences with *(observed)* or *(assumption)* as described at the top.
8. **Use my toolkit by its roles.** Section I lists the skills and plugins I install, which one owns which job, and which wins when two overlap. Pick the owner of a job instead of running every similar skill.

## I. Claude Code toolkit (skills, plugins, roles)

My personal setup, valid in every project. Part 1 is the install checklist for a new machine; parts 2–4 tell the assistant which tool to use for what.

### I.1 Install on a new machine

Claude Code itself (PowerShell):

```
irm https://claude.ai/install.ps1 | iex
```

**Plugins**: type these in Claude Code (`/plugin` checks the result):

```
/plugin marketplace add anthropics/claude-plugins-official
/plugin marketplace add upstash/context7
/plugin marketplace add Leonxlnx/taste-skill
/plugin marketplace add pbakaus/impeccable
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin marketplace add DietrichGebert/ponytail

/plugin install frontend-design@claude-plugins-official
/plugin install playwright@claude-plugins-official
/plugin install context7@context7-marketplace
/plugin install taste-skill@taste-skill
/plugin install impeccable@impeccable
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
/plugin install ponytail@ponytail
```

Superpowers comes from the plugin directory: `/plugin` → Discover → **superpowers** (obra/superpowers). Impeccable can also be found there. First use per project: `/impeccable init`.

**Skill packs and tools**: PowerShell:

```
npx skills add mattpocock/skills --agent claude-code -g
npx skills add vercel-labs/agent-skills --skill web-design-guidelines --agent claude-code -g
npx rea-agents setup
uv tool install --python 3.12 graphifyy
graphify install
```

In each project folder: `graphify claude install`, then `/graphify .` inside Claude Code.

Notes from setting this up:

- graphify needs Python 3.12 via uv (numpy does not install on 3.15). If uv reports "The wheel is invalid: Metadata field Name not found", run `uv cache clean` and reinstall.
- Running `python` or `py` with no Python installed makes the Windows install manager install one silently.
- `reverse-engineer-anything` needs the REA MCP server (`npx rea-agents setup`). If it shows as "failed to connect", re-run the setup.
- Add `graphify-out/` to each project's `.gitignore`.

**No install needed**: built into Claude Code: `simplify`, `loop`, `schedule`, `run`, `init`, `security-review`, `update-config`, `keybindings-help`, `fewer-permission-prompts`, `plugin-authoring`, `claude-api`, `claude-in-chrome`, `artifact-design`, `artifact-capabilities`, `artifact-diagramming`, `dataviz`. They come with my claude.ai account: `anthropic-skills:*` (docs, docx, pdf, pptx, xlsx, google-workspace, deep-research, skill-creator, import-memory, morning, built-in-browser, chrome-browser, computer-use). Claude in Chrome also needs the Chrome extension.

### I.2 Who owns which job

**1. Process and project management**

| Skill | Job |
| --- | --- |
| `superpowers:using-superpowers` | Recognize which skills apply, and use them |
| `superpowers:brainstorming` | Design a new feature, clarify requirements |
| `superpowers:writing-plans` | Step-by-step implementation plan |
| `superpowers:executing-plans` | Carry out an approved plan |
| `superpowers:subagent-driven-development` | Delegate parts of a complex task to subagents |
| `superpowers:dispatching-parallel-agents` | Run independent tasks in parallel |
| `superpowers:using-git-worktrees` | Isolated workspace for parallel work |
| `superpowers:finishing-a-development-branch` | Close a branch: merge or PR |
| `superpowers:diagnosing-superpowers` | Diagnose a superpowers session that went wrong |
| `grilling` | Stress-test a plan or idea with hard questions |
| `prototype` | Throwaway prototype to answer a design question |
| `loop` / `schedule` | Repeat a task on an interval / scheduled cloud agents |

Rule: a new, complex feature goes brainstorming → writing-plans → executing-plans. A simple task does not go through this chain.

**2. Frontend, UI/UX and visuals**

| Skill / plugin | Job |
| --- | --- |
| `taste-skill:design-taste-frontend` | Visual direction, art direction, a distinctive look |
| `ui-ux-pro-max` (plugin) | Design system: palette, typography, component and UX recommendations (plus brand, banner, slides, ui-styling skills) |
| `frontend-design` (plugin) | Build the interface and its components |
| `impeccable` (plugin) | Critique and polish an existing UI, accessibility |
| `web-design-guidelines` | Check against web interface guidelines and consistency |
| `artifact-design` / `artifact-capabilities` / `artifact-diagramming` | Design, runtime features and diagrams of shareable artifact pages |
| `dataviz` | Charts, dashboards, data visualization |
| `playwright` (plugin) | Open the real page in a browser: screenshots, clicks, responsive checks |

In short: Taste decides *what character* it has, UI UX Pro Max *which design system* it follows, frontend-design *how it is built*, Impeccable *how a finished UI is improved*, web-design-guidelines *whether it meets the guidelines*. Do not run all of them on every frontend task.

**3. Code quality, architecture, debugging**

| Skill | Job |
| --- | --- |
| `graphify` | Map the codebase as a knowledge graph (what connects to what) |
| `codebase-design` | Design modules, layers, interfaces (the target architecture) |
| `domain-modeling` | Domain terms, data models, `GLOSSARY.md`, ADRs |
| `ponytail` (plugin) | Minimalism while writing: smallest complete change, no needless dependencies. Levels: lite / full / ultra; also `ponytail-review`, `ponytail-audit`, `ponytail-debt` |
| `simplify` | Clean up code that is already written |
| `superpowers:systematic-debugging` | Structured debugging: root cause before the fix |
| `diagnosing-bugs` | Hard-to-reproduce bugs and performance regressions |
| `reverse-engineer-anything` | Reverse-engineer compiled or packaged apps (REA) |
| `run` | Start the app and check that a change really works |
| `context7` (plugin) | Current library and framework documentation |

graphify maps, codebase-design designs; they do not replace each other. Ponytail applies while the solution is shaped, simplify afterwards on written code.

**4. Testing and quality assurance**

| Skill | Job |
| --- | --- |
| `superpowers:test-driven-development` | Primary TDD workflow (red-green-refactor) |
| `tdd` | Only for what the superpowers TDD lacks |
| `superpowers:verification-before-completion` | Evidence (commands, output) before claiming "done" |
| `code-review` | Review a change against repo standards and the spec |
| `superpowers:requesting-code-review` / `superpowers:receiving-code-review` | Start a review / process review feedback critically |
| `migrate-to-shoehorn` | Move tests from `as` assertions to shoehorn |
| `scaffold-exercises` | Exercise and test scaffolding |
| `setup-pre-commit` | Husky + lint-staged pre-commit hooks |

**5. Security and git protection**

| Skill | Job |
| --- | --- |
| `security-review` | Security review of pending changes |
| `git-guardrails-claude-code` | Hooks that block dangerous git commands |
| `update-config` | Permissions, hooks, `settings.json` |
| `fewer-permission-prompts` | Allowlist safe read-only commands |

Fewer permission prompts must never mean switching safety off. Dangerous commands and anything touching production stay approval-only.

**6. Documents, research, knowledge**

| Skill | Job |
| --- | --- |
| `anthropic-skills:docs` | Editable, shareable documents |
| `anthropic-skills:docx` / `pdf` / `pptx` / `xlsx` | Word / PDF / PowerPoint / Excel files, only when that format is asked for |
| `anthropic-skills:google-workspace` | Google Docs, Sheets, Slides |
| `anthropic-skills:deep-research` | Broad, multi-source research report |
| `research` | A concrete technical question from primary sources, saved as Markdown |
| `writing-for-agents` | `CLAUDE.md`, `AGENTS.md`, skill instructions |
| `init` | First `CLAUDE.md` of a new project |
| `anthropic-skills:skill-creator` / `superpowers:writing-skills` | Create, test and tune skills |
| `anthropic-skills:import-memory` | Import memory from another assistant |
| `pr` | Pull request description |

**7. Browser and desktop**

| Tool | Use it for |
| --- | --- |
| `playwright` (plugin) | Testing my own site: page loads, clicks, forms, screenshots, responsive sizes. First choice in development |
| Claude in Chrome (`claude-in-chrome`, `anthropic-skills:chrome-browser`) | Sites that need my own logged-in Chrome session. The two skills describe the same extension; it is one tool |
| `anthropic-skills:built-in-browser` | Only in the Claude desktop app: the browser pane |
| `anthropic-skills:computer-use` | Desktop apps that no browser tool can reach |

Use one browser tool per task. Pick the first one in the table that can do the job.

**8. Claude Code configuration and personal workflow**

Only when the task is about Claude Code itself, my own plugins or an API integration: `update-config`, `keybindings-help`, `plugin-authoring`, `claude-api`, `wizard` (interactive bash wizard for steps only I can do), `superpowers:writing-skills`, `superpowers:diagnosing-superpowers`, `anthropic-skills:morning`.

**Also installed with Matt Pocock's pack**, on request only: `to-spec`, `to-tickets`, `triage`, `implement`, `implement-spec`, `improve-codebase-architecture`, `handoff`, `claude-handoff`, `retro`, `teach`, `wayfinder`, `wait-what`, `grill-me`, `grill-with-docs`, `to-questionnaire`, `loop-me`, `chief-of-staff`, `ask-matt`, `setup-matt-pocock-skills`, `setup-ts-deep-modules`, `writing-beats`, `writing-fragments`, `writing-shape`.

### I.3 Overlaps and who wins

| Overlap | Rule |
| --- | --- |
| Taste vs. frontend-design | Taste sets the direction, frontend-design implements it |
| Taste vs. UI UX Pro Max | Taste is the visual direction, Pro Max the design system |
| Impeccable vs. web-design-guidelines | Impeccable improves, guidelines checks |
| Ponytail vs. simplify | Ponytail prevents (while writing), simplify cleans up (afterwards) |
| tdd vs. superpowers TDD | Superpowers is primary |
| code-review vs. requesting-code-review | One reviews, the other starts and frames the review |
| security-review vs. code-review | Security is a separate review round, not part of code-review |
| graphify vs. codebase-design | graphify maps the current state, codebase-design designs the target |
| research vs. deep-research | research for a focused technical question, deep-research for a broad report |
| Playwright vs. Claude in Chrome | Playwright for my own site, Chrome only when my logged-in session is needed |

### I.4 Cost awareness

- Skills that start subagents (graphify on documents, deep-research, subagent-driven-development, parallel agents) cost the most. Before a large run, say roughly what it will cost and offer a cheaper scope (e.g. graphify without images).
- An ordinary question-and-answer turn costs a few cents; a plugin's own hook adds almost nothing.
