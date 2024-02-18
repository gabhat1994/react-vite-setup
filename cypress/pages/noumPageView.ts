import NoumPage from './noumPage';
import CommonPage from './commonPage';

class NoumPageView {
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

  verifyNoumCustomStyle(name: string) {
    cy.xpath(
      `//style[@id="noum-custom-style" and contains(.,"${name}")]`,
    ).should('exist');
    return this;
  }

  verifyNoumCustomFont(name: string) {
    cy.xpath(
      `//style[@id="noum-custom-font" and contains(.,"${name}")]`,
    ).should('exist');
    return this;
  }

  verifyNoumCustomStyleEmpty() {
    cy.xpath(`//style[@id="noum-custom-style"]`).should('not.have.text');
    return this;
  }

  verifyNoumCustomFontEmpty() {
    cy.xpath(`//style[@id="noum-custom-font"]`).should(
      'have.text',
      '\n    :root {\n  }',
    );
    return this;
  }

  waitNoumPageToLoad(name: string) {
    CommonPage.backButton.should('be.visible');
    CommonPage.waitForSkeletonLoader();
    NoumPage.headerName.should('have.text', name);
    return this;
  }

  waitViewNoumPageToLoad() {
    CommonPage.backButton.should('be.visible');
    CommonPage.waitForSkeletonLoader();
    return this;
  }
}
export default new NoumPageView();
