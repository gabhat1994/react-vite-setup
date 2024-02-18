import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';
import AccountSettingsPage from '../../pages/accountSettingsPage';

require('cypress-xpath');

/*
Jira: NOUM-5168 Automation - Account Settings - Other scenarios
*/

describe('AccountSettings.Help.spec.tsx', () => {
  before(() => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ADMIN'));
  });

  it('Able to verify Help icon', () => {
    // navigate to Account Settings page
    HomePage.goToAccountSettings();

    AccountSettingsPage.helpIcon.click({force: true});
    AccountSettingsPage.helpIFrame
      .should('be.visible')
      .find('[data-testid="caption-message"]')
      .should('have.text', 'Welcome to Noumena App Support');
  });
});
