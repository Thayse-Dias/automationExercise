// cypress/e2e/login-completo.cy.js

describe('Caso de teste 2: Login do usuário com e-mail e senha corretos', () => {
  const userEmail = `thayse.dias${Date.now()}@gmail.com`;
  const userPassword = 'senha123';
  const userName = 'Thayse Dias';

  it('Deve fazer cadastro, logout, login e excluir a conta', () => {
    // Interceptar requisições de anúncios e rastreamento
    cy.intercept('GET', '**/google-analytics/**', { statusCode: 204 }).as('blockAnalytics');
    cy.intercept('GET', '**/googletagmanager.com/**', { statusCode: 204 }).as('blockGTM');
    cy.intercept('GET', '**/googlesyndication.com/**', { statusCode: 204 }).as('blockAds');
    cy.intercept('GET', '**/doubleclick.net/**', { statusCode: 204 }).as('blockDoubleClick');

    // 1. Cadastrar novo usuário
    cy.visit('https://automationexercise.com', {
      timeout: 120000,
      onBeforeLoad(win) {
        // Desabilitar service workers para evitar problemas de cache
        delete win.navigator.__proto__.serviceWorker;
      }
    });

    // Ir para a página de cadastro
    cy.get('a[href="/login"]').click();
    cy.contains('New User Signup!', { timeout: 10000 }).should('be.visible');

    // Preencher formulário de cadastro
    cy.get('[data-qa="signup-name"]').type(userName);
    cy.get('[data-qa="signup-email"]').type(userEmail);
    cy.get('[data-qa="signup-button"]').click();

    // Preencher formulário de detalhes da conta
    cy.contains('Enter Account Information', { timeout: 15000 }).should('be.visible');
    cy.get('#id_gender2').check();
    cy.get('[data-qa="password"]').type(userPassword);
    cy.get('[data-qa="days"]').select('26');
    cy.get('[data-qa="months"]').select('March');
    cy.get('[data-qa="years"]').select('1983');
    cy.get('[data-qa="first_name"]').type('Thayse');
    cy.get('[data-qa="last_name"]').type('Dias');
    cy.get('[data-qa="company"]').type('Empresa QAMais');
    cy.get('[data-qa="address"]').type('Rua Teste, 123');
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('California');
    cy.get('[data-qa="city"]').type('Los Angeles');
    cy.get('[data-qa="zipcode"]').type('90001');
    cy.get('[data-qa="mobile_number"]').type('1234567890');
    cy.get('[data-qa="create-account"]').click();

    // Verificar conta criada
    cy.contains('Account Created!', { timeout: 15000 }).should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    cy.contains('Logged in as', { timeout: 15000 }).should('be.visible');

    // 2. Fazer logout
    cy.get('a[href="/logout"]').click();
    cy.contains('Login to your account', { timeout: 10000 }).should('be.visible');

    // 3. Fazer login
    cy.get('[data-qa="login-email"]').type(userEmail);
    cy.get('[data-qa="login-password"]').type(userPassword);
    cy.get('[data-qa="login-button"]').click();

    // Verificar login bem-sucedido
      cy.contains('Logged in as', { timeout: 15000 }).should('be.visible');
      cy.log('✅ LOGIN TESTADO COM SUCESSO!');
    });
  });