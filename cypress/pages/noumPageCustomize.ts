class NoumPageCustomize {
  // generic
  get fieldDropDown() {
    return cy.xpath('//a[@data-testid="dropdown-value"]');
  }

  get fontInputField() {
    return cy.get('[data-test="DropdownContent-dropdownContent-TextField"]');
  }

  get resetChangesButton() {
    return cy.xpath(
      '//span[@data-testid="button_text" and text()="Reset Changes"]',
    );
  }

  get modalRevertButton() {
    return cy.xpath(
      '//span[@data-testid="button_text" and text()="Yes, Revert to Default"]',
    );
  }

  setTheme(name: string) {
    return cy.xpath(
      `//div[@data-test="SideModal-Children"]//img[@alt="backgroundImage"]/following-sibling::div[text()="${name}"]`,
    );
  }

  selectTheme(name: string) {
    cy.get('[id="theme"]').click();
    this.setTheme(name).should('be.visible').click();
    return this;
  }

  selectColor(name: string) {
    cy.get('[id="fonts"]').click();
    this.setTheme(name).should('be.visible').click();
    return this;
  }

  selectHeadingTextFont(name: string) {
    cy.get('[id="fonts"]').click();
    cy.xpath('(//input[@data-test="FontPicker-TextField"])[1]').click();
    this.fontInputField.type(name);
    this.fieldDropDown.contains(name).click();
    return this;
  }

  selectBodyTextFont(name: string) {
    cy.get('[id="fonts"]').click();
    cy.xpath('(//input[@data-test="FontPicker-TextField"])[2]').click();
    this.fontInputField.type(name);
    this.fieldDropDown.contains(name).click();
    return this;
  }

  selectButtonsLabelsTextFont(name: string) {
    cy.get('[id="fonts"]').click();
    cy.xpath('(//input[@data-test="FontPicker-TextField"])[3]').click();
    this.fontInputField.type(name);
    this.fieldDropDown.contains(name).click();
    return this;
  }

  closeCustomized() {
    cy.get('[data-test="Breadcrumbs-IconWrapper"]').first().click();
    cy.xpath(
      '//span[@data-test="Breadcrumbs-Title" and text()="Customize"]',
    ).should('not.exist');
    return this;
  }

  resetCustomized() {
    this.resetChangesButton.click();
    this.modalRevertButton.should('be.visible').click();
    this.modalRevertButton.should('not.exist');
    return this;
  }
}
export default new NoumPageCustomize();
