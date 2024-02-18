import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';
import AccountSettingsPage from '../../pages/accountSettingsPage';
import data from '../../fixtures/data.json';

require('cypress-xpath');

describe(
  'AccountSettings.Basic.Sanity.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    before(() => {
      LoginPage.loginByApi();
    });

    it('Account settings page should load', () => {
      // navigate to My Noums page
      HomePage.goToHomePage();
      HomePage.mainHeaderAvatar.click();
      HomePage.mainHeaderSubAccountSettings.click();
      cy.url().should('include', data['account.settings.path']);

      // verify Account Settings elements
      cy.contains(data['account.settings.password.label']);
      cy.contains(data['account.settings.password.notes']);
      cy.contains(data['account.settings.email.label']);
      cy.contains(data['account.settings.invite.label']);
      cy.contains(data['account.settings.header']);
      cy.contains(data['account.settings.policy.label']);
      cy.contains(data['account.settings.terms.label']);
      cy.contains(data['account.settings.help.label']);
      AccountSettingsPage.verifyEmailAndPasswordFields();
    });
  },
);
