// One-time extraction of the vendored CDN libraries and Google Fonts that
// "Claude Design" baked into Contributions Portfolio.standalone.html, so
// build-standalone.mjs can rebuild that file locally without any network
// access. Source of truth is the last git-committed standalone build (the
// working tree copy may be stale/broken) — run this again only if the
// pinned library/font versions in Contributions Portfolio.html ever change.
import { execFileSync } from 'node:child_process';
import { gunzipSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const vendorDir = path.join(repoRoot, 'vendor');
const fontsDir = path.join(vendorDir, 'fonts');
mkdirSync(fontsDir, { recursive: true });

const html = execFileSync(
  'git',
  ['-C', repoRoot, 'show', 'HEAD:Contributions Portfolio.standalone.html'],
  { maxBuffer: 1024 * 1024 * 20 }
).toString('utf8');

function extractScriptJson(type) {
  const openTag = `<script type="${type}">`;
  const start = html.indexOf(openTag);
  if (start === -1) throw new Error(`missing <script type="${type}">`);
  const contentStart = start + openTag.length;
  const end = html.indexOf('</script>', contentStart);
  return JSON.parse(html.slice(contentStart, end));
}

const manifest = extractScriptJson('__bundler/manifest');
let template = extractScriptJson('__bundler/template');

// Recover local-file names for the 10 JS entries by document order: the
// template references each UUID via <script src="UUID"> in exactly the
// same order Contributions Portfolio.html does (3 CDN libs, then the 7
// local src/* files).
const scriptOrder = [
  'react.development.js',
  'react-dom.development.js',
  'babel.min.js',
  'data.js',
  'shared.jsx',
  'gallery.jsx',
  'v1-dossier.jsx',
  'v2-ledger.jsx',
  'v3-curriculum.jsx',
  'app.jsx',
];
const srcUuidsInOrder = [...template.matchAll(/<script[^>]*\ssrc="([0-9a-f-]{36})"/g)].map((m) => m[1]);
if (srcUuidsInOrder.length !== scriptOrder.length) {
  throw new Error(`expected ${scriptOrder.length} script src uuids, found ${srcUuidsInOrder.length}`);
}

let jsCount = 0;
let fontCount = 0;
for (const [uuid, entry] of Object.entries(manifest)) {
  const raw = Buffer.from(entry.data, 'base64');
  const bytes = entry.compressed ? gunzipSync(raw) : raw;

  if (entry.mime === 'font/woff2') {
    writeFileSync(path.join(fontsDir, `${uuid}.woff2`), bytes);
    fontCount++;
    continue;
  }

  const orderIdx = srcUuidsInOrder.indexOf(uuid);
  if (orderIdx === -1) throw new Error(`JS manifest entry ${uuid} not referenced by any <script src> in template`);
  writeFileSync(path.join(vendorDir, scriptOrder[orderIdx]), bytes);
  jsCount++;
}

// The @font-face block: the one <style> in the template's <head> containing
// "@font-face". Keep its url("UUID") placeholders as-is — build-standalone.mjs
// resolves them against vendor/fonts/<uuid>.woff2 at build time.
const styleMatches = [...template.matchAll(/<style>([\s\S]*?)<\/style>/g)];
const fontStyle = styleMatches.map((m) => m[1]).find((css) => css.includes('@font-face'));
if (!fontStyle) throw new Error('could not locate @font-face <style> block in template');
writeFileSync(path.join(vendorDir, 'fonts.css'), fontStyle);

console.log(`Vendored ${jsCount} JS files, ${fontCount} font files, and fonts.css into ${vendorDir}`);
