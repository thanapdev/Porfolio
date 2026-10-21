export const isPlaceholder = (value: string): boolean => /^\[.*\]$/.test(value);

export default function Text({ value }: { value: string }) {
  return isPlaceholder(value) ? <span className="ph">{value}</span> : <>{value}</>;
}
