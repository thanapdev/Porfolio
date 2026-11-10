import Link from 'next/link';
import type { Design } from '@/lib/designs';
import FigmaPhone from './FigmaPhone';
import Text from './Text';
import styles from './DesignWork.module.css';

export default function FigmaCard({ design: d, cover }: { design: Design; cover: boolean }) {
  return (
    <article className={styles.card}>
      <div>
        <ul className="chips">
          {d.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <h3 className="disp">{d.title}</h3>
        <p className={styles.meta}><Text value={d.kind} /> · <Text value={d.year} /></p>
        <p><Text value={d.blurb} /></p>
        <div className="btns">
          <a className="btn blue" href={d.figma} target="_blank" rel="noopener">▶ Play prototype ↗</a>
          <Link className="btn" href={`/case-study/${d.slug}`}>UX case study</Link>
        </div>
        <p className={`${styles.hint} hand`}>psst… it really works, tap around →</p>
      </div>
      <FigmaPhone design={d} cover={cover} />
    </article>
  );
}
