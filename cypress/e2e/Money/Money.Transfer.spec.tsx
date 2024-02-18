import { faker } from '@faker-js/faker';
import MoneyPage from '../../pages/moneyPage';
import MoneyTransferPage from '../../pages/moneyTransferPage';
import LoginPage from '../../pages/loginPage';
import data from '../../fixtures/data.json';

const transferAmount = data['money.transfer.small.amount'];
const transferLargeAmount = data['money.transfer.large.amount'];
const feePercentage = Cypress.env('AUTO_CARD_FEE');
const bankAccount = data['money.transfer.bank.account'];
const cardPayment = data['money.transfer.card.payment'];
const mainWalletName = data['money.transfer.main.wallet'];
const subWalletName = data['money.transfer.sub.wallet'];
const ownerWallet = Cypress.env('AUTO_USER_CONNECTED_ONE_NAME');
const ccNumber = data['money.transfer.cc.number'];
const ccExpiry = data['money.transfer.cc.expiry'];
const ccCvc = data['money.transfer.cvc'];
const ccPostalCode = data['money.transfer.postal.code'];
const fees = data['money.transfer.fee.zero.percentage'];
const pin = data['money.transfer.pin'];
const description = faker.lorem.words(3);

describe('Money.Transfer.spec.tsx', () => {
  beforeEach(() => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_CONNECTED_ONE'));
  });

  it('transfer money from a wallet to another wallet', () => {
    // go to Money page
    MoneyPage.goToMoneyScreen();
    MoneyPage.openTransferModal();

    MoneyTransferPage.selectFromField(mainWalletName).selectToField(
      subWalletName,
    );
    MoneyTransferPage.getToAccountAvailableBalance()
      .getFromAccountAvailableBalance()
      .continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should(
      'have.text',
      `Transfer ${ownerWallet}`,
    );
    MoneyTransferPage.inputAmountField(`${transferAmount}`)
      .inputDescriptionField(description)
      .continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should('have.text', 'Review Transfer');
    MoneyTransferPage.verifyReviewTransferFieldValue('From', mainWalletName);
    MoneyTransferPage.verifyReviewTransferFieldValue('To', subWalletName);
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
      `$${transferAmount}.00 has been transfered`,
    );
    MoneyTransferPage.verifyConfirmationDetails(description);
    MoneyTransferPage.verifyConfirmationDetails('Status: Processing');
    MoneyTransferPage.verifyFromAccountAvailableBalance(transferAmount);
    MoneyTransferPage.verifyToAccountAvailableBalance(transferAmount);
    MoneyTransferPage.closeModal();
  });

  it('transfer money from a linked bank account to another wallet', () => {
    // go to Money page
    MoneyPage.goToMoneyScreen();
    MoneyPage.openTransferModal();

    MoneyTransferPage.selectFromField(bankAccount).selectToField(
      mainWalletName,
    );
    MoneyTransferPage.getToAccountAvailableBalance().continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should(
      'have.text',
      `Transfer ${ownerWallet}`,
    );
    MoneyTransferPage.inputAmountField(`${transferLargeAmount}`)
      .inputDescriptionField(description)
      .continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should('have.text', 'Review Transfer');
    MoneyTransferPage.verifyReviewTransferFieldValue('From', bankAccount);
    MoneyTransferPage.verifyReviewTransferFieldValue('To', mainWalletName);
    MoneyTransferPage.verifyReviewTransferFieldValue(
      'Description',
      description,
    );
    MoneyTransferPage.verifyReviewTransferFieldValue('Fees', fees);
    MoneyTransferPage.verifyReviewTransferFieldValue(
      'Net Amount',
      `$${transferLargeAmount}.00`,
    );
    MoneyTransferPage.continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should(
      'have.text',
      'Confirm Transaction',
    );
    MoneyTransferPage.inputPinCode(pin).continueToNextScreen();

    MoneyTransferPage.verifyConfirmationDetails(
      `$${transferLargeAmount}.00 has been transfered`,
    );
    MoneyTransferPage.verifyConfirmationDetails(description);
    MoneyTransferPage.verifyConfirmationDetails('Status: Processing');
    MoneyTransferPage.verifyToAccountAvailableBalance(0);
    MoneyTransferPage.closeModal();
  });

  it('transfer money from a wallet to linked bank account', () => {
    // go to Money page
    MoneyPage.goToMoneyScreen();
    MoneyPage.openTransferModal();

    MoneyTransferPage.selectFromField(mainWalletName).selectToField(
      bankAccount,
    );
    MoneyTransferPage.getFromAccountAvailableBalance().continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should(
      'have.text',
      `Transfer ${ownerWallet}`,
    );
    MoneyTransferPage.inputAmountField(`${transferAmount}`)
      .inputDescriptionField(description)
      .continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should('have.text', 'Review Transfer');
    MoneyTransferPage.verifyReviewTransferFieldValue('From', mainWalletName);
    MoneyTransferPage.verifyReviewTransferFieldValue('To', bankAccount);
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
      `$${transferAmount}.00 has been transfered`,
    );
    MoneyTransferPage.verifyConfirmationDetails(description);
    MoneyTransferPage.verifyConfirmationDetails('Status: Processing');
    MoneyTransferPage.verifyFromAccountAvailableBalance(transferAmount);
    MoneyTransferPage.closeModal();
  });

  it('transfer money from a card to another wallet', () => {
    // go to Money page
    const computedFee = transferAmount * feePercentage;
    const computedAmount = transferAmount - computedFee;
    MoneyPage.goToMoneyScreen();
    MoneyPage.openTransferModal();

    MoneyTransferPage.selectFromField(cardPayment).selectToField(
      mainWalletName,
    );
    MoneyTransferPage.getToAccountAvailableBalance().continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should(
      'have.text',
      `Transfer ${ownerWallet}`,
    );
    MoneyTransferPage.inputAmountField(`${transferAmount}`)
      .inputDescriptionField(description)
      .continueToNextScreen();

    MoneyTransferPage.moneyModalHeader.should('have.text', 'Review Transfer');
    MoneyTransferPage.verifyReviewTransferFieldValue('From', 'Card');
    MoneyTransferPage.verifyReviewTransferFieldValue('To', mainWalletName);
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

    MoneyTransferPage.moneyModalHeader.should('have.text', 'Transfer');
    MoneyTransferPage.inputCardNumber(ccNumber)
      .inputCardExpiry(ccExpiry)
      .inputCardCvc(ccCvc)
      .inputPostalCode(ccPostalCode)
      .continueToNextScreenIFrame();

    MoneyTransferPage.verifyConfirmationDetails(
      `$${transferAmount}.00 has been transfered`,
    );
    MoneyTransferPage.verifyConfirmationDetails(description);
    MoneyTransferPage.verifyConfirmationDetails('Status: Processing');
    MoneyTransferPage.verifyToAccountAvailableBalance(0);
    MoneyTransferPage.closeModal();
  });
});
