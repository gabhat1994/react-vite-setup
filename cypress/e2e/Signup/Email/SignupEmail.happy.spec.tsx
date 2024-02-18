import { faker } from '@faker-js/faker';
import SignupPage from '../../../pages/signupPage';
import UtilPage from '../../../pages/utilPage';

describe(
  'SignupEmail.happy.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    it('Visits the Noumena Website Sign up page', () => {
      const email = UtilPage.getRandomEmailAddress();
      const otp = UtilPage.generateOtp();

      // go to sign up page
      SignupPage.goToSignupPage();

      // fillup email, firstname and lastname
      SignupPage.emailField.type(email);
      SignupPage.firstNameField.type(faker.name.firstName());
      SignupPage.lastNameField.type(faker.name.lastName());
      SignupPage.passwordField.type(`${Cypress.env('AUTO_USER_PASSWORD')}`);

      // submit first page
      SignupPage.submitSignupPage();

      // enter OTP and submit it
      SignupPage.inputOtpValue(otp);
      SignupPage.submitOtpPage();

      // Questionnaire Page //
      cy.contains('Welcome to Noumena!');
      cy.contains('Your account is almost ready!');
      cy.contains('Help us to get to know you.');
      cy.contains(
        'Our solutions are best for those with $60,000 in annual self-employed income.',
      );

      // select age bracket
      SignupPage.selectQuestionValueByLabel(
        'I am a … (pick one)',
        'Gen Z (18-24)',
      );
      // select years of employment
      SignupPage.selectQuestionValueByLabel(
        'How long have you been self employed?',
        '3-5 years',
      );
      // select stage of business
      SignupPage.selectQuestionValueByLabel(
        'Which stage of business are you?',
        'Grower',
      );
      // select business/skills
      SignupPage.typeSelectQuestionValueByLabel(
        'What kind of business do you have?',
        'Accounting',
      );
      // select revenue
      SignupPage.selectQuestionValueByLabel(
        'What is your expected revenue from your business this year?',
        '$300,000+',
      );
      // select enity
      SignupPage.selectQuestionValueByLabel(
        'What entity do you use for your primary self-employed business?',
        'PLLC',
      );

      // Submit button and Continue to Noumena
      SignupPage.questionSubmitBtn.click();
      SignupPage.continueBtn.click();

      // assertion existance of Welcome to Noumena
      cy.wait(2000);
      cy.get('[data-testid="noum-onboarding-section-testid"]').should(
        'be.visible',
      );
    });
  },
);
