// cypress.config.js
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

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

    // MOCHAWESOME REPORTER
    reporter: "mochawesome",
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: "cypress/reports/mochawesome",
      overwrite: false,          // não sobrescreve relatórios antigos
      html: false,               // gera só JSON (o HTML será criado depois)
      json: true,
      timestamp: true,
      timestamp: "ddmmyyyy_HHmmss"
    },

    setupNodeEvents(on, config) {
      // Cucumber Preprocessor (BDD)
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);
      addCucumberPreprocessorPlugin(on, config);

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