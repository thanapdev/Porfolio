import s from './mdx.module.css';

export default function Persona({ who, quote, needs }: { who: string; quote: string; needs: string }) {
  return (
    <div className={s.persona}>
      <b className={s.who}>{who}</b>
      <blockquote className="hand">“{quote}”</blockquote>
      <div><b>Needs:</b> {needs}</div>
    </div>
  );
}
