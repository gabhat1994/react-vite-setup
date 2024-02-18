import { faker } from '@faker-js/faker';
import NotificationPage from 'cypress/pages/notificationPage';
import NoumPageEditView from 'cypress/pages/noumPageEditView';
import NoumInvitesVisibilityPage from 'cypress/pages/noumInvitesVisibilityPage';
import NoumManage from 'cypress/pages/noumManage';
import HomePage from 'cypress/pages/homePage';
import HomeNoumPage from 'cypress/pages/homeNoumPage';
import LoginPage from '../../../pages/loginPage';
import NoumListPage from '../../../pages/noumListPage';
import NoumPage from '../../../pages/noumPage';
import NoumEditPage from '../../../pages/noumEditPage';

let noumName = 'voluptatem assumenda consequatur';
let inviteMessage = 'et praesentium nostrum';

describe('Noum.Cancel.Invite.Home.Modal.spec.tsx', () => {
  before(() => {
    LoginPage.loginByApi();
    noumName = faker.lorem.words(3);
    NoumListPage.goToNoumPage().createProjectNoum(noumName, 'Story', 'Private');
    NoumEditPage.publishUpdates();
  });

  it('send an invite to user', () => {
    LoginPage.loginByApi();
    NoumListPage.goToNoumPage().sortNewestToOldest().viewNoum(noumName);

    NoumPage.editNoum();
    NoumPageEditView.viewInviteVisibility();
    inviteMessage = faker.lorem.words(3);
    NoumInvitesVisibilityPage.inviteUser(
      Cypress.env('AUTO_USER_TWO_NAME'),
      inviteMessage,
    );
  });

  it('cancel invite to user', () => {
    LoginPage.loginByApi();
    HomePage.goToHomeNoum();

    HomeNoumPage.viewAllRequestInviteModal().cancelInvitedByMe(
      Cypress.env('AUTO_USER_TWO_NAME'),
      noumName,
    );
  });

  it('verify invitation is cancelled', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));

    NotificationPage.verifyNoumInviteNotExist(
      `${Cypress.env(
        'AUTO_USER_ONE_NAME',
      )} has invited you to connect to ${noumName}.`,
    );
    NoumListPage.goToNoumPage();
    NoumManage.verifyNoumInviteNotExist(noumName);
  });
});
