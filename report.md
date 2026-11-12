# Portfolio: project report

Read this file first when starting a new chat. Update it at the end of every work session.

Last updated: 2026-11-12

## Resume here (next session)

**Last session (2026-11-12):** everything is committed and pushed. Case study pages now show user flows in a full-screen zoom viewer pulled straight from Figma (`scripts/figma-zoom.mjs`, token in `~/.figma_token`), AccessCampus has screens and wireframes, the Projects section is "Side Projects" with "Behind the build" pages that tell the inspiration, and The Reborn Gacha page is rewritten with its real first design. Still waiting on the owner: Yee-Peng-CNX's story, the RoomieMatch wireframe frame link, and whether the nav should say "Side Projects". See Open items.

**Where things stand:**
- The site is built, reviewed and merged into `main`. Everything up to 2026-11-12 is in `main` and pushed. Run `git log --oneline -5` for the latest commits.
- Nothing is deployed yet.

**Deploy decision (owner, 2026-10-21):**
- Platform: Vercel.
- Deploy only once, after all the content is filled in. Do not deploy, and do not connect Vercel, before that.

**To see the site locally:**
- Development: `npm run dev`, then open http://localhost:3000.
- Production preview: `npm run build && npx next start -p 3001`.
- `npm run build` prints a placeholder warning. That is expected until the content is complete.

**Next work, in order:**
1. Ask the owner for the missing content listed under "Open items". LinkedIn cannot be fetched automatically, so ask the owner to paste the text.
2. Put each item where the Open items list says, replacing the yellow `.ph` placeholder.
3. Re-run `npm run lint && npm test && npm run e2e`. When `npm run build` stops listing pages, every placeholder is gone.
4. Re-run Lighthouse. SEO was 92 before the description and canonical URL fix, and it has not been re-measured.
5. Restore the README (see "Files"). Then, with the owner's OK, connect Vercel and deploy (steps are in the README).

**Code map:**
- `app/`: routes, metadata, OG images, sitemap and robots.
- `components/`: UI. `mdx/` holds the MDX components. `Text.tsx` holds the `[bracket]` placeholder helper.
- `content/work/*.mdx`: the project write-ups behind `/work/[slug]` (frontmatter plus body).
- `content/case-studies/*.mdx`: the UX case studies behind `/case-study/[slug]`, one per entry in `lib/designs.ts` (body only, no frontmatter).
- `components/FigmaPhone.tsx`: the black phone with Play, shared by the home cards and the case study pages. `components/mdx/` also holds `Persona`, `Journey`, `Grid`, `Screens`, `Prototype`, `ZoomBoard` (preview image that opens a full-screen pan and zoom viewer) for the case studies.
- `lib/projects.ts`: content loader and validation.
- `lib/timeline-extra.ts`: timeline rows built from `lib/designs.ts` (Prototype link and UX case study link).
- `components/Reveal.tsx`: plays the scroll-in animations once (marks `[data-reveal]` elements with `data-shown`; CSS in `app/globals.css`).
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
- **Section order (owner, 2026-10-23; Design added 2026-10-24; Case Studies moved first 2026-11-08):** Hero → Case Studies (`#design`) → Projects (`#work`) → Timeline → About → Contact. The nav order matches: logo "THANAPONG", then Case Studies, Projects, Timeline, About, Contact. The hero "See my work" button jumps to `#design`, the first section.
- **Design work section (owner, 2026-10-24).** GitHub builds (Work) and Figma designs are separate groups. Heading changed to "Case Studies" (eyebrow "made in figma") on 2026-11-04, because every piece will have a case study.
  - Spec: `docs/superpowers/specs/2026-10-24-figma-design-work-design.md`. Approved look: `mockup-design-work.html`.
  - Each piece is a card with a black phone frame. Nothing from Figma loads until Play is clicked. Then the Figma embed shows inside the phone, and focus moves into it.
  - The embed is cropped to fill the phone: iframe 600×1300, screen at (73,158). If Figma changes its padding, re-measure these numbers in `components/DesignWork.module.css`.
  - Pieces: RoomieMatch, then AccessCampus (added 2026-10-28). The section is a carousel.
  - Buttons (owner, 2026-10-28): the blue "▶ Play prototype ↗" opens the Figma prototype in a new tab; the phone's "▶ Play" plays it inline. "UX case study" opens the piece's page on this site, in the same tab (2026-11-10). "Open in Figma ↗" was removed on 2026-11-04 (owner).
  - AccessCampus prototype must start at the profile setup screen (owner): node `31-55`, the prototype's default flow start. The link on the owner's Canva board starts at `31-163` (home), so do not copy it from there.
