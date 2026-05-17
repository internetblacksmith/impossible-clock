# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Impossible Clock is a creative web-based digital clock that displays time using seven-segment SVG displays. The "impossible" angle: each time component (hours, minutes, seconds) has its own toggle switch, so you can hide any combination and watch the remaining digits march on in isolation.

## Stack

- **Frontend**: vanilla ES modules + SCSS, no framework
- **Build**: [Vite](https://vitejs.dev/) (root `app/`, output `dist/`)
- **Unit tests**: [Vitest](https://vitest.dev/) for pure helpers in `app/scripts/clock.js`
- **E2E + visual regression**: [Cypress](https://www.cypress.io/) with [cypress-image-diff-js](https://github.com/kien-ht/cypress-image-diff-js)
- **Coverage**: `nyc` (via istanbul-instrumented build) + Codecov
- **Lint / format**: ESLint 9 (flat config) + Prettier (Prettier owns formatting, ESLint owns code quality)
- **Hosting**: Netlify, configured by `netlify.toml`

## Layout

- `app/index.html` — single entry, includes the embedded SVG seven-segment displays and the H/M/S toggle switches.
- `app/scripts/clock.js` — pure helpers (`zeroPad`, `digit`, `status`, `statusClass`, `HIDDEN_DIGIT`). No DOM imports — these are what Vitest exercises.
- `app/scripts/main.js` — thin bootstrap. Looks up DOM nodes, reads the checkboxes, calls `digit()` per position, sets `class` attributes once per second via `setInterval`. Uses `setAttribute("class", …)` so the same code path covers HTML body and SVG display elements.
- `app/styles/*.scss` — SCSS modules (`clock`, `switch`, `grid`, `github`, `variables`) composed in `main.scss`.
- `test/clock.test.js` — Vitest unit tests for the pure helpers.
- `cypress/e2e/*.cy.js` — Cypress specs: clock accuracy, toggle behaviour, responsive layout, performance/interaction, visual-regression.
- `vite.config.js` — single config for Vite (build), the dev server, and Vitest (`test` block, node environment).
- `eslint.config.mjs` — flat config; separate sections for browser scripts, Node-side configs, and Cypress globals.

### Clock encoding (worth knowing before editing the JS or CSS)

Each digit position renders via CSS classes like `display-no-X-Y-Z`, where X is a single hour digit, Y a single minute digit, Z a single second digit. When a time component is disabled, that slot uses the special string `"10"` — the CSS interprets it as "no segments lit". `HIDDEN_DIGIT` in `clock.js` is that exact string; don't change the value unless you're also rewriting the SCSS, and the test in `clock.test.js` pins this contract.

The body and the GitHub logo also get class names like `body-on-off-on` / `github-logo-on-off-on` to drive layout/colour changes when components are toggled.

## Common Commands

```bash
npm run dev             # Vite dev server on http://localhost:3000
npm run build           # Production build into dist/
npm run preview         # Serve dist/ for inspection

npm run test:unit       # Vitest (pure helpers, headless, fast)
npm run test            # Cypress E2E + visual regression (slow)
npm run test:no-visual  # Cypress E2E without visual diff
npm run test:coverage   # E2E with code coverage via nyc

npm run lint            # ESLint
npm run lint:fix        # ESLint --fix
npm run format          # Prettier --write
npm run format:check    # Prettier --check
```

## CI

`.github/workflows/ci.yml`:

- `test` job runs on a matrix of Node 24.x and 25.x, runs `test:unit` + `test:coverage`, uploads screenshots/baselines as artifacts on failure, pushes coverage to Codecov on the 24.x run.
- `lint` job runs Prettier (`format:check`) and ESLint (`lint`).
- Visual-regression baselines have CI-specific copies under `cypress-visual-screenshots/comparison/baseline-ci/` to avoid host-dependent rendering differences.

## Critical Rules

- Keep `app/scripts/clock.js` pure (no `document`, `window`, or `setInterval`). All side-effects belong in `main.js`. Tests then live in `test/` without needing jsdom.
- The `HIDDEN_DIGIT = "10"` value is part of the CSS contract — don't change one without the other, and don't drop the test that pins the literal.
- Visual-regression baselines are sensitive to font hinting and subpixel rendering. The `.actual-label` H/M/S text is masked in `cypress-image-diff.config.js` to keep baselines stable across hosts; preserve that mask if you touch the visual-regression config.
- Netlify config lives in `netlify.toml` (build command, env, security headers, caching). Don't migrate any of it back to the deprecated dashboard `build_settings.env` API.
