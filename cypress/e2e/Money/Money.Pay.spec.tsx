import { faker } from '@faker-js/faker';
import MoneyPage from '../../pages/moneyPage';
import MoneyTransferPage from '../../pages/moneyTransferPage';
import LoginPage from '../../pages/loginPage';
import data from '../../fixtures/data.json';

const transferAmount = data['money.transfer.small.amount'];
const feePercentage = Cypress.env('AUTO_CARD_FEE');
const bankAccount = data['money.transfer.bank.account'];
const cardPayment = data['money.transfer.card.payment'];
const mainWalletName = data['money.transfer.main.wallet'];
const anotherMainWallet = data['money.transfer.another.user'];
const anotherbankAccount = data['money.transfer.another.bank'];
const ownerWallet = Cypress.env('AUTO_USER_ONE_CONNECTED_NAME');
const ccNumber = data['money.transfer.cc.number'];
const ccExpiry = data['money.transfer.cc.expiry'];
const ccCvc = data['money.transfer.cvc'];
const ccPostalCode = data['money.transfer.postal.code'];
const fees = data['money.transfer.fee.zero.percentage'];
const pin = data['money.transfer.pin'];
const description = faker.lorem.words(3);

describe('Money.Pay.spec.tsx', () => {
  beforeEach(() => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_CONNECTED_ONE'));
  });

  it('Pay money from a wallet to another wallet', () => {
    // go to Money page
    MoneyPage.goToMoneyScreen();
    MoneyPage.openPayModal();

    MoneyTransferPage.selectFromField(mainWalletName).selectToField(
      anotherMainWallet,
    );
    MoneyTransferPage.getFromAccountAvailableBalance().continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should(
      'have.text',
      `Pay ${anotherMainWallet}`,
    );
    MoneyTransferPage.inputAmountField(`${transferAmount}`)
      .inputDescriptionField(description)
      .continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should('have.text', 'Review Pay');
    MoneyTransferPage.verifyReviewTransferFieldValue('From', ownerWallet);
    MoneyTransferPage.verifyReviewTransferFieldValue('To', anotherMainWallet);
    MoneyTransferPage.verifyReviewTransferFieldValue(
      'Description',
      description,
    );
    MoneyTransferPage.verifyReviewTransferFieldValue('Fees', fees);
    MoneyTransferPage.verifyReviewTransferFieldValue(
      'Net Amount',
      `$${transferAmount}.00`,
    );
    MoneyTransferPage.continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should(
      'have.text',
      'Confirm Transaction',
    );
    MoneyTransferPage.inputPinCode(pin).continueToNextScreen();

    MoneyTransferPage.verifyConfirmationDetails(
      `$${transferAmount}.00 has been paid`,
    );
    MoneyTransferPage.verifyConfirmationDetails(description);
    MoneyTransferPage.verifyConfirmationDetails('Status: Processing');
    MoneyTransferPage.verifyFromAccountAvailableBalance(transferAmount);
    MoneyTransferPage.closeModal();
  });

  it('Pay money from a wallet to another bank account', () => {
    // go to Money page
    MoneyPage.goToMoneyScreen();
    MoneyPage.openPayModal();

    MoneyTransferPage.selectFromField(mainWalletName).selectToField(
      anotherbankAccount,
    );
    MoneyTransferPage.getFromAccountAvailableBalance().continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should(
      'have.text',
      `Pay ${anotherbankAccount}`,
    );
    MoneyTransferPage.inputAmountField(`${transferAmount}`)
      .inputDescriptionField(description)
      .continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should('have.text', 'Review Pay');
    MoneyTransferPage.verifyReviewTransferFieldValue('From', ownerWallet);
    MoneyTransferPage.verifyReviewTransferFieldValue('To', anotherbankAccount);
    MoneyTransferPage.verifyReviewTransferFieldValue(
      'Description',
      description,
    );
    MoneyTransferPage.verifyReviewTransferFieldValue('Fees', fees);
    MoneyTransferPage.verifyReviewTransferFieldValue(
      'Net Amount',
      `$${transferAmount}.00`,
    );
    MoneyTransferPage.continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should(
      'have.text',
      'Confirm Transaction',
    );
    MoneyTransferPage.inputPinCode(pin).continueToNextScreen();

    MoneyTransferPage.verifyConfirmationDetails(
      `$${transferAmount}.00 has been paid`,
    );
    MoneyTransferPage.verifyConfirmationDetails(description);
    MoneyTransferPage.verifyConfirmationDetails('Status: Processing');
    MoneyTransferPage.verifyFromAccountAvailableBalance(transferAmount);
    MoneyTransferPage.closeModal();
  });

  it('Pay money from a bank account to another wallet', () => {
    // go to Money page
    MoneyPage.goToMoneyScreen();
    MoneyPage.openPayModal();

    MoneyTransferPage.selectFromField(bankAccount).selectToField(
      anotherMainWallet,
    );
    MoneyTransferPage.continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should(
      'have.text',
      `Pay ${anotherMainWallet}`,
    );
    MoneyTransferPage.inputAmountField(`${transferAmount}`)
      .inputDescriptionField(description)
      .continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should('have.text', 'Review Pay');
    MoneyTransferPage.verifyReviewTransferFieldValue('From', bankAccount);
    MoneyTransferPage.verifyReviewTransferFieldValue('To', anotherMainWallet);
    MoneyTransferPage.verifyReviewTransferFieldValue(
      'Description',
      description,
    );
    MoneyTransferPage.verifyReviewTransferFieldValue('Fees', fees);
    MoneyTransferPage.verifyReviewTransferFieldValue(
      'Net Amount',
      `$${transferAmount}.00`,
    );
    MoneyTransferPage.continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should(
      'have.text',
      'Confirm Transaction',
    );
    MoneyTransferPage.inputPinCode(pin).continueToNextScreen();

    MoneyTransferPage.verifyConfirmationDetails(
      `$${transferAmount}.00 has been paid`,
    );
    MoneyTransferPage.verifyConfirmationDetails(description);
    MoneyTransferPage.verifyConfirmationDetails('Status: Processing');
    MoneyTransferPage.closeModal();
  });

  it('Pay money from a credit card to another wallet', () => {
    const computedFee = transferAmount * feePercentage;
    const computedAmount = transferAmount - computedFee;

    // go to Money page
    MoneyPage.goToMoneyScreen();
    MoneyPage.openPayModal();

    MoneyTransferPage.selectFromField(cardPayment).selectToField(
      anotherMainWallet,
    );
    MoneyTransferPage.continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should(
      'have.text',
      `Pay ${anotherMainWallet}`,
    );
    MoneyTransferPage.inputAmountField(`${transferAmount}`)
      .inputDescriptionField(description)
      .continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should('have.text', 'Review Pay');
    MoneyTransferPage.verifyReviewTransferFieldValue('From', 'Card');
    MoneyTransferPage.verifyReviewTransferFieldValue('To', anotherMainWallet);
    MoneyTransferPage.verifyReviewTransferFieldValue(
      'Description',
      description,
    );
    MoneyTransferPage.verifyReviewTransferFieldValue('Fees', `$${computedFee}`);
    MoneyTransferPage.verifyReviewTransferFieldValue(
      'Net Amount',
      `$${computedAmount}`,
    );
    MoneyTransferPage.continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should(
      'have.text',
      'Confirm Transaction',
    );
    MoneyTransferPage.inputPinCode(pin).continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should('have.text', 'Pay');
    MoneyTransferPage.inputCardNumber(ccNumber)
      .inputCardExpiry(ccExpiry)
      .inputCardCvc(ccCvc)
      .inputPostalCode(ccPostalCode)
      .continueToNextScreenIFrame();

    MoneyTransferPage.verifyConfirmationDetails(
      `$${transferAmount}.00 has been paid`,
    );
    MoneyTransferPage.verifyConfirmationDetails(description);
    MoneyTransferPage.verifyConfirmationDetails('Status: Processing');
    MoneyTransferPage.closeModal();
  });
});
