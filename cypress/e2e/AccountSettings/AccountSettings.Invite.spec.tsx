import CommonPage from 'cypress/pages/commonPage';
import UtilPage from 'cypress/pages/utilPage';
import SignupPage from 'cypress/pages/signupPage';
import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';
import AccountSettingsPage from '../../pages/accountSettingsPage';

require('cypress-xpath');

/*
Jira: NOUM-5168 Automation - Account Settings - Other scenarios
*/

let url = '';

describe('AccountSettings.Invite.spec.tsx', () => {
  before(() => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_CONNECTED_ONE'));
  });

  it('Able to verify Invite Friends page', () => {
    // navigate to Account Settings page
    HomePage.goToAccountSettings();

    AccountSettingsPage.inviteFriendBtn.click({ force: true });
    cy.contains('Invite friends, get reward tokens').should('be.visible');
    AccountSettingsPage.referralList.should('have.length.at.least', 1);
    AccountSettingsPage.copyLinBtn.click();
    CommonPage.verifyAlertMessage('Referral code copied!');
    AccountSettingsPage.referralUrl.then((element) => {
      url = element.text();
    });
  });

  it('Able to register using referral code url', () => {
    const email = UtilPage.getRandomEmailAddress();
    // access the copied referral code url
    cy.visit(url);
    LoginPage.acceptCookies();
    SignupPage.referralInfo.should('have.text', `You’re joining via ${Cypress.env('AUTO_USER_CONNECTED_ONE_NAME')} referral link`)

    // register using the referral code
    SignupPage.fillUpSignupForm(email, undefined, false);
  });
});
