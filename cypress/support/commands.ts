Cypress.Commands.add('login', () => {
  cy.visit('/home');

  cy.url({ timeout: 15000 }).then((url) => {
    if (url.includes('/login')) {
      cy.get('form.login__form', { timeout: 15000 }).should('be.visible');
      cy.get('input[formControlName="email"]').clear().type('test3@test.com');
      cy.get('input[formControlName="password"]').clear().type('Test1234');
      cy.get('button[type="submit"]').click();
      cy.get('.page-wrapper', { timeout: 30000 })
        .should('be.visible')
        .and('not.have.class', 'loading');
    } else {
      cy.log('Already logged in');
      cy.get('.page-wrapper', { timeout: 30000 })
        .should('be.visible')
        .and('not.have.class', 'loading');
    }
  });
});
