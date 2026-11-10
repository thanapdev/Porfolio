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
import FigmaBoard from '@/components/mdx/FigmaBoard';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { StickyNote, Polaroid, BeforeAfter, Callout, Grid, Persona, Journey, Prototype, Screens, FigmaBoard, ...components };
}
