import LoginPage from '../../../pages/loginPage';
import HomePage from '../../../pages/homePage';

describe(
  'Noum.Follow.Unfollow.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    it('Should follow/unfollow another user', () => {
      LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));
      HomePage.searchAndViewTheFirstResult('AutoTest Noum 2022');

      cy.get('[data-testid="follow-button"]').then(($el) => {
        if ($el.text().includes('Following')) {
          cy.get('[data-testid="follow-button"]').click();
          cy.get('[data-testid="chamber-unfollow-button"]').click();
          cy.get('[data-testid="follow-button"]')
            .children('[data-testid="button_text"]')
            .should('have.text', 'Follow');

          // below click the unfollow button
          cy.get('[data-testid="follow-button"]').click();
          cy.get('[data-testid="follow-button"]')
            .children('[data-testid="button_text"]')
            .should('have.text', 'Following');
        } else {
          // Below clicks the button Follow
          cy.get('[data-testid="follow-button"]').click();
          cy.get('[data-testid="follow-button"]')
            .children('[data-testid="button_text"]')
            .should('have.text', 'Following');

          // unfollow a noum
          cy.get('[data-testid="follow-button"]').click();
          cy.get('[data-testid="chamber-unfollow-button"]').click();
          cy.get('[data-testid="follow-button"]')
            .children('[data-testid="button_text"]')
            .should('have.text', 'Follow');
        }
      });
    });
  },
);
