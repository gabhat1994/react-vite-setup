import { faker } from '@faker-js/faker';
import NotificationPage from 'cypress/pages/notificationPage';
import NoumPageEditView from 'cypress/pages/noumPageEditView';
import NoumInvitesVisibilityPage from 'cypress/pages/noumInvitesVisibilityPage';
import NoumPermissionsPage from 'cypress/pages/noumPermissionsPage';
import NoumManage from 'cypress/pages/noumManage';
import LoginPage from '../../../pages/loginPage';
import NoumListPage from '../../../pages/noumListPage';
import NoumPage from '../../../pages/noumPage';
import NoumEditPage from '../../../pages/noumEditPage';

let noumName = 'perspiciatis quis aut';
let inviteMessage = 'et praesentium nostrum';

describe('Noum.Invite.By.Project.Noums.spec.tsx', () => {
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

  it('decline user invitation', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    NoumListPage.goToNoumPage();

    NoumManage.viewAllRequestInviteModal()
      .verifyModalNoumInvite(noumName, Cypress.env('AUTO_USER_ONE_NAME'))
      .closeModal();

    NoumManage.verifyNoumInvite(
      noumName,
      Cypress.env('AUTO_USER_ONE_NAME'),
    ).viewNoumInvite(noumName);

    NoumPage.declineNoumInvite();
  });

  it('resend an invite to user', () => {
    LoginPage.loginByApi();
    NotificationPage.verifyNotificationContentOnList(
      `${Cypress.env(
        'AUTO_USER_TWO_NAME',
      )} has declined your invitation to connect to ${noumName}.`,
    );
    NoumListPage.goToNoumPage().sortNewestToOldest().viewNoum(noumName);

    NoumPage.editNoum();
    NoumPageEditView.viewInviteVisibility();
    NoumInvitesVisibilityPage.resendInviteToUser(
      Cypress.env('AUTO_USER_TWO_NAME'),
    );
  });

  it('accept user invitation', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    NoumListPage.goToNoumPage();

    NoumManage.viewAllRequestInviteModal()
      .verifyModalNoumInvite(noumName, Cypress.env('AUTO_USER_ONE_NAME'))
      .closeModal();
    NoumManage.verifyNoumInvite(
      noumName,
      Cypress.env('AUTO_USER_ONE_NAME'),
    ).viewNoumInvite(noumName);

    NoumPage.acceptNoumInvite();
    NotificationPage.verifyEventBadgeCounter(true);
  });

  it('verify invited user is connected', () => {
    LoginPage.loginByApi();
    NotificationPage.verifyNotificationContentOnList(
      `${Cypress.env(
        'AUTO_USER_TWO_NAME',
      )} has accepted your invitation to connect to ${noumName}.`,
    );
    NoumListPage.goToNoumPage().sortNewestToOldest().viewNoum(noumName);

    NoumPage.editNoum();
    NoumPageEditView.viewInviteVisibility();
    NoumInvitesVisibilityPage.verifyApprovedUser(
      Cypress.env('AUTO_USER_TWO_NAME'),
    ).closeModal();

    NoumPageEditView.viewPermissions();
    NoumPermissionsPage.verifyUserListed(
      Cypress.env('AUTO_USER_TWO_NAME'),
      'Guest',
    ).closeModal();
  });
});
