import { faker } from '@faker-js/faker';
import NoumManage from 'cypress/pages/noumManage';
import LoginPage from '../../../pages/loginPage';
import NoumPage from '../../../pages/noumPage';
import HomePage from '../../../pages/homePage';
import NoumPermissionsPage from '../../../pages/noumPermissionsPage';
import NoumListPage from '../../../pages/noumListPage';
import NoumPageEditView from '../../../pages/noumPageEditView';
import NoumEditPage from '../../../pages/noumEditPage';

let noumName = '';

describe('Noum.Permission.spec.tsx', () => {
  before(() => {
    LoginPage.loginByApi();
    noumName = faker.lorem.words(3);
    HomePage.goToHomePage();
    NoumListPage.goToNoumPage().createProjectNoum(noumName, 'Story', 'Private');
    NoumEditPage.publishUpdates();
  });

  it('connect to noum', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    // search for the project noum and view it
    HomePage.searchAndViewTheResult(noumName);
    NoumPage.headerName.should('have.text', noumName);

    // request noum connection
    NoumPage.requestConnectBtn
      .should('have.text', 'Request to Connect')
      .click();
    NoumPage.requestConnectBtn.should('have.text', 'Request Sent');
  });

  it('accept user connection request', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));
    NoumListPage.goToNoumPage();

    NoumManage.verifyNoumRequest(
      noumName,
      Cypress.env('AUTO_USER_TWO_NAME'),
    ).acceptNoumInvite(noumName);

  });

  it('change permission from guest to favorite', () => {
    LoginPage.loginByApi();
    NoumListPage.goToNoumPage().sortNewestToOldest().viewNoum(noumName);

    NoumPage.editNoum();
    NoumPageEditView.viewPermissions();

    NoumPermissionsPage.changeUserPermission(
      Cypress.env('AUTO_USER_TWO_NAME'),
      'Favorite',
    );
    NoumPageEditView.viewPermissions();
    NoumPermissionsPage.verifyUserListed(
      Cypress.env('AUTO_USER_TWO_NAME'),
      'Favorite',
    );
  });

  it('change permission from favorite to disconnect', () => {
    LoginPage.loginByApi();
    NoumListPage.goToNoumPage().sortNewestToOldest().viewNoum(noumName);

    HomePage.connectUserCount.then(($value) => {
      let current_count = parseInt($value.text());
      expect(current_count).greaterThan(0);
    });

    NoumPage.editNoum();
    NoumPageEditView.viewPermissions();

    NoumPermissionsPage.changeUserPermission(
      Cypress.env('AUTO_USER_TWO_NAME'),
      'Disconnect',
    );
    NoumPageEditView.viewPermissions();
    NoumPermissionsPage.verifyUserNotConnected(
      Cypress.env('AUTO_USER_TWO_NAME'),
    ).closeModal();

    NoumEditPage.publishUpdates();
    HomePage.connectUserCount.should('not.exist');
  });

  it('verify disconnected to noum', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    // search for the project noum and view it
    HomePage.searchAndViewTheResult(noumName);
    NoumPage.headerName.should('have.text', noumName);

    // request noum connection
    NoumPage.requestConnectBtn.should('have.text', 'Request to Connect');
  });
});
