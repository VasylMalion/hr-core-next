import { defineConfig } from 'cypress'
const cucumber = require('cypress-cucumber-preprocessor').default
import browserify from '@cypress/browserify-preprocessor'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Create a Browserify options object with TypeScript support
      const browserifyOptions = {
        ...browserify.defaultOptions,
        typescript: require.resolve("typescript"),
      };

      // Pass the options object to the cucumber preprocessor
      on("file:preprocessor", cucumber(browserifyOptions));

      return config;
    },
    specPattern: "**/*.feature"
  },
})
