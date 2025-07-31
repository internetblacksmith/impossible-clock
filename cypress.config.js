import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    projectId: 'rckh63',
    specPattern: 'cypress/integration/**/*.spec.js',
    supportFile: 'cypress/support/index.js'
  }
});