import CommonPage from './commonPage';

class NotificationPage {
  // generic for all notifications
  get eventIcon() {
    return cy.xpath(
      '(//div[contains(@data-test,"IconContainer")])[2] | //button[@aria-label="Events"]',
    );
  }

  get bellIcon() {
    return cy.xpath(
      '(//div[contains(@data-test,"IconContainer")])[3] | //button[@aria-label="Notifications"]',
      { timeout: 30000 },
    );
  }

  get messageIcon() {
    return cy.xpath(
      '(//div[contains(@data-test,"IconContainer")])[4] | //button[@aria-label="Messages"]',
    );
  }

  get bellIconCounter() {
    return cy.get('[data-testid="StyledBadgeText"]', { timeout: 30000 });
  }

  get sideModalContent() {
    return cy.xpath('//div[@data-test="SideModal-Content"]');
  }

  get sideModalContentFirstListItem() {
    return cy.xpath('(//div[@role="listitem"]//span)[1]');
  }

  get sideModalContentListItems() {
    return cy.get('[data-test="tree-Body"]', { timeout: 60000 });
  }

  get sideModalContentCloseIcon() {
    return cy.xpath(
      '//div[@data-test="Breadcrumbs-IconWrapper"]/div[@data-test="Container"]',
    );
  }

  get sideModalContentRightArrow() {
    return cy.xpath(
      '(//div[contains(@data-testid,"filter")]//div[@data-test="BasicChipsTabsForm-LeftButton"])[last()]',
    );
  }

  get sideModalContentList() {
    return cy.xpath(
      '//div[@data-testid="notifications-list"]//a[@data-test="Clickable"]',
    );
  }

  get sideModalCloseIcon() {
    return cy.xpath('//div[@data-test="Breadcrumbs-IconWrapper"]/div');
  }

  // notification activity related
  get sideModalNotificationHeader() {
    return cy.xpath(
      '//span[@data-test="Breadcrumbs-Title" and text()="Notifications"]',
    );
  }

  get sideModalNotificationReadAll() {
    return cy.xpath(
      '//button[@data-testid="button" and contains(.,"Mark All as Read")]',
      { timeout: 30000 },
    );
  }

  get sideModalNotificationAllTab() {
    return cy.xpath('//input[@data-testid="tab-All"]');
  }

  get sideModalNotificationNoumsTab() {
    return cy.xpath('//input[@data-testid="tab-Noums"]');
  }

  get sideModalNotificationCommunityATab() {
    return cy.xpath('//input[@data-testid="tab-Community"]');
  }

  get sideModalNotificationMoneyTab() {
    return cy.xpath('//input[@data-testid="tab-Money"]');
  }

  get sideModalNotificationOtherTab() {
    return cy.xpath('//input[@data-testid="tab-Other"]');
  }

  // event related
  get eventModalHeader() {
    return cy.xpath(
      '//span[@data-test="Breadcrumbs-Title" and text()="Events"]',
    );
  }

  get eventModalList() {
    return cy.xpath('//div[@data-testid="event-item-testid"]', {timeout : 30000});
  }

  get eventModalAllTab() {
    return cy.get('[data-testid="tab-all"]');
  }

  get eventModalAttendingTab() {
    return cy.get('[data-testid="tab-ATTENDING"]');
  }

  get eventModalHostingTab() {
    return cy.get('[data-testid="tab-HOSTING"]');
  }

  get eventModalInvitationTab() {
    return cy.get('[data-testid="tab-INVITATION"]');
  }

  get eventModalExpiredTab() {
    return cy.get('[data-testid="tab-EXPIRED"]');
  }

  get newItemsLoader() {
    return cy.xpath(
      '//div[@data-testid="notifications-list"]/preceding::div[@data-test="SpinnerPosition" and not(@data-cypress-el)]',
    );
  }

  get buttonLoader() {
    return cy.xpath('//div[@role="listitem"]//div[@role="progressbar"]');
  }

  // token related
  get tokenModal() {
    return cy.get('[data-testid="token-notification"]', { timeout: 30000 });
  }

