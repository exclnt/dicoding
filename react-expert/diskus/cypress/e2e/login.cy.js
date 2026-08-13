describe('Login Scenario', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form correctly', () => {
    cy.get('input[placeholder="Masukkan email"]').should('be.visible');
    cy.get('input[placeholder="Masukkan password"]').should('be.visible');
    cy.get('button').contains('Masuk').should('be.visible');
  });

  it('should show alert when email is empty', () => {
    cy.get('button').contains('Masuk').click();
    // HTML5 validation will normally kick in, or if custom, we check for it.
    // In this project we used HTML `required` attribute.
    // Cypress might not easily catch native HTML5 validation UI, but we can check if it fails to login.
    cy.get('input[placeholder="Masukkan email"]:invalid').should('have.length', 1);
  });

  it('should successfully login and redirect to home on correct credentials', () => {
    // Intercept API call
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          token: 'fake-jwt-token',
        },
      },
    }).as('loginRequest');

    // Intercept profile fetch
    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'user-1',
            name: 'Test User',
            email: 'test@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Test+User',
          },
        },
      },
    }).as('profileRequest');

    cy.get('input[placeholder="Masukkan email"]').type('test@example.com');
    cy.get('input[placeholder="Masukkan password"]').type('password123');
    cy.get('button').contains('Masuk').click();

    cy.wait('@loginRequest');

    // The user should be redirected to home (or whatever the app does)
    // Note: Depends on app routing, usually '/'
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
