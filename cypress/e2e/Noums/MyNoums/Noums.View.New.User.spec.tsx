import UtilPage from '../../../pages/utilPage';

describe(
  'Noums.View.New.User.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    it('For a new user, check noums pages elements', () => {
      const email = UtilPage.getRandomEmailAddress();
      const otp = UtilPage.generateOtp();

      cy.register(email, otp, true);

      // Go to Chambers page
      cy.visit('/noums');

      // Below cy.get is for the "Search for Anything" text field box,
      // "CONTAINS" will not work.
      cy.contains('Archived');
      cy.contains('New Noum');
      cy.contains('Noums you create appear here');
      cy.contains('Create your first Noum and connect with other members.');
      cy.contains('You don’t have any requests');
      cy.contains('RECEIVED REQUESTS');
    });
  },
);
