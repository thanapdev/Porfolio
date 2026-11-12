import type { ReactNode } from 'react';
import styles from './Hero.module.css';
import HeroName from './HeroName';
import SketchToUI from './SketchToUI';
import Sticker from './Sticker';
import StickerZone from './StickerZone';

export default function HeroInteractive({ name, children }: { name: string; children: ReactNode }) {
  return (
    <header className={styles.hero} id="hero">
      <div className={`wrap ${styles.grid}`}>
        <div>
          <p className="eyebrow">hi, I&apos;m</p>
          <HeroName name={name} />
          <span className={`${styles.role} hand`}>
            UX/UI Designer who builds{' '}
            <svg viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 10 C 60 2, 120 16, 180 7 S 270 4, 298 9" fill="none" stroke="#e8492f" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </span>
          {children}
        </div>
        <StickerZone>
          <Sticker className="sketch" label="Sticker: a wireframe that turns into a finished screen. Arrow keys move it." rot={3} right="12%" top="18%">
            <SketchToUI />
          </Sticker>
        </StickerZone>
      </div>
    </header>
  );
}
