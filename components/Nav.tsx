'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Nav.module.css';

const links = [
  ['Work', '/#work'],
  ['About', '/#about'],
  ['Timeline', '/#timeline'],
  ['Contact', '/#contact'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open]);
  return (
    <nav className={`${styles.nav} ${open ? styles.open : ''}`} aria-label="Main">
      <div className={`wrap ${styles.bar}`}>
        <Link className={`hand ${styles.logo}`} href="/">
          thanap.
        </Link>
        <button
          className={styles.menuBtn}
          type="button"
          aria-expanded={open}
          aria-controls="navList"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>
        <ul id="navList" className={styles.list}>
          {links.map(([label, href]) => (
            <li key={href}>
              <Link href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
