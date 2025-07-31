# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Impossible Clock is a creative web-based digital clock that displays time using seven-segment displays. The "impossible" aspect comes from the ability to toggle individual time components (hours, minutes, seconds) on/off, creating unusual time display combinations.

## Architecture

- **Frontend**: Vanilla JavaScript, SCSS, HTML
- **Build System**: Gulp-based workflow with Babel, Sass compilation, and asset optimization
- **Testing**: Cypress for end-to-end testing
- **Deployment**: Static site ready for Netlify deployment

### Key Components

- `app/index.html`: Main HTML with embedded SVG seven-segment displays
- `app/scripts/main.js`: Core clock logic with digit manipulation and toggle controls
- `app/styles/`: SCSS modules for styling (clock, switches, grid, GitHub logo)
- `gulpfile.js`: Complete build pipeline with development server, linting, and production builds

### Clock Logic

The clock uses a unique digit encoding system where each display element gets CSS classes like `display-no-X-Y-Z` where X, Y, Z represent hour, minute, and second digits respectively. When a time component is disabled, it uses "10" as a special value to hide those segments.

## Development Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Test server (for Cypress)
npm run serve:test

# Run all tests
npm run test

# Open Cypress test runner
npm run cy:open
```

## Build System Details

**Modern Vite-based build system** with:
- **Fast Development**: Hot Module Replacement (HMR) and instant server start
- **SCSS Processing**: Built-in Sass support with PostCSS (Autoprefixer, CSSnano)
- **JavaScript**: ES modules with legacy browser support via Rollup
- **Assets**: Automatic optimization and code splitting
- **Development**: Vite dev server on port 3000 with instant updates

## Testing

Cypress tests verify:
- Default checkbox states (all time components enabled)
- Proper digit display updates every second
- Toggle functionality for hiding/showing hours, minutes, or seconds
- CSS class changes when time components are disabled

Tests use a fixed date (March 14, 2017) and time manipulation via `cy.tick()` for predictable assertions.