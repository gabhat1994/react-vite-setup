import { type TransactionContext } from '../components/TransactionCard/type';
import { type GetTransactionContextTypeProps } from '../types';
import { TransactionAccountsUtil } from './transactionAccounts';

export const TransactionContextTypeUtil = {
  getTransactionContextType({
    createUserId,
    updatedUserId,
    loggedInUserId,
    source,
    destination,
  }: GetTransactionContextTypeProps): TransactionContext {
    if (createUserId === updatedUserId) {
      // For Internal Transfer between bank/card and wallets the UI is different
      if (TransactionAccountsUtil.isBank(source)) return 'receiver';
      if (TransactionAccountsUtil.isBank(destination)) return 'sender';
      if (TransactionAccountsUtil.isCard(source)) return 'receiver';
      return 'internal-transfer';
    }
    if (createUserId === loggedInUserId) {
      return 'sender';
    }
    return 'receiver';
  },
};