  get tokenModalCloseIcon() {
    return cy.xpath(
      '//button[@data-testid="close-notification"]/span[@data-testid="button_text" and text()="Close"]',
    );
  }

  get tokenModalCount() {
    return cy.xpath('//span[@data-test="TokenNotification-TokenCount"]');
  }

  verifyNotificationContentOnList(content: string) {
    // validate notifications got from being followed and request connection
    this.bellIcon.click();
    this.sideModalContent.should('be.visible');
    this.sideModalContentListItems.should('be.visible');
    cy.xpath(`//span[contains(.,"${content}")]`).should('be.visible', {
      timeout: 30000,
    });
    this.sideModalContentListItems
      .first()
      .contains(content)
      .should('be.visible');
    this.sideModalContentCloseIcon.click();
    this.sideModalContent.should('not.exist');
    return this;
  }

  viewNotificationContentOnList(content: string) {
    // validate notifications got from being followed and request connection
    this.bellIcon.click();
    this.sideModalContent.should('be.visible');
    this.sideModalContentListItems.should('be.visible');
    this.sideModalContentListItems
      .first()
      .contains(content)
      .should('be.visible')
      .click();
    CommonPage.waitForSpinnerToNotExist();
    return this;
  }

  verifyNoumInvite(content: string, message?: string) {
    // validate notifications got from noum invite
    this.bellIcon.click();
    this.sideModalContent.should('be.visible');
    this.sideModalContentListItems.contains(content).should('be.visible');
    this.newItemsLoader.should('not.exist');
    this.sideModalContentListItems
      .contains(content)
      .siblings('[data-test="Buttons"]')
      .find('[data-testid="button_text"]')
      .contains('Connect')
      .should('be.visible');
    this.sideModalContentListItems
      .contains(content)
      .siblings('[data-test="Buttons"]')
      .find('[data-testid="button_text"]')
      .contains('Reject')
      .should('be.visible');
    if (message !== undefined) {
      this.sideModalContentListItems
        .contains(content)
        .siblings('[data-test="tree-MessageSpan"]')
        .should('have.text', message);
    }

    this.sideModalContentCloseIcon.click();
    this.sideModalContent.should('not.exist');
    return this;
  }

  verifyNoumInviteNotExist(content: string) {
    // validate notifications not exist from noum invite
    this.bellIcon.click();
    this.sideModalContent.should('be.visible');
    this.newItemsLoader.should('not.exist');
    this.sideModalContentListItems.contains(content).should('not.exist');
    this.sideModalContentCloseIcon.click();
    this.sideModalContent.should('not.exist');
    return this;
  }

  declineNoumInvite(content: string) {
    // validate notifications got from noum invite
    this.bellIcon.click();
    this.sideModalContent.should('be.visible');
    this.sideModalContentListItems.contains(content).should('be.visible');
    this.newItemsLoader.should('not.exist');
    this.sideModalContentListItems
      .contains(content)
      .siblings('[data-test="Buttons"]')
      .find('[data-testid="button_text"]')
      .contains('Reject')
      .should('be.visible')
      .click({ force: true });
    this.waitForButtonLoader();
    this.sideModalContentListItems.contains(content).should('not.exist');

    this.sideModalContentCloseIcon.click();
    this.sideModalContent.should('not.exist');
    return this;
  }

  acceptNoumInvite(content: string) {
    // validate notifications got from noum invite
    this.bellIcon.click();
    this.sideModalContent.should('be.visible');
    this.sideModalContentListItems.contains(content).should('be.visible');
    this.sideModalContentListItems
      .contains(content)
      .siblings('[data-test="Buttons"]')
      .find('[data-testid="button_text"]')
      .contains('Connect')
      .should('be.visible')
      .click({ force: true });
    this.waitForButtonLoader();
    this.sideModalContentListItems.contains(content).should('not.exist');

    this.sideModalContentCloseIcon.click();
    this.sideModalContent.should('not.exist');
    return this;
  }

