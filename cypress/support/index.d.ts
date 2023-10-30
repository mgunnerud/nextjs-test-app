/// <reference types="@testing-library/cypress" />
declare namespace Cypress {
  interface Chainable {
    sqlServer(query: string): void
  }
}
