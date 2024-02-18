import CommonPage from './commonPage';
import DiscoveryPage from './discoveryPage';

class MoneyPage {
  get tokenArrowIcon() {
    return cy.xpath(
      '//div[@data-test="PaymentSideBar-PaymentSideBarWrapper"]//div[@data-testid="card" and contains(.,"Tokens")]//button[@data-testid="stepTwoBackButton"]',
    );
  }

  get tokenModal() {
    return cy.xpath('//div[@data-testid="modal-content"]');
  }

  get tokenModalText() {
    return cy.xpath(
      '//div[@data-test="Modal-StyledModal"]//span[@data-test="TokenModal-TSpan"]',
    );
  }

  get articleContainerList() {
    return cy.xpath('//div[@data-test="Article-ArticleContainer"]');
  }

  get financingContainerList() {
    return cy.xpath('//div[@data-test="SwiperFreeMode-StyledCard"]');
  }

  get tokenModalCloseIcon() {
    return cy.xpath('//button[@data-testid="modal_close_btn"]');
  }

  get cqCardSectionTitle() {
    return cy.xpath(
      '//div[@data-test="PaymentSideBar-PaymentSideBarWrapper"]/div[@data-testid="card"]//span[text()="Capital Quotient"]',
    );
  }

  get cqCardSectionScore() {
    return cy.xpath(
      '//div[@data-test="PaymentSideBar-PaymentSideBarWrapper"]/div[@data-testid="card"]//span[@data-test="CapitalQuotient-TSpan"]',
    );
  }

  get cqCardSectionStatus() {
    return cy.xpath(
      '//div[@data-test="PaymentSideBar-PaymentSideBarWrapper"]/div[@data-testid="card"]//span',
    );
  }

  get cqCardSectionVisibility() {
    return cy.xpath(
      '//div[@data-test="PaymentSideBar-PaymentSideBarWrapper"]/div[@data-testid="card"]//span/input',
    );
  }

  get cqCardSectionArrowIcon() {
    return cy.xpath(
      '//div[@data-test="PaymentSideBar-PaymentSideBarWrapper"]//div[@data-testid="card" and contains(.,"Capital Quotient")]//button[@data-testid="stepTwoBackButton"]',
    );
  }

  get walletSectionEmpty() {
    return cy.xpath(
      '//div[@data-testid="layout-right-content"]//div[@data-test="Wallet-WalletWrapper"]//span[text()="Wallet"]',
    );
  }

  get walletSetupBtn() {
    return cy.xpath(
      '//div[@data-testid="layout-right-content"]//span[@data-testid="button_text" and text()="Set Up Your Wallet"]',
    );
  }

  get walletPagePersonalInformationTitle() {
    return cy.xpath(
      '//span[@data-test="FormPersonalInformation-FormText" and text()="Personal Information"]',
    );
  }

  get walletPageBirthDateField() {
    return cy.xpath('//input[@data-test="MaskedDatePicker-InputMask"]');
  }

  get walletPageSsnField() {
    return cy.get('input[name="ssn"]');
  }

  get walletPageContinueBtn() {
    return cy.xpath('//span[@data-testid="button_text" and text()="Continue"]');
  }

  get walletPageStreetAddressField() {
    return cy.get('input[data-testid="step-one-address"]');
  }

  get walletPageAddressTitle() {
    return cy.xpath(
      '//span[@data-test="FormAddress-FormText" and text()="Address"]',
    );
  }

  get walletPageEmailAddressTitle() {
    return cy.xpath(
      '//span[@data-test="FormEmailVerification-FormText" and text()="Email Address"]',
    );
  }

  get walletPagePinCodeTitle() {
    return cy.xpath(
      '//span[@data-test="Header-TSpan" and text()="Set Up a PIN Code"]',
    );
  }

  get walletPageConfirmPinCodeTitle() {
    return cy.xpath(
      '//span[@data-test="Header-TSpan" and text()="Confirm Your PIN Code"]',
    );
  }

  get walletPageSecurityQuestionTitle() {
    return cy.xpath(
      '//span[@data-test="Header-TSpan" and text()="Choose a Security Question"]',
    );
  }

  get walletPageTermsAndAgreementTitle() {
    return cy.xpath(
      '//span[@data-test="FormTermsAndAgreement-FormText" and text()="Terms and Agreement"]',
    );
  }

