import { ogImage, OG_SIZE } from '@/lib/og';
import { getProject, getProjects } from '@/lib/projects';

export const alt = 'Case study';
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug)!;
  return ogImage(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 900 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {p.tags.map((t) => (
          <div
            key={t}
            style={{
              display: 'flex',
              marginRight: 12,
              marginBottom: 12,
              padding: '6px 16px',
              background: '#fff',
              border: '3px solid #1d1a16',
              borderRadius: 999,
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {t}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.08, marginTop: 16 }}>{p.title}</div>
      <div style={{ fontSize: 32, marginTop: 32, color: '#5a5245' }}>Thanapong Yamkamol</div>
    </div>,
  );
}
