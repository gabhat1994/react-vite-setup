import UtilPage from '../../pages/utilPage';
import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';

describe('AccountSettings.DeleteAccount.spec.tsx', () => {
  before(() => {
    const email = UtilPage.getRandomEmailAddress();
    const otp = UtilPage.generateOtp();

    cy.register(email, otp, true);
  });

  it('Deletes an account', () => {
    HomePage.goToHomePage();
    LoginPage.acceptCookies();

    HomePage.mainHeaderAvatar.click();
    HomePage.mainHeaderSubAccountSettings.click();
    cy.get('[data-testid="delete-account"]').click();
    cy.contains('Delete Account');
    cy.get('[data-test="DeleteAccountModal-TextField"]').type('DELETE');
    cy.get('[data-testid="primaryBtn"]').click();
    cy.wait(2000);
    cy.contains('Your account has been deleted.');
    cy.wait(3000);
    cy.contains('Log in');
  });
});
