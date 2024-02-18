import data from '../fixtures/data.json';
import CommonPage from './commonPage';
import HomeNoumPage from './homeNoumPage';
import LoginPage from './loginPage';

class HomePage {
  get connectUserCount() {
    return cy.xpath(
      '(//span[@data-test="NoumMembersTab-TSpan"])[1] | //span[@data-testid="connected_members_count"]',
    );
  }

  get onboardingSection() {
    return cy
      .get('[data-testid="noum-onboarding-section-testid"]')
      .should('be.visible');
  }

  get noumMeBtn() {
    return cy.xpath(
      '//div[@data-test="StyledCompleteInfoCard"]//span[@data-testid="button_text" and (text()="Complete your Profile" or text()="Noum Me")]',
    );
  }

  get recommendedNoumChamberbox() {
    return cy.xpath(
      '//div[@data-testid="noums-for-you-section-testid"]//a[@data-testid="chamberbox-testid"]',
    );
  }

  get onboardingSectionBox() {
    return cy.xpath(
      '//div[@data-testid="onboarding-section-testid"]//div[@data-test="SwiperFreeMode-StyledCard"]',
    );
  }

  get modalNoumMeCloseBtn() {
    return cy.get('[data-testid="modal_close_btn"]');
  }

  get modalGoToHomeNoumBtn() {
    return cy.xpath(
      '//div[@data-testid="modal-content"]//span[@data-testid="button_text" and text()="Go to Your Profile"]',
    );
  }

  get modalElement() {
    return cy.xpath(
      '//div[contains(@data-testid,"HomeNoum")]//div[@data-testid="modal-content"]',
    );
  }

  get modalElementCloseBtn() {
    return cy.xpath(
      '//div[contains(@data-testid,"HomeNoum")]//button[@data-testid="modal_close_btn"]',
    );
  }

  get modalAboutMeBtn() {
    return cy.xpath('//span[@data-test="TSpan" and text()="About me"]');
  }

  get modalBusinessBriefBtn() {
    return cy.xpath('//span[@data-test="TSpan" and text()="Business Brief"]');
  }

  get modalProjectWorkExperienceBtn() {
    return cy.xpath(
      '//span[@data-test="TSpan" and text()="Project & Work Experience"]',
    );
  }

  get modalEducationTrainingBtn() {
    return cy.xpath(
      '//span[@data-test="TSpan" and text()="Education & Training"]',
    );
  }

  get modalAboutMeTitleField() {
    return cy.xpath('//input[@name="title"]');
  }

  get modalAboutMeBioField() {
    return cy.xpath('//textarea[@name="bio"]');
  }

  get modalAboutMeLocationField() {
    return cy.xpath('//input[@data-test="SearchSelectAPI-TextField"]');
  }

  get modalAboutMeLocationDropDown() {
    return cy.xpath(
      '//a[@data-testid="dropdown-value"]//div[text()="Manila, Metro Manila, Philippines"]',
    );
  }

  get modalAboutMePhoto() {
    return cy.get('input[type="file"]');
  }

  get modalAboutMePhotoUploaded() {
    return cy.xpath(
      '//div[@data-testid="modal-content"]//div[@data-testid="avatarContainer"]/img[contains(@src,"img")]',
      { timeout: 20000 },
    );
  }

  get modalAboutMePhotoRemoveIcon() {
    return cy.xpath(
      '//div[@data-testid="modal-content"]//div[@data-testid="avatarContainer"]/div[@data-testid="avatarEditButton"]',
    );
  }

  get modalAboutMeSaveChanges() {
    return cy.xpath(
      '//span[@data-testid="button_text" and text()="Save Changes"]',
    );
  }

  get modalBusinessBriefTitle() {
    return cy.xpath(
      '//span[@data-test="ModalHeader-Title-TSpan" and text()="Business Brief"]',
    );
  }

  get modalBusinessBriefSavePublish() {
    return cy.xpath(
      '//button[not(@disabled)]/span[@data-testid="button_text" and text()="Save & Publish"]',
    );
  }

  get modalProjectWorkExperienceTitle() {
    return cy.xpath(
      '//span[@data-testid="testTitleHomeNoumProjectWorkExperience" and text()="Projects & Work Experience"]',
    );
  }

  get modalProjectWorkExperienceAddBtn() {
    return cy.xpath(
      '//span[@data-testid="button_text" and text()="Add Experience"]',
    );
  }

  get modalProjectWorkExperienceElementTitle() {
    return cy.xpath(
      '//span[@data-test="AddReferenceNonModal-TSpan" and text()="Add Experience"]',
    );
  }

  get modalElementTitleField() {
    return cy.xpath('//input[@data-test="EditElement-TextField"]');
  }

  get modalElementSaveBtn() {
    return cy.xpath(
      '//button[not(@disabled)]/span[@data-testid="button_text" and text()="Save"]',
    );
  }

  get modalEducationTrainingitle() {
    return cy.xpath(
      '//span[@data-testid="testTitleHomeNoumProjectWorkExperience" and text()="Education & Training"]',
    );
  }

  get modalEducationTrainingAddBtn() {
    return cy.xpath(
      '//span[@data-testid="button_text" and text()="Add Education"]',
    );
  }

  get modalEducationTraininglementTitle() {
    return cy.xpath(
      '//span[@data-test="AddReferenceNonModal-TSpan" and text()="Add Education"]',
    );
  }

