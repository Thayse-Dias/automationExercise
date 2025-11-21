const selectors = {
  homePage: {
    logo: "img[alt='Website for automation practice']",
    productsLink: "a[href='/products']"
  },
  productsPage: {
    allProductsTitle: "h2.title.text-center",
    firstProduct: ".features_items .product-image-wrapper",
    viewProduct: "a:contains('Ver Produto')"
  },
  productDetail: {
    reviewTab: "a[href='#reviews']",
    nameInput: "#name",
    emailInput: "#email",
    reviewInput: "#review",
    submitButton: "#button-review"
  }
}

describe('Adicionar avaliação ao produto', () => {
  it('deve permitir adicionar uma avaliação ao produto', () => {
    // 1. Inicie o navegador e 2. Acesse a URL
    cy.visit('http://automationexercise.com')
    cy.get(selectors.homePage.logo).should('be.visible')

    // 3. Clique no botão 'Produtos'
    cy.get(selectors.homePage.productsLink).click()

    // 4. Verifique a página TODOS OS PRODUTOS - com abordagem mais robusta
    cy.url().should('include', '/products')
    
    // Tentativa alternativa de verificar a página de produtos
    cy.get('body').then(($body) => {
      // Verifica se existe algum título indicando que estamos na página de produtos
      if ($body.find(selectors.productsPage.allProductsTitle).length > 0) {
        cy.get(selectors.productsPage.allProductsTitle)
          .should('be.visible')
          .and(($h2) => {
            const text = $h2.text().trim()
            // Aceita diferentes variações do texto
            expect(text).to.match(/Todos os Produtos|All Products|Products/)
          })
      } else {
        // Se não encontrar o título específico, verifica outros indicadores
        cy.get('.features_items').should('be.visible')
        cy.contains('h2', /Product|Produto/).should('be.visible')
      }
    })

    // 5. Clique no botão "Ver Produto" - abordagem alternativa
    cy.get('.product-image-wrapper')
      .first()
      .within(() => {
        // Tenta encontrar o link de visualização do produto de diferentes formas
        cy.get('a').each(($link) => {
          const href = $link.attr('href')
          const text = $link.text().trim()
          if (href && href.includes('/product_details/') || text.includes('View Product') || text.includes('Ver Produto')) {
            cy.wrap($link).click({ force: true })
            return false // para o loop
          }
        })
      })

    // 6. Verifique "Escreva sua avaliação"
    cy.get(selectors.productDetail.reviewTab, { timeout: 10000 })
      .should('be.visible')
      .and(($tab) => {
        const text = $tab.text().trim()
        expect(text).to.match(/Escreva sua avaliação|Write Your Review/)
      })

    // 7. Preencha os dados da avaliação
    cy.get(selectors.productDetail.nameInput, { timeout: 10000 })
      .should('be.visible')
      .type('Teste Usuário')
    
    cy.get(selectors.productDetail.emailInput)
      .should('be.visible')
      .type('teste@email.com')
    
    cy.get(selectors.productDetail.reviewInput)
      .should('be.visible')
      .type('Produto de boa qualidade, entrega rápida.')

    // 8. Clique em Enviar
    cy.get(selectors.productDetail.submitButton)
      .should('be.visible')
      .click()

    // 9. Verifique mensagem de sucesso
    cy.contains(/Obrigado pela sua avaliação|Thank you for your review/, { timeout: 10000 })
      .should('be.visible')
  })
})