import Link from 'next/link';
import type { CSSProperties } from 'react';
import { getProjects, getTimeline } from '@/lib/projects';
import { timelineExtra } from '@/lib/timeline-extra';
import Text from './Text';
import styles from './Timeline.module.css';

export default function Timeline() {
  const rows = getTimeline(getProjects(), timelineExtra);
  return (
    <section id="timeline">
      <div className="wrap">
        <p className="eyebrow">the logbook</p>
        <h2 className="h2 disp">Project timeline</h2>
        <div className={styles.sheet}>
          <table className={styles.tl} data-reveal>
            <thead>
              <tr><th scope="col">Project</th><th scope="col">Year</th><th scope="col">Role</th><th scope="col">Link</th></tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.title} style={{ '--i': i } as CSSProperties}>
                  <td><Text value={r.title} /></td>
                  <td data-l="year">{r.yearLabel ?? r.year}</td>
                  <td data-l="role"><Text value={r.role} /></td>
                  <td data-l="link">
                    {r.links.map((l, i) => (
                      <span key={l.href}>{i > 0 && ' / '}<Link href={l.href} {...(l.href.startsWith('http') && { target: '_blank', rel: 'noopener' })}>{l.label}</Link></span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
