const config = {
  ROOT_DIR: 'cypress-visual-screenshots',
  SCREENSHOTS_DIR: 'comparison',
  BASELINE_DIR: 'baseline',
  DIFF_DIR: 'diff',
  THRESHOLD: 10, // 10% threshold for cross-platform compatibility
  RETRY_OPTIONS: {
    limit: 2, // Retry twice if comparison fails
    delay: 100
  },
  COMPARISON_OPTIONS: {
    threshold: 0.10, // 10% pixel threshold
    includeAA: false, // Ignore anti-aliasing differences
    diffColorAlt: [255, 0, 0], // Red for differences
    diffColor: [255, 0, 0],
    alpha: 0.5,
    // Additional options for better cross-platform compatibility
    scaleToSameSize: true, // Scale images to same size if different
    ignore: 'antialiasing' // Ignore antialiasing differences
  },
  CAPTURE_OPTIONS: {
    disableTimersAndAnimations: true,
    screenshotDelay: 200, // Wait for fonts to load
    beforeScreenshot: () => {
      // Ensure consistent rendering
      cy.wait(100);
    }
  },
  FAIL_ON_MISSING_BASELINE: false // Create baseline if missing
};

module.exports = config;