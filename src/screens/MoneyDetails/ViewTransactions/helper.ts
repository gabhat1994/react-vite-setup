import { format, isSameYear } from 'date-fns';
import { t } from 'i18next';
import { PaymentAccountTypeEnum } from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown/types';
import { type GetAccountListQuery } from '@/apollo/graphql';

export const MonthList: string[] = [
  t(`noumena.viewTransactions.January`),
  t(`noumena.viewTransactions.February`),
  t(`noumena.viewTransactions.March`),
  t(`noumena.viewTransactions.April`),
  t(`noumena.viewTransactions.May`),
  t(`noumena.viewTransactions.June`),
  t(`noumena.viewTransactions.July`),
  t(`noumena.viewTransactions.August`),
  t(`noumena.viewTransactions.September`),
  t(`noumena.viewTransactions.October`),
  t(`noumena.viewTransactions.November`),
  t(`noumena.viewTransactions.December`),
];

export const findMonthList = () => {
  const newList = [];
  const monthName = MonthList;
  const d = new Date();
  d.setDate(1);

  for (let i = 0; i <= 11; i += 1) {
    newList.push(`${monthName[d.getMonth()]} ${d.getFullYear()}`);
    d.setMonth(d.getMonth() - 1);
  }
  return newList.reverse();
};

export const findCurrentMonth = () => {
  const year = `${new Date().getFullYear().toString()}`;
  const name = MonthList[Number(new Date().getMonth().toString().slice(-2))];
  return `${name} ${year}`;
};

export const convert = (str: Date) => {
  const date = new Date(str);
  const mnth = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return [date.getFullYear(), mnth, day].join('-');
};

export const DateFormaterStringInput = (timestamp?: string) => {
  if (!timestamp) return '';
  const transactionDate = new Date(Number(timestamp));
  const todaysDate = new Date();
  const formatterString = isSameYear(transactionDate, todaysDate)
    ? 'MMMM dd'
    : 'MMMM dd, yyyy';
  const formattedDate = format(transactionDate, formatterString);
  return formattedDate;
};

export const accountsDropdownMapper = (data: GetAccountListQuery) => {
  const values: DropdownValueType<string>[] = [
    {
      label: 'Wallets : All',
      key: '',
      type: 'value',
      value: '',
    },
  ];
  const accounts: DropdownValueType<string>[] = data?.getAccountList!.map(
    (account) => ({
      label:
        account?.accountType === 'WALLET'
          ? account?.walletName || ''
          : account?.customerName || '',
      key:
        account?.masterWalletId !== null && account?.chamberId !== null
          ? PaymentAccountTypeEnum.SubWallet
          : account.accountType || '',
      type: 'value',
      value: account?.id || '',
    }),
  );
  const res = [...values, ...accounts];

  return res;
};

export const selectedAccountFinder = (
  data: GetAccountListQuery,
  id: string,
  setSelectedDropdownValue: Function,
) => {
  const selectedValue = data?.getAccountList?.filter(
    (account) => id === account?.id,
  )[0];

  setSelectedDropdownValue({
    label:
      selectedValue === undefined
        ? 'Wallets : All'
        : selectedValue?.accountType === 'WALLET'
        ? selectedValue?.walletName || ''
        : selectedValue?.customerName || '',
    key:
      id === ''
        ? ''
        : selectedValue?.masterWalletId !== null &&
          selectedValue?.chamberId !== null
        ? PaymentAccountTypeEnum.SubWallet
        : selectedValue?.accountType || '',
    type: 'value',
    value: selectedValue?.id || '',
  });

  return selectedValue;
};
