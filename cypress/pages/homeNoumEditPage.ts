import { faker } from '@faker-js/faker';
import CommonPage from './commonPage';
import data from '../fixtures/data.json';

class HomeNoumEditPage {
  get dropDownSelect() {
    return cy.get('[data-testid="dropdown-value"]');
  }

  get lastAddToolBoxBtn() {
    return cy.xpath('(//div[@data-test="AddToolbox-CenterIcon"])[last()]');
  }

  get elementToolBoxIcon() {
    return cy.get('[data-test="ToolboxItem-ToolboxItemWrapper"]');
  }

  get modalElementSaveBtn() {
    return cy.xpath(
      '//button[@data-testid="button" and not(@disabled) and contains(.,"Save")]/span',
    );
  }

  get modalElementTextArea() {
    return cy.xpath(
      '//div[@data-test="ModalBody-ModalBodyStyled"]//div[@data-testid="rte-area"]',
    );
  }

  get modalElementHeaderTitle() {
    return cy.get('[data-test="ModalHeader-Title-TSpan"]');
  }

  get editModeElementHeaderTitle() {
    return cy.xpath('//span[@data-test="EditMode-TSpan"]');
  }

  get imageHeaderTitle() {
    return cy.xpath(
      '//span[@data-test="ViewMode-WrapperTitleLabel" and text()="Image Element"]',
    );
  }

  get imageInputFile() {
    return cy.xpath(
      '//span[@data-testid="childContainer"]/input[@accept="image/png,image/jpg,image/jpeg" and @type="file"]',
    );
  }

  get imageFileUploaded() {
    return cy.get('[data-test="ImageView-Image"]', { timeout: 30000 });
  }

  get videoHeaderTitle() {
    return cy.xpath(
      '//span[@data-test="ViewMode-WrapperTitleLabel" and text()="Video Element"]',
    );
  }

  get videoInputFile() {
    return cy.xpath(
      '//input[@accept="video/mp4,video/quicktime" and @type="file"]',
    );
  }

