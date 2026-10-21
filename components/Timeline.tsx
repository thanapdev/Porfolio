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
          <table className={styles.tl}>
            <thead>
              <tr><th scope="col">Project</th><th scope="col">Year</th><th scope="col">Role</th><th scope="col">Link</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.title}>
                  <td><Text value={r.title} /></td>
                  <td data-l="year">{r.year}</td>
                  <td data-l="role"><Text value={r.role} /></td>
                  <td data-l="link">
                    {r.href && <a href={r.href} target="_blank" rel="noopener">{r.linkLabel}</a>}
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
