import { defineConfig } from 'cypress';
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/plugin';
import codeCoverageTask from '@cypress/code-coverage/task.js';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    projectId: 'rckh63',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    // Enhanced screenshot settings for visual testing
    screenshotsFolder: 'cypress/screenshots',
    trashAssetsBeforeRuns: false, // Keep baseline images
    env: {
      // For visual regression testing
      failSilently: false
    },
    setupNodeEvents(on, config) {
      const imageConfig = getCompareSnapshotsPlugin(on, config);
      
      // Code coverage
      codeCoverageTask(on, config);
      
      // Merge image config with our custom config
      return {
        ...config,
        ...imageConfig
      };
    }
  }
});