import CommonPage from './commonPage';
import data from '../fixtures/data.json';

class NoumPage {
  get closeEditModeBtn() {
    return cy.get('[data-testid="closeChamberEditMode"]');
  }

  get elementTitle() {
    return cy.get('[data-test="ViewMode-WrapperTitleLabel"]');
  }

  get headerName() {
    return cy.xpath('//span[@data-testid="tprofileSummaryName"]');
  }

  get followBtn() {
    return cy.xpath('//button[@data-testid="follow-button"]/span');
  }

  get followerHeader() {
    return cy.xpath(
      '//div[@data-test="NoumMembersInformation-InfoStackWrapper"]/button[@data-testid="button"][1]',
    );
  }

  get requestConnectBtn() {
    return cy.xpath('//button[@data-testid="request-connection-button"]/span');
  }

  get userConnectBtn() {
    return cy.xpath('//button[@data-testid="user-connection-button"]/span');
  }

  get editModeElementHeaderTitle() {
    return cy.xpath('//span[@data-test="EditMode-TSpan"]');
  }

  get messageSection() {
    return cy.xpath('//div[@data-testid="chatlist-wrapper"]');
  }

  get messageNewConversationBtn() {
    return cy.get('[data-testid="new-conversation-button"]');
  }

  get messageSearchField() {
    return cy.get('[data-test="MessageUserSearch-InputField"]');
  }

  get messageSearchResults() {
    return cy.get('[data-test="MessageUserOptionRenderer-DropdownValueLabel"]');
  }

  get messageChatBubble() {
    return cy.xpath('//span[@data-testid="text-message"]');
  }

  get messageLatestChatBubble() {
    return cy.xpath('(//span[@data-testid="text-message"])[last()]');
  }

  get messageSearchResultFirstSelection() {
    return cy.xpath(
      '(//div[@data-test="MessageUserOptionRenderer-DropdownValueLabel"])[1]',
    );
  }

  get messageChatBubbleOrEmptyChat() {
    return cy.xpath(
      '//span[@data-test="ConversationBody-TSpan" or @data-testid="text-message"]',
    );
  }

  get messageChatTextArea() {
    return cy.xpath(
      '//*[@data-test="TextArea-textarea" and @placeholder="Write a message..."]',
    );
  }

  get messageChatSendBtn() {
    return cy.get('[data-test="MessageInput-SendButtonWrapper"]');
  }

  get messageChatStatusSent() {
    return cy.xpath('//span[@data-testid="status" and text()="Sent"]');
  }

  get messageCollapseIcon() {
    return cy.xpath(
      '//div[@data-test="ChatHeader-Wrapper"]/button[@data-testid="collapse-button"]',
    );
  }

  get messageChatUserList() {
    return cy.xpath('//div[@data-testid="chatitem-testid"]');
  }

  get imageInputFile() {
    return cy.xpath(
      '//input[@accept="image/png,image/jpg,image/jpeg" and @type="file"]',
    );
  }

  get imageFileUploaded() {
    return cy.get('[data-test="ImageView-Image"]', { timeout: 30000 });
  }

  get videoInputFile() {
    return cy.xpath(
      '//input[@accept="video/mp4,video/quicktime" and @type="file"]',
    );
  }

  get videoFileUploaded() {
    return cy.get('[data-testid="videoPlayer"]', { timeout: 30000 });
  }

  get walletContinueBtn() {
    return cy.xpath('//button[@data-testid="continueButton"]');
  }

  get walletConfirmCloseBtn() {
    return cy.xpath('//button[@data-testid="confirmCloseWallet"]');
  }

  get questionAddBtn() {
    return cy.xpath(
      `//div[@data-testid="stack" and contains(.,"Quick Questions")]/button[@data-testid="button"] | //button[@data-testid="add-first-question-button"]`,
    );
  }

  get questionList() {
    return cy.get('[data-test="QuestionAnswer-QuestionBodyWrapper"]');
  }

  get questionAddModalAskField() {
    return cy.xpath(
      '//textarea[@data-testid="tTextArea" and @placeholder="Ask a question visible to members and followers of your Noum"]',
    );
  }