  get walletPageTermsAndAgreementCheckOne() {
    return cy.xpath(
      '(//div[@data-testid="stack"]/span[@data-testid="checkbox"])[1]',
    );
  }

  get walletPageTermsAndAgreementCheckTwo() {
    return cy.xpath(
      '(//div[@data-testid="stack"]/span[@data-testid="checkbox"])[2]',
    );
  }

  get walletPageAgreeAndApplyBtn() {
    return cy.xpath(
      '//span[@data-testid="button_text" and text()="Agree & Apply"]',
    );
  }

  get walletPageWalletSetupConfirmTitle() {
    return cy.xpath(
      '//span[@data-test="Done-FormText" and text()="Your Wallet Request is Submitted!"]',
    );
  }

  get walletSectionTransferBtn() {
    return cy.xpath(
      '//div[@data-testid="layout-right-content"]//span[@data-testid="button_text" and text()="Transfer"]',
    );
  }

  get walletSectionPayBtn() {
    return cy.xpath(
      '//div[@data-testid="layout-right-content"]//span[@data-testid="button_text" and text()="Pay"]',
    );
  }

  get walletPinOneField() {
    return cy.get('[data-cy="OtpInput-cy-0"]');
  }

  get walletPinTwoField() {
    return cy.get('[data-cy="OtpInput-cy-1"]');
  }

  get walletPinThreeField() {
    return cy.get('[data-cy="OtpInput-cy-2"]');
  }

  get walletPinFourField() {
    return cy.get('[data-cy="OtpInput-cy-3"]');
  }

  get walletPinFiveField() {
    return cy.get('[data-cy="OtpInput-cy-4"]');
  }

  get walletPinSixField() {
    return cy.get('[data-cy="OtpInput-cy-5"]');
  }

  get walletFirstAnswerField() {
    return cy.get('input[name="answerOne"]');
  }

  get walletSecondAnswerField() {
    return cy.get('input[name="answerSecond"]');
  }

  get walletThirdAnswerField() {
    return cy.get('input[name="answerThree"]');
  }

  get moneyModal() {
    return cy.get('[data-test="ModalHeader-Title-TSpan"]');
  }

  questionFieldByLabel(text: string) {
    return cy.xpath(
      `//div[@data-testid="Styled-TextField" and @label="${text}"]`,
    );
  }

  questionAnswerByLabel(text: string) {
    return cy.xpath(
      `//a[@data-testid="dropdown-value" and contains(.,"${text}")]`,
    );
  }

  goToMoneyScreen() {
    cy.visit(`/money`);
    cy.url().should('include', '/money');

    cy.contains('Capital Quotient');
    cy.contains('Tokens');
    return this;
  }

  inputPinCode(pin: string) {
    const digits = [...pin];

    // enter PIN code provided
    this.walletPinOneField.type(digits[0]);
    this.walletPinTwoField.type(digits[1]);
    this.walletPinThreeField.type(digits[2]);
    this.walletPinFourField.type(digits[3]);
    this.walletPinFiveField.type(digits[4]);
    this.walletPinSixField.type(digits[5]);
  }

