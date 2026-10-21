import Image from 'next/image';
import s from './mdx.module.css';

export default function Polaroid({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className={s.polaroid}>
      <div className={s.img}>
        <Image src={src} alt={alt} fill sizes="(max-width:760px) 90vw, 520px" style={{ objectFit: 'cover' }} />
      </div>
      {caption && <figcaption className="hand">{caption}</figcaption>}
    </figure>
  );
}
