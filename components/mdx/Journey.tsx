import s from './mdx.module.css';

type Step = { stage: string; does: string; pain?: string; feels?: string; thinks?: string; chance?: string };

export default function Journey({ steps }: { steps: Step[] }) {
  return (
    <ol className={s.journey}>
      {steps.map((t, i) => (
        <li key={t.stage}>
          <div><b>{i + 1}. {t.stage}</b>{t.does}</div>
          {t.pain && <div><b>Pain point</b>{t.pain}</div>}
          {t.feels && <div><b>Feeling</b>{t.feels}<em>“{t.thinks}”</em></div>}
          {t.chance && <div><b>Design opportunity</b>{t.chance}</div>}
        </li>
      ))}
    </ol>
  );
}
