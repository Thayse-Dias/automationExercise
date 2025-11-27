// cypress.config.js
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

// Variável global para armazenar dados entre tasks
let userData = {};

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",

    specPattern: [
      "cypress/e2e/**/*.feature",     // BDD
      "cypress/e2e/**/*.cy.js"        // Testes tradicionais
    ],

    supportFile: "cypress/support/e2e.js",
    video: true,
    videoCompression: 32,
    videosFolder: "cypress/videos",
    screenshotOnRunFailure: true,

    // Configurações otimizadas para CI
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    retries: {
      runMode: 1,
      openMode: 0
    },

    // MOCHAWESOME REPORTER
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/mochawesome",
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      code: false,
      timestamp: "ddmmyyyy_HHmmss",
      reportFilename: "[status]_[datetime]-[name]",
      quiet: true
    },

    async setupNodeEvents(on, config) {
      // Cucumber Preprocessor (BDD)
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      // TASKS PERSONALIZADAS - ADICIONE ESTA SEÇÃO
      on('task', {
        // Task para armazenar email do usuário
        setUserEmail: (email) => {
          userData.email = email;
          return null;
        },

        // Task para recuperar email do usuário
        getUserEmail: () => {
          return userData.email || null;
        },

        // Task para limpar dados do usuário
        clearUserData: () => {
          userData = {};
          return null;
        },

        // Task para log personalizado
        log: (message) => {
          console.log('🔧 CYPRESS TASK LOG:', message);
          return null;
        }
      });

      // Garante que a pasta de relatórios exista
      const fs = require('fs');
      const path = require('path');
      const reportDir = path.join(__dirname, 'cypress/reports/mochawesome');
      
      if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
      }

      return config;
    },
  },
});