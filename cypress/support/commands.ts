/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  window.localStorage.setItem('authToken', 'mock-token');

  cy.visit('/home');
});
