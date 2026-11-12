'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import s from './mdx.module.css';

/**
 * Pan-and-zoom viewer for a large flow diagram. `dir` holds the files made by scripts/zoom-tiles.swift:
 * base.png (whole image, BASE px wide), preview.png (the start area) and tiles/C-R.png at full size.
 * width/height and start are in full-size px; start is the part shown first, so viewers see where the flow begins.
 */
type Props = { dir: string; width: number; height: number; start: { x: number; y: number; w: number }; title: string; alt: string; caption: string };
type Pt = { x: number; y: number };
const BASE = 4000, TILE = 1024, MAX = 1;

export default function ZoomBoard({ dir, width, height, start, title, alt, caption }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [v, setV] = useState({ k: 1, x: 0, y: 0, w: 0, h: 0 });
  const view = useRef(v); // latest view, for event handlers
  const pts = useRef(new Map<number, Pt>());
  const last = useRef<(Pt & { d: number }) | null>(null);

  const rect = () => stage.current!.getBoundingClientRect();
  const fit = () => { const r = rect(); return Math.min(r.width / width, r.height / height); };
  const clampK = (k: number) => Math.min(Math.max(k, fit()), MAX);
  // centre the image when it is smaller than the stage, otherwise keep its edges outside the stage
  const set = (k: number, x: number, y: number) => {
    const r = rect();
    k = clampK(k);
    const w = width * k, h = height * k;
    x = w <= r.width ? (r.width - w) / 2 : Math.min(0, Math.max(r.width - w, x));
    y = h <= r.height ? (r.height - h) / 2 : Math.min(0, Math.max(r.height - h, y));
    view.current = { k, x, y, w: r.width, h: r.height };
    setV(view.current);
  };
  // scale by f around point p, so the spot under p stays put
  const zoom = (f: number, p: Pt = { x: rect().width / 2, y: rect().height / 2 }) => {
    const { k, x, y } = view.current;
    const nk = clampK(k * f);
    set(nk, p.x - ((p.x - x) * nk) / k, p.y - ((p.y - y) * nk) / k);
  };
  const local = (e: { clientX: number; clientY: number }): Pt => {
    const r = rect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const gesture = () => {
    const p = [...pts.current.values()];
    const c = { x: p.reduce((a, q) => a + q.x, 0) / p.length, y: p.reduce((a, q) => a + q.y, 0) / p.length };
    return { ...c, d: p.length > 1 ? Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) : 0 };
  };

  const open = () => {
    setShown(true);
    dialog.current!.showModal();
    const k = clampK(rect().width / start.w);
    set(k, -start.x * k, -start.y * k);
  };

  useEffect(() => {
    const el = stage.current!;
    // non-passive, so the page behind does not scroll
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoom(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015)), local(e));
    };
    const onResize = () => { if (dialog.current?.open) set(view.current.k, view.current.x, view.current.y); };
    el.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize);
    return () => { el.removeEventListener('wheel', onWheel); window.removeEventListener('resize', onResize); };
  });

  const down = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pts.current.set(e.pointerId, local(e));
    last.current = gesture();
  };
  // one pointer pans; two pointers pan and pinch-zoom together
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!pts.current.has(e.pointerId) || !last.current) return;
    pts.current.set(e.pointerId, local(e));
    const g = gesture(), l = last.current;
    const { k, x, y } = view.current;
    const nk = clampK(l.d && g.d ? (k * g.d) / l.d : k);
    set(nk, g.x - ((l.x - x) * nk) / k, g.y - ((l.y - y) * nk) / k);
    last.current = g;
  };
  const up = (e: PointerEvent<HTMLDivElement>) => {
    pts.current.delete(e.pointerId);
    last.current = pts.current.size ? gesture() : null;
  };
  const key = (e: KeyboardEvent) => {
    const { k, x, y } = view.current;
    const act: Record<string, () => void> = {
      '+': () => zoom(1.25), '=': () => zoom(1.25), '-': () => zoom(0.8), '0': () => set(fit(), 0, 0),
      ArrowLeft: () => set(k, x + 80, y), ArrowRight: () => set(k, x - 80, y),
      ArrowUp: () => set(k, x, y + 80), ArrowDown: () => set(k, x, y - 80),
    };
    if (act[e.key]) { e.preventDefault(); act[e.key](); }
  };

  // full-size tiles only for the visible area, once base.png has too few pixels for this zoom
  const tiles: string[] = [];
  if (shown && v.w && v.k * (typeof window === 'undefined' ? 1 : window.devicePixelRatio) > BASE / width) {
    const c0 = Math.max(0, Math.floor(-v.x / v.k / TILE)), c1 = Math.min(Math.ceil(width / TILE) - 1, Math.floor((v.w - v.x) / v.k / TILE));
    const r0 = Math.max(0, Math.floor(-v.y / v.k / TILE)), r1 = Math.min(Math.ceil(height / TILE) - 1, Math.floor((v.h - v.y) / v.k / TILE));
    for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) tiles.push(`${c}-${r}`);
  }

  return (
    <figure className={s.wide}>
      <button type="button" className={s.zoomOpen} onClick={open} aria-label={`Zoom in on ${title}`}>
        <Image className={s.peek} src={`${dir}/preview.png`} alt={alt} width={1800} height={1125} unoptimized />
        <span className={`btn ${s.zoomHint}`} aria-hidden="true">⤢ Zoom in</span>
      </button>
      <figcaption>{caption}</figcaption>
      <dialog ref={dialog} className={s.viewer} aria-label={title} onKeyDown={key}>
        <div className={s.bar}>
          <b>{title}</b>
          <button type="button" onClick={() => zoom(0.8)} aria-label="Zoom out">−</button>
          <button type="button" onClick={() => zoom(1.25)} aria-label="Zoom in">+</button>
          <button type="button" onClick={() => set(fit(), 0, 0)}>Fit</button>
          <button type="button" onClick={() => dialog.current!.close()} aria-label="Close">✕</button>
        </div>
        <div ref={stage} className={s.stage} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onDoubleClick={(e) => zoom(2, local(e))}>
          {shown && (
            <div className={s.layer} data-testid="zoom-layer" style={{ width, height, transform: `translate(${v.x}px,${v.y}px) scale(${v.k})` }}>
              {/* plain img: next/image would re-encode these, and tiles must keep 1 image px = 1 layer px */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${dir}/base.png`} alt={alt} draggable={false} style={{ width, height }} />
              {tiles.map((t) => {
                const [c, r] = t.split('-').map(Number);
                // eslint-disable-next-line @next/next/no-img-element
                return <img key={t} src={`${dir}/tiles/${t}.png`} alt="" draggable={false} style={{ left: c * TILE, top: r * TILE }} />;
              })}
            </div>
          )}
        </div>
      </dialog>
    </figure>
  );
}
