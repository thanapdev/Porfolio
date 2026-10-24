export type Design = {
  slug: string;
  title: string;
  figma: string;
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
];

/** Figma's embed host, showing only the screen on the paper background. */
export const figmaEmbedUrl = (proto: string): string =>
  proto.replace('https://www.figma.com/', 'https://embed.figma.com/') +
  '&embed-host=portfolio&hide-ui=1&theme=light&bg-color=f5efe2&device-frame=0&scaling=contain';
