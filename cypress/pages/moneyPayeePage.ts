import MoneyTransferPage from './moneyTransferPage';
import CommonPage from './commonPage';

class MoneyPayeePage {
  selectToAddPayee() {
    MoneyTransferPage.toDropDownField.click();
    cy.xpath(
      '//span[@data-test="AddPayeeCard-TSpan" and text()="Add New"]',
    ).click();
    return this;
  }

  selectPayeeFromNoumena() {
    cy.get('[data-test="SelectPayee-TSpan"]')
      .contains('Person or Business in Noumena Community')
      .click();
    return this;
  }

  selectPayeeFromOutsideNoumena() {
    cy.get('[data-test="SelectPayee-TSpan"]')
      .contains('Person or Business outside of Noumena Community')
      .click();
    return this;
  }

  searchNoumenaPayee(payee: string) {
    cy.get('[data-test="PayeeInNoumena-TextField"]').type(payee);
    cy.get('[data-test="NoumenaPayee-TSpan"]')
      .contains(payee)
      .should('be.visible');
    return this;
  }

  selectAndAddNoumenaPayee(payee: string) {
    cy.xpath(
      `//div[@data-test="NoumenaPayee-Payee" and contains(.,'${payee}')]//input[@data-testid="radio_box_outer"]`,
    ).click({ force: true });
    cy.xpath(
      '//button[@data-testid="add-payee-in-noumena" and not(@disabled)]',
    ).click();
    CommonPage.verifyAlertMessage('Successfully Added');
    return this;
  }

  addOutsideNoumenaPayeeDetails(
    payeeName: string,
    routingNumber: string,
    accountNumber: string,
  ) {
    cy.get('[name="name"]').type(payeeName);
    cy.get('[name="routingNumber"]').type(routingNumber);
    cy.get('[name="accountNumber"]').type(accountNumber);
    cy.get('[data-testid="add-payee-outside-noumena"]').click();
    cy.get('[data-testid="add-payee-outside-noumena"]').click();
    CommonPage.verifyAlertMessage('Successfully Added');
    return this;
  }
}

export default new MoneyPayeePage();
