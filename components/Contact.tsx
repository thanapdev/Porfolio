import Footer from './Footer';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className="wrap">
        <p className="eyebrow">say hi</p>
        <h2 className={`${styles.big} disp`}>Let&apos;s make<br />something <em>playable.</em></h2>
        <div className={`btns ${styles.btns}`}>
          <a className="btn red" href="mailto:t.yamkamol.work@gmail.com">Email me</a>
          <a className="btn blue" href="https://www.linkedin.com/in/thanapong-yamkamol-6a1534431/" target="_blank" rel="noopener">LinkedIn ↗</a>
          <a className="btn yel" href="/resume.pdf"><span className="ph">[Resume PDF?]</span></a>
          <a className="btn" href="https://github.com/thanapdev" target="_blank" rel="noopener">GitHub ↗</a>
        </div>
        <Footer />
      </div>
    </section>
  );
}
