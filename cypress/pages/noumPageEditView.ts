import CommonPage from './commonPage';

class NoumPageEditView {
  // generic
  get fieldDropDown() {
    return cy.xpath('//a[@data-testid="dropdown-value"]');
  }

  get modalHeader() {
    return cy.get('[data-test="ModalHeader-Title-TSpan"]').should('be.visible');
  }

  get buttonLabel() {
    return cy.get('[data-testid="button_text"]');
  }

  get archiveOption() {
    return cy
      .get('[data-testid="noum-edit-option-Archive"]')
      .should('be.visible');
  }

  get archivedAvatar() {
    return cy.xpath(
      '//span[@data-test="Tag-TagContent" and text()="Archived"]',
    );
  }

  viewInviteVisibility() {
    cy.get('[data-testid="noum-edit-option-Invites & Visibility"]').click();
    this.modalHeader
      .should('be.visible')
      .should('have.text', 'Invites & Visibility');
    return this;
  }

  viewPermissions() {
    cy.get('[data-testid="noum-edit-option-Permissions"]').click();
    this.modalHeader.should('be.visible').should('have.text', 'Permissions');
    return this;
  }

  viewCustomPreview() {
    cy.get('[data-test="NoumEditOptionsNew-ThreeDotsIconWrapper"]').click();
    this.fieldDropDown.contains('Custom Preview').click();
    cy.get('[aria-label="custom_preview_panel_description"]').should(
      'be.visible',
    );
    return this;
  }

  viewCustomized() {
    cy.get('[data-testid="noum-edit-option-Customize"]').click();
    cy.xpath(
      '//span[@data-test="Breadcrumbs-Title" and text()="Customize"]',
    ).should('be.visible');
    return this;
  }

  viewBroadcast() {
    cy.get('[data-testid="noum-edit-option-Broadcasting"]').click();
    cy.xpath(
      '//*[@data-testid="chamber-broadcast-create-btn" or @data-testid="chamber-broadcast-create-campaign-btn"]',
    ).should('be.visible');
    return this;
  }

  viewArchiveModal() {
    cy.xpath(
      '//div[@data-test="NoumEditOptionsNew-ThreeDotsIconWrapper"]',
    ).click();
    cy.xpath('//span[text()="Archive"]').click();
    this.modalHeader.should('be.visible').should('have.text', 'Archive');
    return this;
  }

  confirmArchiveNoum() {
    this.buttonLabel.contains('Archive').click();
    CommonPage.verifyAlertMessage('Success: Noum status updated successfully');
    this.buttonLabel.contains('Unarchive').should('be.visible');
    this.archivedAvatar.should('be.visible');
    return this;
  }

  goBackWithoutUpdate() {
    cy.get('[data-testid="Header-Back-Button"]').click();
    CommonPage.backButton.should('be.visible');
    CommonPage.waitForSkeletonLoader();
  }
}
export default new NoumPageEditView();
