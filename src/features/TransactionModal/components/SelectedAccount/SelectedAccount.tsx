import {
  type CSSProperties,
  type FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as Sentry from '@sentry/react';
import { differenceInMinutes } from 'date-fns';
import { t } from 'i18next';
import mainWallet from '@/assets/images/noumena-filled-logo.svg';

import { useToast } from '@/hooks';
import { Icon } from '@/components/Icon';
import {
  useGetNoumProfileLazyQuery,
  useGetBankAccountBalanceLazyQuery,
  useGetWalletBalanceLazyQuery,
  useGetSubWalletBalanceLazyQuery,
} from '@/apollo/graphql';
import convertToCurrency from '@/utils/currencyToCurrency';
import { CurrencyEnum } from '@/apollo/generated/types';
import { MINUTES_TO_SHOW_ACCOUNT_BALANCE } from '@/constants/payments';
import { type TAccount, type TPayByCard } from '../../types';
import { Account, Image } from '../styles';
import { SelectedAccountWrapper, Name, Description } from './style';
import { PaymentDataContext } from '../../contexts/PaymentDataContext';

interface AccountProps {
  account: TAccount | TPayByCard;
  showBalance?: boolean;
  fetchUpdatedBalance?: boolean;
  customStyles?: CSSProperties;
}
const SelectedAccount: FC<AccountProps> = ({
  account,
  showBalance = true,
  fetchUpdatedBalance = false,
  customStyles,
}) => {
  const { isStripeFlow } = useContext(PaymentDataContext);
  const getAccount = () => {
    if (!isStripeFlow && account !== 'PAY_BY_CARD') {
      return (
        <NonCardAccounts
          account={account}
          showBalance={showBalance}
          fetchUpdatedBalance={fetchUpdatedBalance}
        />
      );
    }
    return <CardAccount />;
  };
  return (
    <SelectedAccountWrapper style={{ ...customStyles }}>
      {getAccount()}
    </SelectedAccountWrapper>
  );
};

export default SelectedAccount;

interface NonCardAccountsT {
  showBalance?: boolean;
  fetchUpdatedBalance?: boolean;
  account: TAccount;
}

const NonCardAccounts: FC<NonCardAccountsT> = ({
  account,
  showBalance = true,
  fetchUpdatedBalance = false,
}) => {
  const { addToast } = useToast();
  const [src, setSrc] = useState(mainWallet);
  const [gqlGetNoumProfile] = useGetNoumProfileLazyQuery();
  const [gqlBank, { loading: bankBalanceLoading }] =
    useGetBankAccountBalanceLazyQuery();
  const [gqlMain, { loading: walletBalanceLoading }] =
    useGetWalletBalanceLazyQuery();
  const [gqlSub, { loading: subWalletBalanceLoading }] =
    useGetSubWalletBalanceLazyQuery();
  const [updatedAmount, setUpdatedAmount] = useState('');

  useEffect(() => {
    if (account?.chamberId) {
      gqlGetNoumProfile({
        variables: {
          id: account.chamberId,
        },
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
          setSrc(data.getSpaceById?.profileImage || mainWallet);
        },
      });
    }
  }, [gqlGetNoumProfile, account]);

  useEffect(() => {
    async function fetchBalance() {
      switch (account?.accountType) {
        case 'WALLET':
          if (account.chamberId) {
            gqlSub({
              variables: {
                chamberId: account.chamberId,
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
    account?.accountType,
    account?.chamberId,
    account?.id,
    addToast,
    fetchUpdatedBalance,
    gqlBank,
    gqlMain,
    gqlSub,
  ]);

  if (!account) return null;

  const {
    accountName,
    accountType,
    maskAccountNumber,
    balance,
    walletName,
    createdAt,
  } = account;

  const name =
    accountType === 'WALLET'
      ? walletName
      : `${accountName}****${maskAccountNumber}`;

  const amount = convertToCurrency(balance || 0, CurrencyEnum.Usd, 2);

  const loading =
    bankBalanceLoading || walletBalanceLoading || subWalletBalanceLoading;

  const defaultImage = () => {
    setSrc(mainWallet);
  };

  const hideBalance =
    differenceInMinutes(Date.now(), new Date(createdAt!)) >
      MINUTES_TO_SHOW_ACCOUNT_BALANCE ||
    (accountType === 'BANK' && !balance);

  return (
    <>
      <Image src={src} alt="noum-logo" onError={defaultImage} />
      <Account>
        <Name>{name}</Name>
        {showBalance && !hideBalance && (
          <Description>
            {!loading
              ? accountType === 'BANK'
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
    </>
  );
};

const CardAccount = () => {
  const {
    transactionCardDetails: { brand, last4 },
  } = useContext(PaymentDataContext);

  const cardBrand = brand
    ? `${brand[0].toUpperCase()}${brand.substring(1).toLocaleLowerCase()}`
    : 'NA';
  const cardLast4 = last4 || '0000';

  const availableCardTypes = useMemo(
    () => [
      'amex',
      'diners',
      'discover',
      'mastercard',
      'unionpay',
      'visa',
      'jcb',
    ],
    [],
  );

  type BrandT =
    | 'amex'
    | 'diners'
    | 'discover'
    | 'mastercard'
    | 'unionpay'
    | 'visa'
    | 'jcb';

  const cardImage = useMemo(
    () =>
      brand && availableCardTypes.includes(brand)
        ? (brand as BrandT)
        : 'creadit_card_m',
    [availableCardTypes, brand],
  );

  return (
    <>
      <Icon name={cardImage} size={32} />
      <Account>
        <Name
          style={{ marginTop: '2.5px' }}
        >{`${cardBrand}****${cardLast4}`}</Name>
      </Account>
    </>
  );
};
