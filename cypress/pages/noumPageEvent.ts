class NoumPageEvent {
  // generic
  get fieldDropDown() {
    return cy.xpath('//a[@data-testid="dropdown-value"]');
  }

  get modalHeader() {
    return cy.get('[data-test="ModalHeader-Title-TSpan"]').should('be.visible');
  }

  attendEvent(event: string) {
    cy.xpath(
      `//*[@data-testid="event-item-testid" and contains(.,'${event}')]//*[@data-testid="attend-button"]/span[text()="Attend"]`,
    )
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.xpath(
      `//*[@data-testid="event-item-testid" and contains(.,'${event}')]//*[@data-testid="attending-button-wrapper"]`,
    ).should('be.visible');
  }
}
export default new NoumPageEvent();
