# The Impossible Clock

[![Netlify Status](https://api.netlify.com/api/v1/badges/69b0dcaa-051c-42a9-96b2-a4dc35d966af/deploy-status)](https://app.netlify.com/sites/impossible-clock/deploys)
[![CI](https://github.com/internetblacksmith/impossible-clock/actions/workflows/ci.yml/badge.svg)](https://github.com/internetblacksmith/impossible-clock/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/internetblacksmith/impossible-clock/branch/main/graph/badge.svg)](https://codecov.io/gh/internetblacksmith/impossible-clock)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

Live at **<https://ic.internetblacksmith.dev>**.

A digital clock displayed on seven-segment SVG displays — with the twist that each of the H / M / S components has its own toggle switch. Hide any combination and try to read what's left. Try to understand it if you dare ;)

## Features

- Seven-segment SVG displays driven entirely by CSS class state
- Independent toggle switches for hours, minutes, and seconds
- Responsive layout from mobile up to 4K
- Zero runtime dependencies — vanilla ES modules, no framework

## Getting Started

```bash
git clone https://github.com/internetblacksmith/impossible-clock.git
cd impossible-clock
npm install
```

Requires Node `>=24.0.0` (development is pinned to `25.9.0` via `.nvmrc` / `.node-version`).

## Develop

```bash
npm run dev             # Vite dev server on http://localhost:3000
npm run build           # Production build into dist/
npm run preview         # Serve dist/ for inspection
```

## Test

```bash
npm run test:unit       # Vitest — pure helpers (fast)
npm run test            # Cypress E2E + visual regression
npm run test:no-visual  # Cypress E2E without visual diff
npm run test:coverage   # E2E with code coverage via nyc
npm run cy:open         # Open Cypress interactive runner
```

Test layers:

- **Unit** ([Vitest](https://vitest.dev/)) — the pure digit/status helpers in `app/scripts/clock.js`
- **E2E** ([Cypress](https://www.cypress.io/)) — clock accuracy, toggle behaviour, performance, responsive layout
- **Visual regression** (cypress-image-diff-js) — pixel comparison of the rendered seven-segment displays against baselines committed under `cypress-visual-screenshots/`

## Lint & Format

```bash
npm run lint            # ESLint
npm run format          # Prettier --write
npm run format:check    # Prettier --check
```

ESLint (flat config) handles code quality, Prettier handles formatting — separated so they don't fight.

## Built With

- [Vite](https://vitejs.dev/) — build & dev server
- [Lightning CSS](https://lightningcss.dev/) — Rust-based CSS transformer + minifier (replaces the old PostCSS/autoprefixer/cssnano trio)
- [SCSS](https://sass-lang.com/) — styling
- [Vitest](https://vitest.dev/) — unit tests
- [Cypress](https://www.cypress.io/) — E2E and visual regression
- [ESLint](https://eslint.org/) 9 + [Prettier](https://prettier.io/) — code quality & formatting
- Vanilla ES modules — no framework

## Browser Support

Modern evergreen browsers (last two versions of Chrome / Firefox / Safari / Edge) plus Firefox ESR, driven by the `browserslist` block in `package.json`. No transpilation to ES5 and no polyfills are shipped — the build target is `es2020`.

## Deployment

Deployed to Netlify on every push to `main`. Build config lives in [`netlify.toml`](netlify.toml) — that's the source of truth for the build command, Node version, security headers, and cache rules. The dashboard's legacy `build_settings.env` API is intentionally unused.

## License

MIT — see [LICENSE.md](LICENSE.md).

---

**Remember**: the clock's behaviour is intentionally mysterious. Can you figure out how to read it? 🕐
