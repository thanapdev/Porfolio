import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Text from '@/components/Text';
import { getProject, getProjects, nextProject, projectLinks } from '@/lib/projects';
import s from './page.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug)!;
  return { title: p.title, description: p.summary };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = getProjects();
  const p = projects.find((x) => x.slug === slug)!;
  const next = nextProject(slug, projects);
  const { default: Body } = await import(`@/content/work/${slug}.mdx`);
  const notes = [
    ['Problem', p.tldr.problem],
    ['What I did', p.tldr.did],
    ['Result', p.tldr.result],
  ] as const;

  return (
    <article className={`wrap ${s.page}`}>
      <header className={s.head}>
        <ul className="chips">{p.tags.map((t) => <li key={t}><Text value={t} /></li>)}</ul>
        <h1 className={`disp ${s.title}`}><Text value={p.title} /></h1>
        <p className={`hand ${s.meta}`}>
          <Text value={p.role} /> · <Text value={p.team} /> · {p.year} · {p.readTime} min read
        </p>
        <p className={s.metric}>
          <b className="hand"><Text value={p.metric.value} /></b> <Text value={p.metric.label} />
        </p>
        <div className="btns">
          {projectLinks(p).map((l, i) => (
            <a key={l.href} className={`btn ${i === 0 ? 'red' : 'yel'}`} href={l.href} target="_blank" rel="noreferrer">
              {l.label} ↗
            </a>
          ))}
        </div>
      </header>

      <figure className={s.cover}>
        <div className={s.coverImg}>
          <Image src={p.cover} alt={p.coverAlt} fill priority sizes="(max-width:760px) 90vw, 520px" style={{ objectFit: 'cover' }} />
        </div>
      </figure>

      <section className={s.tldr} aria-label="TL;DR">
        {notes.map(([label, value], i) => (
          <div key={label} className={s.tnote} data-testid="tldr-note" style={{ ['--r' as string]: `${[-1.5, 1, -0.8][i]}deg` }}>
            <b className="hand">{label}</b>
            <p><Text value={value} /></p>
          </div>
        ))}
      </section>

      <div className={s.prose}>
        <Body />
      </div>

      <footer className={s.foot}>
        <Link className="btn blue" href={`/work/${next.slug}`}>Next project →</Link>
        <Link className="btn" href="/#work">Back to all work</Link>
      </footer>
    </article>
  );
}
