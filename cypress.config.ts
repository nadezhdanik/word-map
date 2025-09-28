import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',

    setupNodeEvents(on, config) {
      return config;
    },

    viewportWidth: 1280,
    viewportHeight: 800,

    screenshotOnRunFailure: true,
    video: false,
  },
});
