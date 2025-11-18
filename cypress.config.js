// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com', 
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000, // Aumente para 60 segundos
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      return config
    },
  },
  video: true,
  videoCompression: 15,
  videosFolder: 'cypress/videos',
  
})