  verifyEventExist(event: string) {
    cy.log(`event: ${event}`);
    this.eventIcon.click();
    this.eventModalHeader.should('be.visible');
    cy.get('[data-test="EventItem-EventTitle"][type="notification"]', {
      timeout: 30000,
    })
      .should('be.visible')
      .contains(event)
      .should('exist');

    // close event notification
    this.sideModalCloseIcon.click();
    this.eventModalHeader.should('not.exist');
    return this;
  }

  verifyEventNotExist(event: string) {
    cy.log(`event: ${event}`);
    this.eventIcon.click();
    this.eventModalHeader.should('be.visible');
    cy.get('[data-test="EventItem-EventTitle"][type="notification"]', {
      timeout: 30000,
    })
      .should('be.visible')
      .contains(event)
      .should('not.exist');

    // close event notification
    this.sideModalCloseIcon.click();
    this.eventModalHeader.should('not.exist');
    return this;
  }

  verifyEmptyAttendingTab() {
    cy.get('[data-testid="tab-ATTENDING"]').should('be.visible').click();
    cy.get('[data-test="EventListEmptyScreen-TSpan"]')
      .should('be.visible')
      .first()
      .should('have.text', 'You are not attending any events.');
    return this;
  }

  verifyEmptyHostingTab() {
    cy.get('[data-testid="tab-HOSTING"]').should('be.visible').click();
    cy.get('[data-test="EventListEmptyScreen-TSpan"]')
      .should('be.visible')
      .first()
      .should('have.text', 'You are not hosting any events.');
    return this;
  }

  declineEventInvitation(invitedEvent: string) {
    cy.get('[data-testid="tab-INVITATION"]').should('be.visible').click();
    cy.xpath(
      `//div[@data-testid="event-item-testid" and contains(.,"${invitedEvent}")]`,
    ).should('be.visible');
    cy.wait(2000);
    cy.xpath(
      `//div[@data-testid="event-item-testid" and contains(.,"${invitedEvent}")]/child::div[@type="notification"]//button[@data-testid="decline-invitation-button"]/div`,
    )
      .trigger('onmouseover')
      .click({ force: true });
    cy.xpath(
      `//div[@data-testid="event-item-testid" and contains(.,"${invitedEvent}")]//span[@data-testid="attending-label"and text()="Not Attending"]`,
    ).should('be.visible');
    return this;
  }

  acceptEventInvitation(invitedEvent: string) {
    cy.get('[data-testid="tab-INVITATION"]').should('be.visible').click();
    cy.xpath(
      `//div[@data-testid="event-item-testid" and contains(.,"${invitedEvent}")]`,
    ).should('be.visible');
    cy.wait(2000);
    cy.xpath(
      `//div[@data-testid="event-item-testid" and contains(.,"${invitedEvent}")]/child::div[@type="notification"]//button[@data-testid="accept-invitation-button"]/div`,
    )
      .trigger('onmouseover')
      .click({ force: true });
    cy.get('[data-test="EventItem-EventTitle"][type="notification"]').should(
      'not.exist',
    );
    cy.get('[data-testid="tab-ATTENDING"]').should('be.visible').click();
    cy.get('[data-test="EventItem-EventTitle"][type="notification"]')
      .should('be.visible')
      .contains(invitedEvent)
      .should('be.visible');
    return this;
  }

  verifyEventBadgeCounter(value: boolean) {
    this.bellIcon.should('have.attr', 'data-unread', value.toString());
  }

  verifyMessageBadgeCounter(value: boolean) {
    this.messageIcon.should('have.attr', 'data-unread', value.toString());
  }

  viewEventSideModal() {
    this.eventIcon.click();
    this.eventModalHeader.should('be.visible');
    cy.get('[data-test="EventItem-EventTitle"][type="notification"]').should(
      'be.visible',
    );
    return this;
  }

  waitForButtonLoader() {
    cy.wait(1000);
    cy.get('body').then(($el) => {
      if (
        $el.find(
          'div[data-test="tree-Content"]>div[data-test="Buttons"]>button[data-testid="button"]>span[data-testid="spinner"]',
        ).length > 0
      ) {
        this.buttonLoader.should('not.exist');
      }
    });
  }
}

export default new NotificationPage();
