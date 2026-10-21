import type { ReactNode } from 'react';
import s from './mdx.module.css';

export default function Callout({ children }: { children: ReactNode }) {
  return <aside className={s.callout}>{children}</aside>;
}
