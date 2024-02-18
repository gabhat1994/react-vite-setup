import LoginPage from 'cypress/pages/loginPage';
import MoneyTransferPage from 'cypress/pages/moneyTransferPage';
import MoneyPayeePage from 'cypress/pages/moneyPayeePage';
import { faker } from '@faker-js/faker';
import MoneyPage from '../../pages/moneyPage';
import UtilPage from '../../pages/utilPage';
import data from '../../fixtures/data.json';
import DiscoveryPage from '../../pages/discoveryPage';


let email = '';
const anotherMainWallet = data['money.transfer.another.user'];
const routingNumber = data['money.transfer.bank.routing.number'];
const accountNumber = data['money.transfer.bank.account.number'];
const accountName = faker.lorem.words(3);

describe('Money.Setup.Wallet.spec.tsx', () => {
  it('Able to setup wallet for new user', () => {
    email = UtilPage.getRandomEmailAddress();
    const otp = UtilPage.generateOtp();
    cy.register(email, otp, true);

    // go to Money page
    MoneyPage.goToMoneyScreen();
    LoginPage.acceptCookies();

    // validate empty wallet section
    MoneyPage.walletSectionEmpty.should('be.visible');
    cy.contains(
      'No wallet connected yet (available for US members only right now)',
    );

    // start setting up wallet
    MoneyPage.walletSetupBtn.click();
    MoneyPage.walletPagePersonalInformationTitle.should('be.visible');

    // provide personal details
    MoneyPage.walletPageBirthDateField.type('01/10/1985');
    MoneyPage.walletPageSsnField.type('112223333');
    MoneyPage.walletPageContinueBtn.click();

    // provide address
    MoneyPage.walletPageStreetAddressField.type(
      '1830 Gateway Dr,,San Mateo,CA,94404',
    );
    MoneyPage.questionAnswerByLabel(
      '1830 Gateway Dr,,San Mateo,CA,94404',
    ).click();
    MoneyPage.walletPageAddressTitle.should('be.visible');
    MoneyPage.walletPageContinueBtn.click();

    // provide email address
    MoneyPage.walletPageEmailAddressTitle.should('be.visible');
    MoneyPage.walletPageContinueBtn.click();

    // provide and confirm pin code
    MoneyPage.walletPagePinCodeTitle.should('be.visible');
    MoneyPage.inputPinCode('123456');
    MoneyPage.walletPageContinueBtn.click();
    MoneyPage.walletPageConfirmPinCodeTitle.should('be.visible');
    MoneyPage.inputPinCode('123456');
    MoneyPage.walletPageContinueBtn.click();

    // provide security questions
    MoneyPage.walletPageSecurityQuestionTitle.should('be.visible');
    MoneyPage.questionFieldByLabel('Select 1st security question').click();
    MoneyPage.questionAnswerByLabel('In what city were you born?').click();
    MoneyPage.walletFirstAnswerField.type('test');

    MoneyPage.questionFieldByLabel('Select 2nd security question').click();
    MoneyPage.questionAnswerByLabel('What high school did you attend?').click();
    MoneyPage.walletSecondAnswerField.type('test');

    MoneyPage.questionFieldByLabel('Select 3rd security question').click();
    MoneyPage.questionAnswerByLabel(
      'What is the name of your favorite pet?',
    ).click();
    MoneyPage.walletThirdAnswerField.type('test');
    MoneyPage.walletPageContinueBtn.click();

    // agree to terms and agreement
    MoneyPage.walletPageTermsAndAgreementTitle.should('be.visible');
    MoneyPage.walletPageTermsAndAgreementCheckOne.click();
    MoneyPage.walletPageTermsAndAgreementCheckTwo.click();
    MoneyPage.walletPageAgreeAndApplyBtn.click();

    // validate completion of wallet details
    MoneyPage.walletPageWalletSetupConfirmTitle.should('be.visible');
    cy.contains(
      'Congratulations, your wallet will soon be active and can be found in the Money tab.',
    );
    cy.contains(
      'Add specific wallets for your Noums by using your Noum Toolbox.',
    );

    // upload image for completion for wallet registration
    MoneyPage.completeRegister();
    DiscoveryPage.goToDiscoveryPage();
    MoneyPage.goToMoneyScreen();

    MoneyPage.uploadIdImage(
      'U.S. Government-issued Identification Card',
      'cypress/files/avatar.jpg',
    );

    // validate wallet is setup
    MoneyPage.walletSectionTransferBtn.should('be.visible');
    MoneyPage.walletSectionPayBtn.should('be.visible');
    cy.contains('$0.00');
  });

  it('Add Payee - Person or Business in Noumena Community', () => {
    // go to Money page
    LoginPage.loginByApi(email);
    MoneyPage.goToMoneyScreen().openPayModal();

    // add and verify Payee from Noumena users
    MoneyPayeePage.selectToAddPayee()
      .selectPayeeFromNoumena()
      .searchNoumenaPayee(anotherMainWallet)
      .selectAndAddNoumenaPayee(anotherMainWallet);
    MoneyTransferPage.selectToField(anotherMainWallet)
      .continueToNextScreen()
      .moneyModalHeader.should('have.text', `Pay ${anotherMainWallet}`);
  });

  it('Add Payee - Person or Business outside of Noumena Community', () => {
    // go to Money page
    LoginPage.loginByApi(email);
    MoneyPage.goToMoneyScreen().openPayModal();

    // add and verify Payee Outside of Noumena
    MoneyPayeePage.selectToAddPayee()
      .selectPayeeFromOutsideNoumena()
      .addOutsideNoumenaPayeeDetails(accountName, routingNumber, accountNumber);
    MoneyTransferPage.selectToField(accountName)
      .continueToNextScreen()
      .moneyModalHeader.should('have.text', `Pay ${accountName}`);
  });
});
