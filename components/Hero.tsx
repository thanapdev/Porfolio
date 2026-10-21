import HeroInteractive from './HeroInteractive';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <HeroInteractive name="Thanapong Yamkamol">
      <p className={styles.tag}>
        Designs you can touch. I research, sketch and prototype, then ship real, playable web things. Student based in
        Bangkok, open to freelance work and UX/UI roles.
      </p>
      <div className="btns">
        <a className="btn red" href="#work">See my work ↓</a>
        <a className="btn" href="#contact">Get in touch</a>
      </div>
      <p className={`${styles.hint} hand`}>psst… everything with a shadow is draggable →</p>
    </HeroInteractive>
  );
}
