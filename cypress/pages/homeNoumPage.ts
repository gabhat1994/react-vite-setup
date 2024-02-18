import CommonPage from './commonPage';
import NoumPage from './noumPage';
import MessagePage from './messagePage';

class HomeNoumPage {
  get profileContainer() {
    return cy.get(
      '[data-test="ProfileSummaryNew-ProfileSummaryDataContainer"]',
      {
        timeout: 20000,
      },
    );
  }

  get headerName() {
    return cy.xpath('//span[@data-testid="tprofileSummaryName"]');
  }

  get editBtn() {
    return cy.xpath(
      '//div[@data-testid="stack"]//span[@data-testid="button_text" and text()="Edit"]',
      { timeout: 600000 },
    );
  }

  get requestList() {
    return cy.get('[data-test="MemberRequest-MemberRequestDataBody"]');
  }

  get modalRequestList() {
    return cy
      .get('[id="modal-content"]')
      .find('[data-testid="tMemberRequestTitle"]');
  }

  get modalInvitedMeList() {
    return cy.get(
      '[data-test="RequestsOrInvite-renderRequestOrInvite-TSpanWithOverFlowText"]',
    );
  }

  get seeAllRequestInviteLink() {
    return cy.xpath(
      '//span[@data-test="NoumMembersTab-TSpan" and text()="Requests & Invites"]',
    );
  }

  get modalHeader() {
    return cy.get('[data-test="ModalHeader-Title-TSpan"]');
  }

  get requestConnectBtn() {
    return cy.xpath('//button[@data-testid="request-connection-button"]/span');
  }

  getModalInvitedByMe(username: string, noumName: string) {
    return cy
      .get('[id="modal-content"]')
      .find(
        '[data-test="RequestsOrInvite-renderRequestOrInvite-TSpanWithOverFlowText"]',
      )
      .contains(username)
      .should('have.attr', 'title', noumName)
      .parentsUntil('[data-test="InvitesOrMyRequestsList"]');
  }

  waitUntilPageIsloaded() {
    CommonPage.waitForSkeletonLoader();
    CommonPage.spinner.should('not.exist');
  }

  goToEditMode() {
    this.editBtn.click();
    CommonPage.waitForSpinnerToNotExist();
  }

  verifyViewMode() {
    this.editBtn.scrollIntoView().should('be.visible');
  }

  verifyElementPresent(element: string) {
    cy.xpath(
      '//span[@data-test="ViewModeNoumEditor-TSpan" or @data-test="ConversationHeader-TSpan" or @data-test="CalendarElementViewModeHeader-TSpan" or @data-test="ViewModeNoumEditorV2-TSpan" or @data-test="ElementHeaderWrapper-TSpan" or @data-test="ViewMode-WrapperTitleLabel"]',
    )
      .contains(element)
      .scrollIntoView()
      .should('be.visible');
    return this;
  }

  verifyEventElementPresent() {
    cy.get('[data-test="CalendarElementViewModeHeader-TSpan"]', {
      timeout: 20000,
    }).should('be.visible');
    return this;
  }

  verifyElementNotPresent(element: string) {
    cy.xpath(
      '//span[@data-test="ViewModeNoumEditor-TSpan" or @data-test="ConversationHeader-TSpan" or @data-test="CalendarElementViewModeHeader-TSpan" or @data-test="ViewModeNoumEditorV2-TSpan"]',
    )
      .contains(element)
      .should('not.exist');
    return this;
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

  viewMessageUser() {
    cy.xpath(
      '//button[@data-testid="user-connection-button"]/preceding-sibling::button',
    ).click();
    MessagePage.header.should('be.visible');
    MessagePage.conversationList.should('be.visible');
    return this;
  }

  sendMessageToUser(user: string, message: string) {
    // create a new conversation by searching and selecting for a user
    NoumPage.messageNewConversationBtn.click();
    cy.wait(1000);
    NoumPage.messageSearchField.type(user);
    NoumPage.messageSearchResults.contains(user).click();

    // wait for write message box to appear
    // write in the message text input field
    cy.log(`message: ${message}`);
    cy.wait(1000);
    NoumPage.messageChatBubbleOrEmptyChat.should('be.visible');
    NoumPage.messageChatTextArea.type(message);
    NoumPage.messageChatSendBtn.click();
    cy.wait(2000);
    NoumPage.messageChatStatusSent.should('be.visible');
    NoumPage.messageLatestChatBubble.contains(message).should('be.visible');
  }

  sendMessageToUserByEmail(email: string, message: string) {
    // create a new conversation by searching and selecting for a user
    NoumPage.messageNewConversationBtn.click();
    cy.wait(1000);
    NoumPage.messageSearchField.type(email);
    cy.xpath('(//div[@data-test="MessageUserOptionRenderer-DropDownLabel"])[1]')
      .should('be.visible')
      .click();

    // wait for write message box to appear
    // write in the message text input field
    cy.log(`message: ${message}`);
    cy.wait(1000);
    NoumPage.messageChatBubbleOrEmptyChat.should('be.visible');
    NoumPage.messageChatTextArea.type(message);
    NoumPage.messageChatSendBtn.click();
    cy.wait(2000);
    NoumPage.messageChatStatusSent.scrollIntoView().should('be.visible');
    NoumPage.messageLatestChatBubble
      .contains(message)
      .scrollIntoView()
      .should('be.visible');
  }

  viewAllRequestInviteModal() {
    this.seeAllRequestInviteLink.click();
    this.modalHeader.should('have.text', 'Requests & Invites');
    CommonPage.waitForSpinnerNotBeVisible();
    return this;
  }

  cancelInvitedByMe(username: string, noumName: string) {
    cy.get('[name="invited by me"]').click({ force: true });
    cy.xpath(
      `//*[@data-test="InvitesOrMyRequestsList" and contains(.,'${username}') and contains(.,'${noumName}')]//*[@data-testid="button_text" and text()='Cancel']`,
    ).click();
    cy.get('[data-testid="request_delete_btn"]').should('be.visible').click();
    cy.xpath(
      `//*[@data-test="InvitesOrMyRequestsList" and contains(.,'${username}') and contains(.,'${noumName}')]`,
    ).should('not.exist');
  }

  requestToConnect() {
    this.requestConnectBtn.should('have.text', 'Request to Connect').click();
    this.requestConnectBtn.should('have.text', 'Request Sent');
  }

  verifyOwnedNoumsModal(isHaveValue = true) {
    cy.xpath(
      '//span[@data-test="NoumMembersTab-TSpan" and text()="Connection"]',
    ).click();

    if (isHaveValue) {
      cy.get('[data-testid="link_container"]')
        .should('be.visible')
        .and('have.have.length.gte', 1);
    } else {
      cy.xpath(
        '//div[@data-test="BasicChipsTabs-StyledText" and contains(text(),"Project Spaces")]',
      ).click();
      cy.get(
        '[data-test="ConnectionDetailsModal-tabComponent-TextOnlySpan"]',
      ).should('have.text', 'No Project Spaces to Show');
    }
    cy.get('[data-testid="modal_close_btn"]').click();
    return this;
  }

  verifyUserConnected() {
    cy.get('[data-testid="user-connection-button"]')
      .should('be.visible')
      .should('have.text', 'Connected');
  }
}

export default new HomeNoumPage();
