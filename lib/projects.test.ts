import { describe, expect, it } from 'vitest';
import {
  getProjects,
  getTimeline,
  nextProject,
  parseProject,
  projectLinks,
  readTime,
  type Project,
  type TimelineRow,
} from './projects';

const fm = (over: Record<string, string> = {}, drop: string[] = []) => {
  const base: Record<string, string> = {
    title: 'title: "Demo"',
    year: 'year: 2026',
    role: 'role: Designer',
    team: 'team: solo',
    tags: 'tags: [WEB, SOLO]',
    summary: 'summary: "A demo."',
    tldr: 'tldr:\n  problem: "P"\n  did: "D"\n  result: "R"',
    metric: 'metric:\n  value: "3"\n  label: "things"',
    cover: 'cover: /work/demo/cover.png',
    coverAlt: 'coverAlt: "A cover"',
    live: 'live: https://example.com',
    repo: 'repo: https://github.com/x/y',
    order: 'order: 1',
  };
  const merged = { ...base, ...over };
  for (const k of drop) delete merged[k];
  return `---\n${Object.values(merged).join('\n')}\n---\n`;
};

const proj = (o: Partial<Project> & { slug: string; order: number }): Project => ({
  title: o.slug, year: 2026, role: 'r', team: 't', tags: ['A'], summary: 's',
  tldr: { problem: 'p', did: 'd', result: 'r' }, metric: { value: '1', label: 'l' },
  cover: '/c.png', coverAlt: 'c', readTime: 1, ...o,
});

describe('readTime', () => {
  it('rounds words / 200 up', () => {
    expect(readTime('word '.repeat(250))).toBe(2);
  });
  it('minimum is 1', () => {
    expect(readTime('')).toBe(1);
  });
});

describe('parseProject', () => {
  it('parses valid frontmatter', () => {
    const p = parseProject('demo', fm() + 'word '.repeat(250));
    expect(p).toEqual({
      slug: 'demo', title: 'Demo', year: 2026, role: 'Designer', team: 'solo',
      tags: ['WEB', 'SOLO'], summary: 'A demo.',
      tldr: { problem: 'P', did: 'D', result: 'R' },
      metric: { value: '3', label: 'things' },
      cover: '/work/demo/cover.png', coverAlt: 'A cover',
      live: 'https://example.com', repo: 'https://github.com/x/y',
      order: 1, readTime: 2,
    });
  });

  it('throws naming file and field', () => {
    expect(() => parseProject('x', fm({}, ['title']))).toThrow(/x\.mdx: invalid or missing "title"/);
    expect(() => parseProject('x', fm({ year: 'year: "2026"' }))).toThrow(/x\.mdx: invalid or missing "year"/);
    expect(() => parseProject('x', fm({ coverAlt: 'coverAlt: ""' }))).toThrow(/x\.mdx: invalid or missing "coverAlt"/);
  });

  it('rejects non-list tags', () => {
    expect(() => parseProject('x', fm({ tags: 'tags: WEB' }))).toThrow(/"tags"/);
  });
});

describe('nextProject', () => {
  it('wraps last to first', () => {
    const a = proj({ slug: 'a', order: 1 });
    const b = proj({ slug: 'b', order: 2 });
    expect(nextProject('a', [a, b])).toBe(b);
    expect(nextProject('b', [a, b])).toBe(a);
  });
});

describe('getTimeline', () => {
  it('sorts by year desc and keeps order within a year', () => {
    const extra: TimelineRow[] = [
      { title: 'Old', year: 2023, role: 'r' },
      { title: 'Mid1', year: 2025, role: 'r' },
      { title: 'Mid2', year: 2025, role: 'r' },
    ];
    const rows = getTimeline([proj({ slug: 'a', title: 'New', order: 1 })], extra);
    expect(rows.map((r) => r.title)).toEqual(['New', 'Mid1', 'Mid2', 'Old']);
  });

  it('maps projects to rows with Play for games, Live otherwise', () => {
    const rows = getTimeline(
      [
        proj({ slug: 'a', title: 'Web', order: 1, role: 'Designer', live: 'https://w' }),
        proj({ slug: 'b', title: 'Game', order: 2, tags: ['GAME', 'WEB'], live: 'https://g' }),
      ],
      [],
    );
    expect(rows).toEqual([
      { title: 'Web', year: 2026, role: 'Designer', href: 'https://w', linkLabel: 'Live ↗' },
      { title: 'Game', year: 2026, role: 'r', href: 'https://g', linkLabel: 'Play ↗' },
    ]);
  });
});

describe('projectLinks', () => {
  it('omits missing urls', () => {
    const p = proj({ slug: 'a', order: 1, live: 'https://l' });
    expect(projectLinks(p)).toEqual([{ label: 'Live Website', href: 'https://l' }]);
  });
});

describe('real content', () => {
  it('parses in order', () => {
    const ps = getProjects();
    expect(ps.map((p) => p.slug)).toEqual(['yee-peng-cnx', 'the-reborn-gacha']);
  });
});
