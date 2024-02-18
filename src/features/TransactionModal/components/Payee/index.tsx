/* eslint-disable no-param-reassign */
import { type FC, useEffect, useState, useMemo } from 'react';
import { t } from 'i18next';
import { differenceInMinutes } from 'date-fns';
import * as Sentry from '@sentry/react';
import mainWallet from '@/assets/images/noumena-filled-logo.svg';
import convertToCurrency from '@/utils/currencyToCurrency';
import {
  useGetBankAccountBalanceLazyQuery,
  useGetWalletBalanceLazyQuery,
  useGetSubWalletBalanceLazyQuery,
} from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks';
import { AccountType, CurrencyEnum } from '@/apollo/generated/types';
import { MINUTES_TO_SHOW_ACCOUNT_BALANCE } from '@/constants/payments';
import { TSpan } from '@/components/Typography';
import { type Maybe } from '@/common/types';
import {
  type AccountPayeeProps,
  type CustomerPayeeProps,
  type PayeeProps,
} from './types';
import { Account, Image } from '../styles';
import { Wrapper, Name, Description } from './style';
import { isAccountPayeeItem, isCustomerPayeeItem } from '../../helpers';

export const Payee: FC<PayeeProps> = ({
  payee,
  selected = false,
  fetchUpdatedBalance = false,
  customStyles,
}) => {
  const isCustomerPayee = isCustomerPayeeItem(payee);
  const isAccountPayee = isAccountPayeeItem(payee);
  const { user } = useAuth();

  const isMainWallet = useMemo(
    () =>
      payee
        ? Boolean(
            !('chamberId' in payee) &&
              'accountType' in payee &&
              payee.accountType === AccountType.Wallet,
          )
        : false,
    [payee],
  );

  if (!payee) {
    return null;
  }

  const getDetails = () => {
    if (isCustomerPayee) {
      return <CustomerPayee payee={payee} selected={selected} />;
    }

    if (isAccountPayee) {
      const isCurrentUser =
        payee?.chamber?.uid?._id === user?._id ||
        payee?.userId?._id === user?._id;

      if (!isCurrentUser) {
        return <CustomerPayee payee={payee} selected={selected} />;
      }
      return (
        <AccountPayee
          fetchUpdatedBalance={fetchUpdatedBalance}
          payee={payee}
          selected={selected}
        />
      );
    }

    return null;
  };

  const getProfilePicture = (): string => {
    if (isAccountPayee) {
      return payee.chamber?.profileImage || mainWallet;
    }
    if (isCustomerPayee && !isMainWallet) {
      return payee.userId?.profile?.profilePicture || mainWallet;
    }
    return mainWallet;
  };

  return (
    <Wrapper selected={selected} style={{ ...customStyles }}>
      <Image
        src={getProfilePicture()}
        alt="noum-logo"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = mainWallet;
        }}
      />
      {getDetails()}
    </Wrapper>
  );
};

export const TipPayee = ({
  customerName,
  customerAvatar,
  selected,
}: {
  customerName: string;
  customerAvatar?: Maybe<string>;
  selected?: boolean;
}) => (
  <Wrapper selected={!!selected}>
    <Image src={customerAvatar || mainWallet} alt="noum-logo" />
    <Account>
      <TSpan
        font="body-l-bold"
        color="--text-tablecell-header-neutral-highlighted"
      >
        {customerName}
      </TSpan>
      <TSpan font="body-m" color="--text-tablecell-body-neutral-default">
        {t('noumena.container.close_subwallet.mainwallet')}
      </TSpan>
    </Account>
  </Wrapper>
);

const CustomerPayee: FC<CustomerPayeeProps> = ({ selected, payee }) => {
  const { customerName, walletName, maskAccountNumber, accountType } = payee;
  return (
    <Account>
      <Name selected={selected}>{customerName}</Name>
      <Description selected={selected}>
        {accountType === 'BANK' ? `****${maskAccountNumber}` : walletName}
      </Description>
    </Account>
  );
};

