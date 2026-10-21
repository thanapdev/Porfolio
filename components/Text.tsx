export default function Text({ value }: { value: string }) {
  return /^\[.*\]$/.test(value) ? <span className="ph">{value}</span> : <>{value}</>;
}
