import CommonPage from './commonPage';

class AccountSettingsPage {
  get inviteFriendBtn() {
    return cy.get('[data-test="InviteFriendSideMenuSection-TSpan"]');
  }

  get copyLinBtn() {
    return cy.get('[data-testid="button"]').contains('Copy Link');
  }

  get referralList() {
    return cy.get('[data-test="InvitesRequest-InvDataHead"]');
  }

  get referralUrl() {
    return cy
      .get('[data-test="InvitesFriends-ReferralCodeHead"]')
      .find('[data-test="InvitesFriends-TSpan"]');
  }

  get otpInput1() {
    return cy.get('[data-cy="OtpInput-cy-0"]');
  }

  get otpInput2() {
    return cy.get('[data-cy="OtpInput-cy-1"]');
  }

  get otpInput3() {
    return cy.get('[data-cy="OtpInput-cy-2"]');
  }

  get otpInput4() {
    return cy.get('[data-cy="OtpInput-cy-3"]');
  }

  get helpIFrame() {
    return cy.iframe('[data-testid="widget-frame"]');
  }

  get helpIcon() {
    return cy.get('[data-test="SideMenu-TSpan"]').contains('Help');
  }

  copyReferralUrl() {
    this.copyLinBtn.click();
    CommonPage.verifyAlertMessage('Referral code copied!');
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        cy.wrap(text).as('url');
      });
    });
    return this;
  }

  inputOtpValue(otp: string) {
    const digits = [...otp];

    // enter OTP provided
    this.otpInput1.type(digits[0]);
    this.otpInput2.type(digits[1]);
    this.otpInput3.type(digits[2]);
    this.otpInput4.type(digits[3]);
    cy.wait(1000);
  }

  setPhoneNumber(phonenumber: string) {
    // set country code dropdown
    cy.get('[data-testid="styledCountryDownArrow"] [data-testid="svgIcon"]')
      .last()
      .click();
    cy.get(
      '[data-testid="dropdown-container"] [data-testid="Styled-TextField"] input',
    ).type(`63{enter}`);

    // Enter the valid phone number
    cy.get('[data-testid="testLoginPhoneInput"]').last().type(phonenumber);
  }

  updateEmailAddress(updatedEmail: string) {
    cy.get('[data-testid="edit-email"]').should('be.visible').click();
    cy.get('[data-testid="testEmailLoginTextField"]').last().type(updatedEmail);
    cy.get('[data-testid="nextButton"]').should('be.visible').click();
    CommonPage.verifyAlertMessage('Verification Code Sent');
    this.inputOtpValue('1234');
    cy.get('[data-testid="primaryBtn"]').click();
    CommonPage.verifyAlertMessage('Success: Email address changed successfully.');
    cy.get('[data-testid="testEmailLoginTextField"]')
      .first()
      .should('have.value', updatedEmail);
  }

  updatePhoneNumber(updatedPhonenumber: string) {
    cy.get('[data-testid="edit-phone"]').click();
    this.setPhoneNumber(updatedPhonenumber);
    cy.get('[data-testid="button"]').contains('Next').click();
    CommonPage.verifyAlertMessage('Verification Code Sent');
    this.inputOtpValue('1234');
    cy.get('[data-testid="primaryBtn"]').click();
    CommonPage.verifyAlertMessage('Success: OTP verified successfully!');
    cy.get('[data-testid="testPhoneInput"]')
      .first()
      .should('have.value', updatedPhonenumber);
  }

  verifyEmailAndPasswordFields() {
    cy.get('[data-testid="edit-email"]').should('be.visible');
    cy.get('[data-testid="edit-password"]').should('be.visible');
  }
}

export default new AccountSettingsPage();
