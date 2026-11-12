import styles from './Stickers.module.css';

const shapes = (ui: boolean) => (
  <>
    <rect x="4" y="4" width="152" height="40" rx="18" fill={ui ? 'var(--blue)' : 'none'} />
    <circle cx="30" cy="24" r="10" fill={ui ? 'var(--pink)' : 'none'} />
    <rect x="48" y="18" width="62" height="12" rx="6" fill={ui ? '#fff' : 'none'} />
    <rect x="16" y="58" width="128" height="76" rx="12" fill={ui ? 'var(--yel)' : 'none'} />
    {/* ends sit inside the rounded corners, so they never poke out from under the filled image */}
    {!ui && <path d="M22 64 138 128M138 64 22 128" strokeWidth="2" />}
    <rect x="16" y="146" width="96" height="10" rx="5" fill={ui ? 'var(--ink)' : 'none'} />
    <rect x="16" y="164" width="72" height="10" rx="5" fill={ui ? '#bdb6a8' : 'none'} />
    <rect x="16" y="188" width="58" height="22" rx="11" fill={ui ? 'var(--sky)' : 'none'} />
    <rect x="82" y="188" width="62" height="22" rx="11" fill={ui ? '#c93a22' : 'none'} />
  </>
);

// A screen sketched as a wireframe, then filled in as finished UI, on a loop.
// Only transform and opacity animate, so the compositor plays it without repainting
// (drawing the SVG strokes themselves made scrolling hitch). Without animation it shows the finished UI.
export default function SketchToUI() {
  return (
    <div className={styles.sketchArt} aria-hidden="true">
      <svg className={styles.wire} viewBox="0 0 160 240" stroke="#a9a191" strokeWidth="3">{shapes(false)}</svg>
      <span className={styles.cover} />
      <svg className={styles.ui} viewBox="0 0 160 240" stroke="var(--ink)" strokeWidth="3">{shapes(true)}</svg>
    </div>
  );
}
