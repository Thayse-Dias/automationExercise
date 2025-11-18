describe('Caso de teste: Baixar fatura após a ordem de compra', () => {
  // Dados de teste
  const userEmail = `thayse.dias${Date.now()}@gmail.com`;
  const userPassword = 'senha123';
  const userName = 'Thayse Dias';
  const cardName = 'Test User';
  const cardNumber = '4111111111111111';
  const cvc = '123';
  const expiryMonth = '12';
  const expiryYear = '2030';

  // Carregar seletores antes de todos os testes
  before(() => {
    cy.fixture('selectors').as('selectors');
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve completar o fluxo de compra e baixar a fatura', function() {
    // Usar function() para ter acesso ao this.selectors

    // 3. Verifique se a página inicial está visível corretamente
    cy.get(this.selectors.homePage.logo).should('be.visible');

    // 4. Adicione produtos ao carrinho (adicionando o primeiro produto)
    cy.get(this.selectors.homePage.firstProduct)
      .first()
      .within(() => {
        cy.get(this.selectors.homePage.addToCartButton).first().click();
      });

    // 5. Clique no botão 'Carrinho' - modal de confirmação
    cy.get(this.selectors.homePage.viewCartLink).contains('View Cart').click();

    // 6. Verifique se a página do carrinho está sendo exibida
    cy.url().should('include', '/view_cart');
    cy.get(this.selectors.cartPage.activeTab).should('contain', 'Shopping Cart');

    // 7. Clique em "Finalizar Compra"
    cy.get(this.selectors.cartPage.checkoutButton).click();

    // 8. Se aparecer o modal, clique para fazer login/cadastro
    cy.get('body').then(($body) => {
      if ($body.find(this.selectors.modal.modalBody).length > 0) {
        cy.get(this.selectors.modal.modalBody).within(() => {
          cy.get(this.selectors.modal.loginLink).click();
        });
      }
    });

    // 9. Preencha todos os detalhes no Cadastro
    cy.get(this.selectors.signupPage.nameInput).type(userName);
    cy.get(this.selectors.signupPage.emailInput).type(userEmail);
    cy.get(this.selectors.signupPage.signupButton).click();

    // Preencher formulário de cadastro completo
    cy.get(this.selectors.accountCreationForm.genderMrs).check();
    cy.get(this.selectors.accountCreationForm.password).type(userPassword);
    cy.get(this.selectors.accountCreationForm.days).select('15');
    cy.get(this.selectors.accountCreationForm.months).select('5');
    cy.get(this.selectors.accountCreationForm.years).select('1990');
    
    cy.get(this.selectors.accountCreationForm.firstName).type('Thayse');
    cy.get(this.selectors.accountCreationForm.lastName).type('Dias');
    cy.get(this.selectors.accountCreationForm.company).type('Test Company');
    cy.get(this.selectors.accountCreationForm.address).type('123 Test Street');
    cy.get(this.selectors.accountCreationForm.address2).type('Apt 1');
    cy.get(this.selectors.accountCreationForm.country).select('United States');
    cy.get(this.selectors.accountCreationForm.state).type('California');
    cy.get(this.selectors.accountCreationForm.city).type('Los Angeles');
    cy.get(this.selectors.accountCreationForm.zipcode).type('90001');
    cy.get(this.selectors.accountCreationForm.mobileNumber).type('1234567890');
    
    cy.get(this.selectors.accountCreationForm.createAccountButton).click();

    // 10. Verifique se 'CONTA CRIADA!' e clique em 'Continuar'
    cy.get(this.selectors.accountCreated.message).should('contain', 'Account Created!');
    cy.get(this.selectors.accountCreated.continueButton).click();

    // 11. Verifique se está logado como usuário
    cy.get(this.selectors.loggedIn.userInfo).should('contain', `Logged in as ${userName}`);

    // 12. Clique no botão 'Carrinho'
    cy.get(this.selectors.cart.cartLink).first().click();

    // 13. Clique no botão "Finalizar Compra"
    cy.get(this.selectors.cartPage.checkoutButton).click();

    // 14. Verifique os detalhes do endereço e revise seu pedido
    cy.get(this.selectors.checkout.addressDetails).should('be.visible');
    cy.get(this.selectors.checkout.reviewOrder).should('be.visible');

    // 15. Insira descrição e clique em 'Fazer pedido'
    cy.get(this.selectors.checkout.commentTextarea).type('Por favor, entregar à tarde.');
    cy.get(this.selectors.checkout.placeOrderButton).click();

    // 16. Insira os dados de pagamento
    cy.get(this.selectors.payment.nameOnCard).type(cardName);
    cy.get(this.selectors.payment.cardNumber).type(cardNumber);
    cy.get(this.selectors.payment.cvc).type(cvc);
    cy.get(this.selectors.payment.expiryMonth).type(expiryMonth);
    cy.get(this.selectors.payment.expiryYear).type(expiryYear);

    // 17. Clique em "Pagar e Confirmar Pedido"
    cy.get(this.selectors.payment.payButton).click();

    // 18. Verifique a mensagem de sucesso
    cy.url().should('include', '/payment_done', { timeout: 15000 });
    cy.wait(2000);
    
    cy.contains(this.selectors.orderSuccess.successMessage, { timeout: 10000 })
      .should('be.visible');

    // 19. Clique em 'Baixar Fatura'
    cy.contains(this.selectors.orderSuccess.downloadInvoice)
      .should('be.visible')
      .click();

    // 20. Clique em 'Continuar'
    cy.contains(this.selectors.orderSuccess.continueButton)
      .should('be.visible')
      .click();
  });
});