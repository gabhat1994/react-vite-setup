import MoneyPage from '../../pages/moneyPage';
import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';
import data from '../../fixtures/data.json';

require('cypress-xpath');

describe(
  'Money.Basic.Sanity.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    beforeEach(() => {
      LoginPage.loginByApi();
    });

    it('Home page should load', () => {
      // navigate to Money page
      HomePage.goToHomePage();
      HomePage.navTabMoney.click({ force: true });
      cy.url().should('include', data['money.path']);

      // verify money elements are present
      cy.contains(data['money.capital.label']);
      cy.contains(data['money.financial.label']);
      cy.contains(data['money.financing.label']);
      cy.contains(data['money.wallet.label']);
      cy.contains(data['money.tokens']);
      MoneyPage.articleContainerList.should('be.visible');
      MoneyPage.financingContainerList.should('be.visible');
    });
  },
);