  setupWallet(pin: string) {
    // go to Money page
    this.goToMoneyScreen();
    // validate empty wallet section
    this.walletSectionEmpty.should('be.visible');
    cy.contains(
      'No wallet connected yet (available for US members only right now)',
    );

    // start setting up wallet
    this.walletSetupBtn.click();
    this.walletPagePersonalInformationTitle.should('be.visible');

    // provide personal details
    this.walletPageBirthDateField.type('01/10/1985');
    this.walletPageSsnField.type('112223333');
    this.walletPageContinueBtn.click();

    // provide address
    this.walletPageStreetAddressField.type(
      '1830 Gateway Dr,,San Mateo,CA,94404',
    );
    this.questionAnswerByLabel('1830 Gateway Dr,,San Mateo,CA,94404').click();
    this.walletPageAddressTitle.should('be.visible');
    this.walletPageContinueBtn.click();

    // provide email address
    this.walletPageEmailAddressTitle.should('be.visible');
    this.walletPageContinueBtn.click();

    // provide and confirm pin code
    this.walletPagePinCodeTitle.should('be.visible');
    this.inputPinCode(pin);
    this.walletPageContinueBtn.click();
    this.walletPageConfirmPinCodeTitle.should('be.visible');
    this.inputPinCode(pin);
    this.walletPageContinueBtn.click();

    // provide security questions
    this.walletPageSecurityQuestionTitle.should('be.visible');
    this.questionFieldByLabel('Select 1st security question').click();
    this.questionAnswerByLabel('In what city were you born?').click();
    this.walletFirstAnswerField.type('test');

    this.questionFieldByLabel('Select 2nd security question').click();
    this.questionAnswerByLabel('What high school did you attend?').click();
    this.walletSecondAnswerField.type('test');

    this.questionFieldByLabel('Select 3rd security question').click();
    this.questionAnswerByLabel(
      'What is the name of your favorite pet?',
    ).click();
    this.walletThirdAnswerField.type('test');
    this.walletPageContinueBtn.click();

    // agree to terms and agreement
    this.walletPageTermsAndAgreementTitle.should('be.visible');
    this.walletPageTermsAndAgreementCheckOne.click();
    this.walletPageTermsAndAgreementCheckTwo.click();
    this.walletPageAgreeAndApplyBtn.click();

    // validate completion of wallet details
    this.walletPageWalletSetupConfirmTitle.should('be.visible');
    cy.contains(
      'Congratulations, your wallet will soon be active and can be found in the Money tab.',
    );
    cy.contains(
      'Add specific wallets for your Noums by using your Noum Toolbox.',
    );

    // upload image for completion for wallet registration
    this.completeRegister();
    DiscoveryPage.goToDiscoveryPage();
    this.goToMoneyScreen();

    this.uploadIdImage(
      'U.S. Government-issued Identification Card',
      'cypress/files/avatar.jpg',
    );

    // validate wallet is setup
    this.walletSectionTransferBtn.should('be.visible');
    this.walletSectionPayBtn.should('be.visible');
    cy.contains('$0.00');
  }

  openTransferModal() {
    this.walletSectionTransferBtn.click();
    this.moneyModal.should('be.visible').and('have.text', 'Transfer');
  }

  openPayModal() {
    this.walletSectionPayBtn.click();
    this.moneyModal.should('be.visible').and('have.text', 'Pay');
  }

  completeRegister() {
    this.walletPageContinueBtn.click();
    cy.xpath(
      '//div[@data-test="PaymentSideBar-PaymentSideBarWrapper"]/div[@data-test="Wallet-WalletWrapper"]',
    ).should('be.visible');
    CommonPage.waitForSpinnerToNotExist();
  }

  uploadIdImage(id: string, image: string) {
    cy.xpath(
      '//div[@data-test="PaymentSideBar-PaymentSideBarWrapper"]//div[@data-testid="money-wallet-setup-button"]',
      { timeout: 30000 },
    )
      .should('be.visible')
      .click();
    cy.xpath(
      '//div[@data-test="ApplicationReview-UploadContainer"]//div[@data-test="Container" and @color="--icon_card-neutral-highlighted"]',
    )
      .should('be.visible')
      .click();
    this.questionAnswerByLabel(`${id}`).click();
    cy.get('[data-testid="modal-content"]').should('be.visible');
    cy.get('[data-testid="file-upload-input"]').selectFile(`${image}`, {
      force: true,
    });
    cy.get('[data-test="FileDisplay-DisplayFileContainer"]').should(
      'be.visible',
    );
    cy.xpath('//button[@data-testid="button" and contains(.,"Confirm & Save")]')
      .should('be.visible')
      .click();
    cy.get('[data-testid="modal-content"]').should('not.exist');
    cy.get('[data-test="ApplicationReview-ContinueButton"]')
      .should('be.visible')
      .click();
    cy.get('[data-test="SubmittedScreen-TSpan"]', { timeout: 30000 }).should(
      'be.visible',
    );
    cy.get('[data-test="SubmittedScreen-TSpan"]')
      .contains('Thank You For Submitting!')
      .should('be.visible');
    cy.get('[data-test="SubmittedScreen-TSpan"]')
      .contains(
        'The Noumena team will confirm receipt and next steps within two business days',
      )
      .should('be.visible');
    cy.get('[data-test="SubmittedScreen-ReturnToNoumenaWrapper"]')
      .should('be.visible')
      .click();

    return this;
  }
}

export default new MoneyPage();
