import assert from 'assert';

class MoneyTransferPage {
  get moneyModalHeader() {
    return cy.get('[data-test="ModalHeader-Title-TSpan"]');
  }

  get toDropDownField() {
    return cy.xpath('(//div[@data-test="Input-InputWrapper"])[2]');
  }

  get fromDropDownField() {
    return cy.xpath('(//div[@data-test="Input-InputWrapper"])[1]');
  }

  get selectDropDownValue() {
    return cy.get('[data-testid="dropdown-value"]');
  }

  get continueBtn() {
    return cy.xpath(
      '//*[@data-test="ModalFooter-ModalFooterStyled"]/button[not(@disabled) and contains(.,"Continue")]',
    );
  }

  get amountField() {
    return cy.get('[name="amount"]');
  }

  get descriptionField() {
    return cy.get('[name="transactionReason"]');
  }

  get stripeIFrame() {
    return cy.iframe('[title="Secure payment input frame"]');
  }

  selectToField(value: string) {
    this.toDropDownField.click();
    this.selectDropDownValue.contains(value).click();
    return this;
  }

  selectFromField(value: string) {
    this.fromDropDownField.click();
    this.selectDropDownValue.contains(value).click();
    return this;
  }

  continueToNextScreenIFrame() {
    cy.xpath('//button[not(@disabled) and contains(.,"Continue")]')
      .should('be.visible')
      .click();
    return this;
  }

  continueToNextScreen() {
    this.continueBtn.should('be.visible').click();
    return this;
  }

  inputAmountField(value: string) {
    this.amountField.click();
    this.amountField.type(value);
    return this;
  }

  inputDescriptionField(value: string) {
    this.descriptionField.type(value);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verifyReviewTransferFieldValue(field: string, value: string) {
    // TODO: once fee is properly implemented
    // cy.xpath(`//span[@data-test="PaymentReview-ReviewLabel" and text()="${field}"]/following-sibling::span[1][@data-test="PaymentReview-ReviewInformation"]`).should('have.text', value);
  }

  inputPinCode(pin: string) {
    const digits = [...pin];

    cy.get('[data-cy="OtpInput-cy-0"]').type(digits[0]);
    cy.get('[data-cy="OtpInput-cy-1"]').type(digits[1]);
    cy.get('[data-cy="OtpInput-cy-2"]').type(digits[2]);
    cy.get('[data-cy="OtpInput-cy-3"]').type(digits[3]);
    cy.get('[data-cy="OtpInput-cy-4"]').type(digits[4]);
    cy.get('[data-cy="OtpInput-cy-5"]').type(digits[5]);

    return this;
  }

  verifyConfirmationDetails(value: string) {
    cy.get('[data-test="PaymentDone-TSpan"]')
      .contains(value)
      .should('be.visible');
  }

  closeModal() {
    cy.get('[data-testid="close-button"]').click();
    this.moneyModalHeader.should('not.exist');
    cy.get('[data-test="PaymentDone-TSpan"]').should('not.exist');
    return this;
  }

  getFromAccountAvailableBalance() {
    cy.get('[data-test="NonCardAccounts-Description"]').then((element) => {
      const fromAmount = element;

      const fromAmountText = Number(element.text().replace(/[^0-9.-]+/g, ''));
      cy.log(`fromAmount: ${fromAmountText}`);
      cy.wrap(fromAmount).as('fromAmount');
    });
    return this;
  }

  getToAccountAvailableBalance() {
    cy.get('[data-test="AccountPayee-Description"]').then((element) => {
      const toAmount = element;
      cy.wrap(toAmount).as('toAmount');
    });
    return this;
  }

  verifyToAccountAvailableBalance(amount: number) {
    cy.get('[data-test="AccountPayee-Description"]')
      .contains('$')
      .should('be.visible');
    cy.get('[data-test="AccountPayee-Description"]').then((element) => {
      const currentAmount = Number(element.text().replace(/[^0-9.-]+/g, ''));
      cy.get('@toAmount').then((toAmount) => {
        const previousAmount = Number(
          toAmount.text().replace(/[^0-9.-]+/g, ''),
        );

        cy.log(`To current amount: ${element.text()}`);
        cy.log(`To previous amount: ${toAmount.text()}`);
        cy.log(`To computed amount: ${previousAmount - amount}`);

        assert.equal(currentAmount, previousAmount + amount);
      });
    });
  }

  verifyFromAccountAvailableBalance(amount: number) {
    cy.wait(2000);
    cy.get('[data-test="NonCardAccounts-Description"]')
      .contains('Fetching..')
      .should('not.exist');
    cy.get('[data-test="NonCardAccounts-Description"]')
      .contains('$')
      .should('be.visible');
    cy.get('[data-test="NonCardAccounts-Description"]').then((element) => {
      const currentAmount = Number(element.text().replace(/[^0-9.-]+/g, ''));
      cy.log(`currentAmount: ${currentAmount}`);
      cy.get('@fromAmount').then((fromAmount) => {
        const previousAmount = Number(
          fromAmount.text().replace(/[^0-9.-]+/g, ''),
        );

        cy.log(`From current amount: ${element.text()}`);
        cy.log(`From previous amount: ${fromAmount.text()}`);
        cy.log(`From computed amount: ${previousAmount - amount}`);

        assert.equal(currentAmount, previousAmount - amount);
      });
    });
  }

  waitForConfirmationDetails() {
    cy.get('[data-test="AccountPayee-Description"]').then(($element) => {
      if ($element.text().includes('Fetching..')) {
        cy.get('[data-test="AccountPayee-Description"]')
          .contains('Fetching..')
          .should('not.exist');
      }
    });
  }

  inputCardNumber(value: string) {
    this.stripeIFrame.find('[id="Field-numberInput"]').type(value);
    return this;
  }

  inputCardExpiry(value: string) {
    this.stripeIFrame.find('[id="Field-expiryInput"]').type(value);
    return this;
  }

  inputCardCvc(value: string) {
    this.stripeIFrame.find('[id="Field-cvcInput"]').type(value);
    return this;
  }

  inputPostalCode(value: string) {
    this.stripeIFrame.then(($body) => {
      if ($body.find('[name="postalCode"]').length > 0) {
        this.stripeIFrame.find('[name="postalCode"]').type(value);
      }
    });
    return this;
  }
}

export default new MoneyTransferPage();
