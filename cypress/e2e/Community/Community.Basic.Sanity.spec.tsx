import CommunityPage from '../../pages/communityPage';
import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';
import data from '../../fixtures/data.json';

require('cypress-xpath');

describe(
  'Community.Basic.Sanity.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    beforeEach(() => {
      LoginPage.loginByApi();
    });

    it('Community page should load', () => {
      // navigate to Community page
      HomePage.goToHomePage();
      HomePage.navTabCommunity.click({ force: true });
      cy.url().should('include', data['community.path']);

      // verify community page elements
      cy.contains('All posts');
      cy.contains(data['community.noumena.header']);
      cy.contains(data['community.invite.label']);
      CommunityPage.postList.should('be.visible');
      CommunityPage.startConversationBox.should('be.visible');
    });
  },
);
