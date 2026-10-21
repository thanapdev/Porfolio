'use client';
import { useRef, type CSSProperties, type ReactNode } from 'react';
import styles from './Stickers.module.css';
import { useDrag, useZone } from './useDrag';

type Props = {
  className: string;
  label: string;
  rot: number;
  right: string;
  top: string;
  children: ReactNode;
};

export default function Sticker({ className, label, rot, right, top, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const zoneRef = useZone()!;
  useDrag(ref, { zoneRef, dragClass: styles.drag });
  const style = { '--r': `${rot}deg`, right, top } as CSSProperties;
  return (
    <div
      ref={ref}
      className={`${styles.stk} ${styles[className]}`}
      tabIndex={0}
      role="button"
      aria-label={label}
      style={style}
    >
      {children}
    </div>
  );
}
