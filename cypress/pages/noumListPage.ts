import NoumPage from './noumPage';
import CommonPage from './commonPage';
import data from '../fixtures/data.json';

class NoumListPage {
  // manage noums
  get noumList() {
    return cy.xpath(
      '//div[@aria-disabled="false" and @data-test="ChambersList-ChamberItem"]',
    );
  }

  get noumConnectedTab() {
    return cy.xpath(
      '//div[@data-test="BasicChipsTabs-StyledText" and text()="Connected"]',
    );
  }

  get noumContainer() {
    return cy.xpath(
      '//a[@data-testid="chamberbox-testid"]//div[@data-test="HeaderTitle"]',
    );
  }

  get createNoumBtn() {
    return cy.get(
      '[data-test="ChambersRightSideBar-CreateChamberButton"] > [data-test="Button-ButtonStyled"]',
    );
  }

  get viewNoumContainer() {
    return cy.xpath(
      '//div[@data-testid="chambers-list" or @data-test="Empty-EmptyCardContainer"]',
    );
  }

  get sortField() {
    return cy.xpath(
      '//span[@data-test="ChambersHead-ChambersDropDown"]/button[contains(.,"Date") or contains(.,"Name") or contains(.,"Recent")]',
    );
  }

  // create noum modal
  get createNoumModalName() {
    return cy.get('[data-testid="CreateProject-Modal-Name"]');
  }

  get createNoumModalDescription() {
    return cy.get('[data-testid="CreateProject-Modal-Description"]');
  }

  get createNoumModalCategory() {
    return cy.get('[data-testid="CreateProject-Modal-Category"]');
  }

  get createNoumModalVisibility() {
    return cy.get('[data-testid="CreateProject-Modal-ProjectType"]');
  }

  get createNoumModalBtn() {
    return cy.get('[data-testid="Create-Noum-Button"]');
  }

  get createNoumModalDropDown() {
    return cy.xpath('//a[@data-testid="dropdown-value"]');
  }

  get createNoumModalInputFile() {
    return cy.xpath('//input[@data-test="FileInput"]');
  }

  get createNoumModalInputFileUploaded() {
    return cy.xpath(
      '//div[@data-test="EditableAvatar-Container"]//img[contains(@src,"img")]',{ timeout: 30000 }
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

  get seeAllRequestInviteLink() {
    return cy.xpath(
      '//button[@data-testid="button"]/span[text()="See all Requests & Invites"]',
    );
  }

  get modalReceivedRequestContainerList() {
    return cy.xpath(
      '//div[@data-test="ModalBody-ModalBodyStyled"]//div[@data-test="MemberRequest-MemberRequestContainer"]',
    );
  }

  get modalAllRequestInviteCloseBtn() {
    return cy.xpath('//button[@data-testid="modal_close_btn"]');
  }

  // generic
  get fieldDropDown() {
    return cy.xpath('//a[@data-testid="dropdown-value"]');
  }

  goToNoumPage() {
    // go to Manage Noum Page
    cy.visit(data['my.noum.path']);
    cy.url().should('include', '/noums');
    this.waitForManageNoums();

    cy.contains(data['my.noum.label']).should('be.visible');
    this.viewNoumContainer.should('be.visible');
    return this;
  }

  createProjectNoum(name: string, category: string, visibility: string) {
    // Click the create noum button
    this.createNoumBtn.click();

    // Fill the fields for Name, Description and Category
    this.setProjectNoum(name, category, visibility);
    return this;
  }

  setProjectNoum(name: string, category: string, visibility: string) {
    // Fill the fields for Name, Description and Category
    this.createNoumModalInputFile.selectFile(data['path.image'], {
      force: true,
    });
    this.createNoumModalInputFileUploaded.should('be.visible');
    this.createNoumModalName.should('be.visible').click().type(name);
    this.createNoumModalDescription.type(name);
    this.createNoumModalCategory.click();
    this.createNoumModalDropDown.contains(category).click();
    this.createNoumModalVisibility.click();
    this.createNoumModalDropDown.contains(visibility).click();
    this.createNoumModalBtn.click();
    cy.wait(500);
    CommonPage.verifyAlertMessage('Noum Created');
    NoumPage.closeEditModeBtn.click();
    NoumPage.closeEditModeBtn.should('not.exist');
    NoumPage.headerName.should('have.text', name);
    return this;
  }

  viewNoum(noumName: string) {
    this.noumContainer.contains(noumName).click();
    CommonPage.backButton.should(
      'be.visible',
    );

    CommonPage.waitForSkeletonLoader();
    NoumPage.headerName.should('have.text', noumName);
    return this;
  }

  viewNoumInConnectedTab(noumName: string) {
    this.noumConnectedTab.click();
    CommonPage.waitForSkeletonLoader();
    this.noumList.should('be.visible');
    cy.wait(1000);
    this.sortNewestToOldest();
    CommonPage.waitForSkeletonLoader();

    this.viewNoumContainer.should('be.visible');
    this.viewNoum(noumName);
    return this;
  }

  sortNewestToOldest() {
    this.sortField.click();
    this.fieldDropDown.contains('Date: Newest to Oldest').click();
    cy.wait(2000);
    CommonPage.waitForSkeletonLoader();
    return this;
  }

  verifyNoumIsFavourite(noumName: string, isFavourite = true) {
    if (isFavourite === true) {
      cy.get('[data-test="HeaderTitle"]')
        .contains(noumName)
        .parentsUntil('[data-test="ChambersList-ChamberItem"]')
        .find('[color="--icon-button-neutral-pressed"]')
        .should('be.visible');
    } else {
      cy.get('[data-test="HeaderTitle"]')
        .contains(noumName)
        .parentsUntil('[data-test="ChambersList-ChamberItem"]')
        .find('[color="--icon-button-neutral-pressed"]')
        .should('not.exist');
    }
    return this;
  }

  waitForManageNoums() {
    this.noumConnectedTab.should('be.visible');
    CommonPage.waitForSkeletonLoader();
    CommonPage.waitForSpinnerNotBeVisible();
    return this;
  }

  viewLinkNoumsPage() {
    cy.xpath(
      '//div[@data-test="ChambersRightSideBar-CreateChamberButton"]/div[@class="ellipsis-menu"]//span[@data-testid="button_text"]',
    ).click();
    cy.xpath('//span[@data-test="EllipsisMenu-TSpan" and text()="Link Noums"]')
      .should('be.visible')
      .click();
    cy.xpath(
      '//div[@data-test="ModalFooter-ModalFooterStyled"]/button[contains(.,"Select Noums")]',
    )
      .should('be.visible')
      .click();
    cy.xpath(
      '//span[@data-test="LinkNoums-LinkNoumDescription" and text()="Select Noums to Link"]',
    ).should('be.visible');
    cy.xpath('//div[@data-test="LinkNoumOption-SelectOption"]').should(
      'have.length.greaterThan',
      1,
    );
    return this;
  }
}
export default new NoumListPage();
