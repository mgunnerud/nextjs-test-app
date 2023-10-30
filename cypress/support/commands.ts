/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
declare global {
  namespace Cypress {
    interface Chainable {
      seedDb(): Chainable<Element>
    }
  }
}
import '@testing-library/cypress/add-commands'
Cypress.Commands.add('seedDb', () => {
  cy.sqlServer('DELETE FROM [dbo].[Attraksjon]')
  cy.sqlServer('DELETE FROM [dbo].[Destinasjon]')
  cy.sqlServer("INSERT INTO [dbo].[Destinasjon] (navn) VALUES ('Lisboa')")
  cy.sqlServer(
    `INSERT INTO [dbo].[Attraksjon] (navn, type, destinasjon_id) VALUES 
        ('Outro lado', 1, (SELECT id from [dbo].[Destinasjon] WHERE navn='Lisboa')),
        ('Sintra', 2, (SELECT id from [dbo].[Destinasjon] WHERE navn='Lisboa'))`
  )
})
