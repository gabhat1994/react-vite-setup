import NoumPage from './noumPage';
import CommonPage from './commonPage';

class NoumManage {
  // generic
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
      '//button[@data-testid="button"]/span[text()="See all Requests & Invites"]',
    );
  }

  get requestInviteLink() {
    return cy.xpath(
      '//span[@data-test="NoumMembersTab-TSpan" and text()="Requests & Invites"]',
    );
  }

  get modalHeader() {
    return cy.get('[data-test="ModalHeader-Title-TSpan"]');
  }

  getModalRequestInvite(noumName: string) {
    return cy
      .get('[id="modal-content"]')
      .find('[data-testid="tMemberRequestTitle"]')
      .contains(noumName)
      .parentsUntil('[data-test="MemberRequest-MemberRequestContainer"]')
      .siblings('[data-test="MemberRequest-ButtonSection"]');
  }

  getModalInvitedByMe(username: string) {
    return cy
      .get('[id="modal-content"]')
      .find(
        '[data-test="RequestsOrInvite-renderRequestOrInvite-TSpanWithOverFlowText"]',
      )
      .contains(username)
      .parentsUntil('[data-test="InvitesOrMyRequestsList"]');
  }

  getRequestListButtons(noumName: string) {
    return cy
      .get('[data-test="MemberRequest-MemberRequestDataBody"]')
      .contains(noumName)
      .should('be.visible')
      .parentsUntil('[data-test="MemberRequest-MemberRequestContainer"]')
      .siblings('[data-test="MemberRequest-ButtonSection"]');
  }

  getRequestListStatus(noumName: string) {
    return cy
      .get('[data-test="MemberRequest-MemberRequestDataBody"]')
      .contains(noumName)
      .should('be.visible')
      .parentsUntil('[data-test="MemberRequest-MemberRequestContainer"]')
      .siblings('[data-test="MemberRequest-RequestResolvedMessageSection"]');
  }

  verifyNoumInvite(noumName: string, username: string) {
    this.requestList.contains(noumName).scrollIntoView().should('be.visible');
    if (username !== undefined) {
      this.requestList.contains(`Invited by ${username}`).should('be.visible');
    }
    this.getRequestListButtons(noumName)
      .find('[data-testid="decline-button"]')
      .should('be.visible');
    this.getRequestListButtons(noumName)
      .find('[data-testid="accept-button"]')
      .should('be.visible');
    return this;
  }

  verifyNoumReceivedRequest(username: string) {
    this.requestList.contains(username).should('be.visible');

    this.getRequestListButtons(username)
      .find('[data-testid="decline-button"]')
      .should('be.visible');
    this.getRequestListButtons(username)
      .find('[data-testid="accept-button"]')
      .should('be.visible');
    return this;
  }

  verifyNoumRequest(noumName: string, username: string) {
    cy.window().scrollTo('top', {ensureScrollable: false} );
    this.requestList.contains(noumName).scrollIntoView().should('be.visible');
    if (username !== undefined) {
      this.requestList
        .contains(`Requested by ${username}`)
        .should('be.visible');
    }
    this.getRequestListButtons(noumName)
      .find('[data-testid="decline-button"]')
      .should('be.visible');
    this.getRequestListButtons(noumName)
      .find('[data-testid="accept-button"]')
      .should('be.visible');
    return this;
  }

  verifyNoumInviteNotExist(noumName: string) {
    cy.xpath(
      `//span[@data-testid="tMemberRequestTitle" and text()="${noumName}"]`,
    ).should('not.exist');
    return this;
  }

  verifyNoumInviteByMeNotExist(noumName: string) {
    cy.get('[data-test="ModalBody-ModalBodyStyled"]').then(($el) => {
      cy.log(
        `test: ${$el.find('[data-test="InvitesOrMyRequestsList"]').length}`,
      );
      if ($el.find('[data-test="InvitesOrMyRequestsList"]').length > 0) {
        cy.get('[data-test="RequestsOrInvite-renderRequestOrInvite-TSpanWithOverFlowText"]').should('not.have.text', noumName);
      } else {
        cy.get('[data-test="RequestsOrInvite-renderRequestOrInvite-TSpanWithOverFlowText"]').should('not.exist');
      }
    });
    return this;
  }

  viewNoumInvite(noumName: string) {
    this.requestList.contains(noumName).should('be.visible');
    this.requestList.contains(noumName).click();
    NoumPage.headerName.should('have.text', noumName);
    CommonPage.waitForSkeletonLoader();
    return this;
  }

  verifyModalNoumInvite(noumName: string, username?: string) {
    this.modalRequestList
      .should('be.visible')
      .contains(noumName)
      .should('be.visible');
    if (username !== undefined) {
      this.modalRequestList
        .should('be.visible')
        .next('[data-test="MemberRequest-MemberRequestName"]')
        .contains(`Invited by ${username}`)
        .should('be.visible');
    }
    this.getModalRequestInvite(noumName)
      .find('[data-testid="accept-button"]')
      .should('be.visible')
      .and('have.length', 1);
    this.getModalRequestInvite(noumName)
      .find('[data-testid="decline-button"]')
      .should('be.visible')
      .and('have.length', 1);
    return this;
  }

  verifyModalNoumRequest(noumName: string, username?: string) {
    this.modalRequestList
      .should('be.visible')
      .contains(noumName)
      .should('be.visible');
    if (username !== undefined) {
      this.modalRequestList
        .should('be.visible')
        .next('[data-test="MemberRequest-MemberRequestName"]')
        .contains(`Requested by ${username}`)
        .should('be.visible');
    }
    this.getModalRequestInvite(noumName)
      .find('[data-testid="accept-button"]')
      .should('be.visible')
      .and('have.length', 1);
    this.getModalRequestInvite(noumName)
      .find('[data-testid="decline-button"]')
      .should('be.visible')
      .and('have.length', 1);
    return this;
  }

  declineNoumInvite(noumName: string) {
    this.getRequestListButtons(noumName)
      .find('[data-testid="decline-button"]')
      .should('be.visible')
      .click();
    cy.contains('Request declined').should('exist');
    cy.contains('Request declined').should('not.exist');
    this.verifyNoumInviteNotExist(noumName);
    return this;
  }

  declineNoumInviteInModal(noumName: string) {
    this.getModalRequestInvite(noumName)
      .find('[data-testid="decline-button"]')
      .should('be.visible')
      .and('have.length', 1)
      .click();
    cy.contains('Request declined').should('exist');
    cy.contains('Request declined').should('not.exist');
    this.verifyNoumInviteNotExist(noumName);
    return this;
  }

  acceptNoumInvite(noumName: string) {
    this.getRequestListButtons(noumName)
      .find('[data-testid="accept-button"]')
      .should('be.visible')
      .click();
    cy.contains('Request accepted').should('exist');
    cy.contains('Request accepted').should('not.exist');
    this.verifyNoumInviteNotExist(noumName);
    return this;
  }

  acceptNoumInviteInModal(noumName: string) {
    this.getModalRequestInvite(noumName)
      .find('[data-testid="accept-button"]')
      .should('be.visible')
      .and('have.length', 1)
      .click();
    cy.contains('Request accepted').should('exist');
    cy.contains('Request accepted').should('not.exist');
    this.verifyNoumInviteNotExist(noumName);
    return this;
  }

  viewAllRequestInviteModal() {
    this.seeAllRequestInviteLink.click();
    this.modalHeader.should('have.text', 'Requests & Invites');
    CommonPage.waitForSpinnerNotBeVisible();
    return this;
  }

  viewRequestInviteModal() {
    this.requestInviteLink.click();
    this.modalHeader.should('have.text', 'Requests & Invites');
    CommonPage.waitForSpinnerNotBeVisible();
    return this;
  }

  cancelInvitedByMe(name: string) {
    cy.get('[name="invited by me"]').click({ force: true });
    this.getModalInvitedByMe(name)
      .find('[data-testid="button_text"]')
      .contains('Cancel')
      .should('be.visible')
      .click();
    cy.get('[data-testid="request_delete_btn"]').should('be.visible').click();
    this.verifyNoumInviteByMeNotExist(name);

    return this;
  }

  cancelMyRequest(name: string) {
    cy.get('[name="my requests"]').click({ force: true });
    cy.get('[data-test="InvitesOrMyRequestsList"]', {timeout : 30000}).should('be.visible');

    this.getModalInvitedByMe(name)
      .find('[data-testid="button_text"]')
      .contains('Cancel')
      .should('be.visible')
      .click();
    cy.get('[data-testid="request_delete_btn"]').should('be.visible').click();
    this.verifyNoumInviteByMeNotExist(name);

    return this;
  }

  closeModal() {
    cy.get('[data-testid="modal_close_btn"]').click();
    this.modalHeader.should('not.exist');
    return this;
  }
}
export default new NoumManage();
