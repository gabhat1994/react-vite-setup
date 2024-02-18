import HomePage from '../../../pages/homePage';
import data from '../../../fixtures/data.json';
import LoginPage from '../../../pages/loginPage';
import CommonPage from '../../../pages/commonPage';

require('cypress-xpath');

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
      // navigate to Home page
      HomePage.goToHomePage();
      HomePage.goToYourHomeNoumLink.click();
      cy.url().should('include', data['home.noum.path']);

      // wait for the noum to load
      cy.wait(1000);
      CommonPage.waitForSkeletonLoader();
      // verify home noum elements are present
      cy.contains(data['home.noum.project.label']);
      cy.contains(data['home.noum.education.label']);
      cy.contains(data['home.noum.business.label']);
      cy.contains(data['home.noum.messages..label']);
      cy.contains(data['home.noum.skills.label']);
      cy.contains(data['home.noum.posts.label']);
      cy.contains(data['home.noum.networks.label']);

      // verify Received Requests TODO
      // cy.get(
      //   '[data-test="ReceivedRequests-Container"] > [data-test="Button-ButtonStyled"] > [data-testid="button_text"]',
      // ).click();
      // cy.wait(3000);
      // cy.contains(data['home.noum.requests.invites.label']);
    });
  },
);
