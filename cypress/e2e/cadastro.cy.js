// cypress/e2e/cadastro.cy.js

describe('Automation Exercise - Cadastro', () => {
  const selectorList = {
    loginLink: 'a[href="/login"]',
    signupName: '[data-qa="signup-name"]',
    signupEmail: '[data-qa="signup-email"]',
    signupButton: '[data-qa="signup-button"]',
    titleMrs: '#id_gender2',
    password: '[data-qa="password"]',
    days: '[data-qa="days"]',
    months: '[data-qa="months"]',
    years: '[data-qa="years"]',
    newsletter: '#newsletter',
    optin: '#optin',
    firstName: '[data-qa="first_name"]',
    lastName: '[data-qa="last_name"]',
    company: '[data-qa="company"]',
    address1: '[data-qa="address"]',
    country: '[data-qa="country"]',
    state: '[data-qa="state"]',
    city: '[data-qa="city"]',
    zipcode: '[data-qa="zipcode"]',
    mobileNumber: '[data-qa="mobile_number"]',
    createAccountButton: '[data-qa="create-account"]',
    successMessage: '[data-qa="account-created"]',
    continueButton: '[data-qa="continue-button"]'
  }
  // Variável para armazenar o email criado
  let createdUserEmail = '';

  beforeEach(() => {
    cy.visit('https://automationexercise.com', { timeout: 120000 })
  })

  it('deve completar o cadastro com sucesso', () => {
    // 1. Navegar para página de login
    cy.get(selectorList.loginLink, { timeout: 10000 }).click()
    
    // Verificar se está na página correta
    cy.url().should('include', '/login')
    cy.contains('New User Signup!', { timeout: 10000 }).should('be.visible')

    // 2. Preencher formulário inicial de cadastro
    const timestamp = Date.now()
    createdUserEmail = `thayse.dias${timestamp}@gmail.com`
    
    cy.get(selectorList.signupName).type('Thayse Dias')
    cy.get(selectorList.signupEmail).type(createdUserEmail)
    cy.get(selectorList.signupButton).click()

    // 3. Verificar se carregou a página de detalhes da conta
    cy.contains('Enter Account Information', { timeout: 15000 }).should('be.visible')

    // 4. Preencher formulário completo
    cy.get(selectorList.titleMrs).check()
    cy.get(selectorList.password).type('senha123')
    
    // Data de nascimento
    cy.get(selectorList.days).select('26')
    cy.get(selectorList.months).select('March')
    cy.get(selectorList.years).select('1983')
    
    // Newsletter
    cy.get(selectorList.newsletter).check()
    cy.get(selectorList.optin).check()
    
    // Informações pessoais
    cy.get(selectorList.firstName).type('Thayse')
    cy.get(selectorList.lastName).type('Dias')
    cy.get(selectorList.company).type('Empresa QAMais')
    cy.get(selectorList.address1).type('Rua Teste, 123')
    cy.get(selectorList.country).select('United States')
    cy.get(selectorList.state).type('California')
    cy.get(selectorList.city).type('Los Angeles')
    cy.get(selectorList.zipcode).type('90001')
    cy.get(selectorList.mobileNumber).type('1234567890') 
    
    // 5. Criar conta com timeout aumentado
    cy.get(selectorList.createAccountButton).click()

    // 6. Verificar sucesso 
    cy.get('body').then(($body) => {
      // Verificação múltipla
      if ($body.find(selectorList.successMessage).length > 0) {
        cy.get(selectorList.successMessage, { timeout: 30000 })
          .should('be.visible')
          .and('contain', 'Account Created!')
      } else if ($body.text().includes('Account Created')) {
        cy.contains('b', 'Account Created!', { timeout: 30000 }).should('be.visible')
      } else {
        // Fallback - verificar URL
        cy.url({ timeout: 30000 }).should('include', '/account_created')
      }
    })

    // 7. Continuar
    cy.get(selectorList.continueButton, { timeout: 15000 }).click()
    
    // 8. Verificar se está logado
    cy.contains('Logged in as', { timeout: 15000 }).should('be.visible')
    
    // Salvar o email criado para uso posterior
    cy.task('setUserEmail', createdUserEmail)
    cy.log(`✅ Usuário criado: ${createdUserEmail}`)
  })
})