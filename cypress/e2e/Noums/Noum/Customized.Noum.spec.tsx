import HomePage from 'cypress/pages/homePage';
import LoginPage from '../../../pages/loginPage';
import NoumListPage from '../../../pages/noumListPage';
import NoumPage from '../../../pages/noumPage';
import NoumPageCustomize from '../../../pages/noumPageCustomize';
import NoumPageEditView from '../../../pages/noumPageEditView';
import NoumPageView from '../../../pages/noumPageView';
import NoumEditPage from '../../../pages/noumEditPage';

describe('Customized.Noum.spec.tsx', () => {
  afterEach(() => {
    LoginPage.logoutByApi();
  });

  it('owner customized the noum', () => {
    // login as the owner of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));

    // visit the project noum and go to the noum
    NoumListPage.goToNoumPage().viewNoum(Cypress.env('AUTO_PROJECT_NOUM_ONE'));
    NoumPage.editNoum();
    NoumPageEditView.viewCustomized();

    // select and save theme
    NoumPageCustomize.selectTheme('Celtic Blue')
      .selectHeadingTextFont('Alegreya')
      .selectBodyTextFont('Alegreya')
      .selectButtonsLabelsTextFont('Alegreya')
      .closeCustomized();

    // Publish updates and Confirm published
    NoumEditPage.publishUpdates();
    NoumPageView.verifyNoumCustomStyle('celtic-blue').verifyNoumCustomFont(
      'Alegreya',
    );
  });

  it('verify connected and non-connected user can view customized noum', () => {
    // login as connected user of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));

    // visit the project noum and go to the noum
    // search for the project noum and view it
    HomePage.searchAndViewTheResult(Cypress.env('AUTO_PROJECT_NOUM_ONE'));
    NoumPageView.waitNoumPageToLoad(Cypress.env('AUTO_PROJECT_NOUM_ONE'))
      .verifyNoumCustomStyle('celtic-blue')
      .verifyNoumCustomFont('Alegreya');

    // login as non-connected user of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ADMIN'));

    // visit the project noum and go to the noum
    // search for the project noum and view it
    HomePage.searchAndViewTheResult(Cypress.env('AUTO_PROJECT_NOUM_ONE'));
    NoumPageView.waitNoumPageToLoad(Cypress.env('AUTO_PROJECT_NOUM_ONE'))
      .verifyNoumCustomStyle('celtic-blue')
      .verifyNoumCustomFont('Alegreya');
  });

  it('owner reset customized the noum', () => {
    // login as the owner of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));

    // visit the project noum and go to the noum
    NoumListPage.goToNoumPage().viewNoum(Cypress.env('AUTO_PROJECT_NOUM_ONE'));
    NoumPage.editNoum();
    NoumPageEditView.viewCustomized();

    // reset and save
    NoumPageCustomize.resetCustomized().closeCustomized();

    // Publish updates and Confirm published
    NoumEditPage.publishUpdates();
    NoumPageView.verifyNoumCustomStyleEmpty().verifyNoumCustomFontEmpty();
  });

  it('verify connected and non-connected user can view default noum', () => {
    // login as connected user of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));

    // visit the project noum and go to the noum
    // search for the project noum and view it
    HomePage.searchAndViewTheResult(Cypress.env('AUTO_PROJECT_NOUM_ONE'));
    NoumPageView.waitNoumPageToLoad(Cypress.env('AUTO_PROJECT_NOUM_ONE'))
      .verifyNoumCustomStyleEmpty()
      .verifyNoumCustomFontEmpty();

    // login as non-connected user of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ADMIN'));

    // visit the project noum and go to the noum
    // search for the project noum and view it
    HomePage.searchAndViewTheResult(Cypress.env('AUTO_PROJECT_NOUM_ONE'));
    NoumPageView.waitNoumPageToLoad(Cypress.env('AUTO_PROJECT_NOUM_ONE'))
      .verifyNoumCustomStyleEmpty()
      .verifyNoumCustomFontEmpty();
  });
});
