import { defineConfig } from 'cypress';
import { setupNodeEvents } from './cypress/plugins/plugins';
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.spec.tsx',
    excludeSpecPattern: 'cypress/e2e/**/*.skip.spec.tsx',
    screenshotOnRunFailure: false,
    video: false,
    pageLoadTimeout: 240000,
    setupNodeEvents,
    experimentalStudio: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  chromeWebSecurity: false,
  experimentalMemoryManagement: true,
});
