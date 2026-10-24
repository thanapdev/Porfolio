# Design work section (Figma prototypes)

Date: 2026-10-24. Status: approved. Look approved from `mockup-design-work.html` (2026-10-24).

## Goal

Show the owner's Figma design work on the home page as its own group, separate from the GitHub builds in Work. Visitors (HR, clients) can play a real Figma prototype on the page, which fits the pitch "designs you can touch".

## What the owner said

- GitHub builds and Figma designs are two separate groups. Figma work does not go inside the existing Work cards or case studies.
- Use option B: embed the Figma prototype so people can play it.
- Placement: a new home section right after Work.
- First piece: RoomieMatch, `https://www.figma.com/proto/XflnePuAHp00z4TEDtzwJx/RoomieMatch?node-id=25-4479&starting-point-node-id=25%3A4479`.

## Assumptions (owner can correct)

- Description, year and kind of work (class, personal, client) are unknown. They show as `[bracket]` placeholders until the owner gives them.
- RoomieMatch does not go into the Timeline. That can be added later on request.

## Design

### Page and nav

- New section `id="design"` between Work and Timeline, in `app/page.tsx`.
- Eyebrow `made in figma`, heading "Designs you can tap through" in the same `h2 disp` style as Work.
- `components/Nav.tsx` gets a "Design" link between Work and Timeline. Order becomes Work, Design, Timeline, About, Contact.

### Card

- Sticker card in the site's existing style (border, shadow, tape), one per piece. Grid holds more later.
- Shows: cover, title, one-line description, year, and two buttons:
  - **▶ Play prototype**: loads the embed in place of the cover.
  - **Open in Figma ↗**: the original `figma.com/proto` link, new tab, `rel="noopener"`. This is the main path on phones, where the small frame is hard to use.
- Layout: text on the left (chips `UX/UI`, `Mobile app`, `Figma prototype`; title; meta; blurb; buttons; hint "psst… it really works, tap around →"), phone on the right. One column on mobile, phone centred.
- Phone: black frame, 10px border, 36px radius, screen 220px wide at the prototype's screen ratio 453:982 (393×852), tilted 1.5deg. A second "▶ Play" button sits in the middle of the phone.
- Cover inside the phone: `public/design/<slug>/cover.png`. Without the file, the phone shows the yellow `[real screenshot]` label, using `hasCover` from `lib/cover.ts` like `ProjectCard`.

### Embed (click to load)

- Nothing from Figma loads until the visitor clicks Play, so page weight and Lighthouse stay as they are.
- On click, an `<iframe>` replaces the cover. `src` is the proto URL with the host swapped to `embed.figma.com`, plus `embed-host=portfolio&hide-ui=1&theme=light&bg-color=f5efe2&device-frame=0&scaling=contain`.
- Figma always pads the screen inside the embed. To fill the phone: the iframe is fixed at 600×1300, where Figma draws the 453×982 screen at (73,158). CSS crops to that rectangle and scales it to 220px wide: `transform-origin:0 0; transform:scale(calc(220/453)) translate(-73px,-158px)`. A `shortcut:` comment records that these numbers were measured on 2026-10-24 and need re-measuring if Figma changes its padding.
- `title="RoomieMatch prototype (Figma)"`, `allowFullScreen`.
- The Play button is a real `<button>`, at least 44px tall, keyboard reachable.

### Data

`lib/designs.ts` exports a plain array, same pattern as `lib/timeline-extra.ts`:

```ts
type Design = { slug: string; title: string; figma: string; tags: string[]; blurb: string; year: string; kind: string };
```

`blurb`, `year` and `kind` use `[bracket]` strings for now and render through the existing `Text` placeholder helper, so the placeholder guard keeps a production build from passing until they are filled.

### Files

- New: `lib/designs.ts`, `components/DesignWork.tsx` (server), `components/FigmaEmbed.tsx` (client), one CSS module.
- Changed: `app/page.tsx`, `components/Nav.tsx`, `e2e/home.spec.ts`.

## Testing (e2e)

- `#design` shows one card titled RoomieMatch.
- No iframe before clicking Play.
- After clicking Play, an iframe with an `embed.figma.com` src is visible.
- Open in Figma has `target="_blank"`.
- Nav has a Design link pointing at `#design`.

## Out of scope

- Fetching covers or files through the Figma API.
- Case-study pages for Figma work.
- Adding Figma work to the Timeline.
