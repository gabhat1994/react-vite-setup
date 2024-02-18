import { faker } from '@faker-js/faker';
import NoumPage from '../../../pages/noumPage';
import NoumListPage from '../../../pages/noumListPage';
import LoginPage from '../../../pages/loginPage';

describe(
  'Noum.Message.User.Sanity.spec.tsx',
  {
    viewportWidth: 1980,
    viewportHeight: 1020,
  },
  () => {
    beforeEach(() => {
      LoginPage.loginByApi();
    });
    it('Send Messege to a user from a Project Noum', () => {
      // noums are visible
      cy.visit('noums');
      NoumListPage.waitForManageNoums().viewNoum(
        Cypress.env('AUTO_PROJECT_NOUM_ONE'),
      );

      // create a new conversation by searching and selecting for a user
      NoumPage.messageSection.scrollIntoView().should('be.visible');
      cy.wait(1000);
      cy.xpath('//div[@data-testid="chatitem-testid"]').then((error) => {
        if (error) {
          cy.xpath('//div[@data-testid="chatitem-testid"]')
            .contains(Cypress.env('AUTO_USER_TWO_NAME'))
            .click();
        } else {
            NoumPage.messageNewConversationBtn.click();
            NoumPage.messageSearchField.type(Cypress.env('AUTO_USER_TWO_NAME'));
            NoumPage.messageSearchResults
              .contains(Cypress.env('AUTO_USER_TWO_NAME'))
              .click();
        }
      });
      
      // wait for write message box to appear
      // write in the message text input field
      const message = faker.lorem.words(3);
      cy.log(`message: ${message}`);
      cy.wait(1000);
      NoumPage.messageChatBubble.should('be.visible');
      NoumPage.messageChatTextArea.type(message);
      NoumPage.messageChatSendBtn.click();
      cy.wait(1000);
      NoumPage.elementMessage.scrollIntoView();
      NoumPage.messageChatStatusSent.should('be.visible');
      NoumPage.messageChatBubble
        .last()
        .should('be.visible')
        .contains(message)
        .should('exist');

      // verify if the other user received the message
      cy.logout();
      LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));

      // noums are visible
      cy.visit('noums');
      NoumListPage.waitForManageNoums().noumConnectedTab.click();
      NoumListPage.waitForManageNoums();

      // select a noum
      NoumListPage.viewNoum(Cypress.env('AUTO_PROJECT_NOUM_ONE'));

      // verify message is received by the user on the project noum
      cy.wait(1000);
      NoumPage.messageSection.scrollIntoView().should('be.visible');
      NoumPage.messageChatUserList.should('be.visible');
      NoumPage.messageChatBubble.should('be.visible');
      NoumPage.elementMessage.scrollIntoView();
      NoumPage.messageChatBubble
        .last()
        .should('be.visible')
        .contains(message)
        .should('exist');
    });
  },
);
