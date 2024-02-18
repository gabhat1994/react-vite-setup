import { createContext, type Dispatch, type SetStateAction } from 'react';
import * as Types from '@/apollo/generated/types';
import { type DropdownItemType } from '@/components/Dropdown';
import { type InvoiceOutputFragment } from '@/apollo/graphql';
import {
  type TAccount,
  type TPayByCard,
  type TPayee,
  type TransactionCardDetailsT,
  type Transactions,
  type TTransactionDestination,
} from '../types';

export type PaymentDataContextType = {
  loading: boolean;
  fromList: DropdownItemType<TAccount | TPayByCard>[];
  bankAccountId: string | null;
  setBankAccountId: (status: string) => void;
  defaultPayeeID?: string;
  defaultWalletPayee?: TPayee | TAccount;
  toList: DropdownItemType<TPayee | TAccount | null>[] | null;
  setSource: Dispatch<SetStateAction<TAccount | TPayByCard>>;
  source: TAccount | TPayByCard;
  destination: TTransactionDestination;
  setDestination: Dispatch<SetStateAction<TTransactionDestination>>;
  handleTransactionChange: (data: Transactions) => void;
  transactions: Transactions;
  clientSecret: string;
  setClientSecret: Dispatch<SetStateAction<string>>;
  isStripeFlow: boolean;
  refetchPaymentData: () => void;
  setPaymentStatus: (status: string) => void;
  paymentStatus: string | null;
  transactionCardDetails: TransactionCardDetailsT;
  invoice?: InvoiceOutputFragment | null;
  maxTransactionAmount?: number;
  isDestinationDropdownDisabled?: boolean;
  predefinedPayeeList?: TAccount[] | TPayee[];
  disableAmountsField?: boolean;
  campaignId?: string;
  offerId?: string;
  paymentRef: string;
  campaignRepayment?: boolean;
  isSourceWalletExists?: boolean;
  setPaymentRef: Dispatch<SetStateAction<string>>;
  setTransactionCradDetails: Dispatch<
    SetStateAction<TransactionCardDetailsT>
  > | null;
};

export const PaymentDataContext = createContext<PaymentDataContextType>({
  loading: false,
  fromList: [],
  toList: [],
  defaultPayeeID: undefined,
  defaultWalletPayee: undefined,
  source: 'PAY_BY_CARD',
  setSource: () => null,
  destination: null,
  setDestination: () => null,
  bankAccountId: null,
  setBankAccountId: () => null,
  handleTransactionChange: () => null,
  isDestinationDropdownDisabled: false,
  clientSecret: '',
  transactions: {
    amount: '',
    transactionReason: '',
    settlementPeriod: Types.SettlementPeriodEnum.Sameday,
  },
  setClientSecret: () => {},
  isStripeFlow: false,
  refetchPaymentData: () => null,
  setPaymentStatus: () => null,
  paymentStatus: null,
  maxTransactionAmount: undefined,
  transactionCardDetails: {
    brand: null,
    last4: null,
  },
  invoice: null,
  disableAmountsField: false,
  setTransactionCradDetails: null,
  paymentRef: '',
  setPaymentRef: () => null,
  isSourceWalletExists: false,
});
