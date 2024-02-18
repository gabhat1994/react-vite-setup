import NotificationPage from '../../pages/notificationPage';
import LoginPage from '../../pages/loginPage';

describe(
  'Notifications.Events.View.Sanity.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    beforeEach(() => {
      LoginPage.loginByApi();
    });

    it('Notifications able to view Events', () => {
      // verify event notification icon is visble
      NotificationPage.eventIcon.should('be.visible');

      // view event notification
      NotificationPage.eventIcon.click();
      NotificationPage.eventModalHeader.should('be.visible');
      NotificationPage.eventModalList
        .should('be.visible')
        .its('length')
        .should('be.gte', 1);

      // verify all tabs are present
      NotificationPage.eventModalAllTab.should('be.visible');
      NotificationPage.eventModalAttendingTab.should('be.visible');
      NotificationPage.eventModalHostingTab.should('be.visible');
      NotificationPage.eventModalInvitationTab.should('be.visible');
      NotificationPage.sideModalContentRightArrow.click();
      NotificationPage.eventModalExpiredTab.should('be.visible');

      // close event notification
      NotificationPage.sideModalCloseIcon.click();
      NotificationPage.eventModalHeader.should('not.exist');
    });
  },
);
