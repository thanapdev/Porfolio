'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './CursorLabel.module.css';

// A quiet spinning "scroll ✦ scroll ✦" ring that trails the mouse.
// Mouse-only (hover + fine pointer); touch and keyboard users never see it.
export default function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    let first = true;

    const draw = () => {
      pos.x += (target.x - pos.x) * 0.25;
      pos.y += (target.y - pos.y) * 0.25;
      if (ref.current) ref.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5 ? requestAnimationFrame(draw) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      setOn(true);
      target.x = e.clientX;
      target.y = e.clientY;
      if (reduce || first) { pos.x = target.x; pos.y = target.y; first = false; }
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onLeave = () => setOn(false);

    document.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.cursor} ${on ? styles.on : ''}`} aria-hidden="true" data-testid="cursor-ring">
      <svg className={styles.ring} viewBox="0 0 120 120">
        <defs>
          <path id="cursor-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text className={styles.text}>
          <textPath href="#cursor-circle" textLength="270" lengthAdjust="spacing">
            scroll <tspan className={styles.star}>✦</tspan> scroll <tspan className={styles.star}>✦</tspan>
          </textPath>
        </text>
      </svg>
    </div>
  );
}
