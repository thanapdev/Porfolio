import type { MetadataRoute } from 'next';
import { designs } from '@/lib/designs';
import { getProjects } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/` },
    ...getProjects().map((p) => ({ url: `${SITE_URL}/work/${p.slug}` })),
    ...designs.map((d) => ({ url: `${SITE_URL}/case-study/${d.slug}` })),
  ];
}
