import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type Project = {
  slug: string; title: string; year: number; role: string; team: string;
  tags: string[]; summary: string;
  tldr: { problem: string; did: string; result: string };
  metric: { value: string; label: string };
  cover: string; coverAlt: string; live?: string; repo?: string;
  order: number; readTime: number; // minutes
};

export type TimelineRow = { title: string; year: number; role: string; href?: string; linkLabel?: string };

const str = (v: unknown): v is string => typeof v === 'string' && v.trim() !== '';
const num = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const obj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

export function readTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function parseProject(slug: string, source: string): Project {
  const { data: d, content } = matter(source);
  const fail = (field: string): never => {
    throw new Error(`${slug}.mdx: invalid or missing "${field}"`);
  };
  for (const f of ['title', 'role', 'team', 'summary', 'cover', 'coverAlt']) if (!str(d[f])) fail(f);
  for (const f of ['year', 'order']) if (!num(d[f])) fail(f);
  if (!Array.isArray(d.tags) || d.tags.length < 1 || !d.tags.every(str)) fail('tags');
  if (!obj(d.tldr) || !str(d.tldr.problem) || !str(d.tldr.did) || !str(d.tldr.result)) fail('tldr');
  if (!obj(d.metric) || !str(d.metric.value) || !str(d.metric.label)) fail('metric');
  for (const f of ['live', 'repo']) if (d[f] !== undefined && !str(d[f])) fail(f);

  const p: Project = {
    slug, title: d.title, year: d.year, role: d.role, team: d.team,
    tags: d.tags, summary: d.summary, tldr: d.tldr as Project['tldr'],
    metric: d.metric as Project['metric'], cover: d.cover, coverAlt: d.coverAlt,
    order: d.order, readTime: readTime(content),
  };
  if (d.live) p.live = d.live;
  if (d.repo) p.repo = d.repo;
  return p;
}

export function getProjects(): Project[] {
  const dir = path.join(process.cwd(), 'content/work');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => parseProject(f.replace(/\.mdx$/, ''), fs.readFileSync(path.join(dir, f), 'utf8')))
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function nextProject(slug: string, projects: Project[]): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export function getTimeline(projects: Project[], extra: TimelineRow[]): TimelineRow[] {
  const rows: TimelineRow[] = projects.map((p) => ({
    title: p.title, year: p.year, role: p.role, href: p.live,
    linkLabel: p.tags.includes('GAME') ? 'Play ↗' : 'Live ↗',
  }));
  return [...rows, ...extra].sort((a, b) => b.year - a.year); // Array.sort is stable
}

export function projectLinks(p: Project): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = [];
  if (p.live) links.push({ label: 'Live Website', href: p.live });
  if (p.repo) links.push({ label: 'Repo', href: p.repo });
  return links;
}
