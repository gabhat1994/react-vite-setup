import { AccountType } from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';
import { Stack } from '@/layout';
import { BankUtil } from '../money/utils/bank';
import { Payee } from './components/Payee';
import UnselectedAccount from './components/UnselectedAccount/UnselectedAccount';
import { type TAccount, type TPayee } from './types';

export const generateAccountList = (
  accounts: TAccount[] | undefined | null,
): DropdownValueType<TAccount>[] =>
  accounts?.map((account) => ({
    key: account.id,
    label: (
      <Stack>
        <UnselectedAccount account={account} />
      </Stack>
    ),
    type: 'value',
    value: account,
    disabled:
      account.accountType === AccountType.Bank
        ? !BankUtil.isActive(account?.status)
        : false,
  })) || [];

export const generatePayeeList = (
  payees: TPayee[] | TAccount[],
): DropdownValueType<TPayee | TAccount | null>[] =>
  payees?.map((_payee) => ({
    key: _payee?.id ?? '',
    label: (
      <Stack>
        <Payee payee={_payee} />
      </Stack>
    ),
    type: 'value',
    value: _payee,
  })) || [];
