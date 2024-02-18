import { defineConfig } from 'cypress';
import { setupNodeEvents } from './cypress/plugins/plugins';
export default defineConfig({
  e2e: {
    baseUrl: 'https://app.noumena.pro/',
    specPattern: 'cypress/e2e/**/*.Sanity.spec.tsx',
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 30000,
    video: false,
    setupNodeEvents,
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  chromeWebSecurity: false,
  experimentalMemoryManagement: true,
});