  get videoFileUploaded() {
    return cy.get('[data-testid="videoPlayer"]', { timeout: 30000 });
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

  get titleField() {
    return cy.xpath('//input[@name="title"]');
  }

  get bioField() {
    return cy.xpath('//textarea[@name="bio"]');
  }

  get ageSelect() {
    return cy.xpath(
      '//label[@data-testid="labelTestId" and text()="Age group"]/preceding-sibling::input',
    );
  }

  get yearsSelect() {
    return cy.xpath(
      '//label[@data-testid="labelTestId" and text()="Years of freelancing"]/preceding-sibling::input',
    );
  }

  get cityField() {
    return cy.xpath(
      '//label[@data-testid="labelTestId" and text()="City"]/preceding-sibling::input',
    );
  }

  get avatarImage() {
    return cy.xpath('//div[@data-test="ProfileImage"]/input[@type="file"]');
  }

  get avatarImageSrc() {
    return cy.xpath('//div[@data-test="UploadPhoto"]//img');
  }

  get elementTitle() {
    return cy.get('[data-test="EditMode-WrapperTitleNoEdit"]');
  }

  get elementContainer() {
    return cy.xpath(`//div[@data-test="ElementWrapper-Wrapper"]`);
  }

  get elementEvent() {
    return cy.xpath(`//div[@id="event"]`);
  }

  getElementContainer(element: string, item: string) {
    return cy.xpath(
      `//div[@data-test="ElementWrapper-Wrapper" and contains(.,'${element}')]//span[@data-testid="childContainer" and contains(.,'${item}')]`,
    );
  }

  addAchievementsAwardsElement(
    title: string,
    content = `${faker.lorem.words(5)}{enter}{enter}${faker.lorem.words(5)}`,
  ) {
    const name = 'Achievements & Awards';
    cy.window().scrollTo('bottom');
    this.addSectionBottomPage();
    cy.window().scrollTo('bottom');
    this.viewAddContentModal();
    this.elementToolBoxIcon
      .contains(name)
      .scrollIntoView()
      .click({ force: true });
    CommonPage.waitForSpinnerToNotExist();
    this.elementTitle.contains(name).should('be.visible');
    this.getElementContainer(name, 'Add Achievement')
      .should('be.visible')
      .click();
    this.addSpecialElement(name, title, content);
    return this;
  }

  addPublicationsDesignPatentsElement(
    title: string,
    content = `${faker.lorem.words(5)}{enter}{enter}${faker.lorem.words(5)}`,
  ) {
    const name = 'Publications, Designs & Patents';
    cy.window().scrollTo('bottom');
    this.addSectionBottomPage();
    cy.window().scrollTo('bottom');
    this.viewAddContentModal();
    this.elementToolBoxIcon
      .contains(name)
      .scrollIntoView()
      .click({ force: true });
    CommonPage.waitForSpinnerToNotExist();
    this.getElementContainer(name, 'Add New').should('be.visible').click();
    this.addSpecialElement(name, title, content);
    return this;
  }

  addPersonalInterestsElement(
    title: string,
    content = `${faker.lorem.words(5)}{enter}{enter}${faker.lorem.words(5)}`,
  ) {
    const name = 'Personal Interests';
    cy.window().scrollTo('bottom');
    this.addSectionBottomPage();
    cy.window().scrollTo('bottom');
    this.viewAddContentModal();
    this.elementToolBoxIcon
      .contains(name)
      .scrollIntoView()
      .click({ force: true });
    CommonPage.waitForSpinnerToNotExist();
    this.getElementContainer(name, 'Add New').should('be.visible').click();
    this.addSpecialElement(name, title, content);
    return this;
  }

  addSocialInterestsElement(
    title: string,
    content = `${faker.lorem.words(5)}{enter}{enter}${faker.lorem.words(5)}`,
  ) {
    const name = 'Social Interests';
    cy.window().scrollTo('bottom');
    this.addSectionBottomPage();
    cy.window().scrollTo('bottom');
    this.viewAddContentModal();
    this.elementToolBoxIcon
      .contains(name)
      .scrollIntoView()
      .click({ force: true });
    CommonPage.waitForSpinnerToNotExist();
    this.getElementContainer(name, 'Add New').should('be.visible').click();
    this.addSpecialElement(name, title, content);
    return this;
  }

  addSpecialElement(element: string, title: string, content: string) {
    this.modalElementHeaderTitle.should('have.text', element);
    cy.get('[data-test="EditElement-TextField"]').type(title);
    this.modalElementTextArea.click().type(content);
    this.modalElementSaveBtn.click();
    this.modalElementHeaderTitle.should('not.exist');
    CommonPage.spinner.should('not.exist');
    cy.wait(2000);
    // TODO this.elementContainer.contains(title).should('be.visible');
  }

  inputNetworkGithubUrl(url: string) {
    cy.xpath('//div[@label="github.com/"]//input').click().type(url);
    return this;
  }

  inputNetworkBehanceUrl(url: string) {
    cy.xpath('//div[@label="behance.net/"]//input').click().type(url);
    return this;
  }

  inputNetworkInstagramUrl(url: string) {
    cy.xpath('//div[@label="instagram.com/"]//input').click().type(url);
    return this;
  }

  inputNetworkDribbleUrl(url: string) {
    cy.xpath('//div[@label="dribbble.com/"]//input').click().type(url);
    return this;
  }

  inputNetworkLinkedinUrl(url: string) {
    cy.xpath('//div[@label="linkedin.com/in/"]//input').click().type(url);
    return this;
  }

  inputNetworkTwitterUrl(url: string) {
    cy.xpath('//div[@label="twitter.com/"]//input').click().type(url);
    return this;
  }

  inputNetworkMediumUrl(url: string) {
    cy.xpath('//div[@label="medium.com/"]//input').click().type(url);
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
    this.elementEvent.contains(name).should('be.visible');
    cy.wait(3000);
    return this;
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
    cy.wait(3000);
    return this;
  }

  addImageElement(filepath = data['path.image']) {
    const name = 'Image';
    cy.window().scrollTo('bottom');
    this.addSectionBottomPage();
    cy.window().scrollTo('bottom');
    this.viewAddContentModal();
    this.elementToolBoxIcon
      .contains(name)
      .scrollIntoView()
      .click({ force: true });
    CommonPage.waitForSpinnerToNotExist();
    this.imageInputFile.selectFile(filepath, { force: true });
    this.imageFileUploaded.should('be.visible');
    cy.wait(3000);
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
    this.videoInputFile.selectFile(filepath, { force: true });
    this.videoFileUploaded.should('be.visible');
    cy.wait(3000);
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
    CommonPage.waitForSpinnerToNotExist();
    return this;
  }

  returnToHomeNoumViewMode() {
    cy.get('[aria-label="noum_edit_mode_left_action_button"]').click();
    cy.get('body').then(($el) => {
      if (
        $el.find('[data-testid="saveAsDraftChamberDiscardChange"]').length > 0
      ) {
        cy.get('[data-testid="saveAsDraftChamberDiscardChange"]').click();
        cy.contains(data['noum.saving.draft']).should('be.visible');
        CommonPage.verifyAlertMessage(data['noum.saved.draft']);
      }
    });
    CommonPage.waitForSkeletonLoader();
    CommonPage.waitForSpinnerToNotExist();
  }

  editHomeProfile() {
    cy.xpath('//div[@aria-label="noum_edit_information"]/button').click();
    cy.get('[id="modal-content"] > [data-test="ModalHeader-ModalHeaderStyled"]')
      .should('be.visible')
      .and('have.text', 'Edit Personal Details');
  }

  saveHomeProfile() {
    cy.xpath('//div[@data-test="SaveButtonWrap"]/button').click();
    CommonPage.verifyAlertMessage('Success: Changes saved successfully.');
  }

  setTitleField(professionalTitle: string) {
    this.titleField.clear().type(professionalTitle);
  }

  setBioField(aboutMe: string) {
    this.bioField.clear().type(aboutMe);
  }

  setAgeField(value = null) {
    let age = '';
    if (value === null) {
      this.ageSelect.invoke('val').then((text) => {
        this.ageSelect.click();
        if (text === '21-30') {
          this.dropDownSelect.contains('31-40').click();
          age = '31-40';
        } else {
          this.dropDownSelect.contains('21-30').click();
          age = '21-30';
        }
        cy.wrap(age).as('ageWrap');
      });
    } else {
      this.ageSelect.click();
      this.dropDownSelect.contains(value).click();
    }
  }

  setYearsField(value = null) {
    let years = '';
    if (value === null) {
      this.yearsSelect.invoke('val').then((text) => {
        this.yearsSelect.click();
        if (text === '9-11') {
          this.dropDownSelect.contains('6-8').click();
          years = '6-8';
        } else {
          this.dropDownSelect.contains('9-11').click();
          years = '9-11';
        }
        cy.wrap(years).as('yearsWrap');
      });
    } else {
      this.yearsSelect.click();
      this.dropDownSelect.contains(value).click();
    }
  }

  setCityField(value = null) {
    let city = '';
    if (value === null) {
      this.cityField.invoke('val').then((text) => {
        if (text === 'Manila, Metro Manila, Philippines') {
          this.cityField.click().clear().type('Bacoor, Cavite, Philippines');
          this.dropDownSelect.contains('Bacoor, Cavite, Philippines').click();
          city = 'Bacoor, Cavite, Philippines';
        } else {
          this.cityField
            .click()
            .clear()
            .type('Manila, Metro Manila, Philippines');
          this.dropDownSelect
            .contains('Manila, Metro Manila, Philippines')
            .click();
          city = 'Manila, Metro Manila, Philippines';
        }
        cy.wrap(city).as('cityWrap');
      });
    } else {
      this.cityField.click().clear().type(value);
      this.dropDownSelect.contains(value).click();
    }
  }

  setProfileAvatar(value = null) {
    let avatar = '';
    if (value === null) {
      this.avatarImageSrc.invoke('attr', 'src').then((nextSrc) => {
        if (nextSrc !== undefined) {
          if (nextSrc.includes('avatar1')) {
            this.avatarImage.selectFile('cypress/files/avatar2.png', {
              force: true,
            });
            avatar = 'avatar2';
          } else {
            this.avatarImage.selectFile('cypress/files/avatar1.png', {
              force: true,
            });
            avatar = 'avatar1';
          }
        }
        cy.wrap(avatar).as('avatarWrap');
      });
    } else {
      this.avatarImage.selectFile(value, {
        force: true,
      });
    }
    CommonPage.waitForSpinnerNotBeVisible();
  }

  addSectionBottomPage(value = null) {
    if (value === null) {
      cy.wait(1000);
      cy.xpath('(//div[@aria-label="add_content"])[last()]').click();
      cy.wait(1000);
      this.addSection();
    }
    return this;
  }

  addSection(value = null) {
    if (value === null) {
      cy.get(
        '[data-test="SectionLayoutPicker-SectionLayoutPickerWrapper"]',
      ).should('be.visible');
      cy.xpath('//div[@aria-label="SINGLE_COLUMN"]/div[@data-test="SectionLayoutItem-Column"]')
        .should('be.visible')
        .trigger('mouseover') // Trigger a mouseover event to simulate hovering
        .trigger('click', {force: true});
      cy.wait(1000);
      cy.get(
        '[data-test="SectionLayoutPicker-SectionLayoutPickerWrapper"]', {timeout : 30000}
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
}

export default new HomeNoumEditPage();
