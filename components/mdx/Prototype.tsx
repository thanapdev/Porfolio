import FigmaPhone from '@/components/FigmaPhone';
import { hasCover } from '@/lib/cover';
import { designs } from '@/lib/designs';
import s from './mdx.module.css';

export default function Prototype({ slug }: { slug: string }) {
  const d = designs.find((x) => x.slug === slug)!;
  return (
    <div className={s.proto}>
      <FigmaPhone design={d} cover={hasCover(`/design/${d.slug}/cover.png`)} />
    </div>
  );
}
