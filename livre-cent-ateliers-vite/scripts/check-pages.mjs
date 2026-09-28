import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pagesBase, pagesUrl } from '../site.config.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const read = (name) => fs.readFileSync(path.join(dist, name));
const html = read('index.html').toString('utf8');
const book = JSON.parse(fs.readFileSync(path.join(root, 'src/book.json'), 'utf8'));
const map = JSON.parse(fs.readFileSync(path.join(root, 'src/page-map.json'), 'utf8'));
assert.match(html, /<html lang="fr">/);
assert.ok(html.includes(pagesUrl), 'Missing canonical public URL');
assert.ok(!html.includes('/src/main.js'), 'Unbuilt source reference');
const assets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((match) => match[1]).filter((url) => url.includes('/assets/'));
assert.ok(assets.some((url) => url.endsWith('.js')), 'Missing JavaScript bundle');
assert.ok(assets.some((url) => url.endsWith('.css')), 'Missing CSS bundle');
for (const url of assets) {
  assert.ok(url.startsWith(pagesBase), 'Wrong Pages base: '+url);
  assert.ok(read(url.slice(pagesBase.length)).length > 0, 'Empty asset: '+url);
}
assert.equal(read('guide-ln-ia.pdf').subarray(0, 5).toString(), '%PDF-');
assert.equal(createHash('sha256').update(read('guide-ln-ia.pdf')).digest('hex'), map.pdfSha256,
  'The downloadable PDF differs from the edition used by the page links');
assert.deepEqual([...read('couverture.png').subarray(0, 8)], [137,80,78,71,13,10,26,10]);
assert.deepEqual([...read('logo-ln-ia.png').subarray(0, 8)], [137,80,78,71,13,10,26,10]);
assert.equal(book.projects.length, 100);
assert.equal(book.categories.length, 10);
for (const project of book.projects) {
  for (const key of ['brief', 'prompt']) {
    const page = map.projectPages[project.id]?.[key];
    assert.ok(Number.isInteger(page) && page >= 1 && page <= map.pages, 'Invalid page for '+project.id);
  }
}
// Only the static reader and its supplied assets belong in the Pages artifact.
for (const entry of fs.readdirSync(dist, { recursive: true, withFileTypes: true })) {
  const relative = path.relative(dist, path.join(entry.parentPath, entry.name)).replaceAll('\\', '/');
  assert.ok(!entry.isSymbolicLink(), 'Symbolic link in published output: '+relative);
  if (!entry.isFile()) continue;
  assert.ok(['index.html', 'guide-ln-ia.pdf', 'couverture.png', 'logo-ln-ia.png'].includes(relative)
    || /^assets\/[^/]+\.(js|css)$/.test(relative), 'Unexpected published file: '+relative);
}
console.log('Pages ready: '+book.projects.length+' workshops, '+map.pages+' PDF pages, '+assets.length+' linked bundles.');
