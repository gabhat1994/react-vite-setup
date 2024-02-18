import { createContext } from 'react';
import { ModalSize } from '@/components/ExtendedModal';
import {
  ComponentStates,
  type TransactionModalProps,
  TransactionModalType,
} from '../types';

export type TTransactionModalPartialProps = Omit<
  TransactionModalProps,
  'open' | 'defaultAccountID' | 'defaultWalletPayee' | 'defaultPayeeID'
>;

export interface TPaymentStateContext extends TTransactionModalPartialProps {
  handleForwardStateChange: () => void;
  handleBackwardsStateChange: () => void;
  handleClose: () => void;
  paymentState: ComponentStates;
  setPaymentState: (state: ComponentStates) => void;
  isMobile: boolean;
  modalSize: ModalSize;
  setModalSize: (modalSize: ModalSize) => void;
}

export const initPaymentStateContextValue: TPaymentStateContext = {
  type: TransactionModalType.PAY,
  handleForwardStateChange: () => null,
  handleBackwardsStateChange: () => null,
  handleClose: () => null,
  paymentState: ComponentStates.PAYMENT_SELECT,
  setPaymentState: () => {},
  onSuccessfulTransaction: () => null,
  isMobile: false,
  disableFromDropDown: false,
  hideToDropdownIcon: false,
  hideFromDropdownIcon: undefined,
  modalSize: ModalSize.M,
  setModalSize: () => null,
};

export const PaymentStateContext = createContext<TPaymentStateContext>(
  initPaymentStateContextValue,
);
