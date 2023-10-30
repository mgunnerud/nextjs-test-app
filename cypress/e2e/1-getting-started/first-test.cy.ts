/// <reference types="cypress" />

describe('destinasjoner-test', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.seedDb()
    cy.visit('/destinasjoner')
  })

  it('should navigate to destination url', () => {
    cy.get('[data-testid="destinasjon-liste"] a').first().click()
    cy.location('pathname').should(
      'match',
      /destinasjoner\/.*\/lisboa\/attraksjoner/
    )
  })

  it('should add new destination', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('[data-testid="ny-destinasjon"]').click()
    cy.get('[data-testid="destinasjon-navn"]').type('Cypress4', { force: true })
    cy.get('[data-testid="lagreknapp"]').click()

    // We can go even further and check that the default todos each contain
    // the correct text. We use the `first` and `last` functions
    // to get just the first and last matched elements individually,
    // and then perform an assertion with `should`.
    cy.get('[data-testid="destinasjon-liste"] a')
      .last()
      .should('have.text', 'Cypress4')
  })
})