  get questionAddModalAskBtn() {
    return cy.xpath('//button[@data-testid="ask_question_button"]');
  }

  get questionAnswerField() {
    return cy.xpath('//textarea[@data-testid="tTextArea"]');
  }

  get questionAnswerSubmitBtn() {
    return cy.xpath('//button[@data-testid="tSendButton"]');
  }

  get questionAnswerFirstList() {
    return cy.xpath('//button[@data-testid="tSendButton"]');
  }

  get questionAnswerCount() {
    return cy.xpath('//span[@data-test="QuestionAnswer-AnswerCount"]');
  }

  get eventAddBtn() {
    return cy.xpath(
      `//div[@data-testid="calendar-element-header"]/button | //span[@data-testid="button_text" and text()="Add New Event"]`,
    );
  }

  get eventHostingTabCount() {
    return cy.xpath(
      '//span[@data-test="CalendarOwnerEventsListCollapsed-EventCategory" and text()="Hosting"]/following-sibling::span[@data-test="CalendarOwnerEventsListCollapsed-EventCount"]',
    );
  }

  get eventCollapesBtn() {
    return cy.xpath('//div[@data-testid="calendar-collapse-button"]');
  }

  get eventTitle() {
    return cy.xpath('//span[@data-test="EventItem-EventTitle"]');
  }

  get eventAddModalTitleField() {
    return cy.xpath('//input[@name="title"]');
  }

  get eventAddModalDescriptionField() {
    return cy.xpath('//textarea[@name="description"]');
  }

  get eventAddModalPrivacyConnected() {
    return cy.xpath(
      '//div[@data-test="PrivacySettingsField-Heading"]//input[@data-test="EventPicker-Capitalize"]',
    );
  }

  get eventAddModalCreateBtn() {
    return cy.xpath('//button[@data-testid="create-event-button"]');
  }

  get noumSectionCount() {
    return cy.xpath('//div[contains(@data-test,"NoumSectionContainer")]');
  }

  get fileAddBtn() {
    return cy.xpath('//button[@data-testid="add-button"]');
  }

  get fileAddModalUploadInput() {
    return cy.xpath(
      '//div[@id="modal-content"]//input[@data-testid="file-upload-input"]',
    );
  }

  get fileAddModalFilenameField() {
    return cy.xpath('//input[@name="fileName"]');
  }

  get fileAddModalDescriptionField() {
    return cy.xpath('//input[@name="description"]');
  }

  get fileAddModalGuestChecbox() {
    return cy.xpath(
      '//label[text()="Guest"]/preceding-sibling::span[@data-testid="checkbox"]',
    );
  }

  get fileAddModalSubmitBtn() {
    return cy.xpath('//button[@type="submit"]');
  }

  get fileManagerTitle() {
    return cy.xpath(
      '//div[@data-testid="card" and contains(.,"File")]//span[@overflow="ellipsis"]',
    );
  }

  // Requests & Invites section
  get receivedRequestContainerList() {
    return cy.xpath(
      '//div[@data-test="ReceivedRequests-Container"]//div[@data-test="MemberRequest-MemberRequestContainer"]',
    );
  }

  get receivedRequestDeclineBtn() {
    return cy.xpath(
      '//div[@data-test="ReceivedRequests-Container"]//div[@data-test="MemberRequest-MemberRequestContainer"]//button[@data-testid="decline-button" and contains(.,"Decline")]',
    );
  }

  get receivedRequestAcceptBtn() {
    return cy.xpath(
      '//div[@data-test="ReceivedRequests-Container"]//div[@data-test="MemberRequest-MemberRequestContainer"]//button[@data-testid="accept-button" and contains(.,"Accept")]',
    );
  }

  get receivedRequestTitle() {
    return cy.xpath('//span[@data-test="RequestList-ReceivedRequest"]');
  }

  // noum members sections
  get connectedMembersCount() {
    return cy.xpath(
      '//div[@data-test="NoumMembersInformation-InfoStackWrapper"]//span[text()="Connection"]/preceding-sibling::span',
    );
  }

