import { faker } from '@faker-js/faker';
import CommonPage from 'cypress/pages/commonPage';
import SignupPage from '../../../pages/signupPage';
import UtilPage from '../../../pages/utilPage';
import HomePage from '../../../pages/homePage';
import NoumPageView from '../../../pages/noumPageView';
import LoginPage from '../../../pages/loginPage';
import NotificationPage from '../../../pages/notificationPage';

let email = '';

describe(
  'Signup.Deletion.Sanity.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    it('User account registration', () => {
      email = UtilPage.getRandomEmailAddress();
      const otp = UtilPage.generateOtp();

      // go to sign up page
      SignupPage.goToSignupPage();

      // fillup email, firstname and lastname
      SignupPage.emailField.type(email);
      SignupPage.firstNameField.type(faker.name.firstName());
      SignupPage.lastNameField.type(faker.name.lastName());
      SignupPage.passwordField.type(`${Cypress.env('AUTO_USER_PASSWORD')}`);

      // Need to wait for button to become enabled and submit first page
      cy.wait(1000);
      SignupPage.signUpSubmitBtn.click();
      CommonPage.verifyAlertMessage('Verification Code Sent');
      SignupPage.emailField.should('not.exist');
      cy.location('pathname').should('include', '/signup-otp');

      // enter OTP and submit it
      SignupPage.inputOtpValue(otp);

      // OTP Next button
      SignupPage.otpSubmitBtn.click();
      SignupPage.otpFieldOne.should('not.exist');
      cy.wait(2000);
      cy.get('body').type('{esc}');
      SignupPage.questionFieldByLabel('I am a … (pick one)').should(
        'be.visible',
      );
      cy.location('pathname').should('include', '/signup-questions');

      // Questionnaire Page //
      // select age bracket
      SignupPage.questionFieldByLabel('I am a … (pick one)').click();
      SignupPage.questionAnswerByLabel('Gen Z (18-24)').click();

      // select years of employment
      SignupPage.questionFieldByLabel(
        'How long have you been self employed?',
      ).click();
      SignupPage.questionAnswerByLabel('3-5 years').click();

      // select stage of business
      SignupPage.questionFieldByLabel(
        'Which stage of business are you?',
      ).click();
      SignupPage.questionAnswerByLabel('Grower').click();

      // select business/skills
      SignupPage.questionFieldByLabel(
        'What kind of business do you have?',
      ).click();
      SignupPage.questionFieldByLabel(
        'What kind of business do you have?',
      ).type('Accounting');
      SignupPage.questionAnswerByLabel('Accounting').click();

      // select revenue
      SignupPage.questionFieldByLabel(
        'What is your expected revenue from your business this year?',
      ).click();
      SignupPage.questionAnswerByLabel('$300,000+').click();

      // select enity
      SignupPage.questionFieldByLabel(
        'What entity do you use for your primary self-employed business?',
      ).click();
      SignupPage.questionAnswerByLabel('PLLC').click();

      // Submit button and Continue to Noumena
      SignupPage.questionSubmitBtn.click();
      SignupPage.continueBtn.click();

      // Assertion existance of Welcome to Noumena
      cy.wait(2000);
      cy.get('[data-testid="noum-onboarding-section-testid"]').should(
        'be.visible',
      );

      // connected user
      cy.visit('profile');
      NoumPageView.waitViewNoumPageToLoad();

      NotificationPage.bellIcon.should('have.attr', 'data-unread', 'true');
    });

    it('Delete registered account', () => {
      LoginPage.loginByApi(email);

      HomePage.mainHeaderAvatar.click();
      HomePage.mainHeaderSubAccountSettings.click();
      cy.get('[data-testid="delete-account"]').click();
      cy.contains('Delete Account');
      cy.wait(3000);
      cy.get('[data-test="DeleteAccountModal-TextField"]').type('DELETE');
      cy.get('[data-testid="primaryBtn"]').click();
      CommonPage.verifyAlertMessage('Your account has been deleted.');
      cy.contains('Log in');
    });
  },
);
