import { faker } from '@faker-js/faker';
import UtilPage from './utilPage';
import CommonPage from './commonPage';
import HomePage from './homePage';
import LoginPage from './loginPage';

class SignupPage {
  get emailField() {
    return cy.get('[data-testid="emailInput"]');
  }

  get firstNameField() {
    return cy.get('[data-testid="firstNameInput"]');
  }

  get lastNameField() {
    return cy.get('[data-testid="lastNameInput"]');
  }

  get passwordField() {
    return cy.get('[data-testid="passwordInput"]');
  }

  get referralInfo() {
    return cy.xpath(
      '//div[@data-testid="stack"]/span[@data-test="ReferralInfo-TSpan"]',
    );
  }

  get countryCodeDropdown() {
    return cy.get(
      '[data-testid="styledCountryDownArrow"] [data-testid="svgIcon"]',
    );
  }

  get countryCodeField() {
    return cy.get(
      '[data-testid="dropdown-container"] [data-testid="Styled-TextField"] input',
    );
  }

  get phoneField() {
    return cy.get('[data-test="PhoneInput-TextField"]');
  }

  get referralCodeField() {
    return cy.get('[data-testid="referralCodeInput"]');
  }

  get signUpSubmitBtn() {
    return cy.get('[data-testid="submitBtn"] > [data-testid="button_text"]');
  }

  get otpFieldOne() {
    return cy.get('[data-cy="OtpInput-cy-0"]');
  }

  get otpFieldTwo() {
    return cy.get('[data-cy="OtpInput-cy-1"]');
  }

  get otpFieldThree() {
    return cy.get('[data-cy="OtpInput-cy-2"]');
  }

  get otpFieldFour() {
    return cy.get('[data-cy="OtpInput-cy-3"]');
  }

  get otpSubmitBtn() {
    return cy.get('[data-testid="submitOtp"] > [data-testid="button_text"]');
  }

  get questionSubmitBtn() {
    return cy.get('[data-test="Button-ButtonStyled"]');
  }

  get continueBtn() {
    return cy.get('[data-testid="button_text"]');
  }

  get moreInfoHeader() {
    return cy.get('[data-test="MoreInfomationV2-Title"]');
  }

  get moreInfoHeader2() {
    return cy.get('[data-test="MoreInfomationV2-Description"]');
  }

  get moreInfoTextField() {
    return cy.get('[data-test="TextArea-textarea"]');
  }

  get moreInfoUrlField() {
    return cy.get('[data-test="MoreInfomationV2-TextField"]');
  }

  // cy.get('[data-test="MoreInfo-HeadTag"]')

  questionFieldByLabel(text: string) {
    return cy.xpath(
      `//div[@data-test="QuestionContainer-QuestionContainerWrapper" and contains(.,"${text}")]//input[@data-test="QuestionContainer-TextField"]`,
    );
  }

  questionAnswerByLabel(text: string) {
    return cy.xpath(
      `//a[@data-testid="dropdown-value" and contains(.,"${text}")]`,
    );
  }

  goToSignupPage() {
    cy.clearCookies();
    cy.getCookies().should('be.empty');

    // go to sign up page
    cy.visit(`/sign-up`);
    cy.wait(1000);
    LoginPage.acceptCookies();
  }

  submitSignupPage() {
    this.signUpSubmitBtn.click();
    cy.wait(1000);
    this.emailField.should('not.exist');
    cy.location('pathname').should('include', '/signup-otp');
  }

  submitOtpPage() {
    this.otpSubmitBtn.click();
    cy.wait(1000);
    this.waitUntilElementNotExist(this.otpFieldOne);
    this.questionFieldByLabel('I am a … (pick one)').should('be.visible');
    cy.location('pathname').should('include', '/signup-questions');
  }

  inputOtpValue(otp: string) {
    const digits = [...otp];

    // verify text on otp page
    cy.contains("Please confirm it's really you");

    // enter OTP provided
    this.otpFieldOne.type(digits[0]);
    this.otpFieldTwo.type(digits[1]);
    this.otpFieldThree.type(digits[2]);
    this.otpFieldFour.type(digits[3]);
    cy.wait(1000);
  }