  get followerMembersCount() {
    return cy.xpath(
      '//div[@data-test="NoumMembersInformation-InfoStackWrapper"]//span[text()="Follower"]/preceding-sibling::span',
    );
  }

  get eventCount() {
    return cy.xpath(
      '//div[@data-test="NoumMembersInformation-InfoStackWrapper"]//span[text()="Event"]/preceding-sibling::span',
    );
  }

  // generic elements
  get modalHeaderTitle() {
    return cy.xpath(
      '//div[@id="modal-content"]//span[contains(@data-test,"ModalHeader")]',
    );
  }

  get dropDownValue() {
    return cy.xpath(
      '//a[@data-testid="dropdown-value"] | //span[@data-test="DropdownOption-TSpan"]',
    );
  }

  get favouriteIcon() {
    return cy.xpath('//div[@data-test="Favourite-IconWrapper"]/div');
  }

  get backBtn() {
    return cy.xpath(
      '//a[@data-testid="Side-Nav-Item"] | //div[@id="AppSideNavigation"]//button[@aria-label="Back"]',
    );
  }

  get elementMessage() {
    return cy.get('[aria-label="ELEMENT_MESSAGE"]');
  }

  addQuestionToElement(question: string) {
    // add a question
    this.questionAddBtn.click();
    this.modalHeaderTitle.contains('Ask a Question').should('be.visible');
    this.questionAddModalAskField.type(question);
    this.questionAddModalAskBtn.click();
    CommonPage.verifyAlertMessage(data['noum.question.published']);
    this.questionList.contains(question).scrollIntoView().should('be.visible');
    return this;
  }

  addSimpleEventToElement(event: string) {
    this.eventAddBtn.click();
    this.dropDownValue.contains('Schedule').click();
    this.modalHeaderTitle.contains('Create a New Event').should('be.visible');
    this.eventAddModalTitleField.type(event);
    this.eventAddModalDescriptionField.type(event);
    this.eventAddModalPrivacyConnected.click();
    this.dropDownValue.contains('Public').click();
    this.eventAddModalCreateBtn.click();
    CommonPage.verifyAlertMessage('Event');

    cy.get('[data-testid="tab-HOSTING"]').click();
    this.eventTitle.should('have.text', event);
    return this;
  }

  addFirstEventToElement(event: string) {
    this.eventAddBtn.click();
    this.modalHeaderTitle.contains('Create a New Event').should('be.visible');
    this.eventAddModalTitleField.type(event);
    this.eventAddModalDescriptionField.type(event);
    this.eventAddModalPrivacyConnected.click();
    this.dropDownValue.contains('Public').click();
    this.eventAddModalCreateBtn.click();
    CommonPage.verifyAlertMessage('Event');

    cy.get('[data-testid="tab-HOSTING"]').click();
    this.eventTitle.should('have.text', event);
    return this;
  }

  addFileToElement(filename: string, filepath: string) {
    this.fileAddBtn.click();
    this.modalHeaderTitle.contains('Upload a File').should('be.visible');
    this.fileAddModalUploadInput.selectFile(filepath, { force: true });
    cy.wait(2000);
    CommonPage.spinner.should('not.exist');
    this.fileAddModalFilenameField.type(filename);
    this.fileAddModalDescriptionField.type(filename);
    this.fileAddModalGuestChecbox.click();
    this.fileAddModalSubmitBtn.click();
    CommonPage.verifyAlertMessage('The file has been uploaded.');
    this.fileManagerTitle.contains(filename).should('be.visible');
    return this;
  }

  addAnswerToQuestionElement(answer: string) {
    // add a question
    this.questionAnswerField.type(answer);
    this.questionAnswerSubmitBtn.click();
    CommonPage.verifyAlertMessage('Answer Published');
    this.questionAnswerField.should('not.exist');
    this.questionAnswerCount.should('have.text', '1 Answer');
  }

