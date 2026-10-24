# Portfolio: project report

Read this file first when starting a new chat. Update it at the end of every work session.

Last updated: 2026-10-24

## Resume here (next session)

**Where things stand:**
- The site is built, reviewed and merged into `main`. Everything up to the Figma Design work section (2026-10-24) is merged into `main` and pushed. Run `git log --oneline -5` for the latest commits.
- Nothing is deployed yet.

**Deploy decision (owner, 2026-10-21):**
- Platform: Vercel.
- Deploy only once, after all the content is filled in. Do not deploy, and do not connect Vercel, before that.

**To see the site locally:**
- Development: `npm run dev`, then open http://localhost:3000.
- Production preview: `npm run build && npx next start -p 3001`.
- `npm run build` prints a placeholder warning. That is expected until the content is complete.

**Tomorrow's work, in order:**
1. Ask the owner for the missing content listed under "Open items". LinkedIn cannot be fetched automatically, so ask the owner to paste the text.
2. Put each item where the Open items list says, replacing the yellow `.ph` placeholder.
3. Re-run `npm run lint && npm test && npm run e2e`. When `npm run build` stops listing pages, every placeholder is gone.
4. Re-run Lighthouse. SEO was 92 before the description and canonical URL fix, and it has not been re-measured.
5. Restore the README (see "Files"). Then, with the owner's OK, connect Vercel and deploy (steps are in the README).

**Code map:**
- `app/`: routes, metadata, OG images, sitemap and robots.
- `components/`: UI. `mdx/` holds the MDX components. `Text.tsx` holds the `[bracket]` placeholder helper.
- `content/work/*.mdx`: the case studies (frontmatter plus body).
- `lib/projects.ts`: content loader and validation.
- `lib/timeline-extra.ts`: timeline rows that have no case study.
- `lib/designs.ts`: Figma design pieces for the Design work section, plus `figmaEmbedUrl`.
- `scripts/check-placeholders.mjs`: the placeholder guard.
- `e2e/`: Playwright tests. Unit tests sit next to their code.


## Goal

A personal portfolio site for Thanapong Yamkamol (GitHub `thanapdev`), a student UX/UI designer who also codes.

- Uses: freelance work and UX/UI job applications. HR and clients must be able to read it.
- Pitch: "a designer who builds real things you can touch and play with."
- Mood: playful, with small interactions people want to try, but still clear and professional.
- Structure follows https://whyramachandran.design/ (hero, case-study cards, about + skills, timeline table, big contact). Do not copy that site's look.

## Status