- **Case study pages (owner, 2026-11-10).** `/case-study/roomiematch` and `/case-study/accesscampus`, kept apart from `/work/[slug]` so they do not appear in the Projects carousel and do not need a metric. Sources: Canva boards `DAHZQvIVm9s` (RoomieMatch) and `DAHZEDMP_2w` (AccessCampus), and the RoomieMatch deck `DAHZQsidC-s`.
  - Copy is in English. Persona names and ages are left out so the people interviewed cannot be identified. The fake team list on the AccessCampus board is template text and is not used.
  - Research is real. AccessCampus: the owner interviewed users alone. RoomieMatch: the teammate did the interviews, published research and journey map; the owner did the problem and audience work, wireframes and about 70% of the Figma UI; features were shared. Keep this split accurate.
  - The "What's next" section was removed (owner). The pages no longer say that usability testing has not happened, but do not claim test results: none exist.
  - Page end: "▶ Play prototype ↗" and "Back to home" (goes to `/#design`), then a full-width blue band linking to the next case study, with a back-to-top arrow.
  - RoomieMatch user flow and wireframes use `ZoomBoard` (2026-11-11): an inline preview that opens full screen, with drag, wheel and pinch zoom, +/−, Fit, keyboard (+, −, 0, arrows) and Esc, locked to the image. The inline preview and the viewer both open zoomed on the start of the flow (`start` prop, in full-size px: sign-up at x 223, y 402, 3573 wide; owner, 2026-11-11); Fit shows the whole map. Files: `public/design/roomiematch/user-flow/` (base.png 4000px, preview.png of the start area, and 196 full-size 1024px tiles, about 12 MB), pulled from Figma (node `370-1588`). The viewer loads only the tiles in view, and only once base.png is too coarse. A single big image was tried first and looked broken when zoomed (6000px for a 13400px frame); do not go back to that. Max zoom is 1:1 with the Figma frame. The owner chose this because zooming inside the Figma embed was hard to use. Figma frame for reference: node `370-1588`, on its own page. A prototype embed of the old node showed only a grey screen ("0 / 1"), so do not use one.
  - AccessCampus has the same viewer for its user flow (node `77-100`, 7860×14052, starts at "1 · Onboarding") and shows its wireframes as one plain image of every screen, no zoom (owner, 2026-11-11; `public/design/accesscampus/wireframes.png`, 2000px, pulled from Figma node `39-2003`), then three screens: needs setup, route results and the broken-lift reroute.
  - **Everything comes from Figma (owner, 2026-11-11).** `node scripts/figma-zoom.mjs <frame link> <out dir> <startX> <startY> <startW>` asks the Figma API for the frame as a vector PDF, then runs `scripts/zoom-tiles.swift` to make base.png, preview.png and tiles. It reads a personal access token from `~/.figma_token` (outside the repo, read-only file content scope, short expiry). The token is only needed to pull again after a Figma edit; the site never calls Figma. If it has expired, ask the owner for a new one with `pbpaste > ~/.figma_token && chmod 600 ~/.figma_token`. Live Figma design embeds (`FigmaBoard`) were removed: zooming in them was hard to use.
- **Phone frame is straight (owner, 2026-11-10; confirmed 2026-11-11).** The 1.5° tilt was removed, and the cover image is requested at `sizes="440px"`, because the cover looked blurry on the owner's 1x external monitor (1920×1080). The owner confirmed it is now sharp.
- **RoomieMatch typos stay (owner, 2026-11-11).** The design will not be edited again, so "Looking of Room mate", "Emma want to Making Contact With you" and "Find your room mate" remain in the screens and the prototype.
- **Cursor ring (owner, 2026-10-22).** Borrowed from whyramachandran.design (`components/CursorLabel.tsx`).
  - A small, quiet "scroll ✦ scroll ✦" ring in muted grey at 80% opacity spins slowly around the mouse.
  - It has no hover states (owner: no change on hover, not too eye-catching).
  - The native pointer stays visible.
  - Mouse only.
  - Under reduced motion it does not spin or trail.
