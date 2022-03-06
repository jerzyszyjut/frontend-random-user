/* eslint-disable */
/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://192.168.0.43:8080/')
  })

  it('Should correctly navigate', () => {
    cy.get('.home').click()
    cy.location('pathname').should('eq', '/')

    cy.get('.history').click()
    cy.location('pathname').should('eq', '/history.html')

    cy.get('.home').click()
    cy.location('pathname').should('eq', '/')
  })
})
