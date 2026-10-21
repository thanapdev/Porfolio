import type { MDXComponents } from 'mdx/types';
import StickyNote from '@/components/mdx/StickyNote';
import Polaroid from '@/components/mdx/Polaroid';
import BeforeAfter from '@/components/mdx/BeforeAfter';
import Callout from '@/components/mdx/Callout';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { StickyNote, Polaroid, BeforeAfter, Callout, ...components };
}
