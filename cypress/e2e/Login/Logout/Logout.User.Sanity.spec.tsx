import HomePage from '../../../pages/homePage';
import LoginPage from '../../../pages/loginPage';
import data from '../../../fixtures/data.json';

describe(
  'Logout.User.Sanity.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    before(() => {
      LoginPage.loginByApi();
      HomePage.goToHomePage();
    });

    it('User should be able to logout', () => {
      // try to logout
      HomePage.mainHeaderAvatar.click();
      HomePage.mainHeaderSubLogout.click();

      // verify redirected to login page
      cy.url().should('include', data['login.path']);
      LoginPage.loginEmailAddressField.should('be.visible');
    });
  },
);
