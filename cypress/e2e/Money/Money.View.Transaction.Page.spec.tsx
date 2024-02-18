import MoneyDetailsPage from 'cypress/pages/moneyDetailsPage';
import MoneyPage from '../../pages/moneyPage';
import LoginPage from '../../pages/loginPage';
import data from '../../fixtures/data.json';

describe('Money.View.Transaction.Page.spec.tsx', () => {
  beforeEach(() => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_CONNECTED_ONE'));
    MoneyPage.goToMoneyScreen();
  });

  it('View CQ Page should be displayed', () => {
    // verify money details page
    MoneyDetailsPage.viewDetailsPage();
    MoneyDetailsPage.verifyTotalBalanceHaveValue();
    MoneyDetailsPage.verifyPageButtons('Transfer');
    MoneyDetailsPage.verifyPageButtons('Pay');
    MoneyDetailsPage.verifyPageButtons('Pay');
    MoneyDetailsPage.verifyPageButtons('Add Account');
    MoneyDetailsPage.verifyDisplayedWallet(data['money.transfer.main.wallet']);
    MoneyDetailsPage.verifyDisplayedWallet(data['money.transfer.sub.wallet']);
    MoneyDetailsPage.verifyDisplayedBankAccount(
      data['money.transfer.view.bank.account'],
    );
    MoneyDetailsPage.sideTransactionList
      .should('be.visible')
      .its('length')
      .should('be.gte', 1);

    // verify transsaction page details
    MoneyDetailsPage.viewTransactionPage().verifyTransactionPage();

    // go back to details page
    MoneyDetailsPage.goBackToDetailsPage();

    // verify statement page details
    MoneyDetailsPage.viewStatementPage().verifyStatementPage();
  });
});
