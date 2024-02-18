import UtilPage from 'cypress/pages/utilPage';
import SignupPage from 'cypress/pages/signupPage';
import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';
import AccountSettingsPage from '../../pages/accountSettingsPage';

require('cypress-xpath');

/*
Jira: NOUM-5168 Automation - Account Settings - Other scenarios
*/

let email = '';
let phonenumber = '';

describe('AccountSettings.Email.Phone.Update.spec.tsx', () => {
  before(() => {
    // register a user with email and phone number
    email = UtilPage.getRandomEmailAddress();
    phonenumber = UtilPage.getRandomPhoneNumber();

    SignupPage.registerUserByEmail(email, phonenumber);
    LoginPage.logoutByApi();
  });

  it('Able to update both email address and phone number', () => {
    // able to login using current email address and phone number
    LoginPage.loginByEmailAddress(email);

    // update email address and login using the updated value
    HomePage.goToAccountSettings();
    const updatedEmail = UtilPage.getRandomEmailAddress();
    AccountSettingsPage.updateEmailAddress(updatedEmail);
    LoginPage.logoutByApi().loginByEmailAddress(updatedEmail);

    HomePage.goToAccountSettings();
  });
});
