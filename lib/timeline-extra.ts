import { designs } from './designs';
import type { TimelineRow } from './projects';

const roles: Record<string, string> = {
  roomiematch: 'UX/UI Designer · team of 2',
  accesscampus: 'UX/UI Designer',
};

/** Timeline rows for the Figma designs, listed newest first. */
export const timelineExtra: TimelineRow[] = [...designs].reverse().map((d) => ({
  title: d.title,
  year: Number(d.year.slice(-4)), // a span sorts by its last year
  yearLabel: d.year,
  role: roles[d.slug],
  links: [
    { href: d.figma, label: 'Prototype ↗' },
    ...(d.caseStudy ? [{ href: d.caseStudy, label: 'UX case study ↗' }] : []),
  ],
}));
