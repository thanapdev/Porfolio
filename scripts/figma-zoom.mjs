// Pulls a Figma frame and cuts it into the files components/mdx/ZoomBoard.tsx reads.
// usage: node scripts/figma-zoom.mjs <figma frame link> <out dir> <startX> <startY> <startW>
// token: FIGMA_TOKEN, or the file ~/.figma_token (a personal access token with read-only file content access)
// Figma exports the frame as a vector PDF, so scripts/zoom-tiles.swift can cut it at full size.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [link, out, ...start] = process.argv.slice(2);
if (!link || !out || start.length !== 3) {
  console.error('usage: node scripts/figma-zoom.mjs <figma frame link> <out dir> <startX> <startY> <startW>');
  process.exit(1);
}
const token = process.env.FIGMA_TOKEN ?? fs.readFileSync(path.join(os.homedir(), '.figma_token'), 'utf8').trim();
const u = new URL(link);
const key = u.pathname.split('/')[2];
const id = u.searchParams.get('node-id')?.replace('-', ':');
if (!key || !id) throw new Error('the link needs a file key and a node-id');

const res = await fetch(`https://api.figma.com/v1/images/${key}?ids=${encodeURIComponent(id)}&format=pdf`, { headers: { 'X-Figma-Token': token } });
const body = await res.json();
if (!res.ok || body.err || !body.images?.[id]) throw new Error(`Figma: ${res.status} ${body.err ?? JSON.stringify(body)}`);
const file = await fetch(body.images[id]);
if (!file.ok) throw new Error(`download: ${file.status}`);
const pdf = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'figma-')), 'frame.pdf');
fs.writeFileSync(pdf, Buffer.from(await file.arrayBuffer()));

// clear old tiles, but only from a folder this script made before
if (fs.existsSync(path.join(out, 'base.png'))) fs.rmSync(out, { recursive: true });
execFileSync('swift', [path.join(import.meta.dirname, 'zoom-tiles.swift'), pdf, out, ...start], { stdio: 'inherit' });
