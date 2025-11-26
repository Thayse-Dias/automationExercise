// cypress/e2e/adicionarAvaliacao.cy.js

describe('Caso de Teste: Adicionar avaliação ao produto', () => {

  it('Deve permitir que o usuário envie uma avaliação para um produto', () => {

    cy.visit('https://automationexercise.com', { timeout: 60000 });

    cy.contains('Products').click();

    cy.url().should('include', '/products');
    cy.get('.title').should('contain.text', 'All Products');

    cy.get('.product-image-wrapper')
      .first()
      .contains('View Product')
      .click();

    // 🔥 Rolar até a área do review (funciona!)
    cy.contains('Write Your Review').scrollIntoView();

    // ✔️ Elemento correto (o form real usado pelo site)
    cy.get('#review-form').should('be.visible');

    // Preenche os campos
    cy.get('#name').type('Thayse Tester');
    cy.get('#email').type('thayse@example.com');
    cy.get('#review').type('Ótimo produto! Funcionou perfeitamente.');

    // Envia o review
    cy.contains('Submit').click();

    // Mensagem de sucesso
    cy.contains('Thank you for your review.')
      .should('be.visible');
  });
});