const AccountPayee: FC<AccountPayeeProps> = ({
  selected,
  payee,
  fetchUpdatedBalance,
}) => {
  const {
    accountName,
    accountType,
    maskAccountNumber,
    balance,
    walletName,
    createdAt,
  } = payee;
  const { addToast } = useToast();
  const [gqlBank, { loading: bankBalanceLoading }] =
    useGetBankAccountBalanceLazyQuery();
  const [gqlMain, { loading: walletBalanceLoading }] =
    useGetWalletBalanceLazyQuery();
  const [gqlSub, { loading: subWalletBalanceLoading }] =
    useGetSubWalletBalanceLazyQuery();
  const [updatedAmount, setUpdatedAmount] = useState('');

  const name =
    accountType === 'WALLET'
      ? walletName
      : `${accountName}****${maskAccountNumber}`;

  useEffect(() => {
    async function fetchBalance() {
      switch (payee.accountType) {
        case 'BANK':
          gqlBank({
            variables: {
              id: payee.id,
            },
            fetchPolicy: 'network-only',
            onCompleted: (res) => {
              setUpdatedAmount(
                convertToCurrency(
                  res.getBankAccountBalance?.balance?.value || 0,
                  res.getBankAccountBalance?.balance?.currency!,
                  2,
                ),
              );
            },
            onError: (error) => {
              Sentry.captureException(error, {
                tags: {
                  section: 'fetchAccountBalanceDoneScreen',
                },
              });
              if (error instanceof Error) {
                addToast('error', 'none', `${error.message}`);
              } else {
                addToast('error', 'none', 'Unable to fetch account balance');
              }
            },
          });
          break;
        case 'WALLET':
          if (payee.chamberId) {
            gqlSub({
              variables: {
                chamberId: payee.chamberId,
              },
              fetchPolicy: 'network-only',
              onCompleted: (res) => {
                setUpdatedAmount(
                  convertToCurrency(
                    res.getSubWalletBalance?.amount?.value || 0,
                    res.getSubWalletBalance?.amount?.currency!,
                    2,
                  ),
                );
              },
              onError: (error) => {
                Sentry.captureException(error, {
                  tags: {
                    section: 'fetchSubwalletBalanceDoneScreen',
                  },
                });
                if (error instanceof Error) {
                  addToast('error', 'none', `${error.message}`);
                } else {
                  addToast(
                    'error',
                    'none',
                    'Unable to fetch subwallet balance',
                  );
                }
              },
            });
          } else {
            gqlMain({
              fetchPolicy: 'network-only',
              onCompleted: (res) => {
                setUpdatedAmount(
                  convertToCurrency(
                    res.getWalletBalance?.balance?.value || 0,
                    res.getWalletBalance?.balance?.currency!,
                    2,
                  ),
                );
              },
              onError: (error) => {
                Sentry.captureException(error, {
                  tags: {
                    section: 'fetchMasterWalletBalanceDoneScreen',
                  },
                });
                if (error instanceof Error) {
                  addToast('error', 'none', `${error.message}`);
                } else {
                  addToast(
                    'error',
                    'none',
                    'Unable to fetch master wallet balance',
                  );
                }
              },
            });
          }
          break;
        default:
      }
    }

    if (fetchUpdatedBalance) {
      fetchBalance();
    }
  }, [
    payee.accountType,
    payee.chamberId,
    payee.id,
    addToast,
    fetchUpdatedBalance,
    gqlBank,
    gqlMain,
    gqlSub,
  ]);

  const amount = convertToCurrency(balance || 0, CurrencyEnum.Usd, 2);

  const loading =
    bankBalanceLoading || walletBalanceLoading || subWalletBalanceLoading;

  const hideBalance =
    differenceInMinutes(Date.now(), new Date(createdAt!)) >
      MINUTES_TO_SHOW_ACCOUNT_BALANCE ||
    (accountType === 'BANK' && !balance);

  return (
    <Account>
      <Name selected={selected}>{name}</Name>
      {!hideBalance && (
        <Description selected={selected}>
          {!loading
            ? accountType === 'BANK' && !hideBalance
              ? t('noumena.money.payment.available.balance', {
                  balanceString: `${
                    fetchUpdatedBalance ? updatedAmount : amount
                  }`,
                })
              : `${fetchUpdatedBalance ? updatedAmount : amount}`
            : 'Fetching..'}
        </Description>
      )}
    </Account>
  );
};
