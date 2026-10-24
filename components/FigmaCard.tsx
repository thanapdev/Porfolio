'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { figmaEmbedUrl, type Design } from '@/lib/designs';
import Text from './Text';
import styles from './DesignWork.module.css';

export default function FigmaCard({ design: d, cover }: { design: Design; cover: boolean }) {
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  // the phone Play button is removed on play, so hand focus to the prototype
  useEffect(() => { if (playing) frame.current?.focus(); }, [playing]);
  const play = () => setPlaying(true);
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
          <button type="button" className="btn blue" onClick={play}>▶ Play prototype</button>
          <a className="btn" href={d.figma} target="_blank" rel="noopener">Open in Figma ↗</a>
        </div>
        <p className={`${styles.hint} hand`}>psst… it really works, tap around →</p>
      </div>
      <div className={styles.phone} data-testid="phone">
        {playing ? (
          <iframe ref={frame} title={`${d.title} prototype (Figma)`} src={figmaEmbedUrl(d.figma)} allowFullScreen />
        ) : (
          <>
            {cover ? (
              <Image src={`/design/${d.slug}/cover.png`} alt={`${d.title} start screen`} fill sizes="220px" style={{ objectFit: 'cover' }} />
            ) : (
              <span className="ph">[real screenshot]</span>
            )}
            <button type="button" className={`btn ${styles.play}`} onClick={play} aria-label={`Play ${d.title} prototype`}>▶ Play</button>
          </>
        )}
      </div>
    </article>
  );
}
