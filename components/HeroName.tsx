'use client';
import { useState } from 'react';
import styles from './Hero.module.css';

const COLORS = ['#e8492f', '#2f5be8', '#3fae6a', '#d9a912'];
// deterministic pseudo-random tilt so server and client render identically
const tilt = (i: number) => (((i * 37 + 11) % 141) / 10 - 7).toFixed(1);
const lift = (i: number) => (((i * 53 + 5) % 181) / 10 - 9).toFixed(1);

type Props = { name: string; codeMode: boolean; play: number };

export default function HeroName({ name, codeMode, play }: Props) {
  const [popped, setPopped] = useState<number | null>(null);
  const text = codeMode ? `<${name.split(' ')[0]} />` : name;
  // code mode keeps "<Name />" as one unbreakable word so "/>" never wraps alone
  const words = codeMode ? [text.replace(' ', '\u00A0')] : text.split(' ');
  let i = 0;
  return (
    <h1
      className={`${styles.name} disp ${codeMode ? styles.codeName : ''}`}
      aria-label={text}
      style={{ '--play': play } as React.CSSProperties}
    >
      {words.map((word, w) => (
        <span key={w}>
          {w > 0 && ' '}
          <i className={styles.word}>
            {[...word].map((ch) => {
              const n = i++;
              return (
                <span
                  key={n}
                  aria-hidden="true"
                  className={popped === n ? styles.pop : undefined}
                  style={{ '--r': tilt(n), '--y': lift(n), '--c': COLORS[n % 4] } as React.CSSProperties}
                  onClick={() => {
                    setPopped(n);
                    setTimeout(() => setPopped((p) => (p === n ? null : p)), 400);
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </i>
        </span>
      ))}
    </h1>
  );
}
