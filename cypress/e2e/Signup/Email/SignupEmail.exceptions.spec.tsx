import { faker } from '@faker-js/faker';
import SignupPage from '../../../pages/signupPage';
import UtilPage from '../../../pages/utilPage';
import CommonPage from '../../../pages/commonPage';

describe('SignupEmail.exceptions.spec.tsx', () => {
  it('Invalid Email Address', () => {
    // go to sign up page
    SignupPage.goToSignupPage();

    // validate invalid address
    SignupPage.emailField.type('test');
    cy.contains('Please use a valid email address (email@address.com)');

    SignupPage.emailField.clear();
    SignupPage.emailField.type('test@');
    cy.contains('Please use a valid email address (email@address.com)');

    SignupPage.emailField.clear();
    SignupPage.emailField.type('test@gmail');
    cy.contains('Please use a valid email address (email@address.com)');

    SignupPage.emailField.clear();
    SignupPage.emailField.type('test@gmail.com1');
    cy.contains('Please use a valid email address (email@address.com)');
  });

  it('Existing Email Address', () => {
    // go to sign up page
    SignupPage.goToSignupPage();

    // fillup email, firstname and lastname
    SignupPage.emailField.type('roberto@noumena.global');
    SignupPage.firstNameField.type(faker.name.firstName());
    SignupPage.lastNameField.type(faker.name.lastName());
    SignupPage.passwordField.type(`${Cypress.env('AUTO_USER_PASSWORD')}`);

    // Need to wait for button to become enabled and submit first page
    cy.wait(1000);
    SignupPage.signUpSubmitBtn.click();
    cy.contains('This account already exists. Please Log in.');
  });

  it('Invalid Firstname', () => {
    // go to sign up page
    SignupPage.goToSignupPage();

    // validate invalid scenarios for firstname
    SignupPage.firstNameField.type('T');
    cy.contains('This name seems too short');

    SignupPage.firstNameField.clear();
    SignupPage.firstNameField.type('T!@#$');
    cy.contains("A special character can't be added here.");

    SignupPage.firstNameField.clear();
    SignupPage.firstNameField.type('Tttttttttttttttttttttt');
    cy.contains('First name is too long');

    SignupPage.firstNameField.clear();
    SignupPage.firstNameField.type('123456');
    cy.contains("A special character can't be added here.");

    SignupPage.firstNameField.clear();
    SignupPage.firstNameField.type('          ');
    cy.contains('Please complete this field.');
  });

  it('Invalid Lastname', () => {
    // go to sign up page
    SignupPage.goToSignupPage();

    // validate invalid scenarios for lastname
    SignupPage.lastNameField.type('T');
    cy.contains('This name seems too short');

    SignupPage.lastNameField.clear();
    SignupPage.lastNameField.type('T!@#$');
    cy.contains("A special character can't be added here.");

    SignupPage.lastNameField.clear();
    SignupPage.lastNameField.type('Tttttttttttttttttttttt');
    cy.contains('Last name is too long');

    SignupPage.lastNameField.clear();
    SignupPage.lastNameField.type('123456');
    cy.contains("A special character can't be added here.");

    SignupPage.lastNameField.clear();
    SignupPage.lastNameField.type('          ');
    cy.contains('Please complete this field.');
  });

  it.skip('Invalid Phone Number', () => {
    // go to sign up page
    cy.visit(`/sign-up`);
    cy.wait(1000);

    // validate invalid scenarios for lastname
    SignupPage.phoneField.type('232323232323232323');
    cy.contains('Incorrect phone number');
  });

  it('Invalid Referral Code', () => {
    // go to sign up page
    cy.visit(`/sign-up?referral-code=111111`);

    CommonPage.verifyAlertMessage('Invalid referral code.');
    SignupPage.referralInfo.should('not.exist');
  });

  it('Referral Code Exhausted', () => {
    cy.visit(`/sign-up?referral-code=${Cypress.env('AUTO_REFERRAL_CODE_MAX')}`);
    CommonPage.verifyAlertMessage('This code has been used for maximum number of times allowed.');
    SignupPage.referralInfo.should('not.exist');
  });

  it('Referral Code Invalid', () => {
    // go to sign up page
    cy.visit(`/sign-up?referral-code=0000`);

    CommonPage.verifyAlertMessage('Invalid referral code.');
    SignupPage.referralInfo.should('not.exist');
  });

  // TODO - https://communitycapitalnoumena.atlassian.net/browse/CCC-4157
  it('Referral Code of Rejected User', () => {
    cy.visit(`/sign-up?referral-code=${Cypress.env('AUTO_REFERRAL_CODE_REJECTED')}`);
    CommonPage.verifyAlertMessage('Referral code is invalid!');
    SignupPage.referralInfo.should('not.exist');
  });
});
