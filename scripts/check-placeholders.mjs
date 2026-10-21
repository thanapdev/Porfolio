import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PH = /class="[^"]*\bph\b[^"]*"/;

export function findPlaceholders(dir) {
  return fs
    .readdirSync(dir, { recursive: true })
    .map(String)
    .filter((f) => f.endsWith('.html'))
    .filter((f) => PH.test(fs.readFileSync(path.join(dir, f), 'utf8')))
    .sort();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const found = findPlaceholders('.next/server/app');
  if (found.length) {
    const list = found.map((f) => `  - ${f}`).join('\n');
    if (process.env.VERCEL_ENV === 'production') {
      console.error(`Placeholders remain in:\n${list}`);
      process.exit(1);
    }
    console.warn(`Warning: placeholders remain in:\n${list}`);
  }
}
