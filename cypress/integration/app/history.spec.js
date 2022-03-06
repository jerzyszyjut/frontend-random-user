/// <reference types="cypress" />
import "cypress-localstorage-commands";

const usersHistory = require('../../fixtures/usersHistory')

context('Empty history page', () => {
  beforeEach(() => {
    cy.visit('/history.html')
  })

  it('should show info message', () => {
    cy.get('.info').should('contain.text', 'Nothing to see here yet. Generate users on home page!')
  })

  it('shouldnt show table', () => {
    cy.get('.row').should('not.exist')
  })
})

context('History page with data', () => {
  beforeEach(() => {
    cy.setLocalStorage('usersHistory', JSON.stringify(usersHistory["usersHistory"]))
    cy.visit('/history.html')
  })

  it('should show table', () => {
    cy.get('.history-table').should('exist')
  })

  it('should show 10 results', () => {
    cy.get('.rows').find('.row').should('have.length', 10)
  })

  it('should sort by name', () => {
    cy.get('.header_last_name').click()
    cy.get('.rows').find('.last_name').first().should('contain.text', 'Akaydin')
    cy.get('.rows').find('.last_name').last().should('contain.text', 'Sippola')
    cy.get('.header_last_name').click()
    cy.get('.rows').find('.last_name').first().should('contain.text', 'Sippola')
    cy.get('.rows').find('.last_name').last().should('contain.text', 'Akaydin')
  })

  it('should sort by register date', () => {
    cy.get('.header_register_date').click()
    cy.get('.rows').find('.register_date').first().should('contain.text', '26/01/2011, 03:55:30')
    cy.get('.rows').find('.register_date').last().should('contain.text', '23/07/2002, 07:20:16')
    cy.get('.header_register_date').click()
    cy.get('.rows').find('.register_date').first().should('contain.text', '23/07/2002, 07:20:16')
    cy.get('.rows').find('.register_date').last().should('contain.text', '26/01/2011, 03:55:30')
  })

  it('should limit user count to 10', () => {
    cy.visit('/')
    cy.get('.button').click()
    cy.visit('/history.html')
    cy.get('.rows').find('.row').should('have.length', 10)
  })
})
