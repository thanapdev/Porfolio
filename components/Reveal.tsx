'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Plays each scroll-in animation once: marks [data-reveal] elements with data-shown
// when they enter view. Nothing is hidden until this runs (html.reveal),
// so no-JS and reduced motion see everything.
export default function Reveal() {
  const path = usePathname(); // re-scan after client navigation brings new elements
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('reveal');
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        (e.target as HTMLElement).dataset.shown = '';
        io.unobserve(e.target);
      }
    }, { threshold: 0.2 });
    document.querySelectorAll('[data-reveal]:not([data-shown])').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}
