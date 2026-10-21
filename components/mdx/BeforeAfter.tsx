'use client';
import { useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import s from './mdx.module.css';

export default function BeforeAfter({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [pos, setPos] = useState(50);
  const area = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const clamp = (n: number) => Math.min(100, Math.max(0, n));

  const fromPointer = (e: PointerEvent) => {
    const r = area.current!.getBoundingClientRect();
    setPos(clamp(Math.round(((e.clientX - r.left) / r.width) * 100)));
  };
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 5 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -5 : 0;
    if (e.key === 'Home') setPos(0);
    else if (e.key === 'End') setPos(100);
    else if (d) setPos((p) => clamp(p + d));
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={area}
      className={s.ba}
      onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); fromPointer(e); }}
      onPointerMove={(e) => { if (dragging.current) fromPointer(e); }}
      onPointerUp={() => { dragging.current = false; }}
      onPointerCancel={() => { dragging.current = false; }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={alt} className={s.baImg} draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={before} alt="" className={s.baImg} draggable={false} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      <span className={`${s.baTag} hand`} style={{ left: 10 }}>before</span>
      <span className={`${s.baTag} hand`} style={{ right: 10 }}>after</span>
      <div className={s.baLine} style={{ left: `${pos}%` }} aria-hidden="true" />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pos}
        className={s.baHandle}
        style={{ left: `${pos}%` }}
        onKeyDown={onKey}
      >
        ⇆
      </div>
    </div>
  );
}
