import ListLayout from '@/layout/ListLayout';
import { useCampaignListCountQuery } from '@/apollo/graphql';
import { Spinner } from '@/components/Spinner';

import { CampaignEntries } from '../CampaignEntries';
import { EmptyCampaign } from '../EmptyCampaign';

export const CampaignManager = () => {
  const campaigns = useCampaignListCountQuery({
    fetchPolicy: 'cache-and-network',
  });

  const showEntries = !!campaigns.data?.getAdCampaignsByUser?.count;

  if (campaigns.loading) {
    return (
      <ListLayout type="Campaigns">
        <Spinner />
      </ListLayout>
    );
  }

  return (
    <ListLayout type="Campaigns">
      {!showEntries && <EmptyCampaign />}
      {showEntries && <CampaignEntries />}
    </ListLayout>
  );
};
