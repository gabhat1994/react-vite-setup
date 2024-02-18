import CommonPage from 'cypress/pages/commonPage';

class NoumPermissionsPage {
  // generic
  get fieldDropDown() {
    return cy.xpath('//a[@data-testid="dropdown-value"]');
  }

  getUserStatus(username: string) {
    return cy
      .get('[data-test="ChamberConnectedUser-TSpan"]')
      .contains(username)
      .should('be.visible')
      .parentsUntil('[data-test="ChamberConnectedUser-UserBody"]')
      .next('[data-test="ChamberConnectedUser-DropdownPicker"]')
      .find('[data-test="ChamberConnectedUser-PickedPermission"]');
  }

  verifyUserListed(username: string, permission?: string) {
    cy.get('[data-test="ChamberConnectedUser-TSpan"]')
      .contains(username)
      .should('be.visible');
    if (permission !== undefined) {
      this.getUserStatus(username).contains(permission).should('be.visible');
    }
    return this;
  }

  changeUserPermission(username: string, permission: string) {
    cy.xpath(
      `//div[@data-test="ChamberConnectedUser-UserWrapper" and contains(.,"${username}")]/child::div/div[@data-test="ChamberConnectedUser-DropdownPicker"]`,
    ).click();
    this.fieldDropDown.contains(permission).should('be.visible').click();
    cy.get('[data-testid="dropdown-container"]').should('not.exist');
    cy.get('[data-testid="button"]')
      .contains('Save Changes')
      .should('be.visible')
      .click();
    CommonPage.verifyAlertMessage('Permissions changed.');
    return this;
  }

  verifyUserNotConnected(username: string) {
    cy.xpath(
      `//div[@data-test="ChamberConnectedUser-UserWrapper" and contains(.,"${username}")]/child::div/div[@data-test="ChamberConnectedUser-DropdownPicker"]`,
    ).should('not.exist');
    return this;
  }

  closeModal() {
    cy.get('[data-testid="modal_close_btn"]').click();
    return this;
  }
}
export default new NoumPermissionsPage();