  // main header
  get mainHeaderAvatar() {
    return cy.xpath(
      '//*[@id="AppSideNavigation-SubNavTrigger-user"] | //*[contains(@data-test,"NotificationWrapper")]/div[contains(@data-test,"DropdownPicker")]//div[@data-testid="avatarContainer"]',
    );
  }

  get mainHeaderSubAccountSettings() {
    return cy.xpath(
      '//button[@aria-label="Settings"] | //*[@data-testid="dropdown-value" and contains(.,"Account Settings")]',
    );
  }

  get mainHeaderSubLogout() {
    return cy.xpath(
      '//button[@aria-label="Log Out"] | //a[@data-testid="dropdown-value" and contains(.,"Log Out")]',
    );
  }

  get mainHeaderSubHelp() {
    return cy.xpath('//button[@aria-label="Help"]');
  }

  get mainHeaderSubMyProfile() {
    return cy.xpath('//button[@aria-label="My Profile"]');
  }

  // navigation tabs
  get navTabHome() {
    return cy.xpath(
      '//a[@data-testid="Side-Nav-Item" and @id="1"] | //div[@id="AppSideNavigation"]//button[@aria-label="Home"]',
    );
  }

  get navTabCommunity() {
    return cy.xpath(
      '//a[@data-testid="Side-Nav-Item" and @id="2"] | //div[@id="AppSideNavigation"]//button[@aria-label="Community"]',
    );
  }

  get navTabDiscovery() {
    return cy.xpath(
      '//a[@data-testid="Side-Nav-Item" and @id="3"] | //div[@id="AppSideNavigation"]//button[@aria-label="Discover"]',
    );
  }

  get navTabMoney() {
    return cy.xpath(
      '//a[@data-testid="Side-Nav-Item" and @id="4"] | //div[@id="AppSideNavigation"]//button[@aria-label="Money"]',
    );
  }

  get navTabMyNoums() {
    return cy.xpath(
      '//a[@data-testid="Side-Nav-Item" and @id="5"] | //div[@id="AppSideNavigation"]//button[@aria-label="Noums"]',
    );
  }

  get goToYourHomeNoumLink() {
    return cy.xpath(
      '//div[@data-test="StyledUserInfoCard"]//span[@data-testid="button_text" and text()="Go to Your Profile"]',
    );
  }

  // global search related
  get globalSearchField() {
    return cy.xpath(
      '//input[contains(@data-testid,"global-search-input") and @placeholder="Search for Anything..."]',
    );
  }

  get globalSearchResults() {
    return cy.xpath('//div[@data-testid="search-item"]');
  }

  get globalSearchSeeAllResultsLink() {
    return cy.xpath(
      '//span[@data-test="GlobalSearch-TSpan" and text()="See All Results"]',
    );
  }

  get noResultList() {
    return cy.xpath('//span[@data-test="innerDropdownContent-TSpan"]');
  }

  goToHomePage() {
    // go to homepage
    const baseUrl = Cypress.config('baseUrl');
    if (baseUrl) {
      cy.visit(baseUrl);
    } 
    cy.get('[data-testid="noum-onboarding-section-testid"]').should(
      'be.visible',
    );
    LoginPage.acceptCookies();
  }

  goToHomeNoum() {
    this.mainHeaderAvatar.click();
    cy.xpath(
      '//a[@data-testid="dropdown-value" and contains(.,"My Profile")] | //button[@aria-label="My Profile"]',
    ).click();

    HomeNoumPage.editBtn.should('be.visible');
    CommonPage.waitForSkeletonLoader();
    LoginPage.acceptCookies();
  }

  goToAccountSettings() {
    this.mainHeaderAvatar.click();
    this.mainHeaderSubAccountSettings.click();
    cy.url().should('include', data['account.settings.path']);
  }

  computeNoumCompletionPercentage(args: Array<string>) {
    const map: Record<string, number> = {
      'About me': 24,
      'Business Brief': 10,
      'Project & Work Experience': 30,
      'Education & Training': 10,
    };
    let defaulValue = 26;

    args.forEach((element) => {
      if (Object.prototype.hasOwnProperty.call(map, element)) {
        const value = map[element];
        defaulValue += value;
      }
    });
    cy.log(`Percentage:${defaulValue}`);
    return defaulValue;
  }

  searchAndVerifyResult(value: string) {
    this.globalSearchField.should('be.visible');
    this.globalSearchField.type(value);
    this.globalSearchResults.contains(value).should('be.visible');
  }

  searchValue(value: string) {
    cy.wait(1000);
    this.globalSearchField.should('be.visible');
    this.globalSearchField.type(value);
  }

  viewAllSearchResults() {
    this.globalSearchSeeAllResultsLink.click();
    cy.url().should('include', data['global.search.path']);
    cy.contains(data['global.search.header']);
  }

  searchAndViewTheResult(value: string) {
    // search for an item
    this.searchAndVerifyResult(value);
    this.globalSearchResults.contains(value).should('be.visible').click();

    // wait for the page to load
    CommonPage.backButton.should('be.visible');
    CommonPage.waitForSkeletonLoader();
  }

  searchAndViewTheFirstResult(value: string) {
    // search for an item
    this.searchValue(value);
    this.globalSearchResults.first().click();

    // wait for the page to load
    CommonPage.backButton.should('be.visible');
    CommonPage.waitForSkeletonLoader();
  }
}

export default new HomePage();
