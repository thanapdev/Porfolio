export const CONFETTI_COLORS = ['#e8492f', '#2f5be8', '#3fae6a', '#d9a912'];

export function burstConfetti(origin: DOMRect, count: number): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < count; i++) {
    const c = document.createElement('i');
    c.className = 'confetti';
    c.style.cssText = `position:fixed;width:14px;height:14px;pointer-events:none;z-index:60;border:2px solid var(--ink);left:${origin.left + origin.width / 2}px;top:${origin.top}px;background:${CONFETTI_COLORS[i % 4]};border-radius:${i % 3 ? '50%' : '3px'}`;
    document.body.appendChild(c);
    const a = Math.random() * Math.PI * 2;
    const d = 80 + Math.random() * 180;
    c.animate(
      [
        { transform: 'translate(0,0) rotate(0)' },
        {
          transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d - 80}px) rotate(${Math.random() * 540}deg)`,
          opacity: 0,
        },
      ],
      { duration: 900 + Math.random() * 400, easing: 'cubic-bezier(.2,.8,.3,1)' },
    ).onfinish = () => c.remove();
  }
}
