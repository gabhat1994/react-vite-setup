import {
  type TransactionsFragment,
  type AccountDetailsOfTransactionFragment,
} from '@/apollo/graphql/fragments/transactions.generated';
import {
  type Transaction,
  type TagType,
} from './components/TransactionCard/type';

export interface WalletType {
  id: string;
  walletName: string;
  accountType: string;
  balance?: number | null | undefined;
  chamberId?: string;
}
export interface BankType {
  id: string;
  name: string;
  accountType: string;
  maskAccountNumber: string;
  balance?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  status?: string | null;
}

export const BankAccountStatus = {
  ADDED: 'ADDED',
  MICRO_DEPOSIT_INITIATED: 'MICRO_DEPOSIT_INITIATED',
  MICRO_DEPOSIT_COMPLETE: 'MICRO_DEPOSIT_COMPLETE',
  ACTIVE: 'ACTIVE',
  MICRO_DEPOSIT_FAILED: 'MICRO_DEPOSIT_FAILED',
  MICRO_DEPOSIT_VERIFY_FAIL: 'MICRO_DEPOSIT_VERIFY_FAIL',
};

export type GetTransactionContextTypeProps = {
  createUserId: string;
  updatedUserId: string;
  loggedInUserId: string;
  source: AccountDetailsOfTransactionFragment;
  destination: AccountDetailsOfTransactionFragment;
};

export type GetTransactionSubTypeProps = {
  source: AccountDetailsOfTransactionFragment;
  destination: AccountDetailsOfTransactionFragment;
  transaction: Transaction;
};

export type GetTransactionTypeProps = {
  source: AccountDetailsOfTransactionFragment;
  destination: AccountDetailsOfTransactionFragment;
};

export type GetAllTransactionProps = {
  transactionsData: TransactionsFragment[];
  loggedInUserId: string;
};

export type TagTypeAndStatus = {
  tagType: keyof TagType;
  status: string;
};

export enum DocumentStatusV2 {
  UPLOADED = 'UPLOADED',
  RE_UPLOADED = 'RE_UPLOADED',
  SENT_TO_PROVIDER = 'SENT_TO_PROVIDER',
}

export enum WalletStatus {
  CUSTOMER_NOT_CREATED = 'customer_not_created',
  CUSTOMER_AWAITING = 'customer_awaiting',
  CUSTOMER_CREATED = 'customer_created',
  CUSTOMER_REVERIFICATION = 'customer_reverification_needed',
  CUSTOMER_DOCUMENT_NEEDED = 'customer_verification_document_needed',
  CUSTOMER_DOCUMENT_UPLOADED = 'customer_verification_document_uploaded',
  CUSTOMER_DOCUMENT_FAILED = 'customer_verification_document_failed',
  CUSTOMER_DOCUMENT_APPROVED = 'customer_verification_document_approved',
  CUSTOMER_VERIFIED = 'customer_verified',
  CUSTOMER_SUSPENDED = 'customer_suspended',
  CUSTOMER_ACTIVATED = 'customer_activated',
  CUSTOMER_DEACTIVATED = 'customer_deactivated',
}
