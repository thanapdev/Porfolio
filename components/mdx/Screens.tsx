import Image from 'next/image';
import s from './mdx.module.css';

type Screen = { src: string; alt: string; caption: string; width: number; height: number };

export default function Screens({ items }: { items: Screen[] }) {
  return (
    <div className={s.screens}>
      {items.map((i) => (
        <figure key={i.src}>
          <Image src={i.src} alt={i.alt} width={i.width} height={i.height} sizes="(max-width:760px) 240px, 210px" />
          <figcaption>{i.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
