import { PaymentAccountTypeEnum } from '@/apollo/generated/types';
import { type AccountListOutputFragment } from '@/apollo/graphql';
import { type DropdownValueType } from '@/components/Dropdown/types';
import {
  AccountDetailsUtil,
  TransactionAccountsUtil,
} from '@/features/money/utils';

const getDropdownOptionLabel = (account: AccountListOutputFragment) => {
  if (TransactionAccountsUtil.isWallet(account)) {
    return account.walletName || '';
  }
  if (TransactionAccountsUtil.isBank(account)) {
    return AccountDetailsUtil.getBank(account);
  }
  return '';
};

const getDropdownOptionKey = (account: AccountListOutputFragment) =>
  TransactionAccountsUtil.isSubWallet(account)
    ? PaymentAccountTypeEnum.SubWallet
    : account.accountType || '';

const sortDropdownByLabelAndKey = (
  options: DropdownValueType<string, string>[],
) =>
  options.sort((optionA, optionB) => {
    const { key: keyA, label: labelA } = optionA;
    const { key: keyB, label: labelB } = optionB;

    if (typeof labelA !== 'string' || typeof labelB !== 'string') return 0;

    // Main wallet should always be on top in drop down menu
    if (
      keyA === PaymentAccountTypeEnum.Wallet &&
      keyB !== PaymentAccountTypeEnum.Wallet
    ) {
      return -1;
    }
    if (
      keyA !== PaymentAccountTypeEnum.Wallet &&
      keyB === PaymentAccountTypeEnum.Wallet
    ) {
      return 1;
    }
    const label1 = labelA.toLowerCase();
    const label2 = labelB.toLowerCase();
    return label1.localeCompare(label2);
  });

export const Utils = {
  getDropdownOptionLabel,
  getDropdownOptionKey,
  sortDropdownByLabelAndKey,
};
