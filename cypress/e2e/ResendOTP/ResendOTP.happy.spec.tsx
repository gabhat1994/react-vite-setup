import { faker } from '@faker-js/faker';
import SignupPage from '../../pages/signupPage';
import CommonPage from '../../pages/commonPage';

describe(
  'ResendOTP.happy.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    // Check once as there's too much time
    // invovled in testing OTP + timeouts + IP blocking, etc
    it('Resend OTP link works', () => {
      // go to sign up page
      SignupPage.goToSignupPage();

      const uniqueEmail = `${Date.now()}@noumenaqa.global`;

      cy.wait(2000);

      // fillup email, firstname and lastname
      SignupPage.emailField.type(uniqueEmail);
      SignupPage.firstNameField.type(faker.name.firstName());
      SignupPage.lastNameField.type(faker.name.lastName());
      SignupPage.passwordField.type(`${Cypress.env('AUTO_USER_PASSWORD')}`);

      // Need to wait for button to become enabled and submit first page
      cy.wait(1000);
      SignupPage.signUpSubmitBtn.click();
      CommonPage.verifyAlertMessage('Verification Code Sent');


      // Click the OTP
      cy.get('[data-test="ResendOTPInfo-TSpan"]').contains('Please wait').should('be.visible');
      cy.get('[data-test="ResendOTPInfo-TSpan"]').contains('Resend Verification Code', {timeout: 30000}).should('be.visible').click();


      cy.get('[data-test="ResendOTPInfo-TSpan"]').contains('Code sent').should('be.visible');
      cy.wait(2000);
      cy.get('[data-test="ResendOTPInfo-TSpan"]').contains('Please wait').should('be.visible');
    });
  },
);
