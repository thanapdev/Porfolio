import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} Thanapong Yamkamol</span>
      <span>Designed &amp; built by me, with glue and stickers.</span>
    </footer>
  );
}
