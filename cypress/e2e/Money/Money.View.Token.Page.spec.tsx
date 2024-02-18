import MoneyPage from '../../pages/moneyPage';
import LoginPage from '../../pages/loginPage';

describe(
  'Money.View.Token.Page.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    beforeEach(() => {
      LoginPage.loginByApi();
      MoneyPage.goToMoneyScreen();
    });

    it('View Token Modal should be displayed', () => {
      // view and open token modal
      MoneyPage.tokenArrowIcon.click();

      // Validate able to view Token Transactions
      // Validate all required objects under Token Transactions
      MoneyPage.tokenModal.should('be.visible');

      MoneyPage.tokenModalText
        .contains('Your Token Balance')
        .should('be.visible');
      MoneyPage.tokenModalText
        .contains('Profile completed')
        .scrollIntoView()
        .should('be.visible');

      // validate able to close Token Modal
      MoneyPage.tokenModalCloseIcon.should('be.visible');
      MoneyPage.tokenModalCloseIcon.click();
      MoneyPage.tokenModal.should('not.exist');
    });
  },
);
