import CommonPage from './commonPage';

class MessagePage {
  // message elements
  get header() {
    return cy.xpath('//span[@data-test="SideBar-TSpan" and text()="Messages"]');
  }

  get conversationList() {
    return cy.xpath(
      '//div[@data-testid="list_wrapper"]//div[@data-testid="chatitem-testid"]',
    );
  }

  get startConversation() {
    return cy.xpath(
      '//div[@data-test="SideBar-Options"]/button[@data-testid="button"]',
    );
  }

  get conversationSearchField() {
    return cy.get('[data-test="MessageUserSearch-InputField"]');
  }

  get conversationSearchResults() {
    return cy.get('[data-test="MessageUserOptionRenderer-DropdownValueLabel"]');
  }

  get conversationChatBubbleOrEmptyChat() {
    return cy.xpath(
      '//*[@data-test="GlobalConversationBody-TSpan" or contains(@data-testid,"message-bubble")]',
    );
  }

  get conversationInputFile() {
    return cy.get('input[type="file"]');
  }

  get conversationSendBtn() {
    return cy.get('[data-test="MessageInput-SendButtonWrapper"]');
  }

  get conversationFileUploading() {
    return cy.xpath('//img[@data-testid="message-image-pending"]', {
      timeout: 20000,
    });
  }

  get conversationLastFileSent() {
    return cy.xpath(
      '(//div[@data-test="GlobalConversationBody-MessageListWrapper"]//div[contains(@data-testid,"message-bubble-hover-area")])[last()]//img',
    );
  }

  get conversationLastTextSent() {
    return cy.get('[data-testid="text-message"]');
  }

  get conversationLastFileReceived() {
    return cy.xpath(
      '(//div[@data-test="GlobalConversationBody-MessageListWrapper"]//div[contains(@data-testid,"message-bubble-hover-area")])[last()]//div[@type="received" and  @data-test="ImageMessageBubble-MediaMessage"]',
    );
  }

  get conversationTextArea() {
    return cy.get('[data-test="TextArea-textarea"]');
  }

  get conversationStatusSent() {
    return cy.xpath('//span[@data-testid="status" and text()="Sent"]');
  }

  waitForChatBubbleOrEmpty() {
    this.conversationChatBubbleOrEmptyChat.should('be.visible');
    CommonPage.spinner.should('not.be.visible');
    cy.xpath('//img[@data-test="ImageMessageBubble-MessageImage"]').then(() => {
      cy.xpath(
        '//img[@data-test="ImageMessageBubble-MessageImage" and @src]',
      ).should('be.visible');
    });
  }

  sendMessageText(message: string) {
    this.conversationTextArea.should('be.visible').focus().click().type(message);
    this.conversationSendBtn.click();
    // verify image is sent
    cy.wait(2000);
    this.conversationStatusSent.should('be.visible');
    this.conversationLastTextSent.should('be.visible');
    this.conversationLastTextSent.last().contains(message).should('be.visible');
  }
}
export default new MessagePage();
