import LoginPage from '../../../pages/loginPage';

describe(
  'LoginUnauthorised.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    it('should not be able to visit the internal app when not logged in', () => {
      cy.visit(`/login`);
      cy.wait(2000);

      cy.visit('/noums');

      LoginPage.loginEmailAddressField.should('be.visible');
    });
  },
);
