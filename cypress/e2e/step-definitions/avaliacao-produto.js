import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que estou na página inicial", () => {
  cy.visit("/");
});

When('clico em {string}', (texto) => {
  cy.contains('a', texto).click();
});

When('clico em "View Product" no primeiro produto', () => {
  cy.get('.product-image-wrapper').first().within(() => {
    cy.contains('a', 'View Product').click();
  });
});

When('preencho nome {string}, email {string} e avaliação {string}', (nome, email, avaliacao) => {
  cy.get('input[data-qa="name"]').type(nome);
  cy.get('input[data-qa="email"]').type(email);
  cy.get('textarea[data-qa="review"]').type(avaliacao);
});

When('clico em "Submit"', () => {
  cy.get('button[data-qa="submit-review"]').click();
});

Then('devo ver a mensagem {string}', (mensagem) => {
  cy.contains('.alert-success', mensagem, { timeout: 10000 }).should('be.visible');
});