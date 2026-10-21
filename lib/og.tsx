import { ImageResponse } from 'next/og';
import type { ReactNode } from 'react';

export const OG_SIZE = { width: 1200, height: 630 };

// Default font only: next/og cannot use next/font, and a build-time network fetch would break offline builds.
export function ogImage(children: ReactNode) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#f5efe2',
          backgroundImage: 'radial-gradient(#d8cfbd 2px, transparent 2.4px)',
          backgroundSize: '32px 32px',
          color: '#1d1a16',
          padding: 80,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 56,
            right: 80,
            width: 150,
            height: 150,
            borderRadius: 75,
            background: '#e8492f',
            border: '6px solid #fff',
            color: '#fff',
            fontSize: 34,
            fontWeight: 800,
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(8deg)',
          }}
        >
          Hello!
        </div>
        {children}
      </div>
    ),
    OG_SIZE,
  );
}
