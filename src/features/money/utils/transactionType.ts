import {
  type Transaction,
  type SubTransaction,
} from '../components/TransactionCard/type';

import {
  type GetTransactionSubTypeProps,
  type GetTransactionTypeProps,
} from '../types';

import { TransactionAccountsUtil } from './transactionAccounts';

export const TransactionTypeUtil = {
  getTransactionSubType: ({
    source,
    destination,
    transaction,
  }: GetTransactionSubTypeProps): SubTransaction | null => {
    if (
      transaction !== 'cross-wallets' &&
      transaction !== 'bank-and-wallet' &&
      transaction !== 'card-and-wallet'
    )
      return null;

    switch (transaction) {
      case 'cross-wallets':
        return TransactionAccountsUtil.isMainWallet(source) &&
          TransactionAccountsUtil.isSubWallet(destination)
          ? 'main-to-sub-wallet'
          : 'sub-to-main-wallet';

      case 'bank-and-wallet':
        if (
          TransactionAccountsUtil.isBank(source) &&
          TransactionAccountsUtil.isWallet(destination)
        ) {
          return TransactionAccountsUtil.isSubWallet(destination)
            ? 'bank-to-sub-wallet'
            : 'bank-to-main-wallet';
        }
        return TransactionAccountsUtil.isSubWallet(source)
          ? 'sub-wallet-to-bank'
          : 'main-wallet-to-bank';

      case 'card-and-wallet':
        return TransactionAccountsUtil.isMainWallet(destination)
          ? 'card-to-main-wallet'
          : 'card-to-sub-wallet';

      default:
        return null;
    }
  },

  getTransactionType: ({
    source,
    destination,
  }: GetTransactionTypeProps): Transaction => {
    if (
      TransactionAccountsUtil.isMainWallet(source) &&
      TransactionAccountsUtil.isMainWallet(destination)
    ) {
      return 'main-wallets';
    }

    if (
      TransactionAccountsUtil.isBank(source) ||
      TransactionAccountsUtil.isBank(destination)
    ) {
      return 'bank-and-wallet';
    }

    if (
      TransactionAccountsUtil.isSubWallet(source) &&
      TransactionAccountsUtil.isSubWallet(destination)
    ) {
      return 'sub-wallets';
    }

    if (TransactionAccountsUtil.isCard(source)) {
      return 'card-and-wallet';
    }

    return 'cross-wallets';
  },
};
