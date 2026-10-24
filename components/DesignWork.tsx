import { designs } from '@/lib/designs';
import { hasCover } from '@/lib/cover';
import FigmaCard from './FigmaCard';

export default function DesignWork() {
  return (
    <section id="design">
      <div className="wrap">
        <p className="eyebrow">made in figma</p>
        <h2 className="h2 disp">Designs you<br />can tap through</h2>
        <div style={{ display: 'grid', gap: 56 }}>
          {designs.map((d) => <FigmaCard key={d.slug} design={d} cover={hasCover(`/design/${d.slug}/cover.png`)} />)}
        </div>
      </div>
    </section>
  );
}
