import { useCallback } from 'react';

import { useUpdateCampaignMutation } from '@/apollo/graphql';

import { type UpdateAdCampaignInput } from '@/apollo/generated/types';

import { useError } from '@/hooks';

type Props = {
  offerId: string;
  campaignRepayment: boolean;
} & Required<Pick<UpdateAdCampaignInput, 'campaignId' | 'paymentRef'>>;

export const useCampaignPayment = () => {
  const logger = useError();

  const [updateCampaign, updateCampaignMetaData] = useUpdateCampaignMutation({
    onError: (e) => logger.logError(e, 'update-campaign-mutation', true),
  });

  const mapPaymentAgainstCampaign = useCallback(
    async (props: Props) => {
      const updateCampaignResponse = await updateCampaign({
        variables: {
          input: {
            campaignId: props.campaignId,
            paymentRef: props.paymentRef,
            offerId: props.campaignRepayment ? undefined : props.offerId,
          },
        },
      });

      return { error: updateCampaignResponse.errors };
    },
    [updateCampaign],
  );

  return {
    mapPaymentAgainstCampaign,
    loading: updateCampaignMetaData.loading,
  };
};
