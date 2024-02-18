import LoginPage from '../../pages/loginPage';

describe(
  'AccountSettings.happy.spec.tsx',
  {
    viewportWidth: 1980,
    viewportHeight: 1020,
  },
  () => {
    before(() => {
      LoginPage.loginByApi();
    });

    it('Account settings page should load', () => {
      cy.visit('/my-account/account-settings', {
        onBeforeLoad(win) {
          cy.stub(win, 'open');
        },
      });
      LoginPage.acceptCookies();

      cy.contains('My Account');
      cy.contains('Invite friends, get reward tokens');
      cy.contains('Account Settings');
      cy.contains('Privacy Policy');
      cy.contains('Terms of Use');
      cy.contains('Help');

      cy.get('[data-test="GlobalSearch-SearchField"]').should('be.visible');
      cy.contains('Account Settings');
      cy.get('[data-test="EmailAddressSection-TextField"]').should(
        'be.visible',
      );

      cy.contains('Edit Email Address');
      cy.contains('Delete My Account');
      cy.contains('Terms of Use').click();
      cy.window()
        .its('open')
        .should('be.calledWith', 'https://www.noumena.pro/terms-conditions');

      cy.wait(3000);
      cy.contains('Privacy Policy').click();
      cy.window()
        .its('open')
        .should(
          'be.calledWith',
          'https://www.noumena.pro/privacy-disclosure-noumena',
        );
    });
  },
);
