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

    it('View CQ Page should be displayed', () => {
      // Note: Cypress does not support redirect to new tab

      // validate token section
      // verify score value and statusz
      MoneyPage.cqCardSectionTitle.should('be.visible');
      MoneyPage.cqCardSectionScore
        .invoke('text')
        .then(parseInt)
        .should('be.gte', 100);
      MoneyPage.cqCardSectionStatus
        .contains('More info equals higher CQ!')
        .should('be.visible');
      MoneyPage.cqCardSectionVisibility.invoke('attr', 'value').then((name) => {
        cy.log(`Visibility: ${name}`);
      });
      MoneyPage.cqCardSectionArrowIcon.should('be.visible');
    });
  },
);
