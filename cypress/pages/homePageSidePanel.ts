class HomePageSidePanel {
  get modalHeader() {
    return cy.xpath(
      '//*[@data-test="ModalHeader-Title-TSpan" or @data-test="EventModalHeader-TSpan"]',
    );
  }

  get modalHeaderCloseIcon() {
    return cy.xpath(
      '//div[@id="modal-content" and @data-testid="modal-content"]//button[@data-testid="modal_close_btn" or @data-testid="button"]',
    );
  }

  get pageHeader() {
    return cy.get('[data-test="FormHeader-content-TSpan"]');
  }

  get pageBackButton() {
    return cy.xpath('//*[@aria-label="Back"] | //span[@data-test="FormHeader-content-TSpan" and text()="New invoice"]/preceding-sibling::button');
  }

  get actionButton() {
    return cy.get('[aria-label="Create"]');
  }

  get actionMenus() {
    return cy.xpath('//div[@aria-label="Create" and @role="menu"]');
  }

  get noumButton() {
    return cy.get('[aria-label="Noum"]');
  }

  get startPersonalEventButton() {
    return cy.get('[aria-label="Start Personal Event"]');
  }

  get startEventNowButton() {
    return cy.get('[aria-label="Start Event Now"]');
  }

  get scheduleNewEventButton() {
    return cy.get('[aria-label="Schedule New Event"]');
  }

  get contractButton() {
    return cy.get('[aria-label="Contract"]');
  }

  get sowButton() {
    return cy.get('[aria-label="SOW"]');
  }

  get invoiceButton() {
    return cy.get('[aria-label="Invoice"]');
  }

  viewActionMenu() {
    this.actionButton.click();
    this.actionMenus.should('be.visible');
    return this;
  }

  viewNoumAction() {
    this.noumButton.click();
    this.modalHeader
      .should('be.visible')
      .should('have.text', 'Create New Noum');
    return this;
  }

  startAndVerifyEventNowAction() {
    this.startEventNowButton.click();
    this.modalHeader.should('be.visible').should('have.text', 'Start Now');
    this.modalHeaderCloseIcon.first().click();
    this.modalHeader.should('not.exist');
    return this;
  }

  startAndVerifyScheduleNewEvent() {
    this.scheduleNewEventButton.click();
    this.modalHeader
      .should('be.visible')
      .should('have.text', 'Create a New Event');
    this.modalHeaderCloseIcon.first().click();
    this.modalHeader.should('not.exist');
    return this;
  }

  startAndVerifyContractButton() {
    this.contractButton.click();
    this.pageHeader
      .first()
      .should('be.visible')
      .should('have.text', 'New Contract');
    return this;
  }

  startAndVerifySowButton() {
    this.sowButton.click();
    this.pageHeader
      .first()
      .should('be.visible')
      .should('have.text', 'New Statement of Work (SOW)');
    return this;
  }

  startAndVerifyInvoiceButton() {
    this.invoiceButton.click();
    this.pageHeader
      .first()
      .should('be.visible')
      .should('have.text', 'New invoice');
    this.pageBackButton.click();
    this.pageHeader.should('not.exist');
    return this;
  }
}

export default new HomePageSidePanel();