  sendTextMessageToFirstResultUser(message: string) {
    cy.xpath('//span[contains(@data-test,"ChatHeader") and text()="Messages"]')
      .scrollIntoView()
      .should('be.visible');
    this.messageNewConversationBtn.click();
    cy.wait(1000);
    this.messageSearchResultFirstSelection.click();
    // wait for write message box to appear
    // write in the message text input field
    this.messageChatBubble.scrollIntoView().should('be.visible');
    this.messageChatTextArea.type(message);
    this.messageChatSendBtn.click();
    cy.wait(1000);
    this.messageChatBubble.scrollIntoView();
    this.messageChatStatusSent.should('be.visible');
    this.messageChatBubble.contains(message).should('be.visible');
  }

  editNoum() {
    cy.xpath(
      '//div[@data-testid="edit-noum-actions"]//span[text()="Edit"]',
    ).click();
    CommonPage.waitForSpinnerToNotExist();
    return this;
  }

  declineNoumInvite() {
    cy.xpath('//span[@data-testid="button_text" and text()="Decline"]')
      .should('be.visible')
      .click();
    this.requestConnectBtn
      .should('be.visible')
      .should('have.text', 'Request to Connect');
  }

  acceptNoumInvite() {
    cy.xpath('//span[@data-testid="button_text" and text()="Accept"]')
      .should('be.visible')
      .click();
    this.userConnectBtn.should('be.visible').should('have.text', 'Connected');
  }

  sendMessageToUser(user: string, message: string) {
    // create a new conversation by searching and selecting for a user
    this.messageNewConversationBtn.click();
    this.messageSearchField.type(user);
    this.messageSearchResults.contains(user).click();

    // wait for write message box to appear
    // write in the message text input field
    cy.log(`message: ${message}`);
    this.messageChatBubbleOrEmptyChat.should('be.visible');
    this.messageChatTextArea.type(message);
    this.messageChatSendBtn.click();
    this.messageChatStatusSent.should('be.visible');
    this.messageLatestChatBubble.contains(message).should('be.visible');
  }

  sendMessageToUserByEmail(email: string, message: string) {
    // create a new conversation by searching and selecting for a user
    this.messageNewConversationBtn.click();
    this.messageSearchField.type(email);
    cy.xpath('(//div[@data-test="MessageUserOptionRenderer-DropDownLabel"])[1]')
      .should('be.visible')
      .click();

    // wait for write message box to appear
    // write in the message text input field
    cy.log(`message: ${message}`);
    cy.wait(1000);
    this.messageChatBubbleOrEmptyChat.should('be.visible');
    this.messageChatTextArea.type(message);
    this.messageChatSendBtn.click();
    cy.wait(2000);
    this.messageChatStatusSent.scrollIntoView().should('be.visible');
    this.messageLatestChatBubble
      .contains(message)
      .scrollIntoView()
      .should('be.visible');
  }

  verifyVideoElementCount(count: number) {
    cy.get('[data-testid="video-element-view"]').should('have.length', count);
    return this;
  }

  verifyImageElementCount(count: number) {
    cy.get('[data-testid="image-element-view"]').should('have.length', count);
    return this;
  }

  verifyContentElementCount(count: number) {
    cy.get('[data-testid="rte-element"]').should('have.length', count);
    return this;
  }

  verifyElementPresent(element: string, is_present = true) {
    if (is_present === true) {
      cy.xpath(
        `
      //span[@data-test="CalendarElementViewModeHeader-TSpan" or
      @data-test="ViewModeNoumEditorV2-TSpan" or
      @data-test="ViewMode-WrapperTitleLabel" or
      @data-test="QuickQuestionsElementHeader-TSpan" or
      @data-test="ChatHeader-TSpan" or
      @data-test="WalletHeader-TSpan" or @data-test="ElementHeaderWrapper-TSpan"]
    `,
      )
        .contains(element)
        .should('exist');
    } else {
      cy.xpath(
        `
      //span[@data-test="CalendarElementViewModeHeader-TSpan" or
      @data-test="ViewModeNoumEditorV2-TSpan" or
      @data-test="ViewMode-WrapperTitleLabel" or
      @data-test="QuickQuestionsElementHeader-TSpan" or
      @data-test="ChatHeader-TSpan" or
      @data-test="WalletHeader-TSpan" or @data-test="ElementHeaderWrapper-TSpan"]
    `,
      )
        .contains(element)
        .should('not.exist');
    }

    return this;
  }
}
export default new NoumPage();
