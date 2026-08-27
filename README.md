# cityu-contributions

Executive-level contributions portfolio for City University of Seattle.

## Project

- Main source: `src/`
- Static deliverables: `Contributions Portfolio.html`, `Contributions Portfolio.standalone.html`
- Media assets: `assets/` and `uploads/`

## Rebuilding the standalone build

After editing anything in `src/` (content in `data.js`, components in the `.jsx` files), regenerate the two self-contained deliverables — `Contributions Portfolio.standalone.html` and `index.html` (a copy, served by GitHub Pages) — with:

```bash
node scripts/build-standalone.mjs
```

No `npm install` needed — it's a plain Node script that inlines `Contributions Portfolio.html` + `src/*` + the vendored libraries/fonts in `vendor/` (React, ReactDOM, Babel standalone, and the Google Fonts used) into one file. `vendor/` only needs regenerating (`node scripts/extract-vendor.mjs`) if those pinned library or font versions ever change.
