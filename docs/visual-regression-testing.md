# Visual Regression Testing

## Overview

Visual regression tests compare screenshots of the application against baseline images to detect unintended visual changes.

## Cross-Platform Compatibility

To ensure tests work across different environments (local development on macOS/Windows and CI on Linux), we've implemented several measures:

1. **Higher threshold tolerance**: 5% threshold to accommodate rendering differences
2. **CSS normalization**: Forces consistent font smoothing and disables animations
3. **Font loading wait**: Ensures fonts are fully loaded before screenshots
4. **Anti-aliasing ignore**: Comparison ignores anti-aliasing differences

## Configuration

Settings in `cypress-image-diff.config.js`:
- Threshold: 5% for cross-platform compatibility
- Retry attempts: 2 times if comparison fails
- Anti-aliasing: Ignored in comparisons
- Scale to same size: Enabled for different resolutions

## Running Tests

### Local Testing
Run all tests including visual regression:
```bash
npm test
```

### CI Testing
Visual regression tests run automatically in CI with the same command:
```bash
npm test
```

### Manual Visual Regression Testing
A separate workflow can be triggered manually:
1. Go to Actions → Visual Regression workflow
2. Click "Run workflow"
3. Optionally check "Update baseline images" to update baselines from CI

## Handling Failures

If visual regression tests fail:
1. Download artifacts from the GitHub Actions run
2. Review the diff images to determine if changes are intentional
3. If changes are intentional, update baseline images locally or via the manual workflow

## Best Practices

1. Always review visual regression failures before dismissing them
2. Update baselines when making intentional UI changes
3. Use the manual workflow to update baselines from a consistent CI environment