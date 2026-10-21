# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved sticker/toy portfolio (`mockup-full.html`) as a static Next.js site with MDX case studies, deployable to Vercel.

**Architecture:**
- Next.js App Router. Every route is statically generated.
- Project metadata lives in MDX frontmatter. `lib/projects.ts` reads it with `gray-matter` and validates it; it feeds the cards, the timeline and the case-study pages.
- MDX bodies are imported and rendered by `@next/mdx`.
- Toys are small client components. Everything else is a server component.
- Styling is ported from the mockup into `globals.css` tokens plus CSS Modules.

**Tech Stack:**
- Next.js (latest stable via `create-next-app@latest`), TypeScript, `@next/mdx`, `remark-frontmatter`, `gray-matter`.
- CSS Modules.
- Vitest for unit tests. Playwright with `@axe-core/playwright` for E2E.

**Spec:** `docs/superpowers/specs/2026-10-21-portfolio-site-design.md`. The visual reference is `mockup-full.html`; copy its CSS values, do not redesign.

## Global Constraints

- English copy only. Keep the copy from `mockup-full.html` unless the spec says otherwise.
- Yee-Peng-CNX role is "Experience Designer". Never claim dev work on it.
- Do not add Tailwind, a UI library or an animation library.
- Fonts come from `next/font/google`:
  - Bricolage Grotesque (display)
  - Space Grotesk (body)
  - Caveat (handwriting)
  - Fredoka (buttons)
  - Noto Sans Thai (fallback)
- Tokens are copied verbatim from the mockup: paper `#f5efe2`, card `#fffdf7`, ink `#1d1a16`, mute `#5a5245`, red `#e8492f`, blue `#2f5be8`, yellow `#ffd84a`, green `#3fae6a`, pink `#ffc6dc`, sky `#cfe0ff`.
- Breakpoints are copied from the mockup: nav and timeline at `max-width:700px`, other layouts at `max-width:760px`.
- Touch targets are at least 44×44px. The focus ring is 3px `--blue`.
- Under `prefers-reduced-motion: reduce`, no animations and no confetti. The confetti button label still changes.
- Missing content is `<span className="ph">…</span>`.
- Contact email is `mailto:t.yamkamol.work@gmail.com`. LinkedIn: `https://www.linkedin.com/in/thanapong-yamkamol-6a1534431/`. GitHub: `https://github.com/thanapdev`. Resume: `/resume.pdf`.
- Commit messages follow Conventional Commits and end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Never push or deploy without the owner's OK.

## Review Focus

These five cases are not covered by any obvious happy-path test. Each one gets its test in the task that owns the code.

1. **Page width at 390px.** The long name "Thanapong Yamkamol", the stickers and the tilted cards must not cause horizontal page scroll. The E2E test asserts `scrollWidth <= innerWidth` on `/` and on a case study (Task 8).
2. **Bad frontmatter types.** `year: "2026"` (a string), `tags: WEB` (not a list) or an empty `coverAlt` must throw an error naming the file and the field, not render broken output (Task 2).
3. **Unknown slug.** `/work/does-not-exist` must return the 404 page, not a crash. Use `dynamicParams = false`. Tested in Task 8.
4. **Sticker dragged off the zone.** A sticker dragged far past the zone's right or bottom edge must stay inside the zone (Task 4, E2E).
5. **Reduced motion.** With reduced motion emulated, clicking "Don't press" creates zero `.confetti` elements but still changes the label (Task 4, E2E).

---

### Task 1: Scaffold, tokens, fonts, test runners

**Files:**
- Create (via `npx create-next-app@latest . --ts --app --eslint --no-tailwind --no-src-dir --import-alias "@/*"`): `package.json`, `app/layout.tsx`, `app/page.tsx`, `next.config.mjs`, `tsconfig.json`
  - The repo root already contains `README.md`, `report.md`, the mockups and `docs/`. Keep all of them. If the CLI refuses a non-empty folder, scaffold in a temp folder and move the files in.
- Create: `app/globals.css`, `mdx-components.tsx`, `vitest.config.ts`, `playwright.config.ts`, `e2e/smoke.spec.ts`

