import SkillChip from './SkillChip';
import styles from './About.module.css';

const skills = [
  { front: 'User Research', back: '[methods?]', color: 'var(--yel)' },
  { front: 'Wireframing', back: 'Figma · Paper', color: 'var(--sky)' },
  { front: 'Prototyping', back: 'Figma · Code', color: 'var(--pink)' },
  { front: 'Visual & UI', back: 'Figma · Photoshop · Canva', color: '#c9f0d6' },
  { front: 'Front-end', back: 'HTML · CSS · TS · Vue · Tailwind', color: '#ffd9b8' },
  { front: 'AI-assisted workflow', back: 'Gen-AI tools', color: '#e3d6ff' },
];

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <p className="eyebrow">about me</p>
        <h2 className="h2 disp">Designer by trade,<br />tinkerer by habit.</h2>
        <div className={styles.about}>
          <figure className={styles.polaroid}>
            <div className={styles.img}><span className="ph">[Profile photo: add /profile.jpg]</span></div>
            <figcaption className="hand">that&apos;s me!</figcaption>
          </figure>
          <div className={styles.text}>
            <p>I&apos;m a Software Engineering student at CAMT, Chiang Mai University <span className="ph">[year of study?]</span>, now living in Bangkok. I like to design things and then build them myself, so the idea that gets tested is the one that ships.</p>
            <p>I care about interfaces that are clear first and fun second. Off the clock I&apos;m a HoYoverse player, which explains the gacha game.</p>
            <p>Currently open to freelance projects and UX/UI internships or junior roles.</p>
            <ul className={styles.skills} aria-label="Skills">
              {skills.map((s) => <li key={s.front}><SkillChip {...s} /></li>)}
            </ul>
            <p className={`${styles.hint} hand`}>tap a skill to flip it</p>
          </div>
        </div>
      </div>
    </section>
  );
}
