import { faker } from '@faker-js/faker';
import CommonPage from './commonPage';
import data from '../fixtures/data.json';

class NoumEditPage {
  get elementToolBoxIcon() {
    return cy.get('[data-test="ToolboxItem-ToolboxItemWrapper"]');
  }

  get saveAsDraftBtn() {
    return cy.get('[aria-label="save_as_draft_button"]');
  }

  get confirmSaveAsDraftBtn() {
    return cy.get('[data-testid="confirmChamberSaveAsDraft"]');
  }

  get publishBtn() {
    return cy.get('[aria-label="publish_button"]');
  }

  get confirmPublishBtn() {
    return cy.get('[data-testid="confirmChamberPublish"]');
  }

  get imageInputFile() {
    return cy.xpath(
      '//span[@data-testid="childContainer"]/input[@accept="image/png,image/jpg,image/jpeg" and @type="file"]',
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

  get elementEvent() {
    return cy.get(`[data-testid="event-item-testid"]`);
  }

  get walletContinueBtn() {
    return cy.xpath('//button[@data-testid="continueButton"]');
  }

  get walletConfirmCloseBtn() {
    return cy.xpath('//button[@data-testid="confirmCloseWallet"]');
  }

  get addContentLast() {
    return cy.xpath('(//div[@aria-label="add_content"])[last()]');
  }

  addContentElement(
    value = `${faker.lorem.words(25)}{enter}{enter}${faker.lorem.words(25)}`,
  ) {
    const name = 'Content';
    cy.window().scrollTo('bottom');
    this.addSectionBottomPage();
    cy.window().scrollTo('bottom');
    this.viewAddContentModal();
    this.elementToolBoxIcon
      .contains(name)
      .scrollIntoView()
      .click({ force: true });
    CommonPage.waitForSpinnerToNotExist();

    cy.get('[data-testid="rte-area"]').should('be.visible').click().type(value);
    return this;
  }

  addContentElementOnly(
    value = `${faker.lorem.words(25)}{enter}{enter}${faker.lorem.words(25)}`,
  ) {
    const name = 'Content';
    this.viewAddContentModal();
    this.elementToolBoxIcon
      .contains(name)
      .scrollIntoView()
      .click({ force: true });
    CommonPage.waitForSpinnerToNotExist();

    cy.get('[data-testid="rte-area"]').should('be.visible').click().type(value);
    return this;
  }

  addImageElement(filepath = data['path.image']) {
    const name = 'Image';
    cy.window().scrollTo('bottom');
    this.addSectionBottomPage();
    cy.window().scrollTo('bottom');
    this.viewAddContentModal();
    cy.get('[data-test="PopoverWrapper-PopoverContainer"]').should(
      'be.visible',
    );
    this.elementToolBoxIcon.contains(name).trigger('mouseover').click();
    cy.get('[aria-label="ELEMENT_IMAGE"]').should('be.visible');
    cy.wait(2000);
    this.imageInputFile.selectFile(filepath, {
      force: true,
    });
    this.imageFileUploaded.should('be.visible');
    cy.get('[aria-label="ELEMENT_IMAGE"]').should('be.visible').wait(1000);
    return this;
  }

  addVideoElement(filepath = data['path.video']) {
    const name = 'Video';
    cy.window().scrollTo('bottom');
    this.addSectionBottomPage();
    cy.window().scrollTo('bottom');
    this.viewAddContentModal();
    this.elementToolBoxIcon
      .contains(name)
      .scrollIntoView()
      .click({ force: true });
    CommonPage.waitForSpinnerToNotExist();
    this.videoInputFile.selectFile(filepath, {
      force: true,
    });
    this.videoFileUploaded.should('be.visible').wait(1000);
    return this;
  }

  addQuickQuestionElement() {
    const name = 'Questions';
    this.addElement(name);
    cy.get('[data-test="ElementHeaderWrapper-TSpan"]')
      .contains('Quick Questions')
      .should('be.visible');
    return this;
  }

  addMessageElement() {
    const name = 'Messages';
    this.addElement(name);
    cy.get('[data-test="ChatHeader-TSpan"]').should('have.text', 'Messages');
    return this;
  }

  addPostElement() {
    const name = 'Posts';
    this.addElement(name);
    cy.get('[data-test="ElementHeaderWrapper-TSpan"]')
      .contains(name)
      .should('be.visible');
    return this;
  }

  addFileElement() {
    const name = 'Document';
    this.addElement(name);
    cy.get('[data-test="ElementHeaderWrapper-TSpan"]').contains('Files').should('be.visible');
    return this;
  }

  addWalletElement() {
    const name = 'Wallet';
    this.addElement(name);

    this.walletContinueBtn.click();
    this.walletConfirmCloseBtn.click();
    cy.get('[data-test="WalletHeader-TSpan"]').contains('Wallet').should('be.visible');
    return this;
  }

  addElement(name: string) {
    cy.window().scrollTo('bottom');
    this.addSectionBottomPage();
    cy.window().scrollTo('bottom');
    this.viewAddContentModal();
    this.elementToolBoxIcon
      .contains(name)
      .scrollIntoView()
      .click({ force: true });
    CommonPage.waitForSpinnerToNotExist();
    return this;
  }

  addEventElement() {
    const name = 'Events';
    cy.window().scrollTo('bottom');
    this.addSectionBottomPage();
    cy.window().scrollTo('bottom');
    this.viewAddContentModal();
    this.elementToolBoxIcon
      .contains(name)
      .scrollIntoView()
      .click({ force: true });
    CommonPage.waitForSpinnerToNotExist();
    this.elementEvent.should('be.visible');
    return this;
  }

  saveAsDraft() {
    this.saveAsDraftBtn.click();
    this.confirmSaveAsDraftBtn.click();
    cy.contains(data['noum.saving.draft']).should('be.visible');

    CommonPage.verifyAlertMessage(data['noum.saved.draft']);
    cy.wait(500);
    return this;
  }

  publishUpdates() {
    this.publishBtn.click();
    this.confirmPublishBtn.click();
    cy.contains(data['noum.publishing.changes']).should('be.visible');
    CommonPage.verifyAlertMessage(data['noum.published.changes']);
    cy.wait(500);

    CommonPage.waitForSkeletonLoader();
    return this;
  }

  buildFromScratch() {
    cy.xpath(
      '//div[@data-test="EmptyNoumState-EmptyNoumContainer" and contains(.,"Build From Scratch")]',
    ).click();
    this.addSection();
    return this;
  }

  addSectionBottomPage(value = null) {
    if (value === null) {
      cy.xpath('(//div[@aria-label="add_content"])[last()]').click();
      this.addSection();
    }
    return this;
  }

  addSection(value = null) {
    if (value === null) {
      cy.get(
        '[data-test="SectionLayoutPicker-SectionLayoutPickerWrapper"]',
      ).should('be.visible');
      cy.xpath('//div[@aria-label="SINGLE_COLUMN"]')
        .should('be.visible')
        .click();
      cy.get(
        '[data-test="SectionLayoutPicker-SectionLayoutPickerWrapper"]',
      ).should('not.exist');
      cy.get('[data-test="NoumContentElement-NoumContentElementWrapper"]')
        .should('be.visible')
        .should('have.length', 1);
    }
  }

  viewAddContentModal() {
    cy.xpath(
      '//div[@data-test="NoumContentElement-NoumContentElementWrapper"]//span[@aria-label="add_content"]',
    )
      .should('be.visible')
      .click();
  }

  deleteLastSection() {
    cy.xpath('//div[contains(@aria-label,"section")]')
      .last()
      .trigger('mouseover')
      .click();
    cy.xpath(
      '//div[contains(@aria-label,"section")]/parent::div/preceding-sibling::div//div[@aria-label="delete_button"]',
    )
      .last()
      .click({ force: true });
    cy.get('[data-testid="confirm-button"]').click();
    CommonPage.verifyAlertMessage('Your section has been deleted.');
    return this;
  }
}
export default new NoumEditPage();