  inputPhoneNumberValue(code: string, phonenumber: string) {
    // input country code and phone number
    this.countryCodeDropdown.click();
    this.countryCodeField.type(`${code}{enter}`);
    this.phoneField.type(phonenumber);
  }

  setPhoneNumberValue(phonenumber?: string) {
    // input country code and phone number
    this.inputPhoneNumberValue(
      '63',
      phonenumber || `943${Math.random().toString().substring(4, 8)}000`,
    );
  }

  selectQuestionValueByLabel(question: string, answer: string) {
    // select a value by typing or searching it
    this.questionFieldByLabel(question).click();
    this.questionAnswerByLabel(answer).click();
  }

  typeSelectQuestionValueByLabel(question: string, answer: string) {
    // select a value by typing or searching it
    this.questionFieldByLabel(question).click();
    this.questionFieldByLabel(question).clear();
    this.questionFieldByLabel(question).type(answer);
    this.questionAnswerByLabel(answer).click();
  }

  waitUntilElementNotExist(locator: Cypress.Chainable<JQuery<HTMLElement>>) {
    let i = 0;
    let isVisible = false;
    do {
      try {
        locator.should('not.exist');
        isVisible = true;
      } catch (error) {
        isVisible = false;
        i++;
        cy.wait(1000);
      }
    } while (i < 5 && isVisible === false);
  }

  registerUserByEmail(email: string, phone?: string) {
    // go to sign up page
    cy.visit(`/sign-up`);
    cy.wait(1000);
    LoginPage.acceptCookies();
    this.fillUpSignupForm(email, phone);
  }

  fillUpSignupForm(email: string, phone?: string, isReferral = false) {
    const otp = UtilPage.generateOtp();
    LoginPage.acceptCookies();
    // fillup email, firstname and lastname
    this.emailField.type(email);
    this.firstNameField.type(faker.name.firstName());
    this.lastNameField.type(faker.name.lastName());
    this.passwordField.type(`${Cypress.env('AUTO_USER_PASSWORD')}`);


    // Need to wait for button to become enabled and submit first page
    cy.wait(1000);
    this.signUpSubmitBtn.click();
    this.emailField.should('not.exist');
    cy.location('pathname').should('include', '/signup-otp');

    // enter OTP and submit it
    this.inputOtpValue(otp);

    // OTP Next button
    this.otpSubmitBtn.click();
    CommonPage.waitForSpinnerToNotExist();
    this.questionFieldByLabel('I am a … (pick one)').should('be.visible');
    cy.location('pathname').should('include', '/signup-questions');

    // Questionnaire Page //
    // select age bracket
    this.questionFieldByLabel('I am a … (pick one)').click();
    this.questionAnswerByLabel('Gen Z (18-24)').click();

    // select years of employment
    this.questionFieldByLabel('How long have you been self employed?').click();
    this.questionAnswerByLabel('3-5 years').click();

    // select stage of business
    this.questionFieldByLabel('Which stage of business are you?').click();
    this.questionAnswerByLabel('Grower').click();

    // select business/skills
    this.questionFieldByLabel('What kind of business do you have?').click();
    this.questionFieldByLabel('What kind of business do you have?').type(
      'Accounting',
    );
    this.questionAnswerByLabel('Accounting').click();

    // select revenue
    this.questionFieldByLabel(
      'What is your expected revenue from your business this year?',
    ).click();
    this.questionAnswerByLabel('$300,000+').click();

    // select enity
    this.questionFieldByLabel(
      'What entity do you use for your primary self-employed business?',
    ).click();
    this.questionAnswerByLabel('PLLC').click();

    // Submit button and Continue to Noumena
    this.questionSubmitBtn.click();
    this.continueBtn.click();

    // Assertion existance of Welcome to Noumena
    cy.wait(2000);
    cy.get('[data-testid="noum-onboarding-section-testid"]').should(
      'be.visible',
    );

    if (isReferral === true) {
      // connected user
      cy.visit('profile');
      CommonPage.waitForSkeletonLoader();
      HomePage.connectUserCount.contains('1');
    }
  }
}

export default new SignupPage();
