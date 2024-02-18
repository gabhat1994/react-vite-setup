import { type FC, useState, useMemo, useCallback, useEffect } from 'react';
import { captureException } from '@sentry/react';
import { type DropdownValueType } from '@/components/Dropdown';
import * as Types from '@/apollo/generated/types';
import {
  type AccountListOutputFragment,
  useGetAccountsQuery,
  useGetCustomerPayeeListQuery,
} from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks';
import {
  type TAccount,
  type TPayee,
  type TPayByCard,
  type Transactions,
  type TransactionCardDetailsT,
  type TransactionModalProps,
  type TTransactionDestination,
} from '@/features/TransactionModal/types';
import useInvoice from '@/features/invoices/hooks/useInvoice';
import { cleanList } from '@/utils/list';
import { BankUtil, TransactionAccountsUtil } from '@/features/money/utils';
import {
  PaymentDataContext,
  type PaymentDataContextType,
} from './PaymentDataContext';
import { generateAccountList, generatePayeeList } from '../listUtils';
import { isCustomerPayeeItem, getAmount } from '../helpers';

type PaymentDataProviderProps = Pick<
  TransactionModalProps,
  | 'defaultAccountID'
  | 'defaultPayeeID'
  | 'defaultWalletPayee'
  | 'answerForTip'
  | 'invoiceId'
  | 'maxTransactionAmount'
  | 'isSourceWalletExists'
  | 'predefinedPayeeList'
  | 'isDestinationDropdownDisabled'
  | 'defaultAmount'
  | 'disableAmountsField'
  | 'offerId'
  | 'campaignId'
  | 'campaignRepayment'
  | 'handleClose'
>;

