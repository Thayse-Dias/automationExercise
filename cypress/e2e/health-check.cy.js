// cypress/e2e/health-check.cy.js - VERSÃO SIMPLIFICADA E ROBUSTA
describe('Health Checks - AutomationExercise', () => {
  it('should load the website and basic functionality', () => {
    // 1. Visita a página principal
    cy.visit('/', { timeout: 30000 });
    
    // 2. Verifica se a página carregou
    cy.url().should('include', 'automationexercise.com');
    cy.get('body').should('be.visible');
    
    // 3. Tira screenshot para debug
    cy.screenshot('health-check-homepage');
    
    // 4. Verifica elementos básicos por texto (mais robusto)
    cy.contains('a', 'Home').should('be.visible');
    cy.contains('a', 'Products').should('be.visible');
    cy.contains('a', 'Cart').should('be.visible');
    cy.contains('a', 'Login').should('be.visible');
    
    // 5. Testa navegação básica - Login
    cy.contains('a', 'Login').click();
    cy.url().should('include', '/login');
    
    // Verifica elementos da página de login
    cy.contains('h2', 'Login to your account').should('be.visible');
    cy.contains('button', 'Login').should('be.visible');
    
    // Volta para home
    cy.go('back');
    
    // 6. Testa navegação básica - Produtos
    cy.contains('a', 'Products').click();
    cy.url().should('include', '/products');
    
    // Verifica se há produtos
    cy.get('body').then(($body) => {
      if ($body.find('.product').length > 0) {
        cy.get('.product').should('have.length.greaterThan', 0);
      } else if ($body.find('.product-image-wrapper').length > 0) {
        cy.get('.product-image-wrapper').should('have.length.greaterThan', 0);
      } else {
        // Pelo menos algum elemento de produto deve existir
        cy.get('body').find('img').should('have.length.greaterThan', 5);
      }
    });
    
    cy.go('back');
  });

  it('should have working forms and interactive elements', () => {
    cy.visit('/');
    
    // Navega para login
    cy.contains('a', 'Login').click();
    
    // Verifica formulário de login
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.contains('button', 'Login').should('be.visible');
    
    // Verifica formulário de cadastro
    cy.contains('h2', 'New User Signup!').should('be.visible');
    cy.get('input[data-qa="signup-name"]').should('be.visible');
    cy.get('input[data-qa="signup-email"]').should('be.visible');
    cy.contains('button', 'Signup').should('be.visible');
  });

  it('should load within acceptable time', () => {
    const startTime = Date.now();
    
    cy.visit('/', { timeout: 30000 }).then(() => {
      const loadTime = Date.now() - startTime;
      cy.log(`📊 Page loaded in ${loadTime}ms`);
      
      // Timeout generoso para CI
      expect(loadTime).to.be.lessThan(15000);
    });
  });
});