**Interfaces:**
- Produces:
  - CSS custom properties `--paper --card --ink --mute --red --blue --yel --grn --pink --sky`.
  - Global classes `.wrap .hand .disp .ph .eyebrow .h2 .btn .btn.red .btn.blue .btn.yel .btns .chips`.
  - Font CSS variables `--font-display --font-body --font-hand --font-toy --font-thai` on `<html>`.
  - npm scripts `dev build start test e2e`.

- [ ] **Step 1:** Scaffold the app.
- [ ] **Step 2:** Install the extra packages:
  - `@next/mdx @mdx-js/loader @mdx-js/react @types/mdx remark-frontmatter gray-matter`
  - Dev: `vitest @playwright/test @axe-core/playwright`
  - Then run `npx playwright install chromium`.
- [ ] **Step 3:** Configure `next.config.mjs`.
  - Set `pageExtensions: ['ts','tsx','md','mdx']`.
  - Wrap the config with `createMDX({ options: { remarkPlugins: [['remark-frontmatter']] } })`. The string form is required for Turbopack. The plugin strips the YAML block from the rendered body.
  - Add an empty `mdx-components.tsx` exporting `useMDXComponents(components)`. Task 6 fills it.
- [ ] **Step 4:** Port the `:root` tokens, `body` paper background, `.ph`, `.btn*`, `.chips`, `.eyebrow`, `.h2`, `.hand`, `.disp`, `section` padding and the reduced-motion block from `mockup-full.html` into `app/globals.css`. Font families must reference the `next/font` variables, not the literal names.
- [ ] **Step 5:** Load the five fonts in `app/layout.tsx` with `next/font/google` and the `variable` option.
  - Set `<html lang="en">`.
  - Add a "Skip to content" link as the first focusable element. It targets `#main`.
  - Set default `metadata`: title template `%s · Thanapong Yamkamol`, default title `Thanapong Yamkamol · UX/UI Designer`.
- [ ] **Step 6:** Add `vitest.config.ts` (environment `node`, include `lib/**/*.test.ts` and `scripts/**/*.test.mjs`).
  - Add `playwright.config.ts` with two projects: `mobile` (viewport 390×844) and `desktop` (1280×800).
  - Set `webServer` to `npm run build && npm run start` on port 3000.
- [ ] **Step 7:** Write `e2e/smoke.spec.ts`: test `home loads` → `goto('/')`, expect the skip link `getByRole('link', { name: 'Skip to content' })` to be attached.
- [ ] **Step 8:** Run `npm run build && npm run e2e`. Expected: both projects pass.
- [ ] **Step 9:** Commit: `chore: scaffold next.js app with tokens, fonts and test runners`.

### Task 2: Content loader and project content

**Files:**
- Create: `lib/projects.ts`, `lib/projects.test.ts`, `lib/timeline-extra.ts`, `content/work/yee-peng-cnx.mdx`, `content/work/the-reborn-gacha.mdx`

**Interfaces:**
- Produces (from `lib/projects.ts`):
```ts
export type Project = {
  slug: string; title: string; year: number; role: string; team: string;
  tags: string[]; summary: string;
  tldr: { problem: string; did: string; result: string };
  metric: { value: string; label: string };
  cover: string; coverAlt: string; live?: string; repo?: string;
  order: number; readTime: number; // minutes
};
export type TimelineRow = { title: string; year: number; role: string; href?: string; linkLabel?: string };
export function readTime(body: string): number;                    // ceil(words / 200), min 1
export function parseProject(slug: string, source: string): Project; // throws on invalid
export function getProjects(): Project[];                           // all of content/work/*.mdx, sorted by order asc
export function getProject(slug: string): Project | undefined;
export function nextProject(slug: string, projects: Project[]): Project; // wraps last → first
export function getTimeline(projects: Project[], extra: TimelineRow[]): TimelineRow[]; // year desc, stable
export function projectLinks(p: Project): { label: string; href: string }[]; // Live / Repo, only those present
```
- Produces (from `lib/timeline-extra.ts`): `export const timelineExtra: TimelineRow[]`.

