import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { findPlaceholders } from './check-placeholders.mjs';

function tmpWith(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ph-'));
  for (const [name, body] of Object.entries(files)) fs.writeFileSync(path.join(dir, name), body);
  return dir;
}

describe('findPlaceholders', () => {
  it('finds ph class', () => {
    const dir = tmpWith({ 'a.html': '<span class="hand ph">x</span>', 'b.html': '<p>ok</p>' });
    expect(findPlaceholders(dir)).toEqual(['a.html']);
  });
  it('ignores lookalikes', () => {
    const dir = tmpWith({ 'a.html': '<i class="phone"></i><b class="graph"></b>' });
    expect(findPlaceholders(dir)).toEqual([]);
  });
});
