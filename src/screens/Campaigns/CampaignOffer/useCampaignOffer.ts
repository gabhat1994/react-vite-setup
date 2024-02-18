/* eslint-disable no-case-declarations */
import { useCallback, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { useModalManager } from '@/hooks/modal/useModalManager';

import {
  useCampaignAccountLazyQuery,
  useCampaignForOfferQuery,
  useCampaignOfferByIdQuery,
  useRejectCampaignOfferMutation,
  useWalletStatusForCampaignPaymentLazyQuery,
} from '@/apollo/graphql';

import { useError, useToast } from '@/hooks';

import { EnumAdCampaignOfferStatus } from '@/apollo/generated/types';

import { WALLET_CREATED } from '@/screens/Money/Payments/Wallets/types';

import { type WalletStatus } from '@/features/money/types';
import { type Action } from './types';
import { Utils } from '../utils';

type Params = {
  id?: string;
};

export const useCampaignOffer = () => {
  const logger = useError();
  const params = useParams<Params>();
  const [showInfoBox, setShowInfoBox] = useState(true);

  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('campaignId');
  const { addSuccessIconToast, addErrorToast, addPrimaryIconToast } =
    useToast();
  const { modalType, openModal, closeModal } = useModalManager<Action>();

  const [checkWallet, { loading: walletCheckingInProgress }] =
    useWalletStatusForCampaignPaymentLazyQuery({
      fetchPolicy: 'cache-and-network',
      onError: (e) => logger.logError(e, 'check-wallet-status', false),
    });

  const [
    getAccount,
    { data: campaignAccountData, loading: loadingCampaignAccount },
  ] = useCampaignAccountLazyQuery({
    onError: (e) => logger.logError(e, 'get-default-campaign-account', false),
  });

  const {
    data: campaignData,
    refetch: refetchCampaign,
    loading: loadingCampaign,
  } = useCampaignForOfferQuery({
    skip: !campaignId,
    variables: { campaignId: campaignId ?? '' },
    onError: (e) => logger.logError(e, 'campaign-summary-in-offer', true),
  });

  const {
    data: offerData,
    refetch: refetchOffers,
    loading: loadingOffer,
  } = useCampaignOfferByIdQuery({
    variables: { offerId: params.id ?? '' },
    skip: !params.id,
    onError: (e) => logger.logError(e, 'offer-by-id', true),
  });

  const campaignAccount = Utils.mapCampaignAcount(
    campaignAccountData?.getCampaignAccount,
  );

  const [rejectOffer, { loading: loadingRejection }] =
    useRejectCampaignOfferMutation({
      onError: (error) => logger.logError(error, 'reject-offer', true),
      onCompleted: ({ rejectAdCampaignOffer }) => {
        if (rejectAdCampaignOffer.success) {
          closeModal();
          addSuccessIconToast('Offer has been declined. We’ve been notified.');
          refetchCampaign();
          refetchOffers();
        }
      },
    });

  const handleModalAction = useCallback(
    async (type: Action, rejectedReason: string) => {
      switch (type) {
        case 'accept':
          const { data: wallet } = await checkWallet();

          const walletStatus = wallet?.getWalletBalance?.status as WalletStatus;

          const isWalletCreated = WALLET_CREATED.includes(walletStatus ?? '');

          if (!isWalletCreated) {
            addErrorToast(
              `Your wallet is not yet created. Please retry after creating you wallet in Money Page.`,
            );
            closeModal();

            return;
          }
          const { data: accData } = await getAccount();

          const isAccountSetByAdmin = accData?.getCampaignAccount?.id;

          closeModal();

          if (isAccountSetByAdmin) {
            openModal('pay');
          } else {
            addErrorToast(
              'Unable to process payment at this time. Contact Noumena Support',
            );
          }
          break;
        case 'reject':
          rejectOffer({
            variables: {
              offerId: offerData?.getAdCampaignOfferOne?._id ?? '',
              reason: rejectedReason,
            },
          });
          break;
        default:
          closeModal();
      }
    },
    [
      checkWallet,
      getAccount,
      closeModal,
      rejectOffer,
      offerData?.getAdCampaignOfferOne?._id,
      openModal,
      addErrorToast,
    ],
  );

  const campaign = {
    ...Utils.mapCampaignForOffer(campaignData?.getSelectedAdCampaignDetails),
    campaignId,
  };

  const acceptAndPay = useCallback(() => openModal('accept'), [openModal]);
  const reject = useCallback(() => openModal('reject'), [openModal]);
  const offer = Utils.cleanOffer(offerData?.getAdCampaignOfferOne);

  const hideRejected = Utils.hideReject(offer.status);

  const hidePayment = Utils.hidePayment(campaign.status, offer.status);

  const repayment = Utils.isRepayment(campaign.status, offer.status);

  const onAccepted = useCallback(async () => {
    closeModal();
    refetchCampaign();
    const { data } = await refetchOffers();
    if (
      data &&
      data?.getAdCampaignOfferOne?.status === EnumAdCampaignOfferStatus.Accepted
    ) {
      addPrimaryIconToast(
        'We are processing your payment, the campaign will change its status soon.',
      );
    }
  }, [addPrimaryIconToast, closeModal, refetchCampaign, refetchOffers]);

  const toggleInfoBox = useCallback(() => {
    setShowInfoBox((s) => !s);
  }, []);

  return {
    campaign,
    offer,
    campaignAccount,
    repayment,
    refetch: {
      onAccepted,
    },
    loading: {
      page: loadingCampaign || loadingOffer,
      rejection: loadingRejection,
      campaignAccount: loadingCampaignAccount,
      wallet: walletCheckingInProgress,
    },
    button: {
      hideRejected,
      hidePayment,
    },
    modal: {
      modalType,
      handleModalAction,
      closeModal,
    },
    userAction: {
      acceptAndPay,
      reject,
    },
    infobox: {
      toggle: toggleInfoBox,
      open: showInfoBox,
    },
  };
};
