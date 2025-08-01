const config = {
  ROOT_DIR: 'cypress-visual-screenshots',
  SCREENSHOTS_DIR: 'comparison',
  BASELINE_DIR: 'baseline',
  DIFF_DIR: 'diff',
  THRESHOLD: 0.1, // 0.1% threshold for differences
  RETRY_OPTIONS: {
    limit: 1, // Retry once if comparison fails
    delay: 100
  },
  FAIL_ON_MISSING_BASELINE: false // Create baseline if missing
};

module.exports = config;