- [ ] **Step 1: Write failing tests** in `lib/projects.test.ts`. Use inline MDX strings, not files.
  - `parses valid frontmatter`: every field round-trips. `readTime` is 2 for a 250-word body.
  - `readTime minimum is 1`: `readTime('')` is 1.
  - `throws naming file and field`. Three cases (Review Focus 2):
    - Missing `title`.
    - `year: "2026"`.
    - `coverAlt: ""`.
    - In each case, expect `/x\.mdx: invalid or missing "(title|year|coverAlt)"/`.
  - `rejects non-list tags`: `tags: WEB` throws naming `tags`.
  - `nextProject wraps`: with `[a(order 1), b(order 2)]`, the next of `b` is `a`.
  - `getTimeline sorts by year desc and keeps order within a year`.
  - `projectLinks omits missing urls`: a project with `live` and no `repo` gives `[{label:'Live Website', href}]`.
- [ ] **Step 2:** Run `npx vitest run lib`. Expected: FAIL (module not found).
- [ ] **Step 3:** Implement `lib/projects.ts`.
  - Validate each required field by its type: non-empty string, finite number, string array with at least 1 item, or object with string fields.
  - Throw `new Error(\`${slug}.mdx: invalid or missing "${field}"\`)` on the first failure.
  - `getProjects` reads `path.join(process.cwd(), 'content/work')` with `fs.readdirSync`.
- [ ] **Step 4:** Run `npx vitest run lib`. Expected: PASS.
- [ ] **Step 5:** Write both MDX files.
  - Use the facts recorded in `report.md` and the mockup copy.
  - Yee-Peng-CNX:
    - Frontmatter: `order: 1`, `year: 2026`, `role: Experience Designer`, `team: team of 2`, `tags: [WEB, CULTURE, TH / EN]`, `metric: {value: "3", label: "virtual rituals: lanterns, Phang Pratheep, krathong"}`, `live: https://yee-peng-cnx.vercel.app`, `repo: https://github.com/thanapdev/Yee-Peng-CNX`.
  - The Reborn Gacha:
    - Frontmatter: `order: 2`, `year: 2026`, `role: Designer + Developer`, `team: solo`, `tags: [GAME, WEB, SOLO]`, `metric: {value: "13", label: "reborn roles + 7 deaths (and 1 secret chicken)"}`, `live: https://the-reborn-gacha.vercel.app`, `repo: https://github.com/thanapdev/The_Reborn_Gacha`.
  - Unknown fields: `tldr.problem`, `tldr.result` and the body sections use `<span className="ph">[…?]</span>`.
  - `cover`: `/work/<slug>/cover.png`. Add a placeholder image at that path.
- [ ] **Step 6:** Write `lib/timeline-extra.ts` with two rows:
  - QueueApp (iOS), 2025, role `OOP term project · Swift`, href `https://github.com/thanapdev/QueueApp_project`, linkLabel `GitHub ↗`.
  - TiguS, 2023, role `Front-end final project`, href `https://github.com/thanapdev/project-TiguS---FrontEnd-Final-Project`, linkLabel `GitHub ↗`.
- [ ] **Step 7:** Add a test `real content parses`: `getProjects()` returns 2 projects, in the order Yee-Peng-CNX then The Reborn Gacha. Run `npx vitest run lib`. Expected: PASS.
- [ ] **Step 8:** Commit: `feat: add validated project content loader and case study content`.

### Task 3: Nav and Footer

**Files:**
- Create: `components/Nav.tsx` (client), `components/Nav.module.css`, `components/Footer.tsx`
- Modify: `app/layout.tsx` (render `<Nav/>`, `<main id="main">{children}</main>`)
- Test: `e2e/smoke.spec.ts`

**Interfaces:**
- Produces: `<Nav />` with links to `/#work /#about /#timeline /#contact` and a logo `thanap.` linking to `/`. `<Footer />` shows `© {year} Thanapong Yamkamol` and the line "Designed & built by me, with glue and stickers."

- [ ] **Step 1:** Add the E2E test `mobile menu opens and closes` (mobile project only):
  - Click `getByRole('button', { name: 'Menu' })`.
  - Expect `aria-expanded="true"` and the `Work` link to be visible.
  - Click `Work`. Expect `aria-expanded="false"`.
- [ ] **Step 2:** Run `npm run e2e -- -g "mobile menu"`. Expected: FAIL.
- [ ] **Step 3:** Port the mockup `.nav` styles and its menu-toggle behavior into `Nav`.
- [ ] **Step 4:** Run the same command. Expected: PASS.
- [ ] **Step 5:** Commit: `feat: add sticky nav with mobile menu and footer`.

