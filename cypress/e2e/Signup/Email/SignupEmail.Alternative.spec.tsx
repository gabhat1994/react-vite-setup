import { faker } from '@faker-js/faker';
import SignupPage from '../../../pages/signupPage';
import LoginPage from '../../../pages/loginPage';
import UtilPage from '../../../pages/utilPage';
import HomePage from '../../../pages/homePage';

describe('SignupEmail.Alternative.spec.tsx', () => {
  it('Rejected Flow', () => {
    const email = UtilPage.getRandomEmailAddress();
    const otp = UtilPage.generateOtp();

    // go to sign up page
    SignupPage.goToSignupPage();

    // fillup email, firstname and lastname
    const firstname = faker.name.firstName();
    SignupPage.emailField.type(email);
    SignupPage.firstNameField.type(firstname);
    SignupPage.lastNameField.type(faker.name.lastName());
    SignupPage.passwordField.type(`${Cypress.env('AUTO_USER_PASSWORD')}`);

    // submit first page
    SignupPage.submitSignupPage();

    // enter OTP and submit it
    SignupPage.inputOtpValue(otp);
    SignupPage.submitOtpPage();

    // Questionnaire Page //
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
    // select country of origin
    SignupPage.typeSelectQuestionValueByLabel(
      'What country do you run your business in?',
      'Russia',
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

    // verify the rejected page details and redirect to correct page
    cy.contains(`Thank you for your interest in Noumena, ${firstname}`);
    cy.contains(
      'Sorry, we don’t have a solution today that fits your business needs.',
    );
    cy.contains(
      'We are committed to grow and improve our platform to serve more business owners around the world. We hope you’ll check back and that we can work with you in the future.',
    );
    cy.location('pathname').should('include', '/inactive');
    // verify that interaction on the page redirects to login page
    cy.contains(`Thank you for your interest in Noumena, ${firstname}`);

    cy.reload();
    LoginPage.loginEmailAddressField.should('be.visible');
  });

  it('Pending Flow', () => {
    const email = UtilPage.getRandomEmailAddress();
    const otp = UtilPage.generateOtp();

    // go to sign up page
    SignupPage.goToSignupPage();

    // fillup email, firstname and lastname
    const firstname = faker.name.firstName();
    const lastName = faker.name.lastName();
    SignupPage.emailField.type(email);
    SignupPage.firstNameField.type(firstname);
    SignupPage.lastNameField.type(lastName);
    SignupPage.passwordField.type(`${Cypress.env('AUTO_USER_PASSWORD')}`);

    // submit first page
    SignupPage.submitSignupPage();

    // enter OTP and submit it
    SignupPage.inputOtpValue(otp);
    SignupPage.submitOtpPage();

    // Questionnaire Page //
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
      'Less than $30,000',
    );
    // select enity
    SignupPage.selectQuestionValueByLabel(
      'What entity do you use for your primary self-employed business?',
      'No business entity',
    );

    // Submit button and Continue to Noumena
    SignupPage.questionSubmitBtn.click();
    SignupPage.questionFieldByLabel('I am a … (pick one)');
    cy.location('pathname').should('include', '/more_info');

    // additional information provided
    SignupPage.moreInfoHeader.should(
      'have.text',
      'We need a little more information about you.',
    );
    SignupPage.moreInfoHeader2.should(
      'have.text',
      'Please answer below to help us process your application to join.',
    );
    SignupPage.moreInfoTextField.type('Test information');
    SignupPage.moreInfoUrlField.type('https://github.com');
    SignupPage.continueBtn.click();

    // validate pending page confirmation page
    cy.contains(`Thanks for signing up, ${firstname}`);
    cy.contains(
      'The team is working to verify your request. You have sneak-peak-access until you`re approved.',
    );

    SignupPage.continueBtn.click();

    // Assertion existance of Welcome to Noumena
    cy.wait(2000);
    cy.get('[data-testid="noum-onboarding-section-testid"]').should(
      'be.visible',
    );
    HomePage.mainHeaderAvatar
      .should('be.visible')
      .and('have.text', `${firstname} ${lastName}`);
  });
});
