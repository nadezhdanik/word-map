import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://word-map.netlify.app',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 800,
    screenshotOnRunFailure: true,
    video: false,
  },
});
