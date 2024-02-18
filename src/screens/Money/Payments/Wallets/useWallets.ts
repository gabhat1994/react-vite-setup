import { useGetWalletQuery } from '@/apollo/graphql';
import { useNavigate } from 'react-router';
import ROUTES from '@/constants/routes';
import { useCallback } from 'react';
import { NetworkStatus } from '@apollo/client';
import { useAuth } from '@/features/auth/contexts';
import { t } from 'i18next';
import { WalletStatus, DocumentStatusV2 } from '@/features/money/types';
import { WalletUtils } from '@/features/money/utils';
import { CustomerType, NoumenaStatus, ProviderStatus } from './types';

export const useWallets = () => {
  const { data, refetch, networkStatus, error } = useGetWalletQuery({
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const { isPending } = useAuth();

  const navigate = useNavigate();

  const applicationReview = useCallback(() => {
    navigate(ROUTES.APPLICATION_REVIEW);
  }, [navigate]);

  const walletSetupRetry = useCallback(() => {
    navigate(ROUTES.WALLET_SETUP_RETRY);
  }, [navigate]);

  const { status, docStatus, customerType, noumenaStatus, providerStatus } =
    data?.getWalletBalance || {};

  const createWallet = WalletUtils.canCreateWallet(status || '');

  const walletRejected =
    noumenaStatus === NoumenaStatus.REJECTED ||
    providerStatus === ProviderStatus.DEACTIVATED ||
    providerStatus === ProviderStatus.SUSPENDED;

  const walletRetry =
    customerType === CustomerType.UNVERIFIED ||
    (providerStatus === ProviderStatus.RETRY &&
      docStatus !== DocumentStatusV2.UPLOADED);

  const uploadDocument =
    (providerStatus === ProviderStatus.VERIFIED ||
      providerStatus === ProviderStatus.DOCUMENT) &&
    customerType === CustomerType.VERIFIED &&
    WalletUtils.canUploadDocument(docStatus || '');

  const showWallet = noumenaStatus === NoumenaStatus.APPROVED;

  const walletProcessing =
    !walletRetry &&
    !uploadDocument &&
    !showWallet &&
    !walletRejected &&
    status !== WalletStatus.CUSTOMER_NOT_CREATED;

  const balance = data?.getWalletBalance?.total;

  const canRefreshWallet = !providerStatus;

  const errorMessage = isPending
    ? t('noumena.money.setup_wallet.not.authorized.v2')
    : t('noumena.money.setup_wallet.error.generic');

  return {
    refetch,
    loading:
      networkStatus === NetworkStatus.loading ||
      networkStatus === NetworkStatus.refetch,
    canRefreshWallet,
    wallet: {
      balance,
    },
    render: {
      createWallet,
      walletRejected,
      walletRetry,
      uploadDocument,
      showWallet,
      walletProcessing,
      errorScreen: {
        show: !!error,
        errorMessage,
      },
    },
    goTo: {
      applicationReview,
      walletSetupRetry,
    },
  };
};
