import { type FC, useContext, useMemo } from 'react';
import { Modal, ModalHeader } from '@/components/ExtendedModal';
import { Spinner } from '@/components/Spinner';
import PaymentDataProvider from '../contexts/PaymentDataProvider';
import PaymentStateProvider from '../contexts/PaymentStateProvider';
import { PaymentStateContext } from '../contexts/PaymentStateContext';
import { PaymentDataContext } from '../contexts/PaymentDataContext';
import {
  ComponentStates,
  type TransactionModalProps,
  TransactionModalType,
} from '../types';
import PaymentSelect from './Steps/PaymentSelect';
import PaymentDescription from './Steps/PaymentDescription';
import PaymentReview from './Steps/PaymentReview';
import PaymentConfirm from './Steps/PaymentConfirm';
import PaymentDone from './Steps/PaymentDone';
import AddPayee from './Steps/AddPayee';
import Stripe from './Stripe';
import ForgotPin from './Steps/ForgotPin';
import PlaidFlow from './Steps/PlaidFlow/PlaidFlow';
import { getModalTitle } from '../helpers';
import VerifyBankAccount from './Steps/VerifyBankAccount';
import AccountNotFoundInPlaid from './Steps/AccountNotFoundInPlaid';
import AddFundingSource from './Steps/AddFundingSource';
import AddedFundingSource from './Steps/AddedFundingSource';

export const TransactionModal: FC<TransactionModalProps> = ({
  open,
  handleClose,
  type,
  defaultAccountID,
  defaultPayeeID,
  onSuccessfulTransaction = () => null,
  defaultWalletPayee,
  disableFromDropDown = false,
  hideToDropdownIcon = false,
  hideFromDropdownIcon = false,
  answerForTip,
  maxTransactionAmount,
  invoiceId,
  isSourceWalletExists = true,
  predefinedPayeeList,
  isDestinationDropdownDisabled,
  defaultAmount,
  disableAmountsField = false,
  offerId,
  campaignId,
  campaignRepayment,
}) => (
  <PaymentDataProvider
    defaultAccountID={defaultAccountID}
    defaultPayeeID={defaultPayeeID}
    defaultWalletPayee={defaultWalletPayee}
    answerForTip={answerForTip}
    invoiceId={invoiceId}
    maxTransactionAmount={maxTransactionAmount}
    isSourceWalletExists={isSourceWalletExists}
    predefinedPayeeList={predefinedPayeeList}
    isDestinationDropdownDisabled={isDestinationDropdownDisabled}
    defaultAmount={defaultAmount}
    disableAmountsField={disableAmountsField}
    offerId={offerId}
    campaignId={campaignId}
    campaignRepayment={campaignRepayment}
    handleClose={handleClose}
  >
    <PaymentStateProvider
      type={type}
      onSuccessfulTransaction={onSuccessfulTransaction}
      disableFromDropDown={disableFromDropDown}
      hideToDropdownIcon={hideToDropdownIcon}
      hideFromDropdownIcon={hideFromDropdownIcon}
      handleClose={handleClose}
    >
      <StepsModal handleClose={handleClose} open={open} />
    </PaymentStateProvider>
  </PaymentDataProvider>
);

const StepsModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { loading, destination } = useContext(PaymentDataContext);
  const { paymentState, modalSize, type } = useContext(PaymentStateContext);

  const getComponentAccordingToState = () => {
    switch (paymentState) {
      case ComponentStates.PAYMENT_SELECT:
        return <PaymentSelect />;
      case ComponentStates.PAYMENT_DESCRIPTION:
        return <PaymentDescription />;
      case ComponentStates.PAYMENT_REVIEW:
        return <PaymentReview />;
      case ComponentStates.PAYMENT_CONFIRM:
        return <PaymentConfirm />;
      case ComponentStates.PAYMENT_DONE:
        return <PaymentDone />;
      case ComponentStates.PAYMENT_ADD_PAYEE:
        return <AddPayee />;
      case ComponentStates.VERIFY_BANK_ACCOUNT:
        return <VerifyBankAccount />;
      case ComponentStates.BANK_ACCOUNT_NOT_FOUND_IN_PLAID:
        return <AccountNotFoundInPlaid />;
      case ComponentStates.ADD_FUNDING_SOURCE_MICRODEPOSIT:
        return <AddFundingSource />;
      case ComponentStates.FUNDING_SOURCE_ADDED:
        return <AddedFundingSource />;
      case ComponentStates.PAYMENT_STRIPE:
        return <Stripe />;
      case ComponentStates.PAYMENT_FORGOT_PIN:
        return <ForgotPin />;
      case ComponentStates.PAYMENT_SET_UP_PIN:
        return <PlaidFlow />;
      default:
        return null;
    }
  };

  const hideHeaderStates = useMemo(
    () => [
      ComponentStates.PAYMENT_DONE,
      ComponentStates.PAYMENT_ADD_PAYEE,
      ComponentStates.PAYMENT_FORGOT_PIN,
      ComponentStates.PAYMENT_SET_UP_PIN,
      ComponentStates.VERIFY_BANK_ACCOUNT,
      ComponentStates.BANK_ACCOUNT_NOT_FOUND_IN_PLAID,
      ComponentStates.ADD_FUNDING_SOURCE_MICRODEPOSIT,
      ComponentStates.FUNDING_SOURCE_ADDED,
    ],
    [],
  );

  const shouldEnableCloseButton = !(
    paymentState === ComponentStates.PAYMENT_ADD_PAYEE ||
    paymentState === ComponentStates.PAYMENT_DONE ||
    paymentState === ComponentStates.VERIFY_BANK_ACCOUNT ||
    paymentState === ComponentStates.FUNDING_SOURCE_ADDED ||
    paymentState === ComponentStates.BANK_ACCOUNT_NOT_FOUND_IN_PLAID
  );

  const hideHeader = useMemo(
    () => hideHeaderStates.includes(paymentState),
    [hideHeaderStates, paymentState],
  );

  return (
    <Modal
      enableCloseButton={shouldEnableCloseButton}
      disableBackdropClick
      onClose={handleClose}
      open={open}
      size={modalSize}
      disableEscapeKeyDown
    >
      {loading ? (
        <div
          style={{
            width: '400px',
            height: type === TransactionModalType.TIP ? '412px' : '545px',
          }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          {hideHeader || (
            <ModalHeader>
              {getModalTitle(type, paymentState, destination)}
            </ModalHeader>
          )}
          {getComponentAccordingToState()}
        </>
      )}
    </Modal>
  );
};

export default TransactionModal;
