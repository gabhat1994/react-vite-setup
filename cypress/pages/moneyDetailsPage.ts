import CommonPage from 'cypress/pages/commonPage';

import assert from 'assert';

class MoneyDetailsPage {
  get sideTransactionList() {
    return cy.xpath('//div[@data-test="PaymentSideBar-PaymentSideBarWrapper"]//span[@data-test="MainLabel-TSpan"]');
  }

  get transactionMonthList() {
    return cy.get('[data-test="TransactionHeader-MonthButton"]');
  }

  get transactionList() {
    return cy.xpath(
      '//div[@data-test="MoneyLayout-MainContainer"]//div[@data-test="SubHeader-SubHeaderWrapper"]/following-sibling::div//span[@data-test="MainLabel-TSpan"]',
    );
  }

  get completedTransactionList() {
    return cy.get(
      '[data-test="StatementCard-TransactionDetails"]',
    );
  }

  get transactionPagination() {
    return cy.get('[data-testid="pagination"]');
  }

  get transactionBackBtn() {
    return cy.xpath(
      '//div[@data-test="TransactionHeader-HeadingWrapper"]/div[@data-test="Container"]',
    );
  }

  get statementDatePicker() {
    return cy.get('[data-testid="date-picker-date-field"]');
  }

  viewDetailsPage() {
    cy.xpath(
      '//div[@data-test="PaymentSideBar-PaymentSideBarWrapper"]//div[@data-testid="card" and contains(.,"Wallet")]//button[@data-testid="stepTwoBackButton"]',
    ).click();
  }

  viewTransactionPage() {
    cy.xpath(
      '//div[@data-test="PaymentSideBar-PaymentSideBarWrapper"]//span[@data-testid="button_text"]',
    ).click();
    return this;
  }

  verifyTotalBalanceHaveValue() {
    cy.get('[data-test="BalanceComponentMain-FormHelperText"]').should(
      'have.text',
      'Total Balance',
    );
    cy.get('[data-test="BalanceComponentMain-Amount"]').then((element) => {
      const currentAmount = Number(element.text().replace(/[^0-9.-]+/g, ''));
      cy.log(`currentAmount: ${currentAmount}`);
      assert(currentAmount > 1);
      cy.wait(1000);
    });
  }

  verifyPageButtons(button: string) {
    return cy.get('button').contains(button).should('be.visible');
  }

  verifyDisplayedWallet(wallet: string) {
    cy.get('[data-test="Wallet-TSpan"]').contains(wallet).should('be.visible');
  }

  verifyDisplayedBankAccount(account: string) {
    cy.get('[data-test="Bank-TSpan"]').contains(account).should('be.visible');
  }

  verifyTransactionPage() {
    this.transactionMonthList
      .should('be.visible')
      .its('length')
      .should('eq', 12);
    this.transactionList.should('be.visible').its('length').should('be.gte', 2);
  }

  goBackToDetailsPage() {
    this.transactionBackBtn.click();
    CommonPage.waitForSpinnerToNotExist();
  }

  viewStatementPage() {
    this.verifyPageButtons('View Statement').click();
    return this;
  }

  verifyStatementPage() {
    this.verifyPageButtons(' Download PDF');
    CommonPage.waitForSpinnerToNotExist();
    this.completedTransactionList.should('be.visible').its('length').should('be.gte', 2);
    this.statementDatePicker.should('be.visible').its('length').should('eq', 2);
  }
}

export default new MoneyDetailsPage();
