import {
  type SettlementPeriodEnum,
  type AnswerOutput,
} from '@/apollo/generated/types';
import {
  type AccountListOutputFragment,
  type CustomerPayeeListFragment,
} from '@/apollo/graphql';

export enum TransactionModalType {
  TRANSFER = 'TRANSFER',
  PAY = 'PAY',
  TIP = 'TIP',
}

export interface TransactionModalProps {
  open: boolean;
  type: TransactionModalType;
  handleClose: () => void;
  onSuccessfulTransaction?: () => void;
  disableFromDropDown?: boolean;
  hideToDropdownIcon?: boolean;
  hideFromDropdownIcon?: boolean;
  defaultAccountID?: string;
  defaultPayeeID?: string;
  defaultWalletPayee?: TPayee | TAccount;
  isDestinationDropdownDisabled?: boolean;
  predefinedPayeeList?: TAccount[] | TPayee[];
  answerForTip?: AnswerOutput;
  invoiceId?: string;
  maxTransactionAmount?: number;
  isSourceWalletExists?: boolean;
  defaultAmount?: number;
  disableAmountsField?: boolean;
  offerId?: string;
  campaignId?: string;

  /* First campaign payment failed somehow then trying for repayment  */
  campaignRepayment?: boolean;
}

export enum ComponentStates {
  PAYMENT_SELECT = 'PAYMENT_SELECT',
  PAYMENT_DESCRIPTION = 'PAYMENT_DESCRIPTION',
  PAYMENT_REVIEW = 'PAYMENT_REVIEW',
  PAYMENT_CONFIRM = 'PAYMENT_CONFIRM',
  PAYMENT_DONE = 'PAYMENT_DONE',
  PAYMENT_ADD_PAYEE = 'PAYMENT_ADD_PAYEE',
  PAYMENT_STRIPE = 'PAYMENT_STRIPE',
  PAYMENT_FORGOT_PIN = 'PAYMENT_FORGOT_PIN',
  PAYMENT_SET_UP_PIN = 'PAYMENT_SET_UP_PIN',
  VERIFY_BANK_ACCOUNT = 'VERIFY_BANK_ACCOUNT',
  BANK_ACCOUNT_NOT_FOUND_IN_PLAID = 'BANK_ACCOUNT_NOT_FOUND_IN_PLAID',
  ADD_FUNDING_SOURCE_MICRODEPOSIT = 'ADD_FUNDING_SOURCE_MICRODEPOSIT',
  FUNDING_SOURCE_ADDED = 'FUNDING_SOURCE_ADDED',
}

export interface Transactions {
  amount: string;
  transactionReason: string;
  settlementPeriod: SettlementPeriodEnum;
}

export type TAccount = AccountListOutputFragment;
export type TPayee = CustomerPayeeListFragment;

type TTipPayee = Pick<AnswerOutput, '_id' | 'user' | '__typename'>;

export type TTransactionDestination = TAccount | TPayee | TTipPayee | null;

export type TPayByCard = 'PAY_BY_CARD';

export enum PaymentStatuses {
  WAITING_PROCESSING = 'AWAITING_PROCESSING',
  SUBMITTED_TO_PGTWY = 'SUBMITTED_TO_PGTWY',
  PROCESSED = 'PROCESSED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

export type TransactionCardDetailsT = {
  brand: null | string;
  last4: null | string;
};
