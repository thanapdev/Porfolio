# Portfolio: project report

Read this file first when starting a new chat. Update it at the end of every work session.

Last updated: 2026-10-21

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
| 5. Build + deploy | Build done on branch `feat/site` (all 8 tasks), not merged, not deployed. Deploy steps are in `README.md`. |

## Decisions (with reasons)

- **Direction A chosen: "Sticker/Collage base + Toy UI parts".** Owner liked directions 2 and 3 and dropped 1 (Arcade/Gacha).
  - Base: paper background with dot grid, big Bricolage Grotesque heading, Caveat handwriting, taped cards, sticky notes.
  - From Toy UI: chunky 3D buttons (`box-shadow: 0 6px 0 ink`, press moves down), the Design/Code switch, the Wobble slider, and the "Don't press" confetti button.
  - The toy controls live in a draggable "control panel" sticker in the hero. It drags by its pink grip only, so its controls stay clickable.
- **Fonts:** Bricolage Grotesque (display), Space Grotesk (body), Caveat (handwriting), Fredoka (buttons), Noto Sans Thai (Thai fallback).
- **Colors:** paper `#f5efe2`, ink `#1d1a16`, red `#e8492f`, blue `#2f5be8`, yellow `#ffd84a`, green `#3fae6a`.
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
- **Real-site decisions (2026-10-21):** Next.js App Router, MDX content in the repo, CSS Modules (no Tailwind), English only, full case-study pages, static on Vercel. Details are in the spec.

## Data sources

- GitHub: https://github.com/thanapdev
- LinkedIn: https://www.linkedin.com/in/thanapong-yamkamol-6a1534431/
  - Automatic fetch is blocked (HTTP 999). Ask the owner, or have the owner paste the text.
- Portfolio repo: `git@github.com:thanapdev/Porfolio.git` (the name "Porfolio" is spelled that way on GitHub)

### Facts already used, all from GitHub

- **Name and city:** Thanapong Yamkamol. Lives in Bangkok, per the GitHub bio.
- **Education:** Software Engineering at CAMT, Chiang Mai University, inferred from repo names. Year and status are not confirmed.
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

- [ ] Year of study or current status (`components/About.tsx`).
- [ ] Profile photo (`components/About.tsx`, add `/profile.jpg`).
- [ ] The problem and result of each case study (frontmatter `tldr`, plus body sections).
- [ ] Real outcome numbers and the goal, research and caption sections in both MDX bodies.
- [ ] Real screenshots (covers and BeforeAfter images).
- [ ] Resume PDF (`/resume.pdf`; the Contact button is still a placeholder).
- [ ] Role in QueueApp and in TiguS (`lib/timeline-extra.ts`).
- [ ] Research methods on the back of the "User Research" chip.

Facts that need the owner's confirmation:

- [ ] **Public email.** `mailto:t.yamkamol.work@gmail.com` is in the Contact section. It was taken from the GitHub README. Confirm this is the email to show publicly.

Next steps:

- [ ] Owner reviews branch `feat/site` and merges it.
- [ ] Fill the placeholders above, then deploy on Vercel (see `README.md`). Set `NEXT_PUBLIC_SITE_URL` after the first deploy.

Lighthouse (local production build, 2026-10-21): desktop Performance 100, Accessibility 100, SEO 92; mobile Performance 91, Accessibility 100, SEO 92. axe reports no violations on the home page and a case study.

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
- `mockup-full.html`: the approved full-page mockup. The hero name comes from `const NAME` in its script.
- `report.md`: this file.
- Git: `main` tracks `origin` (`git@github.com:thanapdev/Porfolio.git`). The README.md already on the remote is kept.

## Log

- 2026-10-21: Built the 3-direction mockup. The owner picked a mix of 2 and 3, then approved the full-page mockup. Filled in real data from GitHub. Created this report. Connected the folder to GitHub and pushed the first commit. Wrote the real-site spec (approved) and the implementation plan.
- 2026-10-21: Built the site on branch `feat/site` (8 tasks: scaffold, content, home, hero toys, case studies, SEO, placeholder guard + a11y/smoke tests, README deploy notes). Not merged, not deployed. Placeholders remain by design.
