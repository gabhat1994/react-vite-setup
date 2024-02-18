import { useNavigate, useParams } from 'react-router';
import {
  useCampaignSummaryQuery,
  useCreateNewCampaignMutation,
  useNoumAssignmentQuery,
} from '@/apollo/graphql';
import { useError } from '@/hooks';
import {
  SpaceStatusEnum,
  type AdCampaignInput,
  ProjectChamberType,
} from '@/apollo/generated/types';
import ROUTES from '@/constants/routes';
import { useCallback, useState } from 'react';
import { useCampaignFilterContext } from '@/providers/CampaignListFilterProvider';
import { useCampaignForm } from './useCampaignForm';
import { Utils } from '../utils';

type UseCampaignServices = {
  onCreated?: (id: string) => void;
};

export function useCampaignFormServices({ onCreated }: UseCampaignServices) {
  const { logError } = useError();

  const { updateFilterState, noums: filterNoums } = useCampaignFilterContext();

  const [noumLimit, setNoumLimit] = useState(20);

  const navigate = useNavigate();

  const params = useParams();

  const campaign = useCampaignForm();

  const duplication = useCampaignSummaryQuery({
    skip: !params.id,
    variables: {
      campaignId: params.id!,
    },
    onCompleted: ({ getSelectedAdCampaignDetails: summary }) => {
      if (campaign) {
        const clone = {
          ...Utils.cleanCampaignSummary(summary),
          title: `${summary?.title}_Clone`,
        };

        if (!clone.otherGoals) {
          delete clone.otherGoals;
        }
        campaign.updateCampaign(clone);
      }
    },
  });

  const noums = useNoumAssignmentQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: noumLimit,
      filters: {
        status: SpaceStatusEnum.Published,
        projectType: ProjectChamberType.Public,
      },
    },

    onCompleted: ({ getOwnProjectChambers }) => {
      if (
        getOwnProjectChambers?.count &&
        getOwnProjectChambers.count > noumLimit
      ) {
        setNoumLimit(getOwnProjectChambers.count);
      }
    },

    onError: (error) => {
      logError(error, 'noum-assignment-create-campaign', true);
    },
  });

  const [createCampaignFn, createCampaignState] = useCreateNewCampaignMutation({
    variables: {
      input: campaign.campaign! as AdCampaignInput,
    },
    onCompleted: ({ createAdCampaign }) => {
      if (
        createAdCampaign?.noumId?._id &&
        filterNoums.length &&
        !filterNoums.includes(createAdCampaign.noumId._id)
      ) {
        const updatedNoum = [...filterNoums];
        updatedNoum.push(createAdCampaign.noumId._id);
        updateFilterState({ noums: updatedNoum });
      }
      onCreated?.(createAdCampaign?._id ?? 'new');
    },
    onError: (error) => logError(error, 'create-campaign', true),
  });

  const handleDelete = useCallback(() => {
    navigate(ROUTES.CAMPAIGNS);
  }, [navigate]);

  return {
    noums,
    createCampaignFn,
    createCampaignState,
    campaign,
    duplication,
    handleDelete,
  };
}
