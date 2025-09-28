describe('WordMap Main Flows', () => {
  beforeEach(() => {
    cy.login();
  });

  it('loads the Home page and displays level tabs', () => {
    cy.get('.page-wrapper', { timeout: 10000 }).should('not.have.class', 'loading');

    cy.get('.tabs .tab').should('have.length.at.least', 1);
    cy.contains('.tab', 'A1').should('exist');
  });

  it('shows categories when a level is selected', () => {
    cy.get('.page-wrapper', { timeout: 10000 }).should('not.have.class', 'loading');

    cy.contains('.tab', 'A2').click();
    cy.get('.categories .category-btn', { timeout: 10000 }).should('exist');
  });

  it('navigates to a category and plays True/False game', () => {
    cy.get('.page-wrapper', { timeout: 10000 }).should('not.have.class', 'loading');

    cy.get('.categories .category-btn').first().click();
    cy.url().should('include', '/category/');

    cy.contains('button', 'True or False').should('exist').click();
    cy.url().should('include', '/true-false');

    cy.get('.true-false__cards', { timeout: 10000 }).should('exist');
    cy.get('.true-false__cards .true-false__card').should('have.length', 2);

    cy.get('.true-false__buttons button').first().click();
    cy.get('.true-false__result').should('exist').and('not.be.hidden');

    cy.get('button[aria-label="Go back"]').click();
    cy.url().should('include', '/category/');
  });

  it('navigates to About page and flips a team card', () => {
    cy.visit('/about');
    cy.contains('WordMap').should('exist');
    cy.get('.about__card').first().click();
    cy.get('.about__card--flipped').should('exist');
  });

  it('redirects to Not Found for an invalid route', () => {
    cy.visit('/this-route-should-not-exist');
    cy.contains('Page Not Found').should('exist');

    cy.contains('button', 'Go Back Home').click();
    cy.url().should('include', '/home');
  });
});
