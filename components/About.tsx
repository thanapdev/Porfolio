import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
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
  const hasPhoto = fs.existsSync(path.join(process.cwd(), 'public/profile.jpg'));
  return (
    <section id="about">
      <div className="wrap">
        <p className="eyebrow">about me</p>
        <h2 className="h2 disp">Designer by trade,<br />tinkerer by habit.</h2>
        <div className={styles.about}>
          <figure className={styles.polaroid}>
            <div className={styles.img}>
              {hasPhoto ? (
                <Image src="/profile.jpg" alt="Thanapong Yamkamol" fill sizes="300px" style={{ objectFit: 'cover' }} />
              ) : (
                <span className="ph">[Profile photo: add /profile.jpg]</span>
              )}
            </div>
            <figcaption className="hand">that&apos;s me!</figcaption>
          </figure>
          <div className={styles.text}>
            <p>I&apos;m a 3rd-year Computer Innovation for Communication student at COSCI, Srinakharinwirot University, on the UX/UI design track.</p>
            <p>I got into tech because I wanted to make useful things. Coding came first, then web development, which I liked straight away. Then I found UX/UI design and was hooked: talking to people, finding out what they need, and working out what to build for them. Now I do the research and the Figma prototypes, and I build the front end myself. I love seeing people use it and tell me &ldquo;this is cool&rdquo; or &ldquo;this makes things so much easier.&rdquo;</p>
            <p>Looking for a UX/UI design role in 2026, and open to freelance projects now.</p>
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
