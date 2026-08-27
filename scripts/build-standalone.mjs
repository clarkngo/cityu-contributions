// Rebuilds Contributions Portfolio.standalone.html (and its copy, index.html,
// used by GitHub Pages) from Contributions Portfolio.html + src/* + vendor/*.
// Pure string concatenation, no compression, no runtime unpacking — every
// asset is inlined directly, so the output opens via file:// with zero
// network requests. Run: node scripts/build-standalone.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const rel = (...p) => path.join(repoRoot, ...p);
const read = (...p) => readFileSync(rel(...p), 'utf8');

// Guards against an inlined source file prematurely closing its <script> tag.
const escapeScriptClose = (s) => s.split('</script>').join('<\\/script>');

let html = read('Contributions Portfolio.html');

// --- Fonts: drop the Google Fonts <link> tags, inline @font-face CSS with
// each url("<uuid>") resolved to a base64 data: URI from vendor/fonts/. ---
html = html
  .replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com" \/>\n/, '\n')
  .replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin \/>\n/, '\n')
  .replace(/\s*<link\s+href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]*"\s*\n?\s*rel="stylesheet"\s*\n?\s*\/>\n/, '\n');

let fontsCss = read('vendor', 'fonts.css');
fontsCss = fontsCss.replace(/url\("([0-9a-f-]{36})"\)/g, (_, uuid) => {
  const bytes = readFileSync(rel('vendor', 'fonts', `${uuid}.woff2`));
  return `url("data:font/woff2;base64,${bytes.toString('base64')}")`;
});
// A replacement function (not a string) is required here and below: the
// string form of String.replace treats "$&", "$`", "$'", "$$" and "$n" in
// the replacement as special patterns, and real-world source (React,
// ReactDOM, Babel) reliably contains those sequences by coincidence —
// with a multi-MB string as the "replacement", that turns into a
// multi-hundred-MB output.
html = html.replace('</head>', () => `  <style>\n${fontsCss}\n  </style>\n</head>`);

// --- The 3 CDN libraries: inline their vendored source, drop integrity/crossorigin. ---
const cdnLibs = [
  [/<script src="https:\/\/unpkg\.com\/react@18\.3\.1\/umd\/react\.development\.js"[^>]*><\/script>/, 'react.development.js'],
  [/<script src="https:\/\/unpkg\.com\/react-dom@18\.3\.1\/umd\/react-dom\.development\.js"[^>]*><\/script>/, 'react-dom.development.js'],
  [/<script src="https:\/\/unpkg\.com\/@babel\/standalone@7\.29\.0\/babel\.min\.js"[^>]*><\/script>/, 'babel.min.js'],
];
for (const [pattern, file] of cdnLibs) {
  const code = escapeScriptClose(read('vendor', file));
  const replaced = html.replace(pattern, () => `<script>${code}</script>`);
  if (replaced === html) throw new Error(`CDN script tag for ${file} not found`);
  html = replaced;
}

// --- src/data.js: plain inline script. ---
{
  const code = escapeScriptClose(read('src', 'data.js'));
  const replaced = html.replace(
    '<script src="src/data.js"></script>',
    () => `<script>${code}</script>`
  );
  if (replaced === html) throw new Error('src/data.js script tag not found');
  html = replaced;
}

// --- The 6 JSX files: inline as type="text/babel", in their existing order. ---
for (const file of ['shared.jsx', 'gallery.jsx', 'v1-dossier.jsx', 'v2-ledger.jsx', 'v3-curriculum.jsx', 'app.jsx']) {
  const code = escapeScriptClose(read('src', file));
  const pattern = `<script type="text/babel" src="src/${file}"></script>`;
  if (!html.includes(pattern)) throw new Error(`${file} script tag not found`);
  html = html.replace(pattern, () => `<script type="text/babel">${code}</script>`);
}

const outDir = process.argv[2] ? path.resolve(process.argv[2]) : repoRoot;
const outputs = ['Contributions Portfolio.standalone.html', 'index.html'];
for (const out of outputs) writeFileSync(path.join(outDir, out), html);

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;
console.log(`Wrote ${outputs.join(' and ')} (${kb(Buffer.byteLength(html))} each)`);
