'use client';
import { createContext, useContext, useEffect, type RefObject } from 'react';

export const ZoneContext = createContext<RefObject<HTMLElement | null> | null>(null);
export const useZone = () => useContext(ZoneContext);

let topZ = 20;

export function useDrag(
  ref: RefObject<HTMLElement | null>,
  opts: { handleRef?: RefObject<HTMLElement | null>; zoneRef: RefObject<HTMLElement | null>; dragClass?: string },
): void {
  const { handleRef, zoneRef, dragClass } = opts;
  useEffect(() => {
    const st = ref.current;
    const zone = zoneRef.current;
    if (!st || !zone) return;
    const handle = handleRef?.current ?? st;
    let dx = 0;
    let dy = 0;
    let dragging = false;
    const place = (x: number, y: number) => {
      const b = zone.getBoundingClientRect();
      x = Math.max(-8, Math.min(x, b.width - st.offsetWidth + 8));
      y = Math.max(-8, Math.min(y, b.height - st.offsetHeight + 8));
      st.style.left = x + 'px';
      st.style.top = y + 'px';
      st.style.right = 'auto';
    };
    const down = (e: PointerEvent) => {
      const r = st.getBoundingClientRect();
      dx = e.clientX - r.left;
      dy = e.clientY - r.top;
      handle.setPointerCapture(e.pointerId);
      dragging = true;
      if (dragClass) st.classList.add(dragClass);
      st.style.zIndex = String(++topZ);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const b = zone.getBoundingClientRect();
      place(e.clientX - b.left - dx, e.clientY - b.top - dy);
    };
    const drop = () => {
      dragging = false;
      if (dragClass) st.classList.remove(dragClass);
    };
    const key = (e: KeyboardEvent) => {
      const m = ({ ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] } as Record<string, number[]>)[e.key];
      if (!m) return;
      e.preventDefault();
      const cs = getComputedStyle(st);
      place(parseFloat(cs.left) + m[0], parseFloat(cs.top) + m[1]);
    };
    handle.style.setProperty('touch-action', 'none');
    handle.addEventListener('pointerdown', down);
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', drop);
    handle.addEventListener('pointercancel', drop);
    handle.addEventListener('keydown', key);
    return () => {
      handle.removeEventListener('pointerdown', down);
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', drop);
      handle.removeEventListener('pointercancel', drop);
      handle.removeEventListener('keydown', key);
    };
  }, [ref, handleRef, zoneRef, dragClass]);
}
