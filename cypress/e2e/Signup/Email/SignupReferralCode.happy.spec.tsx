import { faker } from '@faker-js/faker';
import SignupPage from '../../../pages/signupPage';
import UtilPage from '../../../pages/utilPage';
import HomePage from '../../../pages/homePage';
import NoumPageView from '../../../pages/noumPageView';
import LoginPage from '../../../pages/loginPage';

describe(
  'SignupReferralCode.happy.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    it('Visits the Noumena Website Sign up page', () => {
      const email = UtilPage.getRandomEmailAddress();
      const otp = UtilPage.generateOtp();

      // go to sign up page
      cy.visit(`/sign-up?referral-code=${Cypress.env('AUTO_REFERRAL_CODE')}`);
      cy.wait(1000);
      LoginPage.acceptCookies();

      const firstname = faker.name.firstName();
      const lastname = faker.name.lastName();
      // fillup email, firstname and lastname
      SignupPage.emailField.type(email);
      SignupPage.firstNameField.type(firstname);
      SignupPage.lastNameField.type(lastname);
      SignupPage.passwordField.type(`${Cypress.env('AUTO_USER_PASSWORD')}`);

      SignupPage.referralInfo.should(
        'have.text',
        `You’re joining via ${Cypress.env('AUTO_MEMBER_SEARCH')} referral link`,
      );

      // submit first page
      SignupPage.submitSignupPage();

      // enter OTP and submit it
      SignupPage.inputOtpValue(otp);
      SignupPage.submitOtpPage();
      SignupPage.otpFieldOne.should('not.exist');
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
      HomePage.connectUserCount.contains('1');
      HomePage.mainHeaderAvatar
        .should('be.visible')
        .and('have.text', `${firstname} ${lastname}`);
    });
  },
);
