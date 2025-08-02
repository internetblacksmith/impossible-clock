# Codecov Setup

## Configuration

This project is configured to use Codecov for code coverage reporting. The configuration is defined in `codecov.yml`.

## GitHub Actions Integration

Code coverage is automatically generated and uploaded during CI runs. Coverage is only uploaded once per commit (from Node.js 20.x matrix job).

## Local Testing

To run tests with coverage locally:

```bash
npm run test:coverage
```

This will generate coverage reports in the `coverage/` directory.

## Setup Requirements

1. **Codecov Token**: Add `CODECOV_TOKEN` to your GitHub repository secrets
   - Get your token from: https://app.codecov.io/github/internetblacksmith/impossible-clock/settings
   - Add it in: Settings → Secrets and variables → Actions → New repository secret

2. **Badge**: Once coverage is uploaded, you can add a coverage badge to your README:
   ```markdown
   [![codecov](https://codecov.io/gh/internetblacksmith/impossible-clock/branch/main/graph/badge.svg)](https://codecov.io/gh/internetblacksmith/impossible-clock)
   ```

## Coverage Thresholds

The project is configured with the following coverage thresholds:
- Overall project: Auto-detected baseline with 1% threshold
- Patch coverage: Auto-detected baseline with 1% threshold
- Target coverage: 80% for branches, lines, functions, and statements

## Ignored Files

The following are excluded from coverage:
- `node_modules/`
- `dist/`
- `cypress/`
- Build configuration files