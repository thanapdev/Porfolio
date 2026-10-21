<!--
# Porfolio
My Portfolio

Personal portfolio for Thanapong Yamkamol: Next.js (App Router), MDX case studies, CSS Modules, static output for Vercel.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run lint` | ESLint. |
| `npm test` | Unit tests (Vitest, includes `scripts/**/*.test.mjs`) |
| `npm run e2e` | Playwright smoke, a11y and journey tests (mobile 390×844 and desktop 1280×800). Builds and starts the site first. |
| `npm run build` | Production build. The `postbuild` step lists pages that still contain placeholders. |

## Write a case study

Add `content/work/<slug>.mdx`. It starts with this frontmatter. A missing or wrongly typed field stops the build and names the file and field.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `year` | number | yes | |
| `role` | string | yes | |
| `team` | string | yes | For example "team of 2" or "solo". |
| `tags` | string[] | yes | 1–3 short uppercase tags. |
| `summary` | string | yes | Card blurb, at most 2 sentences. |
| `tldr` | `{problem, did, result}` | yes | Shown as 3 sticky notes. |
| `metric` | `{value, label}` | yes | Shown on the home card. |
| `cover`, `coverAlt` | string | yes | Build fails if `coverAlt` is missing. |
| `live`, `repo` | URL | no | A button shows only when the URL is present. |
| `order` | number | yes | Sort order on the home page. |

Covers: put the image at the path in `cover` (under `public/`). While that file is missing the card and case study show a yellow `[real screenshot]` label.

Profile photo: it must be exactly `public/profile.jpg`. Resume: after adding `public/resume.pdf`, edit the Resume label in `components/Contact.tsx` (it is still a placeholder).

Reading time is computed from the word count. Do not write it by hand.

A frontmatter string wholly wrapped in square brackets, such as `"[result to be confirmed]"`, renders as a visible yellow placeholder. In the MDX body, use `<span className="ph">[text]</span>`.

MDX components available in the body:

- `<StickyNote>`: a sticky note around its children.
- `<Polaroid src alt caption?>`: a framed image with an optional caption.
- `<BeforeAfter before after alt>`: an image slider, keyboard accessible.
- `<Callout>`: a highlighted aside.

## Deploy on Vercel

1. Import `thanapdev/Porfolio` in Vercel.
2. Keep the default framework (Next.js) and build settings.
3. After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the live URL and redeploy (used for the sitemap, robots and OG images).
4. A production build fails while placeholders remain (`scripts/check-placeholders.mjs` runs after `next build` and exits 1 when `VERCEL_ENV=production`). Preview and local builds only warn.
-->
