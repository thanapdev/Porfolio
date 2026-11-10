import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Text from '@/components/Text';
import { hasCover } from '@/lib/cover';
import { designs } from '@/lib/designs';
import s from '../../work/[slug]/page.module.css';
import n from './page.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return designs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = designs.find((x) => x.slug === slug)!;
  return { title: d.title, description: d.blurb, alternates: { canonical: '/case-study/' + slug } };
}

export default async function DesignCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = designs.findIndex((x) => x.slug === slug);
  const d = designs[i];
  const next = designs[(i + 1) % designs.length];
  const cover = `/design/${next.slug}/cover.png`;
  const { default: Body } = await import(`@/content/case-studies/${slug}.mdx`);

  return (
    <>
    <article className={`wrap ${s.page}`}>
      <header className={s.head}>
        <ul className="chips">{d.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        <h1 className={`disp ${s.title}`}>{d.title}</h1>
        <p className={`hand ${s.meta}`}><Text value={d.kind} /> · <Text value={d.year} /></p>
      </header>

      <div className={s.prose}>
        <Body />
      </div>

      <footer className={s.foot}>
        <a className="btn blue" href={d.figma} target="_blank" rel="noopener">▶ Play prototype ↗</a>
        <Link className="btn" href="/#design">Back to home</Link>
      </footer>
    </article>

    <div className={n.band}>
      <Link className={n.next} href={`/case-study/${next.slug}`}>
        {hasCover(cover) && (
          <span className={n.phone}><Image src={cover} alt="" fill sizes="300px" style={{ objectFit: 'cover', objectPosition: 'top' }} /></span>
        )}
        <span className={n.text}>
          <span className={n.label}>Next case study</span>
          <span className={`disp ${n.title}`}>{next.title} <span className={n.arrow} aria-hidden="true">→</span></span>
        </span>
      </Link>
      <a className={n.top} href="#top" aria-label="Back to top">↑</a>
    </div>
    </>
  );
}
