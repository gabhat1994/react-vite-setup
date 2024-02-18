import CommonPage from './commonPage';
import CommonModal from './commonModal';

class NoumPageLink {
  // generic
  get fieldDropDown() {
    return cy.xpath('//a[@data-testid="dropdown-value"]');
  }

  selectNoumToLink(noum: string) {
    cy.xpath(
      `//div[@data-test="LinkNoumOption-SelectOption" and contains(.,"${noum}")]/span[@data-testid="checkbox"]`,
    )
      .should('be.visible')
      .click();
  }

  verifyNoumInPreviewLink(noum: string) {
    cy.xpath(
      `//div[@data-test="NoumPreview-PreviewItem" and contains(.,"${noum}")]').should('be.visible`,
    );
  }

  linkSelectedNoums() {
    cy.xpath(
      '//div[@data-test="LinkNoumActionFooter-ButtonWrapper"]//span[@data-testid="button_text" and contains(.,"Link")]',
    ).should('be.visible').click();
    cy.xpath('//div[@data-test="ModalFooter-ModalFooterStyled" and contains(.,"Yes! Let\'s Link These")]').should('be.visible').click();
    cy.xpath('//span[@data-test="LinkNoumCompletedModal-TSpan" and text()="Link Complete!"]').should('be.visible');
    cy.xpath('//div[@data-test="ModalFooter-ModalFooterStyled" and contains(.,"Close")]').click();
  }
}
export default new NoumPageLink();
