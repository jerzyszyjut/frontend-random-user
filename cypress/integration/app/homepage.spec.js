/// <reference types="cypress" />

context('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show info message', () => {
    cy.get('.info').should('exist')
  })

  it('should hide info message after user generation', () => {
    cy.get('.button').click()
    cy.get('.info').should('not.exist')
  })

  it('should hide address info on checkbox click', () => {
    cy.get('.button').click()
    cy.get('#hide-address-checkbox').click()
    cy.get('.location-address-container').should('have.css', 'display', 'none')

    cy.visit('http://192.168.0.43:8080/')
    cy.get('#hide-address-checkbox').click()
    cy.get('.button').click()
    cy.get('.location-address-container').should('have.css', 'display', 'none')
  })

  it('should show info when address wasnt fetched', () => {
    cy.get('#hide-address-checkbox').click()
    cy.get('.button').click()
    cy.get('#hide-address-checkbox').click()
    cy.get('.location-address').should('contain.text', 'Not fetched')
  })

  it('should show user info after generating new user', () => {
    cy.get('.button').click()
    cy.get('.profile-picture').should('be.visible')
    cy.get('.profile-picture').should('have.attr', 'src')
    cy.get('.full-name').should('be.visible')
    cy.get('.register-date').should('be.visible')
    cy.get('.nationality').should('be.visible')
    cy.get('.location-address').should('be.visible')
  })
})