- **Work cover screenshots (owner, 2026-11-04).** The cover frame stays 4:3. A wider frame matching 2880×1316 screenshots was tried and rolled back (owner: it looked ugly). Ask for screenshots at 4:3: Chrome DevTools device toolbar, Responsive 1200×900 (or 1024×768), "Capture screenshot". Trim any dark window edge before use.
- **Carousel for Work and Design work (owner, 2026-10-24).** `components/Carousel.tsx` wraps both sections so the page stays short.
  - One card at a time, with ←/→ buttons, dots, a ⏸ button, and swipe on phones (CSS scroll-snap).
  - It auto-advances every 6 seconds and loops. The owner asked for 3 seconds, then chose 6 so HR can read a card.
  - It starts only when the section is in view. It stops on hover, while focus is inside, when paused, and under reduced motion.
  - With one card (Design work today) there are no controls and no auto-advance.
- **Intro splash (owner, 2026-10-24).** `components/IntroSplash.tsx`.
  - Shows a HELLO THERE! sticker, the line "designing… then building…" and a filling bar, then slides up after about 1.3 seconds.
  - It shows once per browser session (session cookie `intro=1`). It never shows under reduced motion or without JavaScript.
  - Any key, click or tap skips it.
  - Playwright gives every test the `intro=1` cookie in `playwright.config.ts`. `e2e/intro.spec.ts` starts without it.
- **Scroll animations (owner, 2026-11-08).** Kept: cards rise in and their tape sticks on; timeline rows stagger in. Rejected by the owner: a handwriting reveal on eyebrows and a count-up on card metrics. Each plays once. Nothing is hidden without JavaScript or under reduced motion. Hide with `opacity`, not `clip-path`: IntersectionObserver never reports a fully clipped element as visible.
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
- **Timeline (owner, 2026-11-04):** newest first: AccessCampus (2026), The Reborn Gacha (2026), Yee-Peng-CNX (2026), RoomieMatch (2024–2025). QueueApp and TiguS were removed (owner: not used). Within a year, Figma designs sort above case studies; The Reborn Gacha is above Yee-Peng-CNX via frontmatter `order` (Reborn 1, Yee-Peng 2), which also puts it first in the Work carousel. Design roles "UX/UI Designer" (RoomieMatch adds "team of 2") were written by Claude from the Canva boards; confirm if the owner wants different wording.
- **Tools:** Figma, Photoshop, Canva, HTML/CSS/JS/TS, Vue, Tailwind, Node, Swift, Java. The owner is also a HoYoverse game player.

## Open items

Placeholders still on the real site. A production build (`VERCEL_ENV=production`) fails until they are gone. Search `className="ph"` and `[` bracket values in `content/work/*.mdx` frontmatter (`tldr.problem`, `tldr.result`, and any bracketed `metric`).

- [ ] Yee-Peng-CNX "Behind the build" page: needs the owner's inspiration and the feeling they want visitors to get (frontmatter `tldr.inspiration` and `tldr.feel`, plus body sections like The Reborn Gacha's).
- [ ] Real outcome numbers and the goal, research and caption sections in both MDX bodies.
- [ ] Real screenshots.
  - Covers: done for both case studies (2026-11-04).
  - BeforeAfter: done for The Reborn Gacha (2026-11-12): start screens of the first design (commit `b2e5255` of `thanapdev/The_Reborn_Gacha`, navy and gold night theme) and the current one (bold blue and lime), screenshotted at 1200×900 from each version run locally. The caption says what changed; the owner has not said why, so add the reason if they give one.