### Task 4: Hero, stickers and control panel

**Files:**
- Create:
  - `components/Hero.tsx` (server shell) and `components/Hero.module.css`
  - `components/HeroInteractive.tsx` (client, holds the shared hero state)
  - `components/HeroName.tsx` (client)
  - `components/StickerZone.tsx` (client) and `components/Sticker.tsx` (client)
  - `components/ControlPanel.tsx` (client)
  - `components/confetti.ts`
  - `components/Stickers.module.css`
  - `components/useDrag.ts`
- Modify: `app/page.tsx`
- Test: `e2e/hero.spec.ts`

**Interfaces:**
- `useDrag(ref: RefObject<HTMLElement>, opts: { handleRef?: RefObject<HTMLElement>; zoneRef: RefObject<HTMLElement> }): void`
  - Attaches pointer events and 12px arrow-key moves to the handle (or to the element itself).
  - Clamps the element inside the zone the same way as the mockup's `place()`.
- `burstConfetti(origin: DOMRect, count: number): void`
  - Does nothing when `matchMedia('(prefers-reduced-motion: reduce)')` matches.
- Shared hero state: the code mode boolean and play (0–1) live in `StickerZone`'s parent client component, `HeroInteractive`. That component wraps both `HeroName` and `ControlPanel`.
  - `HeroName({ name: string; codeMode: boolean; play: number })` keeps each word in a `nowrap` wrapper. In code mode it renders `<${name.split(' ')[0]} />`.
  - `ControlPanel({ codeMode, onCodeMode, play, onPlay })`.

- [ ] **Step 1:** Write `e2e/hero.spec.ts` with four tests:
  - `code switch renames hero`: click `getByRole('switch', { name: 'Code mode' })`. Expect the `h1` `aria-label` to be `<Thanapong />` and `aria-checked="true"`.
  - `sticker stays in zone` (Review Focus 4): drag `getByRole('button', { name: /Hello there/ })` by +2000px x and +2000px y with `page.mouse`. Expect the sticker's bounding box to stay within the zone's bounding box.
  - `sticker moves with arrow keys`: focus the sticker, press `ArrowLeft`, and expect its `left` to decrease by 12px.
  - `reduced motion: no confetti` (Review Focus 5): use `page.emulateMedia({ reducedMotion: 'reduce' })`. Click "Don't press". Expect `.confetti` count to be 0 and the button text to no longer equal "Don't press".
- [ ] **Step 2:** Run `npm run e2e -- e2e/hero.spec.ts`. Expected: FAIL.
- [ ] **Step 3:** Port the hero markup, copy and CSS from the mockup.
  - Stickers: `HELLO THERE!`, `OPEN TO WORK`, `<design + code />`, `CNX → BKK ✦`.
  - The control panel keeps its pink grip as the only drag handle.
  - Copy the ARIA labels from the mockup.
  - The confetti count is `10 + round(play * 30)`.
  - Button labels rotate through `["Told you", "Again?!", "OK one more", "Don't press"]`.
  - Code mode adds `data-mode="code"` on `<body>`, which sets `--paper: #eef1ff`.
- [ ] **Step 4:** Run the same command. Expected: PASS on both projects.
- [ ] **Step 5:** Commit: `feat: add interactive hero with draggable stickers and control panel`.

### Task 5: Home sections (Work, About, Timeline, Contact)

**Files:**
- Create: `components/ProjectCard.tsx` + `.module.css`, `components/SkillChip.tsx` (client), `components/About.tsx` + `.module.css`, `components/Timeline.tsx` + `.module.css`, `components/Contact.tsx` + `.module.css`
- Modify: `app/page.tsx`
- Test: `e2e/smoke.spec.ts`

**Interfaces:**
- Consumes: `getProjects`, `getTimeline`, `projectLinks`, and `timelineExtra` from Task 2.
- `ProjectCard({ project: Project; index: number })`
  - Image on the left when `index` is even, on the right when odd.
  - "View Case Study →" links to `/work/${slug}`.
  - The meta line reads `${role} · ${team} · ${year} · ${readTime} min read`.
- `SkillChip({ front: string; back: string; color: string })` renders a `<button aria-pressed>`.
- `getTimeline` maps each case-study project to a row with `href = live`. `linkLabel` is `Play ↗` when `tags` includes `GAME`, else `Live ↗`. Add a test for this mapping in Task 2's test file.

