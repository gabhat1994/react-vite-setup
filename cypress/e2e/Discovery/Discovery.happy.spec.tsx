import LoginPage from '../../pages/loginPage';
import data from '../../fixtures/data.json';

require('cypress-xpath');

describe(
  'Discovery.happy.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    beforeEach(() => {
      LoginPage.loginByApi();
      cy.visit(`/discovery`);
      LoginPage.acceptCookies();
    });

    it('should show the right content on the Discovery page', () => {
      cy.url().should('include', '/discovery');

      cy.contains(data['discovery.featured.label']);
    });
  },
);
