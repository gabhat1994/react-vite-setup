import { useState, useEffect, useCallback } from 'react';
import { AccountType } from '@/apollo/generated/types';
import {
  useGetAccountListLazyQuery,
  useGetWalletBalanceLazyQuery,
} from '@/apollo/graphql/queries/paymentAccounts.generated';
import { type WalletType, type BankType } from '../types';

export const useAccounts = () => {
  const [state, setState] = useState<{
    loading: boolean;
    total: number;
    mainWallet: WalletType[];
    subWallet: WalletType[];
    bankAccounts: BankType[];
  }>({
    loading: true,
    total: 0,
    mainWallet: [],
    subWallet: [],
    bankAccounts: [],
  });
  const [gqlAccountList] = useGetAccountListLazyQuery();
  const [gqlWalletBalance] = useGetWalletBalanceLazyQuery();
  const fetchData = useCallback(async () => {
    const res = await Promise.all([
      gqlAccountList({
        fetchPolicy: 'network-only',
      }),
      gqlWalletBalance({
        fetchPolicy: 'network-only',
      }),
    ]);
    const walletMap = (account: {
      id: string;
      walletName?: string | null;
      masterWalletId?: string | null;
      accountType?: AccountType | null;
      chamberId?: string | null;
      balance?: number | null | undefined;
    }) => ({
      id: account.id,
      walletName: account.walletName || 'Wallet',
      accountType: account.accountType || 'WALLET',
      chamberId: account.chamberId || undefined,
      balance: account.balance || 0,
    });
    const newState = { ...state };
    newState.loading = false;
    newState.total = res[1].data?.getWalletBalance?.total?.value || 0;
    newState.mainWallet =
      res[0].data?.getAccountList
        ?.filter(
          (account) =>
            !account.masterWalletId &&
            account.accountType === AccountType.Wallet,
        )
        .map(walletMap) || [];
    newState.subWallet =
      res[0].data?.getAccountList
        ?.filter(
          (account) =>
            account.masterWalletId &&
            account.accountType === AccountType.Wallet,
        )
        .map(walletMap) || [];
    newState.bankAccounts =
      res[0].data?.getAccountList
        ?.filter((account) => account.accountType === AccountType.Bank)
        .map((account) => ({
          name: account.accountName || 'Bank Account',
          chamberId: account.chamberId,
          accountType: account.accountType || AccountType.Bank,
          maskAccountNumber: account.maskAccountNumber || '',
          id: account.id,
          balance: account.balance,
          createdAt: account.createdAt,
          status: account?.status,
          updatedAt: account.updatedAt,
        })) || [];
    setState(newState);
  }, [gqlAccountList, gqlWalletBalance, state]);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const refresh = useCallback(() => {
    setState({ ...state, loading: true });
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);
  return { accountData: state, refresh };
};