- [ ] Resume PDF. Add `public/resume.pdf`, then change the Resume button label in `components/Contact.tsx`.
- [ ] Research methods on the back of the "User Research" chip.
- [ ] Flaky e2e under full-suite load (2026-10-28): `[mobile] carousel.spec.ts › auto-advances every 6 seconds` sometimes sees `data-autoplay="false"` for 5 s (about 2 of 9 full runs after the hover/focus split, 0 of 4 before; passes 15/15 alone; could not reproduce in 10 instrumented runs). Not yet known whether the split caused it. `intro.spec.ts › any key skips the intro` also still flakes under load. Next step: rerun with state logged (`paused/hovered/focused/inView`) until it fails.
- [ ] From the 2026-11-10 case study pages, waiting on the owner:
  - RoomieMatch wireframes: the owner wants a separate Wireframes section like AccessCampus. Needs the Figma link to that frame; then run `scripts/figma-zoom.mjs` into `public/design/roomiematch/wireframes`, and split the RoomieMatch heading into User flow and Wireframes.
- [ ] Optional: the case study pages use the site-wide OG image, not one per page.
- [ ] Optional: roles on the design cards. The RoomieMatch role split is now on its case study page, but the home card does not show it.
- [ ] Optional, from the Design work review: the double-play and mobile layout tests could be stricter; the "tap around →" arrow points right on mobile where the phone is below; `figmaEmbedUrl` assumes the Figma link already has a `?`.

Facts that need the owner's confirmation:

