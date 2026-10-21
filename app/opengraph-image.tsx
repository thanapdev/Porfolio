import { ogImage, OG_SIZE } from '@/lib/og';

export const alt = 'Thanapong Yamkamol · UX/UI Designer who builds';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return ogImage(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05 }}>Thanapong Yamkamol</div>
      <div
        style={{
          display: 'flex',
          marginTop: 36,
          alignSelf: 'flex-start',
          padding: '16px 28px',
          background: '#ffd84a',
          border: '4px solid #1d1a16',
          boxShadow: '8px 8px 0 #1d1a16',
          fontSize: 48,
          fontWeight: 700,
          transform: 'rotate(-2deg)',
        }}
      >
        UX/UI Designer who builds
      </div>
    </div>,
  );
}
