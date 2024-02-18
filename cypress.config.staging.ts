import { defineConfig } from 'cypress';
import { setupNodeEvents } from './cypress/plugins/plugins';
export default defineConfig({
  e2e: {
    baseUrl: 'https://noumena-web-staging.web.app/',
    specPattern: 'cypress/e2e/**/*.spec.tsx',
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 30000,
    video: false,
    setupNodeEvents,
    viewportWidth: 1920,
    viewportHeight: 1080,
    numTestsKeptInMemory: 30,
    testIsolation: true
  },
  chromeWebSecurity: false,
  experimentalMemoryManagement: true,
});
