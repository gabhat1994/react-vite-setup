import NotificationPage from '../../pages/notificationPage';
import LoginPage from '../../pages/loginPage';

describe(
  'Notifications.Activities.View.Sanity.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    beforeEach(() => {
      LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    });

    it('Notifications able to view Events', () => {
      // verify activity notification icon is visble
      NotificationPage.bellIcon.should('be.visible');

      // view activity notification
      NotificationPage.bellIcon.click();
      NotificationPage.sideModalContent.should('be.visible');
      NotificationPage.sideModalNotificationHeader.should('be.visible');
      NotificationPage.sideModalNotificationReadAll.should('be.visible');
      NotificationPage.sideModalNotificationAllTab.should('be.visible');
      NotificationPage.sideModalNotificationNoumsTab.should('be.visible');
      NotificationPage.sideModalNotificationMoneyTab.should('be.visible');
      NotificationPage.sideModalNotificationCommunityATab.should('be.visible');
      // view Other tab
      NotificationPage.sideModalContentRightArrow.should('be.visible');
      NotificationPage.sideModalContentRightArrow.click();
      NotificationPage.sideModalNotificationOtherTab.should('be.visible');
      NotificationPage.sideModalContentList.should('be.visible');

      // close activity notification
      NotificationPage.sideModalCloseIcon.click();
      NotificationPage.sideModalContent.should('not.exist');
    });
  },
);
