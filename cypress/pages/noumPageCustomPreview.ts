import CommonPage from './commonPage';

class NoumPageCustomPreview {
  // generic
  get fieldDropDown() {
    return cy.xpath('//a[@data-testid="dropdown-value"]');
  }

  elementUpIcon(name: string) {
    return cy.xpath(
      `(//div[@data-test="EditMode-WrapperHead" and contains(.,"${name}")]//div[@data-test="EditMode-WrapperIcons"])[2]`,
    );
  }

  elementDownIcon(name: string) {
    return cy.xpath(
      `(//div[@data-test="EditMode-WrapperHead" and contains(.,"${name}")]//div[@data-test="EditMode-WrapperIcons"])[3]`,
    );
  }

  elementUnHideIcon(name: string) {
    return cy.xpath(
      `//div[@overflow="visible" and contains(.,"${name}")]/following-sibling::button/div[@color="--icon-card-neutral-default"]`,
    );
    }
    
  elementHideIcon(name: string) {
    return cy.xpath(
      `//div[@overflow="visible" and contains(.,"${name}")]/following-sibling::button/div[@color="--icon-button-brand-primary-hover"]`,
    );
  }

  unhideElement(name: string) {
    cy.wait(1000);
    this.elementUnHideIcon(name).click();
    this.elementHideIcon(name).should('be.visible');
    return this;
  }

  hideElement(name: string) {
    cy.wait(1000);
    this.elementHideIcon(name).click();
    this.elementUnHideIcon(name).should('be.visible');
    return this;
  }

  moveUpElement(name: string) {
    cy.wait(1000);
    this.elementUpIcon(name).click();
    return this;
  }

  moveDownElement(name: string) {
    this.elementDownIcon(name).click();
    return this;
  }

  saveCustomPreview() {
    cy.wait(2000);
    cy.get('[data-testid="EditHeader-CustomPreview-Save"]').click({
      force: true,
    });
    CommonPage.verifyAlertMessage('Custom Preview Saved');
    return this;
  }
}
export default new NoumPageCustomPreview();
