import type { ReactNode } from 'react';
import s from './mdx.module.css';

export default function Grid({ children }: { children: ReactNode }) {
  return <div className={s.grid}>{children}</div>;
}
