import { useCallback, useState, useMemo } from 'react';
import { useNavigate, useParams, generatePath } from 'react-router';

import {
  useCampaignOfferIdQuery,
  useCampaignReportsIdQuery,
  useCampaignSummaryQuery,
  useDeleteCampaignMutation,
} from '@/apollo/graphql';

import ROUTES from '@/constants/routes';
import { useError, useToast } from '@/hooks';
import { cleanList } from '@/utils/list';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { Utils } from '../utils';

type Params = { id?: string };

type ModalType = 'delete-confirmation';

export function useCampaignSummary() {
  const params = useParams<Params>();
  const modal = useModalManager<ModalType, { id: string; title: string }>();
  const navigate = useNavigate();
  const log = useError();
  const toast = useToast();
  const [deleteCampaign, deleteCampaignStatus] = useDeleteCampaignMutation();
  const [showOldOffers, setShowOldOffers] = useState(false);

  const campaignSummary = useCampaignSummaryQuery({
    skip: !params.id,
    variables: {
      campaignId: params.id ?? '',
    },
    onError: (error) => log.logError(error, 'useCampaignSummaryQuery', true),
  });

  const offersSummary = useCampaignOfferIdQuery({
    skip: !params.id,
    fetchPolicy: 'cache-and-network',
    variables: {
      campaignId: params.id ?? '',
    },
    onError: (error) => log.logError(error, 'get-campaign-offer-id', true),
  });

  const reportsSummary = useCampaignReportsIdQuery({
    skip: !params.id,
    fetchPolicy: 'cache-and-network',
    variables: {
      campaignId: params.id ?? '',
      offset: 0,
      limit: 100,
    },
    onError: (error) => log.logError(error, 'get-campaign-offer-id', true),
  });

  const softDelete = async () => {
    if (!params.id) {
      toast.addErrorToast('Campaign not found');
      return;
    }

    try {
      await deleteCampaign({ variables: { campaignId: params.id } });
      modal.closeModal();
      toast.addSuccessIconToast('Campaign has been deleted');
      navigate(ROUTES.CAMPAIGNS);
    } catch (error) {
      log.logError(error, 'delete-campaign', true);
    }
  };

  const duplicate = useCallback(() => {
    const id = params.id ?? 'new';
    navigate(generatePath(ROUTES.CAMPAIGN_CREATE, { id }));
  }, [navigate, params.id]);

  const viewOffer = useCallback(
    (id: string) => {
      navigate({
        pathname: generatePath(ROUTES.CAMPAIGN_OFFER, { id }),
        search: `?campaignId=${params.id ?? ''}`,
      });
    },
    [navigate, params.id],
  );

  const viewReport = useCallback(
    (id: string) => {
      navigate({
        pathname: generatePath(ROUTES.CAMPAIGN_REPORT, { id }),
        search: `?campaignId=${params.id ?? ''}`,
      });
    },
    [navigate, params.id],
  );

  const toggleOldOffers = useCallback(
    (checked: boolean) => setShowOldOffers(checked),
    [],
  );

  const totalOffers = useMemo(
    () =>
      Utils.removeDraftOffer(offersSummary?.data?.getAdCampaignOffers?.data),
    [offersSummary?.data?.getAdCampaignOffers?.data],
  );

  const reportList = useMemo(
    () => cleanList(reportsSummary?.data?.getAdCampaignReports?.data),
    [reportsSummary?.data?.getAdCampaignReports?.data],
  );
  const summary = campaignSummary?.data?.getSelectedAdCampaignDetails;

  const openDeleteConfirmationModal = useCallback(() => {
    modal.openModal('delete-confirmation', {
      id: params.id || '',
      title: summary?.title || '',
    });
  }, [modal, params.id, summary?.title]);

  const handleBack = useCallback(() => navigate(ROUTES.CAMPAIGNS), [navigate]);

  const offerList = showOldOffers
    ? totalOffers
    : totalOffers.length
    ? [totalOffers[0]]
    : [];
  const reportCount = reportsSummary?.data?.getAdCampaignReports?.count ?? 0;

  return {
    modal: {
      ...modal,
    },
    campaign: {
      summary,
      duplicate,
      softDelete,
      viewOffer,
      viewReport,
      handleBack,
      openDeleteConfirmationModal,
      isDeleting: deleteCampaignStatus.loading,
    },
    offers: {
      list: offerList,
      count: totalOffers.length,
      toggleOldOffers,
    },

    reports: {
      list: reportList,
      count: reportCount,
    },

    loading: {
      campaign: campaignSummary.loading,
      offers: offersSummary.loading,
      reports: reportsSummary.loading,
    },
  };
}
