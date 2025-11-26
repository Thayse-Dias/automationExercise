Cypress.Commands.add('viewProductDetails', (productId = 1) => {
  cy.visit(`/product_details/${productId}`)
})

Cypress.Commands.add('fillReviewForm', (name, email, review, rating = 5) => {
  cy.get('#name').clear().type(name)
  cy.get('#email').clear().type(email)
  cy.get('#review').clear().type(review)
  cy.get('.ratings i.fa-star').eq(rating - 1).click()
})

Cypress.Commands.add('submitReview', () => {
  cy.get('#button-review').click()
})