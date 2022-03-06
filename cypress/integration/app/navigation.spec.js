/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should correctly navigate', () => {
    cy.get('.home').click()
    cy.location('pathname').should('eq', '/')

    cy.get('.history').click()
    cy.location('pathname').should('eq', '/history.html')

    cy.get('.home').click()
    cy.location('pathname').should('eq', '/')
  })
})
