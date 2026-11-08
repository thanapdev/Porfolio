export type Design = {
  slug: string;
  title: string;
  /** prototype link, played in the phone */
  figma: string;
  /** research board or case study outside Figma */
  caseStudy?: string;
  tags: string[];
  blurb: string;
  year: string;
  kind: string;
};

export const designs: Design[] = [
  {
    slug: 'roomiematch',
    title: 'RoomieMatch',
    figma: 'https://www.figma.com/proto/XflnePuAHp00z4TEDtzwJx/RoomieMatch?node-id=25-4479&starting-point-node-id=25%3A4479',
    caseStudy: 'https://canva.link/ag8ocmj1n9o4ffd',
    tags: ['UX/UI', 'Mobile app', 'Figma prototype'],
    blurb: 'A roommate-matching app for people looking for a roommate: find someone who fits, then find a place together.',
    year: '2024–2025',
    kind: 'Personal self-learning project · team of 2',
  },
  {
    slug: 'accesscampus',
    title: 'AccessCampus',
    figma: 'https://www.figma.com/proto/cw83ZV6F7lFHe9VYC0Roes/AcessCampus?node-id=31-55&starting-point-node-id=31%3A55',
    caseStudy: 'https://canva.link/e0inqgga5kdhpws',
    tags: ['UX research', 'Accessibility', 'Figma prototype'],
    blurb: 'Route for Everyone: campus routes for wheelchair users and anyone who needs a step-free way, with ramps, lifts and stairs shown before you leave.',
    year: '2026',
    kind: 'Self-learning project',
  },
];

/** Figma's embed host, showing only the screen on the paper background. */
export const figmaEmbedUrl = (proto: string): string =>
  proto.replace('https://www.figma.com/', 'https://embed.figma.com/') +
  '&embed-host=portfolio&hide-ui=1&theme=light&bg-color=f5efe2&device-frame=0&scaling=contain';
