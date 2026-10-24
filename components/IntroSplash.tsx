'use client';
import { useEffect } from 'react';
import styles from './IntroSplash.module.css';

// Runs before first paint: show the intro once per browser session, never under reduced motion.
const decide = `try{if(!/(^|; )intro=1/.test(document.cookie)&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.intro='';document.cookie='intro=1;path=/;SameSite=Lax'}}catch(e){}`;

export default function IntroSplash() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro === undefined) return;
    const skip = () => { if (root.dataset.intro === '') root.dataset.intro = 'out'; };
    addEventListener('keydown', skip);
    addEventListener('pointerdown', skip);
    return () => { removeEventListener('keydown', skip); removeEventListener('pointerdown', skip); };
  }, []);

  return (
    <>
      <div
        className={styles.splash}
        data-testid="intro"
        aria-hidden="true"
        // the slide-out is the splash's own animation; children's animations bubble up too
        onAnimationEnd={(e) => { if (e.target === e.currentTarget) delete document.documentElement.dataset.intro; }}
      >
        <div className={styles.hello}>HELLO<br />THERE!</div>
        <p className="hand">designing… then building…</p>
        <div className={styles.bar}><span /></div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: decide }} />
    </>
  );
}
