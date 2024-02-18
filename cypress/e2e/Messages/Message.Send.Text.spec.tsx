import { faker } from '@faker-js/faker';
import MessagePage from '../../pages/messagePage';
import NotificationPage from '../../pages/notificationPage';
import HomePage from '../../pages/homePage';

describe(
  'Message.Send.Text.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    it('Send text message from user1 to user2', () => {
      // go the home page
      cy.login(Cypress.env('AUTO_USER_ONE'));
      HomePage.goToHomePage();

      // verify message list
      NotificationPage.messageIcon.click();
      MessagePage.header.should('be.visible');
      MessagePage.conversationList.should('be.visible');

      // search and select a user to message
      MessagePage.startConversation.click();
      MessagePage.conversationSearchField.type(
        Cypress.env('AUTO_USER_TWO'),
      );
      MessagePage.conversationSearchResults
        .contains(Cypress.env('AUTO_USER_TWO_NAME'))
        .click();
      MessagePage.waitForChatBubbleOrEmpty();

      // send a text message
      const message = faker.lorem.words(3);
      cy.log(`message: ${message}`);
      cy.wait(1000);
      MessagePage.conversationTextArea.type(message);
      MessagePage.conversationSendBtn.click();
      // verify image is sent
      MessagePage.conversationStatusSent.should('be.visible');
      MessagePage.conversationLastTextSent.should('be.visible');
      cy.xpath(`//span[@data-testid="text-message" and text()="${message}"]`)
        .scrollIntoView()
        .should('be.visible');
      // MessagePage.conversationChatBubbleOrEmptyChat
      //   .contains(message)

      //   .should('be.visible');

      // verify if the other user received the message
      cy.logout();
      cy.login(Cypress.env('AUTO_USER_TWO'));
      HomePage.goToHomePage();
      // verify message list
      NotificationPage.verifyMessageBadgeCounter(true);
      NotificationPage.messageIcon.click();
      MessagePage.header.should('be.visible');
      MessagePage.conversationList.should('be.visible');
      // verify text sent is received
      MessagePage.conversationChatBubbleOrEmptyChat.should('be.visible');
      MessagePage.conversationChatBubbleOrEmptyChat
        .contains(message)
        .should('be.visible');
    });
  },
);
