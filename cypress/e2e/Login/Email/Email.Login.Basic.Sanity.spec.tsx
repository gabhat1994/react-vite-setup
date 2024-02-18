describe(
  'Email.Login.Basic.Sanity.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    it('Visits the Noumena Website Login Page', () => {
      const email = Cypress.env('AUTO_USER_ONE');
      cy.visit(`/login`);

      cy.wait(5000);
      cy.get('[data-testid="loginEmailTextField"]', { timeout: 5000 })
      .then((error) => {
        console.error('Element timed out:', error);
        cy.get('body').type('{esc}');
      });

      cy.get('[data-testid="loginEmailTextField"]').type(email);
      cy.get('[data-testid="loginPasswordTextField"]').type(
        `${Cypress.env('AUTO_USER_PASSWORD')}`,
      );
      cy.xpath(
        '//button[@data-testid="button" and contains(.,"Log In") and not(@disabled)]',
      )
        .should('be.visible')
        .click();

      cy.get('[data-testid="noum-onboarding-section-testid"]').should(
        'be.visible',
      );
    });
  },
);
