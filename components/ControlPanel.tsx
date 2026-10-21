'use client';
import { useRef, useState, type CSSProperties } from 'react';
import styles from './Stickers.module.css';
import { burstConfetti } from './confetti';
import { useDrag, useZone } from './useDrag';

const LABELS = ['Told you', 'Again?!', 'OK one more', "Don't press"];

type Props = {
  codeMode: boolean;
  onCodeMode: (on: boolean) => void;
  play: number;
  onPlay: (v: number) => void;
};

export default function ControlPanel({ codeMode, onCodeMode, play, onPlay }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const gripRef = useRef<HTMLDivElement>(null);
  const zoneRef = useZone()!;
  const [presses, setPresses] = useState(0);
  useDrag(ref, { handleRef: gripRef, zoneRef, dragClass: styles.drag });
  const pct = Math.round(play * 100);
  return (
    <div
      ref={ref}
      className={`${styles.stk} ${styles.panel}`}
      role="group"
      aria-label="Control panel sticker"
      style={{ '--r': '3deg', right: '8%', top: '26%' } as CSSProperties}
    >
      <div
        ref={gripRef}
        className={styles.grip}
        tabIndex={0}
        role="button"
        aria-label="Drag handle for control panel. Arrow keys move it."
      >
        control panel <b aria-hidden="true">⋮⋮</b>
      </div>
      <div className={styles.ctl}>
        Design
        <button
          className={styles.sw}
          role="switch"
          aria-checked={codeMode}
          aria-label="Code mode"
          type="button"
          onClick={() => onCodeMode(!codeMode)}
        />
        Code
      </div>
      <label className={styles.ctl}>
        Wobble
        <input
          className={styles.sl}
          type="range"
          min={0}
          max={100}
          value={pct}
          style={{ '--v': `${pct}%` } as CSSProperties}
          onChange={(e) => onPlay(Number(e.target.value) / 100)}
        />
      </label>
      <button
        id="boom"
        className="btn yel"
        type="button"
        onClick={(e) => {
          setPresses((n) => n + 1);
          burstConfetti(e.currentTarget.getBoundingClientRect(), 10 + Math.round(play * 30));
        }}
      >
        {presses === 0 ? LABELS[3] : LABELS[(presses - 1) % 4]}
      </button>
    </div>
  );
}
