'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { figmaEmbedUrl, type Design } from '@/lib/designs';
import styles from './DesignWork.module.css';

export default function FigmaPhone({ design: d, cover }: { design: Design; cover: boolean }) {
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  // the phone Play button is removed on play, so hand focus to the prototype
  useEffect(() => { if (playing) frame.current?.focus(); }, [playing]);
  // sizes is double the 220px phone: at 220 a 1x monitor gets a 256px image that blurs once the phone is rotated
  return (
    <div className={styles.phone} data-testid="phone">
      {playing ? (
        <iframe ref={frame} title={`${d.title} prototype (Figma)`} src={figmaEmbedUrl(d.figma)} allowFullScreen />
      ) : (
        <>
          {cover ? (
            <Image src={`/design/${d.slug}/cover.png`} alt={`${d.title} start screen`} fill sizes="440px" style={{ objectFit: 'cover' }} />
          ) : (
            <span className="ph">[real screenshot]</span>
          )}
          <button type="button" className={`btn ${styles.play}`} onClick={() => setPlaying(true)} aria-label={`Play ${d.title} prototype`}>▶ Play</button>
        </>
      )}
    </div>
  );
}
