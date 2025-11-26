// cypress/e2e/carrinho.cy.js

describe('Caso de teste: Adicionar produtos ao carrinho', () => {

  // Função para carregar a página de forma segura
  function loadHomePage() {
    cy.visit('https://automationexercise.com', {
      timeout: 120000,
      onBeforeLoad(win) {
        delete win.navigator.__proto__.serviceWorker;
      }
    });
  }

  beforeEach(() => {

    // 1 - Carrega a home
    loadHomePage();

    // 2 - Aguarda DOM completo
    cy.document().its('readyState').should('eq', 'complete');
    cy.wait(1500);

    // 3 - Validação estável: navbar SEMPRE aparece
    cy.get('.navbar-nav', { timeout: 15000 })
      .should('be.visible')
      .and('contain', 'Home')
      .then(($nav) => {

        // Se carregou vazio → recarrega (site falha às vezes)
        if (!$nav.text().includes('Home')) {
          cy.log('⚠ Página carregou incompleta. Recarregando...');
          loadHomePage();
          cy.get('.navbar-nav', { timeout: 15000 }).should('contain', 'Home');
        }
      });
  });

  it('Deve adicionar dois produtos ao carrinho e validar todos os detalhes', () => {

    // 4 - Ir para Produtos
    cy.get('a[href="/products"]').click();

    // 5 - Validar carregamento completo
    cy.contains('All Products', { timeout: 15000 }).should('be.visible');

    // 6 - Adicionar primeiro produto
    cy.get('.product-image-wrapper').eq(0).trigger('mouseover');
    cy.get('.product-image-wrapper').eq(0).contains('Add to cart').click();

    // 7 - Continuar comprando
    cy.contains('Continue Shopping').click();

    // 8 - Adicionar segundo produto
    cy.get('.product-image-wrapper').eq(1).trigger('mouseover');
    cy.get('.product-image-wrapper').eq(1).contains('Add to cart').click();

    // 9 - Ver carrinho
    cy.contains('View Cart').click();

    // 10 - Verificar se dois produtos foram adicionados
    cy.get('.cart_info table tbody tr').should('have.length', 2);

    // 11 - Validar preço, quantidade e total
    cy.get('.cart_info table tbody tr').each(($row) => {

      // quantidade
      cy.wrap($row)
        .find('.cart_quantity button')
        .should('contain', '1');

      // preço individual (ex: "Rs. 500")
      cy.wrap($row)
        .find('.cart_price p')
        .invoke('text')
        .should('match', /Rs\.\s*\d+/);

      // total (ex: "Rs. 1000")
      cy.wrap($row)
        .find('.cart_total p')
        .invoke('text')
        .should('match', /Rs\.\s*\d+/);
    });

    cy.log('🛒 Carrinho validado com sucesso!');
  });

});
