import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { projectLinks, type Project } from '@/lib/projects';
import Text from './Text';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const odd = index % 2 === 1;
  return (
    <article
      className={`${styles.card}${odd ? ` ${styles.flip}` : ''}`}
      style={{ '--tilt': odd ? '.7deg' : '-.6deg' } as CSSProperties}
    >
      <div className={styles.shot}>
        <Image src={p.cover} alt={p.coverAlt} fill sizes="(max-width:760px) 90vw, 560px" style={{ objectFit: 'cover' }} />
      </div>
      <div>
        <ul className="chips">
          {p.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <h3 className="disp">{p.title}</h3>
        <p className={styles.meta}>{`${p.role} · ${p.team} · ${p.year} · ${p.readTime} min read`}</p>
        <p><Text value={p.summary} /></p>
        <div className={styles.note}>
          <b><Text value={p.metric.value} /></b>
          <span className="hand"><Text value={p.metric.label} /></span>
        </div>
        <div className="btns">
          <Link className="btn blue" href={`/work/${p.slug}`}>View Case Study →</Link>
          {projectLinks(p).map((l) => (
            <a key={l.label} className="btn" href={l.href} target="_blank" rel="noopener">{l.label} ↗</a>
          ))}
        </div>
      </div>
    </article>
  );
}
