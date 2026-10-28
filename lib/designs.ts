export type Design = {
  slug: string;
  title: string;
  /** prototype link, played in the phone */
  figma: string;
  /** design file for "Open in Figma", when it differs from the prototype */
  file?: string;
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
    tags: ['UX/UI', 'Mobile app', 'Figma prototype'],
    blurb: '[one line: what the app does and who it is for]',
    year: '[year?]',
    kind: '[class / personal / client?]',
  },
  {
    slug: 'accesscampus',
    title: 'AcessCampus',
    figma: 'https://www.figma.com/proto/cw83ZV6F7lFHe9VYC0Roes/AcessCampus?node-id=31-55&starting-point-node-id=31%3A55',
    file: 'https://www.figma.com/design/cw83ZV6F7lFHe9VYC0Roes/AcessCampus?node-id=39-5132',
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
