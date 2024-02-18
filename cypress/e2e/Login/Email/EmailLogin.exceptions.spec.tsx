import LoginPage from '../../../pages/loginPage';
import CommonPage from '../../../pages/commonPage';

describe(
  'EmailLogin.exceptions.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    beforeEach(() => {
      cy.visit(`/login`);
    });

    it('should show an error when invalid email has been entered', () => {
      LoginPage.acceptCookies();
      LoginPage.loginEmailAddressField
        .type('akjjhashklash!asajakljdsdkl')
        .type('{enter}');
      cy.get('[data-testid="pTestId"]').contains(
        'Please use a valid email address (email@address.com)',
      );
    });

    it('should show an error if the email doesnt exist', () => {
      LoginPage.acceptCookies();
      LoginPage.loginEmailAddressField.type(
        'thisemaildoenstexist@noumenaqa.global{enter}',
      );
      LoginPage.loginPasswordField.type(`${Cypress.env('AUTO_USER_PASSWORD')}`);
      LoginPage.loginButton.click();
      CommonPage.verifyAlertMessage('Invalid username or password');
    });

    it('should show an error if the email valid but incorrect password', () => {
      const email = Cypress.env('AUTO_USER_ONE');
      cy.log(`email: ${email}`);
      LoginPage.acceptCookies();
      LoginPage.loginEmailAddressField.type(email);
      LoginPage.loginPasswordField.type('INCORRECT');
      LoginPage.loginButton.click();
      CommonPage.verifyAlertMessage('Invalid username or password');
    });
  },
);
