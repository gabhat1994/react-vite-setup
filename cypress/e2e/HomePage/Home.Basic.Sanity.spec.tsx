import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';
import data from '../../fixtures/data.json';

describe(
  'Home.Basic.Sanity.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    before(() => {
      LoginPage.loginByApi();
    });

    it('Home page should load', () => {
      const baseUrl = Cypress.config('baseUrl');
      if (baseUrl) {
        cy.visit(baseUrl);
      } 

      // verify Homepage elements
      cy.contains(data['home.knowledge.label']);
      cy.contains(data['home.go.to.home.label']);
      HomePage.onboardingSection.should('be.visible');
      cy.contains('New Noums - Recommended for You')
        .scrollIntoView()
        .should('exist');
      HomePage.recommendedNoumChamberbox.should('exist');
      HomePage.onboardingSectionBox.should('exist');
    });
  },
);
