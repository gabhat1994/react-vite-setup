import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';
import CommonPage from '../../pages/commonPage';
import data from '../../fixtures/data.json';

describe('Discovery.Basic.Sanity.spec.tsx', () => {
  beforeEach(() => {
    LoginPage.loginByApi();
  });

  it('Discovery page should load', () => {
    // navigate to Discovery page
    HomePage.goToHomePage();
    HomePage.navTabDiscovery.click({ force: true });
    cy.url().should('include', data['discovery.path']);
    cy.get('[data-testid="slider"]').should('be.visible');
    CommonPage.waitForSkeletonLoader();

    // verify discovery elements
    cy.wait(1000);
    // cy.contains(data['discovery.circle.label']);
    // cy.xpath(
    //   '//*[@data-testid="slider" and contains (.,"My Circle")]//a[@data-testid="chamberbox-testid"]',
    // ).should('have.length.greaterThan', 1);
    cy.contains(data['discovery.popular.label']);
    cy.xpath(
      '//*[@data-testid="slider" and contains (.,"Popular")]//a[@data-testid="chamberbox-testid"]',
    ).should('have.length.greaterThan', 1);
  });
});
