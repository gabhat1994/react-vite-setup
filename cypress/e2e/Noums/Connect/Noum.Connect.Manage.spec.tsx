import { faker } from '@faker-js/faker';
import NotificationPage from 'cypress/pages/notificationPage';
import NoumPageEditView from 'cypress/pages/noumPageEditView';
import NoumPermissionsPage from 'cypress/pages/noumPermissionsPage';
import NoumManage from 'cypress/pages/noumManage';
import LoginPage from '../../../pages/loginPage';
import NoumListPage from '../../../pages/noumListPage';
import NoumPage from '../../../pages/noumPage';
import HomePage from '../../../pages/homePage';
import NoumEditPage from '../../../pages/noumEditPage';

let noumName = '';

describe('Noum.Connect.Manage.spec.tsx', () => {
  before(() => {
    LoginPage.loginByApi();
    noumName = faker.lorem.words(3);
    HomePage.goToHomePage();
    NoumListPage.goToNoumPage().createProjectNoum(noumName, 'Story', 'Private');
    NoumEditPage.publishUpdates();
  });

  it('connect to project', () => {
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

  it('decline user connection request', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));
    NoumListPage.goToNoumPage();

    NotificationPage.verifyNotificationContentOnList(
      `${Cypress.env('AUTO_USER_TWO_NAME')} wants to connect to ${noumName}.`,
    );

    NoumManage.viewAllRequestInviteModal()
      .verifyModalNoumRequest(noumName, Cypress.env('AUTO_USER_TWO_NAME'))
      .closeModal();

    NoumManage.verifyNoumRequest(
      noumName,
      Cypress.env('AUTO_USER_TWO_NAME'),
    ).declineNoumInvite(noumName);
  });

  it('reconnect to project', () => {
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

    NotificationPage.verifyNotificationContentOnList(
      `${Cypress.env('AUTO_USER_TWO_NAME')} wants to connect to ${noumName}.`,
    );

    NoumManage.viewAllRequestInviteModal()
      .verifyModalNoumRequest(noumName, Cypress.env('AUTO_USER_TWO_NAME'))
      .closeModal();

    NoumManage.verifyNoumRequest(
      noumName,
      Cypress.env('AUTO_USER_TWO_NAME'),
    ).acceptNoumInvite(noumName);
  });

  it('verify user is connected as an owner', () => {
    LoginPage.loginByApi();
    NoumListPage.goToNoumPage().sortNewestToOldest().viewNoum(noumName);

    NoumPage.editNoum();
    NoumPageEditView.viewPermissions();
    NoumPermissionsPage.verifyUserListed(
      Cypress.env('AUTO_USER_TWO_NAME'),
      'Guest',
    ).closeModal();
  });

  it('verify user is connected as requester', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    NotificationPage.verifyNotificationContentOnList(
      `${Cypress.env(
        'AUTO_USER_ONE_NAME',
      )} has accepted your request to connect to ${noumName}.`,
    );
    NoumListPage.goToNoumPage().viewNoumInConnectedTab(noumName);
    NoumPage.userConnectBtn.should('have.text', 'Connected');
    NoumPage.connectedMembersCount.should('have.text', '1');
  });
});
