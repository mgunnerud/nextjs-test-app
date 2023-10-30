describe('test attraksjon', () => {
  beforeEach(() => {
    cy.seedDb()
    cy.visit('/destinasjoner')
    cy.get('[data-testid="destinasjon-liste"] a').first().click()
  })

  it('should list two attraksjoner', () => {
    cy.get('[data-testid="attraksjon-list"] a').should('have.length', 2)
  })

  it('should show details when load button is pressed', () => {
    cy.get('[data-testid="destinasjon-liste"] a').first().click()
    cy.get('[data-testid="attraksjon-list"] a').first().click()
    cy.findByRole('button', { name: /Vis detaljer/i }).click()
    cy.get('[data-testid="details-div"]') // trenger ikke should('exist')
  })
})