const PaymentDataProvider: FC<PaymentDataProviderProps> = ({
  children,
  defaultAccountID,
  defaultPayeeID,
  defaultWalletPayee,
  answerForTip,
  invoiceId,
  maxTransactionAmount,
  isSourceWalletExists,
  predefinedPayeeList = [],
  isDestinationDropdownDisabled,
  defaultAmount,
  disableAmountsField,
  offerId,
  campaignId,
  campaignRepayment,
  handleClose,
}) => {
  const { addToast } = useToast();
  const { isUnauthenticated, isActive } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [transactionCardDetails, setTransactionCradDetails] =
    useState<TransactionCardDetailsT>({ brand: null, last4: null });
  const [source, setSource] = useState<TAccount | TPayByCard>('PAY_BY_CARD');
  const [bankAccountId, setBankAccountId] = useState<string | null>(null);
  const [fromList, setFromList] = useState<DropdownValueType<TAccount>[]>([]);
  const [toList, setToList] = useState<
    DropdownValueType<TPayee | TAccount | null>[]
  >([]);
  const [destination, setDestination] = useState<TTransactionDestination>(null);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentRef, setPaymentRef] = useState('');

  const { invoice } = useInvoice({ invoiceId });

  const KYC_DEACTIVATED_ERROR = 'Customer KYC is in DEACTIVATED state';

  const [transactionDetails, setTransactionDetails] = useState<Transactions>({
    amount: getAmount(defaultAmount),
    transactionReason: '',
    settlementPeriod: Types.SettlementPeriodEnum.Sameday,
  });

  const handleTransactionChange = useCallback((data: Transactions) => {
    const { amount, transactionReason, settlementPeriod } = data;
    setTransactionDetails((transactions) => ({
      ...transactions,
      amount,
      transactionReason,
      settlementPeriod,
    }));
  }, []);

  const { loading: getAccountsLoading, refetch: refetchAccounts } =
    useGetAccountsQuery({
      fetchPolicy: 'network-only',
      skip: isUnauthenticated,
      variables: {
        input: {
          self: true,
          limit: 100,
          page: 1,
        },
      },
      onCompleted: (data) => {
        const { getAccountList } = data;
        const dropdownAccountList = generateAccountList(getAccountList);

        setFromList(dropdownAccountList);
        setSource((previousSource) => {
          if (defaultAccountID) {
            const defaultAccount = dropdownAccountList.find(
              (account) => account.value.id === defaultAccountID,
            );
            if (defaultAccount) {
              return defaultAccount.value;
            }
          }
          if (dropdownAccountList.length) {
            const acc = returnAccount(dropdownAccountList);
            if (acc?.value) {
              return acc.value;
            }
          }
          return previousSource;
        });
      },
      onError: (error) => {
        captureException(error, {
          tags: {
            section: 'getAccountList',
          },
        });

        addToast('error', 'none', `${error.message}`);
      },
    });

  const returnAccount = (
    dropdownAccountList: DropdownValueType<AccountListOutputFragment, string>[],
  ) => {
    // Always return main wallet of active user if defaultAccountId is not provided
    if (isActive) {
      const mainWallet = dropdownAccountList.find((account) =>
        TransactionAccountsUtil.isMainWallet(account.value),
      );
      return mainWallet;
    }
    //  Return active bank if user is not active
    return dropdownAccountList.find(
      (account) =>
        TransactionAccountsUtil.isBank(account.value) &&
        BankUtil.isActive(account.value?.status),
    );
  };

  const {
    loading: getCustomerPayeeListLoading,
    refetch: refetchCustomerPayeeList,
  } = useGetCustomerPayeeListQuery({
    fetchPolicy: 'network-only',
    skip: !isSourceWalletExists || isUnauthenticated,
    onCompleted: (data) => {
      const { getCustomerPayeeList } = data;
      const filteredWalletList = cleanList(getCustomerPayeeList).filter(
        (payeeAccount) =>
          payeeAccount?.accountType === Types.AccountType.Wallet ||
          (payeeAccount?.accountType === Types.AccountType.Bank &&
            payeeAccount.subAccountType === Types.SubAccountType.External),
      );
      const dropdownPayeeList = generatePayeeList(filteredWalletList);

      if (!predefinedPayeeList.length) {
        setToList(dropdownPayeeList);
      }

      if (!answerForTip) {
        setDestination((previousDestination) => {
          if (defaultPayeeID) {
            const defaultPayee = dropdownPayeeList.find((payee) => {
              if (isCustomerPayeeItem(payee.value)) {
                return payee.value?.accountId === defaultPayeeID;
              }
              return payee.value?.id === defaultPayeeID;
            });
            if (defaultPayee) {
              return defaultPayee.value;
            }
          }

          return previousDestination;
        });
      }
    },
    onError: (error) => {
      captureException(error, {
        tags: {
          section: 'getCustomerPayeeListData',
        },
      });

      if (error.message === KYC_DEACTIVATED_ERROR) {
        handleClose();
      }
      addToast('error', 'none', `${error.message}`);
    },
  });

  const loading = getAccountsLoading || getCustomerPayeeListLoading;

  useEffect(() => {
    if (!destination && defaultWalletPayee) {
      setDestination(defaultWalletPayee);
    }
    if (predefinedPayeeList.length) {
      setToList(generatePayeeList(predefinedPayeeList));
    }
  }, [defaultWalletPayee, destination, predefinedPayeeList]);

  useEffect(() => {
    if (answerForTip) {
      setDestination({
        _id: answerForTip._id,
        user: answerForTip.user,
        __typename: answerForTip.__typename,
      });
    }
  }, [answerForTip]);

  const refetchPaymentData = useCallback(() => {
    if (isSourceWalletExists) {
      refetchCustomerPayeeList();
    }
    refetchAccounts();
  }, [isSourceWalletExists, refetchAccounts, refetchCustomerPayeeList]);

  const contextValue: PaymentDataContextType = useMemo(
    () => ({
      loading,
      fromList,
      toList,
      source,
      setSource,
      destination,
      bankAccountId,
      setBankAccountId,
      setDestination,
      handleTransactionChange,
      transactions: transactionDetails,
      clientSecret,
      setClientSecret,
      isStripeFlow: source === 'PAY_BY_CARD',
      refetchPaymentData,
      setPaymentStatus,
      paymentStatus,
      defaultPayeeID,
      defaultWalletPayee,
      transactionCardDetails,
      setTransactionCradDetails,
      invoice,
      maxTransactionAmount,
      isDestinationDropdownDisabled,
      predefinedPayeeList,
      disableAmountsField,
      campaignId,
      offerId,
      paymentRef,
      setPaymentRef,
      campaignRepayment,
      isSourceWalletExists,
    }),
    [
      loading,
      fromList,
      toList,
      source,
      destination,
      handleTransactionChange,
      transactionDetails,
      clientSecret,
      refetchPaymentData,
      paymentStatus,
      defaultPayeeID,
      defaultWalletPayee,
      transactionCardDetails,
      invoice,
      maxTransactionAmount,
      isDestinationDropdownDisabled,
      predefinedPayeeList,
      disableAmountsField,
      campaignId,
      offerId,
      paymentRef,
      campaignRepayment,
      bankAccountId,
      isSourceWalletExists,
    ],
  );

  return (
    <PaymentDataContext.Provider value={contextValue}>
      {children}
    </PaymentDataContext.Provider>
  );
};

export default PaymentDataProvider;