- [x] **Public email.** Confirmed by the owner (2026-11-08): "Email me" opens `mailto:t.yamkamol.work@gmail.com`. An e2e test guards it.

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
- 2026-10-24: Turned Work and Design work into carousels (`components/Carousel.tsx`, `e2e/carousel.spec.ts`). Fixed a quick double-click on → landing on the wrong card, and a horizontal scroll on phones. 66 e2e tests pass on two full runs. One earlier full run had a single `intro.spec.ts` failure that did not come back; it may be flaky under load. Not reviewed by a separate reviewer. Pushed to `origin/main`.
- 2026-10-25: Fixed the large empty gap under the nav after "See my work" or a nav link. `section[id]{scroll-margin-top:-64px}` in `app/globals.css` lifts the jump target past most of the 96px section padding, leaving about 36px under the nav on desktop and mobile. Contact, the last section, keeps a bigger gap because the page cannot scroll further. Smoke, home and carousel e2e tests pass (29 passed, 3 skipped).
- 2026-10-25: The owner paused the project. The report is up to date and everything is pushed. Next session: fill the placeholders under "Open items".
- 2026-10-28: Added AccessCampus as the second Design piece (`lib/designs.ts`): prototype from node `31-55` (profile setup), the owner's Figma design link as "Open in Figma", and the Canva UX case study board (`canva.link/e0inqgga5kdhpws`) as a new "UX case study" button. Blurb written from the Concept text on that board; kind "Self-learning project" (owner); year 2026 from the Canva file date. Covers added for both designs (resized to 660px wide).
- 2026-10-28: The blue "Play prototype" button is now a link that opens the prototype in Figma (owner asked). RoomieMatch lost its "Open in Figma" button because it pointed at the same link.
- 2026-10-28: Fixed the carousel auto-advancing while the mouse was on it. Hover and focus shared one flag, so a blur (e.g. clicking plain text after a control) cleared the hover pause. They are now separate states in `components/Carousel.tsx`. New e2e test `stays paused while hovered after focus leaves a control` fails 4/4 on the old code and passes on the fix; it uses the real clock because the fake clock hides the bug. Removed the "single card gets no controls" test, since no carousel has one card now (the code path remains, untested). 67 e2e tests pass.
- 2026-11-04: Completed both Design cards. RoomieMatch: "Personal self-learning project · team of 2 · 2024–2025", blurb from the owner, Canva case study `canva.link/ag8ocmj1n9o4ffd`. AccessCampus: title stays "AccessCampus" (owner), new cover with that name. Removed "Open in Figma" from both cards. Section heading is now "Case Studies".
- 2026-11-04: Real covers for both Work cards (`public/work/*/cover.png`, 4:3 screenshots from the owner, 4px dark edge trimmed) and real `coverAlt` text. No "[real screenshot]" placeholders remain. A wider cover frame was tried and rolled back. Lint, typecheck and e2e pass.
- 2026-11-04: Timeline now shows all four projects, newest first. Removed QueueApp and TiguS. Added RoomieMatch and AccessCampus from `lib/designs.ts`, with "Prototype ↗ / UX case study ↗" links (rows now hold a list of links). Swapped case study `order` so The Reborn Gacha is above Yee-Peng-CNX.
- 2026-11-04: Nav: logo "THANAPONG"; Work → Projects; Design → Case Studies. Lint, typecheck, 13 unit tests and 67 e2e tests pass (one run had a known flake, rerun clean).
- 2026-11-08: Added scroll-in animations (`components/Reveal.tsx`): cards rise and their tape sticks on; timeline rows stagger in. Eyebrow handwriting and metric count-up were tried and dropped (owner). The owner confirmed the public email; new e2e test checks the "Email me" link. New AccessCampus cover from the owner (resized to 660px wide), and the title is now spelled "AccessCampus" to match it. Lint, typecheck, 13 unit tests and 73 e2e tests pass.
- 2026-11-08: Removed "Looking for a UX/UI design role in 2026, and open to freelance projects now." from About (owner). The site no longer states availability anywhere; Contact could hold a shorter version if the owner wants it back. Home and smoke e2e pass.
- 2026-11-08: Moved Case Studies above Projects (owner), in the page and the nav. "See my work" now jumps to Case Studies. Lint, typecheck and 73 e2e tests pass.
- 2026-11-10: Added on-site case study pages for RoomieMatch and AccessCampus, replacing the Canva links on the cards and timeline (`caseStudy` removed from `lib/designs.ts`). Content translated from the Canva boards and the RoomieMatch deck. RoomieMatch also gets the full Journey Map, three prototype screens and a live Figma embed of the user flow and wireframes. Removed "What's next". Next case study is now a full-width band. Phone frame straightened and its cover sharpened for 1x screens. Lint, typecheck, 13 unit tests and 79 e2e tests pass; `intro.spec.ts › any key skips the intro` flaked in some full runs and passed on rerun. The Figma embeds could not be checked by automation (Figma returns 403 to headless browsers); the owner confirmed the design embed renders in a real browser.
- 2026-11-11: The owner confirmed the straight phone is sharp, and chose to keep the RoomieMatch typos. RoomieMatch's Figma embed now points at the frame the owner moved to its own page (`370-1588`). AccessCampus gained a live Figma embed of its user flow (`77-100`) and three screens from the owner (needs setup, route results, broken-lift reroute). AccessCampus also embeds its wireframes. RoomieMatch's user flow moved from the Figma embed to a new full-screen zoom viewer (`ZoomBoard`), because zooming inside the embed was hard. Lint, typecheck and 81 e2e tests pass. AccessCampus user flow now uses the zoom viewer too (its wireframes stay one plain image, owner's call), and all three boards are pulled straight from Figma with `scripts/figma-zoom.mjs`; the Figma embed component was removed. Lint, typecheck and 81 e2e tests pass.
- 2026-11-12: Projects section renamed to read as side projects (owner): eyebrow "creative experience", heading "Side Projects" (was "my projects" / "Things I made (and you can click)"). The nav link still says "Projects". The blue card button is now "Behind the build →" (was "View Case Study →"), so it does not clash with the Case Studies section.
- 2026-11-12: "Behind the build" pages now tell the inspiration and the feeling, not a case study (owner). The sticky notes are Inspired by / What I made / What I want you to feel (frontmatter `tldr` keys `inspiration`, `made`, `feel`). The Reborn Gacha body rewritten from the owner's words: the thrill of a gacha pull plus games with choice-based endings; meant to be funny, with suspense while the result rolls in. Sections: Where it came from, What I wanted you to feel, How it plays, My role, Design. Yee-Peng-CNX waits for the owner's story. Lint, typecheck, 13 unit tests and 80 of 81 e2e pass; `intro.spec.ts` flaked once and passed on rerun.
- 2026-11-12: The Reborn Gacha Design section now compares the real first design (from the repo history, commit `b2e5255`) with the current one; the owner had not kept it. Caption describes the change only.
