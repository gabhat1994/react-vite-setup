import type * as Types from '@/apollo/generated/types';

export type TSearchedPayee = {
  __typename?: 'AccountListOutput';
  id: string;
  chamberId?: string | null;
  accountName?: string | null;
  maskAccountNumber?: string | null;
  accountType?: Types.AccountType | null;
  walletName?: string | null;
  masterWalletId?: string | null;
  customerName?: string | null;
};