| Stage | State |
|---|---|
| 1. Compare 3 directions (mockup) | Done. `mockup-directions.html` |
| 2. Full-page mockup of the chosen direction | Done, approved by the owner. `mockup-full.html` |
| 3. Spec for the real site (Next.js + Vercel) | Approved. `docs/superpowers/specs/2026-10-21-portfolio-site-design.md` |
| 4. Implementation plan | Written and executed. `docs/superpowers/plans/2026-10-21-portfolio-site.md` (8 tasks) |
| 5. Build | Done. Built, reviewed, merged into `main` and pushed (2026-10-21). |
| 6. Fill real content | In progress. About copy, education and profile photo are done. The rest is under Open items. |
| 7. Deploy (Vercel) | On hold until stage 6 is complete (owner's decision). |

## Decisions (with reasons)

- **Direction A chosen: "Sticker/Collage base + Toy UI parts".** Owner liked directions 2 and 3 and dropped 1 (Arcade/Gacha).
  - Base: paper background with dot grid, big Bricolage Grotesque heading, Caveat handwriting, taped cards, sticky notes.
  - From Toy UI: chunky 3D buttons (`box-shadow: 0 6px 0 ink`, press moves down), the Design/Code switch, the Wobble slider, and the "Don't press" confetti button.
  - The toy controls live in a draggable "control panel" sticker in the hero. It drags by its pink grip only, so its controls stay clickable.
- **Fonts:** Bricolage Grotesque (display), Space Grotesk (body), Caveat (handwriting), Fredoka (buttons), Noto Sans Thai (Thai fallback).
- **Colors:** paper `#f5efe2`, ink `#1d1a16`, red `#e8492f`, blue `#2f5be8`, yellow `#ffd84a`, green `#3fae6a`.
- **Red with white text uses `#c93a22`, not the mockup's `#e8492f`.** This applies to `.btn.red` and the HELLO sticker. White text needs 4.5:1 contrast; `#e8492f` gives 3.87:1.
- **Site copy is in English** because the readers are HR and clients.
- **Placeholder style:** missing data is shown with class `.ph` (yellow background, red dashed outline). It must be easy to see and replace.
- **Accessibility kept in the mockup and must carry into the real site:**
  - Stickers move with arrow keys.
  - The switch uses `role="switch"`.
  - Skill chips use `aria-pressed`.
  - `prefers-reduced-motion` turns animation off.
  - Touch targets are at least 44px.
  - The timeline table turns into a stacked list on mobile.
- **Yee-Peng-CNX role follows the repo README** (owner's decision, 2026-10-21): Experience Designer, covering UX/UI design and the cinematic look. Do not claim dev work on this project. Wiriya Thepbangchag is credited as Lead Developer.
- **Work cards stay as built (owner, 2026-10-22).** Compared in `mockup-work-styles.html`:
  - A: sticker cards with Ram-style fields (CASE STUDY 01, outcome subtitle, skill tags, stat notes).
  - B: a full editorial restyle.
  - The owner kept the current design. Do not restyle the cards or the site toward whyramachandran.design or gloriaha.com.
- **Section order (owner, 2026-10-23; Design added 2026-10-24):** Hero → Work → Design → Timeline → About → Contact. The timeline stays next to the project cards. The nav order matches.
- **Design work section (owner, 2026-10-24).** GitHub builds (Work) and Figma designs are separate groups.
  - Spec: `docs/superpowers/specs/2026-10-24-figma-design-work-design.md`. Approved look: `mockup-design-work.html`.
  - Each piece is a card with a black phone frame. Nothing from Figma loads until Play is clicked. Then the Figma embed shows inside the phone, and focus moves into it.
  - The embed is cropped to fill the phone: iframe 600×1300, screen at (73,158). If Figma changes its padding, re-measure these numbers in `components/DesignWork.module.css`.
  - First piece: RoomieMatch.
- **Cursor ring (owner, 2026-10-22).** Borrowed from whyramachandran.design (`components/CursorLabel.tsx`).
  - A small, quiet "scroll ✦ scroll ✦" ring in muted grey at 80% opacity spins slowly around the mouse.
  - It has no hover states (owner: no change on hover, not too eye-catching).
  - The native pointer stays visible.
  - Mouse only.
  - Under reduced motion it does not spin or trail.
- **Intro splash (owner, 2026-10-24).** `components/IntroSplash.tsx`.
  - Shows a HELLO THERE! sticker, the line "designing… then building…" and a filling bar, then slides up after about 1.3 seconds.
  - It shows once per browser session (session cookie `intro=1`). It never shows under reduced motion or without JavaScript.
  - Any key, click or tap skips it.
  - Playwright gives every test the `intro=1` cookie in `playwright.config.ts`. `e2e/intro.spec.ts` starts without it.
- **Real-site decisions (2026-10-21):** Next.js App Router, MDX content in the repo, CSS Modules (no Tailwind), English only, full case-study pages, static on Vercel. Details are in the spec.

## Data sources

- GitHub: https://github.com/thanapdev
- LinkedIn: https://www.linkedin.com/in/thanapong-yamkamol-6a1534431/
  - Automatic fetch is blocked (HTTP 999). Ask the owner, or have the owner paste the text.
- Portfolio repo: `git@github.com:thanapdev/Porfolio.git` (the name "Porfolio" is spelled that way on GitHub)

### Facts already used, all from GitHub

- **Name and city:** Thanapong Yamkamol. Lives in Bangkok, per the GitHub bio.
- **Education (owner, 2026-10-22):** now studies Computer Innovation for Communication, UX/UI design track, at COSCI, Srinakharinwirot University (Bangkok). Earlier studied Software Engineering at CAMT, Chiang Mai University (older repos). 3rd year (LinkedIn, 2026-10-22).
- **Yee-Peng-CNX (2026)**
  - Links: https://yee-peng-cnx.vercel.app and repo `thanapdev/Yee-Peng-CNX`.
  - The README lists Thanapong as "Experience Designer (UX/UI Design & Cinematic Aesthetic)" and Wiriya Thepbangchag as "Lead Developer".
  - Features: 3D flip-book history, virtual lantern / Phang Pratheep / krathong activities, TH/EN, Canvas effects.
- **The Reborn Gacha (2026)**
  - Links: https://the-reborn-gacha.vercel.app and repo `thanapdev/The_Reborn_Gacha`.
  - Solo project, built with Vite + TypeScript + Vitest.
  - Game content: 7 deaths, 13 roles plus 1 secret role, and a 1080×1920 share card.
- **Other repos in the timeline:** QueueApp (Swift, OOP term project, 2025) and TiguS (front-end final project, 2023).
- **Tools:** Figma, Photoshop, Canva, HTML/CSS/JS/TS, Vue, Tailwind, Node, Swift, Java. The owner is also a HoYoverse game player.

## Open items

Placeholders still on the real site. A production build (`VERCEL_ENV=production`) fails until they are gone. Search `className="ph"` and `[` bracket values in `content/work/*.mdx` frontmatter (`tldr.problem`, `tldr.result`, and any bracketed `metric`).

- [ ] The problem and result of each case study (frontmatter `tldr`, plus body sections).
- [ ] Real outcome numbers and the goal, research and caption sections in both MDX bodies.
- [ ] Real screenshots.
  - Covers: add `public/work/<slug>/cover.png`. The yellow "[real screenshot]" label disappears once the file exists.
  - BeforeAfter: replace `public/work/the-reborn-gacha/before.png` and `after.png`, then edit the caption in the MDX.
- [ ] Resume PDF. Add `public/resume.pdf`, then change the Resume button label in `components/Contact.tsx`.
- [ ] Role in QueueApp and in TiguS (`lib/timeline-extra.ts`).
- [ ] Research methods on the back of the "User Research" chip.
- [ ] RoomieMatch (`lib/designs.ts`): one-line description, year, and kind of work (class, personal or client). Add a cover at `public/design/roomiematch/cover.png`.
- [ ] Optional, from the Design work review: the double-play and mobile layout tests could be stricter; the "tap around →" arrow points right on mobile where the phone is below; `figmaEmbedUrl` assumes the Figma link already has a `?`.

Facts that need the owner's confirmation:

- [ ] **Public email.** `mailto:t.yamkamol.work@gmail.com` is in the Contact section. It was taken from the GitHub README. Confirm this is the email to show publicly.

Next steps:

- [ ] Fill the placeholders above. This is the next work session.
- [ ] From the 2026-10-24 review of the hero fix (optional): add an e2e test that the hero buttons stay above the fold at 1280×650, and change `vh` to `svh` in the short-window rule.
- [ ] Restore the README by removing the wrapping `<!--` and `-->` lines.
- [ ] Deploy once on Vercel, with the owner's OK. The steps are in the README:
  1. Import `thanapdev/Porfolio`.
  2. Keep the defaults.
  3. Set `NEXT_PUBLIC_SITE_URL` after the first deploy.
  - A production build fails while any `.ph` placeholder remains.

Lighthouse (local production build, 2026-10-21, before the SEO fix): desktop Performance 100, Accessibility 100, SEO 92; mobile Performance 91, Accessibility 100, SEO 92. The home description and canonical URLs were added afterwards; re-measure. axe reports no violations on the home page, either case study or the 404 page.

Known limits:

- On mobile, the stickers sit below the hero text and overlap each other until moved.

## Do not

- Do not copy the look of whyramachandran.design. Use only its section structure.
- Do not bring back the Arcade/Gacha direction as the base style. The owner rejected it.
- Do not claim facts that are not confirmed. Use a visible `.ph` placeholder and ask instead.
- Do not push, deploy, or create anything on GitHub or Vercel without the owner's OK.
- Do not delete `mockup-directions.html`. It is kept for reference.
- Do not add more interactions per section. Keep 1–2 so the page stays readable.

## Files

- `mockup-directions.html`: the 3-direction comparison (Arcade, Sticker, Toy).
- `mockup-design-work.html`: the approved mockup for the Design work section.
- `mockup-full.html`: the approved full-page mockup. The hero name comes from `const NAME` in its script.
- `report.md`: this file.
- `README.md`: dev commands, how to write a case study, and the Vercel deploy steps. **The whole file is currently wrapped in an HTML comment** (owner's request), so it shows blank on GitHub.
- `docs/superpowers/specs/` and `docs/superpowers/plans/`: the approved spec and the executed plan.
- Git: `main` tracks `origin` (`git@github.com:thanapdev/Porfolio.git`).

## Log

- 2026-10-21: Built the 3-direction mockup. The owner picked a mix of 2 and 3, then approved the full-page mockup. Filled in real data from GitHub. Created this report. Connected the folder to GitHub and pushed the first commit. Wrote the real-site spec (approved) and the implementation plan.
- 2026-10-21: Built the site on branch `feat/site` (8 tasks: scaffold, content, home, hero toys, case studies, SEO, placeholder guard + a11y/smoke tests, README deploy notes). Placeholders remain by design.
- 2026-10-21: Final whole-branch review passed after one fix round (SEO description + canonical URLs, placeholder guard now covers covers and timeline roles). Merged `feat/site` into `main` and pushed.
- 2026-10-21: Hid the README content (HTML comment). The owner chose Vercel, but will deploy only after all content is filled. Next session: fill the content.
- 2026-10-22: Nav logo now reads `thanapong`. Code mode keeps `<Thanapong />` on one line, with a smaller font. The Work eyebrow now reads `my projects`; the heading is unchanged and Work stays before About (owner agreed). About now names the owner's current school, COSCI SWU.
- 2026-10-22: Rewrote the About copy from the owner's LinkedIn About text (3rd year, research and Figma prototyping, looking for a UX/UI role in 2026). The freelance line is kept.
- 2026-10-22: The About story now covers where it started (making useful things, coding, then web dev) and the turn to UX/UI (talking to users, pride when people like what was built). The HoYoverse line was removed at the owner's request.
- 2026-10-22: Tightened the About copy from about 150 to about 105 words. Removed the repeated design-and-dev line, "the idea that gets tested is the one that ships" and "Let's talk."
- 2026-10-22: Added the profile photo (`public/profile.jpg`, a 900×900 square cropped from the original so the subject is centred).
- 2026-10-22 to 2026-10-23: Added the cursor ring (`components/CursorLabel.tsx`). Set the section order to Hero → Work → Timeline → About → Contact, and the nav matches.
- 2026-10-24: Fixed the hero buttons falling below the fold on short desktop windows. A rule in `components/Hero.module.css` for desktop heights of 820px or less sizes the name and role by height too and trims the spacing. Checked at 1437×655, 1280×600, 1440×900, 1920×1080 and 390×844. The hero and home e2e tests pass.
- 2026-10-24: Added the intro splash (`components/IntroSplash.tsx`) with e2e tests. Lint, typecheck, unit tests and all e2e tests pass. Pushed to `origin/main`.
- 2026-10-24: Fixed the Contact heading pushing the buttons below the fold on short desktop windows. `.big` in `components/Contact.module.css` now uses `min(12vw,16svh)`. Mobile was already fine. All e2e tests pass.
- 2026-10-24: Added the Design work section for Figma prototypes (RoomieMatch), with a Design nav link. Built on branch `feat/design-work` from the plan `docs/superpowers/plans/2026-10-24-figma-design-work.md`. A fresh review found one Important issue (focus lost after the phone Play button), which was fixed with a test. 55 e2e tests pass. Merged into `main` and pushed.
