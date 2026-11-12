import Image from 'next/image';
import s from './mdx.module.css';

export default function Wide({ src, alt, width, height, caption }: { src: string; alt: string; width: number; height: number; caption: string }) {
  return (
    <figure className={s.wide}>
      <Image className={s.peek} src={src} alt={alt} width={width} height={height} sizes="(max-width:960px) 100vw, 900px" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
