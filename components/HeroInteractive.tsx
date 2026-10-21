'use client';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import styles from './Hero.module.css';
import HeroName from './HeroName';
import ControlPanel from './ControlPanel';
import StickerZone from './StickerZone';

export default function HeroInteractive({ name, children }: { name: string; children: ReactNode }) {
  const [codeMode, setCodeMode] = useState(false);
  const [play, setPlay] = useState(0.35);

  useEffect(() => {
    if (codeMode) document.body.dataset.mode = 'code';
    else delete document.body.dataset.mode;
    return () => {
      delete document.body.dataset.mode;
    };
  }, [codeMode]);

  return (
    <header className={styles.hero} id="hero" style={{ '--play': play } as CSSProperties}>
      <div className={`wrap ${styles.grid}`}>
        <div>
          <p className="eyebrow">hi, I&apos;m</p>
          <HeroName name={name} codeMode={codeMode} play={play} />
          <span className={`${styles.role} hand`}>
            {codeMode ? 'Front-end Dev (same person) ' : 'UX/UI Designer who builds '}
            <svg viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 10 C 60 2, 120 16, 180 7 S 270 4, 298 9" fill="none" stroke="#e8492f" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </span>
          {children}
        </div>
        <StickerZone>
          <ControlPanel codeMode={codeMode} onCodeMode={setCodeMode} play={play} onPlay={setPlay} />
        </StickerZone>
      </div>
    </header>
  );
}
