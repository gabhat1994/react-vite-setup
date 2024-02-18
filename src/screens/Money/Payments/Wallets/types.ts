import { type TransferDetail } from '@/apollo/generated/types';
import { WalletStatus } from '@/features/money/types';

export interface Transaction {
  sourceDetail: TransferDetail | undefined;
  destinationDetail: TransferDetail | undefined;
  paymentDate: string | undefined | null;
  amount: number | undefined | null;
  transactionReason: string | undefined | null;
  currency: string | undefined | null;
  charges: number | null | undefined;
}

export const WALLET_CREATED = [
  WalletStatus.CUSTOMER_VERIFIED,
  WalletStatus.CUSTOMER_ACTIVATED,
];

// New Wallet On Boarding Flow

export enum CustomerType {
  UNVERIFIED = 'UNVERIFIED',
  VERIFIED = 'VERIFIED',
}

export enum NoumenaStatus {
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}

export enum ProviderStatus {
  DEACTIVATED = 'DEACTIVATED',
  RETRY = 'RETRY',
  SUSPENDED = 'SUSPENDED',
  VERIFIED = 'VERIFIED',
  DOCUMENT = 'DOCUMENT',
}
