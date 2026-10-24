# Design Work Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Design work" home section that shows Figma prototypes (first: RoomieMatch) in a phone frame, loaded only when the visitor clicks Play.

**Architecture:** Plain data array in `lib/designs.ts`. Server component `DesignWork` renders the section and checks cover files. Client component `FigmaCard` renders one card (text, buttons, phone) and swaps the cover for a cropped, scaled Figma iframe on click. The visual reference is `mockup-design-work.html`; copy its CSS values.

**Tech Stack:** Next.js App Router, React, CSS Modules, Playwright e2e.

**Spec:** `docs/superpowers/specs/2026-10-24-figma-design-work-design.md`

## Global Constraints

- Section `id="design"`, between Work and Timeline. Eyebrow `made in figma`. Heading `Designs you<br />can tap through`, class `h2 disp`.
- Nav order: Work, Design, Timeline, About, Contact. Design link href `/#design`.
- Nothing from Figma loads before Play is clicked.
- Embed src: proto URL with host `embed.figma.com` plus `&embed-host=portfolio&hide-ui=1&theme=light&bg-color=f5efe2&device-frame=0&scaling=contain`.
- Crop: iframe 600×1300, `transform-origin:0 0; transform:scale(calc(220/453)) translate(-73px,-158px)`, with a `shortcut:` comment (measured 2026-10-24; re-measure if Figma changes its padding).
- Phone: `box-sizing:content-box; width:220px; aspect-ratio:453/982; border:10px solid var(--ink); border-radius:36px; overflow:hidden; transform:rotate(1.5deg)`.
- Unknown text stays as `[bracket]` placeholders rendered through `components/Text.tsx`.
- Buttons use the site's `.btn` classes; touch targets at least 44px.

## Review Focus

- Keyboard user tabs to "Play prototype" and presses Enter: the iframe loads (covered in Task 1 test).
- Clicking Play twice (card button, then phone button) must not stack two iframes (covered in Task 1 test).
- Phone width 390px: card is one column and the phone does not overflow the card (covered in Task 1 test).
- Missing cover file: phone shows the `[real screenshot]` placeholder, no broken image (covered by existing placeholder pattern; asserted in Task 1).
- Screen reader: the iframe has a title naming the prototype (covered in Task 1 test).

---

### Task 1: Design work section with click-to-load Figma embed

**Files:**
- Create: `lib/designs.ts`, `components/DesignWork.tsx`, `components/FigmaCard.tsx`, `components/DesignWork.module.css`
- Modify: `app/page.tsx` (insert `<DesignWork />` after the `#work` section)
- Test: `e2e/design.spec.ts`

**Interfaces:**
- Produces: `export type Design = { slug: string; title: string; figma: string; tags: string[]; blurb: string; year: string; kind: string }` and `export const designs: Design[]` in `lib/designs.ts`.
- Produces: `export const figmaEmbedUrl = (proto: string): string` in `lib/designs.ts` (swaps host, appends the Global Constraints params).
- Produces: default export `DesignWork()` (server; passes `cover = hasCover(`/design/${slug}/cover.png`)`) and default export `FigmaCard({ design, cover }: { design: Design; cover: boolean })` (client, one `useState<boolean>` for playing). Both Play buttons set playing to true. With `cover`, the phone shows the image via `next/image`; without it, the `.ph` label `[real screenshot]`.

RoomieMatch entry: slug `roomiematch`, title `RoomieMatch`, figma `https://www.figma.com/proto/XflnePuAHp00z4TEDtzwJx/RoomieMatch?node-id=25-4479&starting-point-node-id=25%3A4479`, tags `['UX/UI', 'Mobile app', 'Figma prototype']`, blurb `[one line: what the app does and who it is for]`, year `[year?]`, kind `[class / personal / client?]`.

- [ ] **Step 1: Write the failing tests in `e2e/design.spec.ts`**

```ts
test('design section shows RoomieMatch without loading Figma', async ({ page }) => {
  await page.goto('/');
  const s = page.locator('#design');
  await expect(s.getByRole('heading', { name: 'RoomieMatch' })).toBeVisible();
  await expect(s.locator('iframe')).toHaveCount(0);
  await expect(s.locator('.ph', { hasText: '[real screenshot]' })).toHaveCount(1);
  await expect(s.getByRole('link', { name: /Open in Figma/ })).toHaveAttribute('target', '_blank');
});

test('Play loads one titled Figma iframe, also from the keyboard', async ({ page }) => {
  await page.goto('/');
  const s = page.locator('#design');
  await s.getByRole('button', { name: /Play prototype/ }).focus();
  await page.keyboard.press('Enter');
  const frame = s.locator('iframe');
  await expect(frame).toHaveCount(1);
  await expect(frame).toHaveAttribute('src', /^https:\/\/embed\.figma\.com\/proto\/XflnePuAHp00z4TEDtzwJx\/.*device-frame=0/);
  await expect(frame).toHaveAttribute('title', 'RoomieMatch prototype (Figma)');
  await s.getByRole('button', { name: /Play prototype/ }).click();
  await expect(frame).toHaveCount(1);
});

test('phone fits inside the card on mobile', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile layout');
  await page.goto('/');
  const card = await page.locator('#design article').boundingBox();
  const phone = await page.getByTestId('phone').boundingBox();
  expect(phone!.x + phone!.width).toBeLessThanOrEqual(card!.x + card!.width);
});
```

Note: the phone-centre "▶ Play" button disappears once playing; the second click uses the card button, which stays.

- [ ] **Step 2: Run and confirm failure**

Run: `npx playwright test e2e/design.spec.ts`
Expected: FAIL (no `#design`).

- [ ] **Step 3: Implement the four files and insert `<DesignWork />` in `app/page.tsx`**

Copy layout and CSS values from `mockup-design-work.html` (card, chips, phone, iframe crop, mobile rule at `max-width:760px`). Phone element gets `data-testid="phone"`. iframe: `title={`${title} prototype (Figma)`}`, `allowFullScreen`. Meta line: `<Text value={kind} /> · <Text value={year} />`. Hint line: `psst… it really works, tap around →` in class `hand`.

- [ ] **Step 4: Run tests**

Run: `npx playwright test e2e/design.spec.ts && npm run lint && npx tsc --noEmit`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add lib/designs.ts components/DesignWork.tsx components/FigmaCard.tsx components/DesignWork.module.css app/page.tsx e2e/design.spec.ts
git commit -m "feat: add Figma design work section"
```

### Task 2: Nav link

**Files:**
- Modify: `components/Nav.tsx:6-11`
- Test: `e2e/design.spec.ts`

**Interfaces:**
- Consumes: section `id="design"` from Task 1.

- [ ] **Step 1: Add the failing test**

```ts
test('nav links to the design section in order', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'mobile nav is a menu');
  await page.goto('/');
  const labels = await page.locator('nav li a').allInnerTexts();
  expect(labels).toEqual(['Work', 'Design', 'Timeline', 'About', 'Contact']);
  await expect(page.getByRole('link', { name: 'Design' })).toHaveAttribute('href', '/#design');
});
```

- [ ] **Step 2: Run, expect FAIL** — `npx playwright test e2e/design.spec.ts -g "nav links"`

- [ ] **Step 3: Insert `['Design', '/#design']` after Work in `links`**

- [ ] **Step 4: Run the full suite** — `npx playwright test && npm test && npm run lint`. Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add components/Nav.tsx e2e/design.spec.ts
git commit -m "feat: add Design link to nav"
```
