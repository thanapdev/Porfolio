'use client';
import { useState, type CSSProperties } from 'react';
import styles from './About.module.css';

export default function SkillChip({ front, back, color }: { front: string; back: string; color: string }) {
  const [on, setOn] = useState(false);
  const isPh = /^\[.*\]$/.test(back);
  return (
    <button
      type="button"
      className={styles.skill}
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
      style={{ '--bg': color } as CSSProperties}
    >
      <span className={styles.in}>
        <span className={styles.f}>{front}</span>
        <span className={`${styles.b}${isPh ? ' ph' : ''}`}>{back}</span>
      </span>
    </button>
  );
}
