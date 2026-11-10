import s from './mdx.module.css';

// shortcut: a design embed can't be locked to one frame, viewers can pan the whole Figma page; give the frame its own page to keep the rest out of view
export default function FigmaBoard({ figma, title, caption }: { figma: string; title: string; caption: string }) {
  return (
    <figure className={s.wide}>
      <iframe title={title} src={figma.replace('https://www.figma.com/', 'https://embed.figma.com/') + '&embed-host=portfolio&footer=false&page-selector=false&theme=light'} loading="lazy" allowFullScreen />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