- [ ] **Step 1:** Add the E2E tests:
  - `home shows both case studies`: two `article` elements, with headings "Yee-Peng-CNX" and "The Reborn Gacha".
  - `skill chip flips`: click "User Research" and expect `aria-pressed="true"`.
  - `timeline lists 4 rows`.
- [ ] **Step 2:** Run `npm run e2e -- -g "home shows|skill chip|timeline"`. Expected: FAIL.
- [ ] **Step 3:** Port the markup, copy and CSS for these sections from the mockup.
  - Skill backs: User Research `<span className="ph">[methods?]</span>`, Wireframing `Figma · Paper`, Prototyping `Figma · Code`, Visual & UI `Figma · Photoshop · Canva`, Front-end `HTML · CSS · TS · Vue · Tailwind`, AI-assisted workflow `Gen-AI tools`.
  - About copy is the mockup's, including the `ph` for year of study.
  - Profile image is `/profile.jpg` with a `ph` caption until it exists.
- [ ] **Step 4:** Run the same command. Expected: PASS.
- [ ] **Step 5:** Commit: `feat: add work, about, timeline and contact sections`.

### Task 6: Case study page and MDX components

**Files:**
- Create:
  - `app/work/[slug]/page.tsx` and `app/work/[slug]/page.module.css`
  - `components/mdx/StickyNote.tsx`, `components/mdx/Polaroid.tsx`, `components/mdx/BeforeAfter.tsx` (client), `components/mdx/Callout.tsx`
  - `components/mdx/mdx.module.css`
- Modify: `mdx-components.tsx` (register the four components)
- Test: `e2e/case-study.spec.ts`

**Interfaces:**
- Consumes: `getProjects`, `getProject`, `nextProject`, and `projectLinks` from Task 2.
- The page sets `export const dynamicParams = false`, so an unknown slug returns 404.
- `generateStaticParams` returns one entry per project slug.
- `generateMetadata` returns `{ title, description: summary }`.
- The body is loaded with `const { default: Body } = await import(\`@/content/work/${slug}.mdx\`)`.
- Component props:
  - `StickyNote({ children })`
  - `Polaroid({ src, alt, caption })`, using `next/image`
  - `BeforeAfter({ before, after, alt })`
  - `Callout({ children })`

- [ ] **Step 1:** Write `e2e/case-study.spec.ts` with three tests:
  - `case study renders header and tldr`:
    - `goto('/work/yee-peng-cnx')`.
    - Expect an `h1` "Yee-Peng-CNX".
    - Expect the text "Experience Designer".
    - Expect three TL;DR notes: Problem, What I did, Result.
  - `next project wraps`: on `/work/the-reborn-gacha`, the "Next project →" link has href `/work/yee-peng-cnx`.
  - `BeforeAfter slider moves with keys`: on `/work/the-reborn-gacha`, press `ArrowRight` on `role="slider"` and expect `aria-valuenow` to increase.
    - The Reborn Gacha MDX gets one `<BeforeAfter>` in its Design section, using placeholder images `/work/the-reborn-gacha/before.png` and `after.png` with a `ph` caption. The owner swaps in real images later.
- [ ] **Step 2:** Run `npm run e2e -- e2e/case-study.spec.ts`. Expected: FAIL.
- [ ] **Step 3:** Implement the page in this order:
  1. Header: tags, title, meta line, `projectLinks` as `.btn`.
  2. Polaroid cover.
  3. TL;DR: three sticky notes.
  4. `<Body/>`.
  5. Footer: Next project, and Back to all work linking to `/#work`.
  - Implement the components in mockup style.
  - `BeforeAfter` uses `role="slider"`, `aria-valuemin=0`, `aria-valuemax=100` and a step of 5.
- [ ] **Step 4:** Run the same command. Expected: PASS.
- [ ] **Step 5:** Commit: `feat: add mdx case study pages`.

### Task 7: 404, metadata, OG images, sitemap, robots

**Files:**
- Create: `app/not-found.tsx`, `app/opengraph-image.tsx`, `app/work/[slug]/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, `lib/site.ts`

**Interfaces:**
- `lib/site.ts` exports `SITE_URL`:
  - `process.env.NEXT_PUBLIC_SITE_URL` if set.
  - Else `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.
  - Else `http://localhost:3000`.
