import HomePage from '../../../pages/homePage';
import data from '../../../fixtures/data.json';
import LoginPage from '../../../pages/loginPage';

describe(
  'MyNoums.Basic.Sanity.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    before(() => {
      LoginPage.loginByApi();
    });

    it('Noums should load', () => {
      // navigate to My Noums page
      HomePage.goToHomePage();
      HomePage.navTabMyNoums.click({ force: true });
      cy.url().should('include', data['my.noum.path']);

      // verfiy My Noums elemeents are present
      cy.contains(data['my.noum.label']);
      cy.contains(data['my.noum.connected.label']);
      cy.contains(data['my.noum.following.label']);
      cy.contains(data['my.noum.archived.label']);
      cy.contains(data['my.noum.linked.label']);
      cy.xpath('//a[@data-testid="chamberbox-testid"]').should('be.visible');
    });
  },
);
