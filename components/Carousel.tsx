'use client';
import { Children, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import styles from './Carousel.module.css';

const DELAY = 6000;
const RM = '(prefers-reduced-motion: reduce)';
const watchRM = (cb: () => void) => {
  const m = matchMedia(RM);
  m.addEventListener('change', cb);
  return () => m.removeEventListener('change', cb);
};

export default function Carousel({ label, children }: { label: string; children: ReactNode }) {
  const slides = Children.toArray(children);
  const track = useRef<HTMLDivElement>(null);
  const target = useRef<number | null>(null); // scrollLeft a button move is heading to
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false); // hovered or focused
  const [inView, setInView] = useState(false);
  // server renders as reduced motion, so no pause button flashes before hydration
  const reduce = useSyncExternalStore(watchRM, () => matchMedia(RM).matches, () => true);
  const many = slides.length > 1;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.5 });
    if (track.current) io.observe(track.current);
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    const t = track.current;
    if (!t) return;
    const next = (i + slides.length) % slides.length;
    const items = t.children as HTMLCollectionOf<HTMLElement>;
    const left = Math.min(items[next].offsetLeft - items[0].offsetLeft, t.scrollWidth - t.clientWidth);
    target.current = left;
    t.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
    setIndex(next);
  };

  const running = many && !paused && !held && inView && !reduce;
  // keyed on index too, so a manual move restarts the countdown
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => go(index + 1), DELAY);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, index]);

  const onScroll = () => {
    const t = track.current;
    if (!t || !many) return;
    // ignore the in-between positions of a button move, or a quick second click starts from the wrong slide
    if (target.current !== null) {
      if (Math.abs(t.scrollLeft - target.current) > 2) return;
      target.current = null;
    }
    const items = t.children as HTMLCollectionOf<HTMLElement>;
    setIndex(Math.round(t.scrollLeft / (items[1].offsetLeft - items[0].offsetLeft)));
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      data-autoplay={running}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false); }}
    >
      <div ref={track} className={styles.track} onScroll={onScroll}>
        {slides.map((s, i) => (
          <div key={i} className={styles.slide} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
            {s}
          </div>
        ))}
      </div>
      {many && (
        <div className={styles.controls}>
          <button type="button" className="btn" onClick={() => go(index - 1)} aria-label="Previous slide">←</button>
          <div className={styles.dots}>
            {slides.map((_, i) => (
              <button key={i} type="button" className={styles.dot} onClick={() => go(i)} aria-label={`Go to slide ${i + 1}`} aria-current={i === index} />
            ))}
          </div>
          <button type="button" className="btn" onClick={() => go(index + 1)} aria-label="Next slide">→</button>
          {!reduce && (
            <button type="button" className="btn" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play slides' : 'Pause slides'}>
              {paused ? '▶' : '⏸'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
