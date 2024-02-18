import { t } from 'i18next';
import { cleanList } from '@/utils/list';
import { UserUtil } from '@/utils/user';

import { TransactionTypeUtil } from './transactionType';
import { type Transactions } from '../components/TransactionCard/type';
import { TransactionContextTypeUtil } from './transactionContextType';
import { type GetAllTransactionProps } from '../types';
import { TransactionAccountsUtil } from './transactionAccounts';
import { AccountDetailsUtil } from './accountDetails';

const emptyObject = { to: '', from: '', profile: '' };

export const TransactionUtil = {
  getAllTransactions: ({
    transactionsData,
    loggedInUserId,
  }: GetAllTransactionProps) => {
    const transactions = transactionsData.map(
      (transactionItem): Transactions | null => {
        const {
          createUserId,
          updatedUserId,
          sourceDetail: source,
          destinationDetail: destination,
        } = transactionItem;

        if (!source || !destination || !createUserId) return null;

        const context = TransactionContextTypeUtil.getTransactionContextType({
          loggedInUserId,
          source,
          destination,
          createUserId,
          updatedUserId: updatedUserId || '',
        });

        const transaction = TransactionTypeUtil.getTransactionType({
          source,
          destination,
        });
        const subTransaction = TransactionTypeUtil.getTransactionSubType({
          source,
          destination,
          transaction,
        });

        return {
          ...transactionItem,
          context,
          subTransaction,
          transaction,
        };
      },
    );

    return cleanList(transactions);
  },

  getReceiverData: (transactionData: Transactions) => {
    const {
      transaction,
      createUserId,
      updatedUserId,
      sourceUser,
      sourceDetail: source,
      destinationDetail: destination,
    } = transactionData;

    const isTransfer = createUserId === updatedUserId;
    const sourceMainWallet = TransactionAccountsUtil.isMainWallet(source);
    const destinationMainWallet =
      TransactionAccountsUtil.isMainWallet(destination);
    const sourceUserName = UserUtil.renderFullName(sourceUser);
    const sourceUserPicture = AccountDetailsUtil.getUserPicture(sourceUser);

    const sourceSubWalletPicture =
      AccountDetailsUtil.getSubWalletPicture(source);
    const destinationSubWalletName =
      AccountDetailsUtil.getSubWalletName(destination);
    const sourceBank = AccountDetailsUtil.getBank(source);
    const sourceCard = AccountDetailsUtil.getCreditCard(source);

    const sourceUserSubWalletName = AccountDetailsUtil.getUserAndSubwalletName(
      sourceUser,
      source,
    );

    switch (transaction) {
      case 'main-wallets':
        return {
          to: t('noumena.main.wallet'),
          from: sourceUserName,
          profile: sourceUserPicture,
        };

      case 'bank-and-wallet':
        if (isTransfer) {
          return {
            from: sourceBank,
            to: destinationMainWallet
              ? t('noumena.main.wallet')
              : destinationSubWalletName,
            profile: sourceSubWalletPicture,
          };
        }
        return {
          to: destinationMainWallet
            ? t('noumena.main.wallet')
            : destinationSubWalletName,
          profile: sourceSubWalletPicture,
          from: sourceUserName,
          account: sourceBank,
        };

      case 'card-and-wallet':
        if (isTransfer) {
          return {
            to: destinationMainWallet
              ? t('noumena.main.wallet')
              : destinationSubWalletName,
            from: sourceCard,
            profile: sourceSubWalletPicture,
          };
        }

        return {
          to: destinationMainWallet
            ? t('noumena.main.wallet')
            : destinationSubWalletName,
          from: sourceUserName,
          profile: sourceUserPicture,
        };

      case 'sub-wallets':
        return {
          to: destinationSubWalletName,
          from: sourceUserSubWalletName,
          profile: sourceSubWalletPicture,
        };

      case 'cross-wallets':
        return {
          to: destinationMainWallet
            ? t('noumena.main.wallet')
            : destinationSubWalletName,
          from: sourceMainWallet ? sourceUserName : sourceUserSubWalletName,
          profile: sourceMainWallet
            ? sourceUserPicture
            : sourceSubWalletPicture,
        };

      default:
        return emptyObject;
    }
  },

  getSenderData: (transactionData: Transactions) => {
    const {
      transaction,
      destinationUser,
      createUserId,
      updatedUserId,
      sourceDetail: source,
      destinationDetail: destination,
    } = transactionData;

    const isTransfer = createUserId === updatedUserId;
    const isTransactionOutSideNoumena = !destinationUser;
    const outsidePayeeName =
      AccountDetailsUtil.getOutsidePayeeName(destination);
    const sourceMainWallet = TransactionAccountsUtil.isMainWallet(source);
    const destinationMainWallet =
      TransactionAccountsUtil.isMainWallet(destination);
    const destinationUserName = UserUtil.renderFullName(destinationUser);
    const destinationUserPicture =
      AccountDetailsUtil.getUserPicture(destinationUser);
    const destinationSubWalletPicture =
      AccountDetailsUtil.getSubWalletPicture(destination);
    const sourceSubWalletName = AccountDetailsUtil.getSubWalletName(source);
    const sourceBank = AccountDetailsUtil.getBank(source);
    const destinationBank = AccountDetailsUtil.getBank(destination);
    const sourceCard = AccountDetailsUtil.getCreditCard(source);

    const destinationUserSubWalletName =
      AccountDetailsUtil.getUserAndSubwalletName(destinationUser, destination);

    switch (transaction) {
      case 'main-wallets':
        return {
          to: destinationUserName,
          from: t('noumena.main.wallet'),
          profile: destinationUserPicture,
        };

      case 'bank-and-wallet':
        if (isTransfer) {
          return {
            to: destinationBank,
            from: sourceMainWallet
              ? t('noumena.main.wallet')
              : sourceSubWalletName,
            profile: destinationSubWalletPicture,
          };
        }

        if (isTransactionOutSideNoumena) {
          return {
            to: outsidePayeeName,
            from: sourceMainWallet
              ? t('noumena.main.wallet')
              : sourceSubWalletName,
            profile: AccountDetailsUtil.getDefaultUserPicture(),
            account: t('noumena.outside.payee.account.number', {
              number: destination?.maskNumber,
            }),
          };
        }

        return {
          to: destinationMainWallet
            ? destinationUserName
            : destinationUserSubWalletName,
          from: sourceBank,
          profile: destinationMainWallet
            ? destinationUserPicture
            : destinationSubWalletPicture,
        };

      case 'card-and-wallet':
        return {
          to: destinationMainWallet
            ? destinationUserName
            : destinationUserSubWalletName,
          from: sourceCard,
          profile: destinationMainWallet
            ? destinationUserPicture
            : destinationSubWalletPicture,
        };

      case 'sub-wallets':
        return {
          to: destinationUserSubWalletName,
          from: sourceSubWalletName,
          profile: destinationSubWalletPicture,
        };

      case 'cross-wallets':
        return {
          to: destinationMainWallet
            ? destinationUserName
            : destinationUserSubWalletName,
          from: sourceMainWallet
            ? t('noumena.main.wallet')
            : sourceSubWalletName,
          profile: destinationMainWallet
            ? destinationUserPicture
            : destinationSubWalletPicture,
        };

      default:
        return emptyObject;
    }
  },

  getTransferData: (transactionData: Transactions) => {
    const {
      transaction,
      sourceUser,
      sourceDetail: source,
      destinationDetail: destination,
    } = transactionData;

    const sourceMainWallet = TransactionAccountsUtil.isMainWallet(source);
    const destinationMainWallet =
      TransactionAccountsUtil.isMainWallet(destination);
    const sourceUserPicture = AccountDetailsUtil.getUserPicture(sourceUser);
    const destinationSubWalletPicture =
      AccountDetailsUtil.getSubWalletPicture(destination);
    const destinationSubWalletName =
      AccountDetailsUtil.getSubWalletName(destination);
    const sourceSubWalletName = AccountDetailsUtil.getSubWalletName(source);

    switch (transaction) {
      case 'sub-wallets':
      case 'cross-wallets':
        return {
          to: destinationMainWallet
            ? t('noumena.main.wallet')
            : destinationSubWalletName,
          from: sourceMainWallet
            ? t('noumena.main.wallet')
            : sourceSubWalletName,
          profile: destinationMainWallet
            ? sourceUserPicture
            : destinationSubWalletPicture,
        };

      default:
        return emptyObject;
    }
  },
};
