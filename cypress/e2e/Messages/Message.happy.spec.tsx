import { faker } from '@faker-js/faker';
import LoginPage from '../../pages/loginPage';
import NoumPage from '../../pages/noumPage';
import NoumPageView from '../../pages/noumPageView';

describe(
  'Message.happy.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    it('show send message from user1 to user2', () => {
      LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));

      // visit the home noum
      // wait for the noum to load
      cy.visit('/profile');
      cy.url().should('include', '/profile');
      NoumPageView.waitViewNoumPageToLoad();

      // create a new conversation by searching and selecting for a user
      NoumPage.messageSection.scrollIntoView().should('be.visible');
      NoumPage.messageNewConversationBtn.click();
      cy.wait(1000);
      NoumPage.messageSearchField.type(Cypress.env('AUTO_USER_TWO'));
      NoumPage.messageSearchResults
        .contains(Cypress.env('AUTO_USER_TWO_NAME'))
        .click();

      // wait for write message box to appear
      // write in the message text input field
      const message = faker.lorem.words(3);
      cy.log(`message: ${message}`);
      cy.wait(1000);
      NoumPage.messageChatBubbleOrEmptyChat.should('be.visible');
      NoumPage.messageChatTextArea.type(message);
      NoumPage.messageChatSendBtn.click();
      cy.wait(2000);
      NoumPage.messageChatStatusSent.scrollIntoView().should('be.visible');
      NoumPage.messageLatestChatBubble.scrollIntoView().should('be.visible');
      NoumPage.messageLatestChatBubble
        .contains(message)
        .scrollIntoView()
        .should('be.visible');

      // verify if the other user received the message
      cy.logout();
      LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
      cy.visit('/profile');
      NoumPageView.waitViewNoumPageToLoad();

      // verify message is received by the user on the home noum
      NoumPage.messageSection.scrollIntoView().should('be.visible');
      NoumPage.messageChatUserList.should('be.visible');
      NoumPage.messageChatBubble.should('be.visible');
      NoumPage.messageLatestChatBubble
        .contains(message)
        .scrollIntoView()
        .should('be.visible');
    });
  },
);