- Sitemap lists `/` plus `/work/${slug}` for every project.

- [ ] **Step 1:** Add the E2E tests:
  - `unknown slug is 404` (Review Focus 3): `goto('/work/does-not-exist')`. Expect response status 404 and the text "Lost? This page got reborn somewhere else."
  - `sitemap lists case studies`: `request.get('/sitemap.xml')` contains `/work/yee-peng-cnx`.
- [ ] **Step 2:** Run `npm run e2e -- -g "404|sitemap"`. Expected: FAIL.
- [ ] **Step 3:** Implement the 404 page (a sticker style with `.btn red` "Back home"), the OG images, the sitemap and robots.
  - OG images are 1200×630 with a paper background:
    - Home: the name plus "UX/UI Designer who builds".
    - Case study: the title plus its tags.
  - Set `metadataBase: new URL(SITE_URL)` in the layout.
- [ ] **Step 4:** Run the same command. Expected: PASS.
- [ ] **Step 5:** Commit: `feat: add 404, og images, sitemap and robots`.

### Task 8: Placeholder guard, full smoke + a11y, deploy notes

**Files:**
- Create: `scripts/check-placeholders.mjs`, `scripts/check-placeholders.test.mjs`
- Modify: `package.json` (add `"postbuild": "node scripts/check-placeholders.mjs"`), `e2e/smoke.spec.ts`, `README.md`, `report.md`

**Interfaces:**
- `export function findPlaceholders(dir: string): string[]`
  - Returns the relative paths of `.html` files under `dir` that contain an element whose class list includes `ph`.
  - Match with the regex `/class="[^"]*\bph\b[^"]*"/`.
- CLI behavior: scans `.next/server/app`.
  - If any files match and `process.env.VERCEL_ENV === 'production'`, it prints the files and exits 1.
  - Otherwise it prints a warning and exits 0.

- [ ] **Step 1:** Write the failing tests in `scripts/check-placeholders.test.mjs`. Use a temp dir.
  - `finds ph class`: a file containing `<span class="hand ph">` is found.
  - `ignores lookalikes`: a file containing `class="phone"` and `class="graph"` is not found.
- [ ] **Step 2:** Run `npx vitest run scripts`. Expected: FAIL.
- [ ] **Step 3:** Implement the script. It walks the directory recursively with `fs.readdirSync(dir, { recursive: true })`.
- [ ] **Step 4:** Run `npx vitest run scripts`. Expected: PASS. Then run `npm run build`. Expected: a warning that lists `index.html` and the work pages, and exit 0.
- [ ] **Step 5:** Extend `e2e/smoke.spec.ts` with three tests:
  - `axe: home and case study have no violations`: run `AxeBuilder` on `/` and on `/work/yee-peng-cnx`, and expect `violations` to equal `[]`.
  - `no horizontal scroll` (Review Focus 1): on `/` and `/work/the-reborn-gacha`, `document.documentElement.scrollWidth <= window.innerWidth`.
  - `journey`: on `/`, click the first "View Case Study →", expect the URL to contain `/work/`, click "Back to all work", and expect the URL to be `/#work`.
- [ ] **Step 6:** Run `npm test && npm run e2e`. Expected: everything passes on both projects. Fix contrast or overflow problems in the owning component, not in the test.
- [ ] **Step 7:** Run a manual check with `npx lighthouse http://localhost:3000 --preset=desktop` and with mobile emulation. Performance, Accessibility and SEO should each be 90 or higher. Record the scores in `report.md`.
- [ ] **Step 8:** Update the README with:
  - Commands: `dev`, `test`, `e2e`, `build`.
  - How to write a case study: the frontmatter table from spec §6 and the 4 MDX components.
  - Vercel setup:
    1. Import `thanapdev/Porfolio`.
    2. Keep the defaults for framework and build.
    3. Set `NEXT_PUBLIC_SITE_URL` after the first deploy.
    4. A production build fails while placeholders remain.
- [ ] **Step 9:** Update `report.md`: status (build done), the list of remaining `ph` content, the Lighthouse scores and a log entry.
- [ ] **Step 10:** Commit: `feat: add placeholder guard, e2e a11y checks and deploy docs`.
