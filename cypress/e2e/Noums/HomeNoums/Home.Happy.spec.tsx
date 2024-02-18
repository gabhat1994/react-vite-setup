import CommonPage from 'cypress/pages/commonPage';
import UtilPage from '../../../pages/utilPage';
import HomePage from '../../../pages/homePage';

describe(
  'Home.Happy.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    before(() => {
      // Signup new user and activate
      const email = UtilPage.getRandomEmailAddress();
      const otp = UtilPage.generateOtp();

      cy.register(email, otp, true);
    });

    it('Visits the Noums View Mode page', () => {
      // Wait as the creation of Noum
      // is async from the registration
      cy.wait(2000);

      cy.visit('profile');
      CommonPage.backButton.should('be.visible');
      CommonPage.waitForSkeletonLoader();
      cy.get('[data-testid="avatarContainer"]').should('be.visible');
      cy.get('[data-test="ProfileSummaryNew-TSpan"]').should('be.visible');
      cy.get('[data-test="ProfileCompletion-TSpan"]').should('have.text', 'Your Profile is 26% Complete26%Once your profile is 100% complete, you will receive 100 tokens.100 tokens');
      cy.get('[data-testid="avatarContainer"]').should('be.visible');
      cy.get('[aria-label="ELEMENT_MESSAGE"]').should('be.visible');
      cy.get('[aria-label="ELEMENT_USERPOSTS"]').should('be.visible');
      

      HomePage.mainHeaderAvatar.click();
      cy.contains('My Profile');
      cy.contains('Settings');
      cy.contains('Help');
      cy.contains('Log Out');
      HomePage.mainHeaderSubMyProfile.click();
    });
  },
);
