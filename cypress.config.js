// cypress.config.js
const { defineConfig } = require('cypress')

// Variável para compartilhar dados entre testes
let userEmail = '';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      on('task', {
        setUserEmail(email) {
          userEmail = email;
          return null;
        },
        getUserEmail() {
          return userEmail || null;
        }
      })
      return config
    },
  },
})
