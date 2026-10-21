import fs from 'node:fs';
import path from 'node:path';

/** True when the cover image file exists in /public (build-time check). */
export const hasCover = (cover: string): boolean =>
  fs.existsSync(path.join(process.cwd(), 'public', cover));
