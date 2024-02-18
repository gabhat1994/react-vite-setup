import CommonPage from 'cypress/pages/commonPage';
import UtilPage from '../../../pages/utilPage';
import LoginPage from '../../../pages/loginPage';
import HomePage from '../../../pages/homePage';
import DiscoveryPage from '../../../pages/discoveryPage';
import NoumManage from '../../../pages/noumManage';

describe(
  'Noum.Connect.happy.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    it('Should connect to another user', () => {
      const email = UtilPage.getRandomEmailAddress();
      const otp = UtilPage.generateOtp();

      cy.register(email, otp, true);

      DiscoveryPage.goToDiscoveryPage();
      HomePage.searchAndViewTheResult(Cypress.env('AUTO_USER_TWO_NAME'));
      cy.get('[data-testid="request-connection-button"]').click();
      cy.get('[data-testid="request-connection-button"]')
        .contains('Request Sent')
        .should('be.visible');

      cy.logout();
      cy.wait(2000);

      LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
      HomePage.goToHomeNoum();
      CommonPage.waitForSkeletonLoader();

      NoumManage.viewRequestInviteModal();
      cy.get('[data-testid="accept-button"]').should('be.visible').click();
      NoumManage.closeModal();

      LoginPage.loginByApi(email);
      DiscoveryPage.goToDiscoveryPage();
      CommonPage.waitForSkeletonLoader();
      HomePage.searchAndViewTheResult(Cypress.env('AUTO_USER_TWO_NAME'));

      cy.contains('Connected');
      cy.get('[data-testid="user-connection-button"]').click();
      cy.get('[data-testid="chamber-disconnect-button"]').click();

      cy.wait(2000);
      cy.get('[data-testid="request-connection-button"]')
        .contains('Connect')
        .should('be.visible');
    });
  },
);
