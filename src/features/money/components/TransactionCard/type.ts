import { type TransactionsFragment } from '@/apollo/graphql/fragments/transactions.generated';
import { type IconProps } from '@/components/Icon/Icon';
import { type IModal } from '@/components/ExtendedModal/types';
import { type TagProps } from '@/components/Tag/types';

export type TransactionContext = 'sender' | 'receiver' | 'internal-transfer';

export type Transaction =
  | 'main-wallets'
  | 'sub-wallets'
  | 'cross-wallets'
  | 'bank-and-wallet'
  | 'card-and-wallet';

export type SubTransaction =
  | 'main-to-sub-wallet'
  | 'sub-to-main-wallet'
  | 'bank-to-main-wallet'
  | 'bank-to-sub-wallet'
  | 'main-wallet-to-bank'
  | 'sub-wallet-to-bank'
  | 'card-to-sub-wallet'
  | 'card-to-main-wallet';

export type Transactions = TransactionsFragment & {
  context: TransactionContext;
  transaction: Transaction;
  subTransaction: SubTransaction | null;
};

export type IconContextMap = Record<
  TransactionContext,
  { name: IconProps['name']; color: string }
>;

export type TransactionModalProps = Pick<IModal, 'open' | 'onClose'> & {
  paymentStatus: string;
  paymentReferenceNumber: string;
};

export type TagType = Pick<
  TagProps,
  'success' | 'secondary' | 'tertiary' | 'danger'
>;
