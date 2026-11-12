import type { MDXComponents } from 'mdx/types';
import StickyNote from '@/components/mdx/StickyNote';
import Polaroid from '@/components/mdx/Polaroid';
import BeforeAfter from '@/components/mdx/BeforeAfter';
import Callout from '@/components/mdx/Callout';
import Grid from '@/components/mdx/Grid';
import Persona from '@/components/mdx/Persona';
import Journey from '@/components/mdx/Journey';
import Prototype from '@/components/mdx/Prototype';
import Screens from '@/components/mdx/Screens';
import ZoomBoard from '@/components/mdx/ZoomBoard';
import Wide from '@/components/mdx/Wide';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { StickyNote, Polaroid, BeforeAfter, Callout, Grid, Persona, Journey, Prototype, Screens, ZoomBoard, Wide, ...components };
}
