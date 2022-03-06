/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://192.168.0.43:8080/')
  })

  it('Takes screenshot', () => {
    cy.screenshot('homepage-before-user')
  })
})
