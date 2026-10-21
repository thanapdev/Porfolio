import type { ReactNode } from 'react';
import s from './mdx.module.css';

export default function StickyNote({ children }: { children: ReactNode }) {
  return <aside className={s.note}>{children}</aside>;
}
