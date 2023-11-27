import { defineConfig } from 'cypress';
import { setupNodeEvents } from './tests/plugins';

export default defineConfig({
  fixturesFolder: 'tests/fixtures',
  screenshotsFolder: 'tests/artifacts/screenshots',
  videosFolder: 'tests/artifacts/videos',
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 50000,
  requestTimeout: 50000,
  responseTimeout: 50000,
  chromeWebSecurity: false,
  viewportHeight: 768,
  viewportWidth: 1024,
  retries: {
    runMode: 3,
    openMode: 0,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return setupNodeEvents(on, config);
    },
    specPattern: 'tests/integration/**/*.spec.{js,jsx,ts,tsx}',
    supportFile: 'tests/support/index.js',
  }
});
