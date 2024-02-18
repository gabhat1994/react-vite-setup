import MessagePage from '../../pages/messagePage';
import CommonPage from '../../pages/commonPage';
import NotificationPage from '../../pages/notificationPage';
import HomePage from '../../pages/homePage';
import data from '../../fixtures/data.json';

describe(
  'Message.Send.Image.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    it('Send an image from user1 to user2', () => {
      // go the home page
      cy.login(Cypress.env('AUTO_USER_CONNECTED_ONE'));
      HomePage.goToHomePage();

      // verify message list
      NotificationPage.messageIcon.click();
      MessagePage.header.should('be.visible');
      MessagePage.conversationList.should('be.visible');

      // search and select a user to message
      MessagePage.startConversation.click();
      MessagePage.conversationSearchField.type(
        Cypress.env('AUTO_USER_CONNECTED_TWO'),
      );
      MessagePage.conversationSearchResults
        .contains(Cypress.env('AUTO_USER_CONNECTED_TWO_NAME'))
        .click();
      CommonPage.waitForSpinnerNotBeVisible();

      // send an image
      cy.wait(5000);
      MessagePage.conversationInputFile.selectFile(data['path.image'], {
        force: true,
      });
      MessagePage.conversationSendBtn.click();

      // verify image is sent
      MessagePage.conversationFileUploading.should('be.visible');
      MessagePage.conversationFileUploading.should('not.exist');
      MessagePage.conversationLastFileSent.should('be.visible');

      // verify if the other user received the message
      cy.logout();
      cy.login(Cypress.env('AUTO_USER_CONNECTED_TWO'));
      HomePage.goToHomePage();
      // verify message list
      NotificationPage.messageIcon.click();
      MessagePage.header.should('be.visible');
      MessagePage.conversationList.should('be.visible');
      // verify image sent is received
      MessagePage.conversationChatBubbleOrEmptyChat.should('be.visible');
      MessagePage.conversationLastFileReceived.should('be.visible');
    });
  },
);
