import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap" style={{ display: 'grid', placeItems: 'center', padding: '96px 16px' }}>
      <div
        style={{
          background: 'var(--yel)',
          border: '2px solid var(--ink)',
          boxShadow: '8px 10px 0 rgba(0,0,0,.12)',
          padding: '40px 32px',
          maxWidth: 520,
          transform: 'rotate(-2deg)',
          textAlign: 'center',
        }}
      >
        <h1 className="disp" style={{ margin: '0 0 24px', fontSize: 'clamp(32px, 6vw, 48px)', lineHeight: 1.1 }}>
          Lost? This page got reborn somewhere else.
        </h1>
        <Link className="btn red" href="/">
          Back home
        </Link>
      </div>
    </div>
  );
}
