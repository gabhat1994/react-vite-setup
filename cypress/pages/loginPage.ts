class LoginPage {
  get loginEmailTab() {
    return cy.get('[data-testid="tab-1"]');
  }

  get loginPhoneTab() {
    return cy.get('[data-testid="tab-0"]');
  }

  get loginEmailAddressField() {
    return cy.get('[data-testid="loginEmailTextField"]');
  }

  get loginPasswordField() {
    return cy.get('[data-testid="loginPasswordTextField"]');
  }

  get loginButton() {
    return cy.xpath(
      '//button[@data-testid="button" and contains(.,"Log In") and not(@disabled)]',
    );
  }

  get loginOtpInput1() {
    return cy.get('[data-cy="OtpInput-cy-0"]');
  }

  get loginOtpInput2() {
    return cy.get('[data-cy="OtpInput-cy-1"]');
  }

  get loginOtpInput3() {
    return cy.get('[data-cy="OtpInput-cy-2"]');
  }

  get loginOtpInput4() {
    return cy.get('[data-cy="OtpInput-cy-3"]');
  }

  get loginOtpSubmitButton() {
    return cy.xpath('//button[contains(@id,"signin-next-btn")]');
  }

  setPhoneNumber(phonenumber: string) {
    // set country code dropdown
    cy.get(
      '[data-testid="styledCountryDownArrow"] [data-testid="svgIcon"]',
    ).click();
    cy.get(
      '[data-testid="dropdown-container"] [data-testid="Styled-TextField"] input',
    ).type(`63{enter}`);

    // Enter the valid phone number
    cy.get('[data-testid="testLoginPhoneInput"]').type(phonenumber);
  }

  inputOtpValue(otp: string) {
    const digits = [...otp];

    // verify text on otp page
    cy.contains('Log in');

    // enter OTP provided
    this.loginOtpInput1.type(digits[0]);
    this.loginOtpInput2.type(digits[1]);
    this.loginOtpInput3.type(digits[2]);
    this.loginOtpInput4.type(digits[3]);
    cy.wait(1000);
  }

  loginByEmailAddress(emailAddress: string) {
    cy.clearCookies();

    // navigate to login page
    cy.visit(`/login`);
    this.acceptCookies();

    // provide user email address
    this.loginEmailAddressField.should('be.visible');
    this.loginEmailAddressField.click();
    this.loginEmailAddressField.type(emailAddress);
    this.loginPasswordField.type(`${Cypress.env('AUTO_USER_PASSWORD')}`);
    this.loginButton.click();

    // validate homepage is displayed
    cy.get('[data-testid="global-search-input-new"]').should('be.visible');
    this.acceptCookies();
    return this;
  }

  loginByPhoneNumber(phonenumber: string) {
    // navigate to login page
    cy.visit(`/login`);
    this.acceptCookies();

    // provide user phone number
    this.loginEmailAddressField.should('be.visible');
    this.loginPhoneTab.check();
    this.setPhoneNumber(phonenumber);
    this.loginButton.click();

    // provide otp and login
    this.loginOtpInput1.should('be.visible');
    this.inputOtpValue('1234');
    this.loginOtpSubmitButton.should('be.visible').click();

    // validate homepage is displayed
    cy.get('[data-testid="global-search-input-new"]').should('be.visible');
    this.acceptCookies();
    return this;
  }

  loginByApi(emailAddress?: string) {
    cy.clearCookies();
    const baseUrl = Cypress.config('baseUrl');

    cy.login(emailAddress);
    cy.url().then((url) => {
      cy.wait(500);
      cy.log(`url: ${url}`);
      if (!url.includes('login')) {
        cy.log('User is logged in.');
        return;
      }
      cy.wait(2000);
      cy.log('User Not logged in. Need to retry.');
      cy.login(emailAddress);
    });
    if (baseUrl) {
      cy.visit(baseUrl);
    } 
    this.acceptCookies();
    return this;
  }

  logoutByApi() {
    cy.logout();
    cy.clearCookies();
    cy.reload();
    return this;
  }

  acceptCookies() {
    cy.wait(2000);
    cy.get('body').then(($el) => {
      if ($el.find('[data-test="CookieConsentComponent-TSpan"]').length > 0) {
        cy.xpath('//button[contains(.,"Accept All") and not(@disabled)]').then(
          (error) => {
            console.error('Element timed out:', error);
            // Simulate pressing the "Escape" key
            cy.get('body').type('{esc}');
            cy.xpath(
              '//button[contains(.,"Accept All") and not(@disabled)]',
            ).click();
          },
        );
      }
    });
  }
}

export default new LoginPage();
