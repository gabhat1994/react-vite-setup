import CommonPage from './commonPage';

class NoumInvitesVisibilityPage {
  // generic
  get fieldDropDown() {
    return cy.xpath('//a[@data-testid="dropdown-value"]');
  }

  getUserStatus(username: string) {
    return cy
      .get('[data-test="ChamberInvitedUser-TSpan"]')
      .contains(username)
      .parentsUntil('[data-test="ChamberInvitedUser-UserBody"]')
      .next('[data-test="ChamberInvitedUser-DropdownWrapper"]')
      .find('[data-test="ChamberInvitedUser-PickedInviteStatus"]');
  }

  addUser(username: string) {
    cy.get('[data-test="InviteUserSearch-InputField"]').type(username);
    cy.get('[data-test="InviteUserOptionRenderer-DropDownLabel"]')
      .should('have.length', 1)
      .click({ force: true });
    return this;
  }

  addMessage(message: string) {
    cy.get('[data-testid="TextArea"]').type(message);
    cy.get('[data-test="TextArea-LengthHelperText"]').should(
      'have.text',
      `${message.length}/200`,
    );
    return this;
  }

  confirmInviteUser() {
    cy.get('[data-testid="button"]').contains('Invite').click();
    CommonPage.verifyAlertMessage('Invites sent!');
    return this;
  }

  verifyInvitedUser(username: string) {
    cy.get('[data-test="ChamberInvitedUser-UserName"]')
      .contains(username)
      .should('be.visible');
    this.getUserStatus(username).should('have.text', 'Pending');
    return this;
  }

  inviteUser(username: string, message?: string) {
    this.addUser(username);
    if (message !== undefined) {
      this.addMessage(message);
    }
    this.confirmInviteUser();
    this.verifyInvitedUser(username);
  }

  resendInviteToUser(username: string) {
    cy.get('[data-test="ChamberInvitedUser-UserName"]')
      .contains(username)
      .should('be.visible');
    this.getUserStatus(username).should('have.text', 'Declined').click();
    this.fieldDropDown.contains('Resend the Invite').click();
    CommonPage.verifyAlertMessage('Invite sent!');
    this.getUserStatus(username).should('have.text', 'Pending');
    return this;
  }

  cancelInviteToUser(username: string) {
    cy.get('[data-test="ChamberInvitedUser-UserName"]')
      .contains(username)
      .should('be.visible');
    this.getUserStatus(username).should('have.text', 'Pending').click();
    this.fieldDropDown.contains('Cancel Invite').click();
    cy.get('[data-test="ChamberInvitedUser-UserName"]').should('not.exist');
    return this;
  }

  verifyApprovedUser(username: string) {
    cy.get('[data-test="ChamberInvitedUser-UserName"]')
      .contains(username)
      .should('be.visible');
    this.getUserStatus(username).should('have.text', 'Approved');

    return this;
  }

  closeModal() {
    cy.get('[data-testid="modal_close_btn"]').click();
    return this;
  }
}
export default new NoumInvitesVisibilityPage();
