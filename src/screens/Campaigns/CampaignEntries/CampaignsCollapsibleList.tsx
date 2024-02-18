import { type CampaignBasicFragment } from '@/apollo/graphql';
import { CampaignsCollapsibleItem } from './CampaignsCollapsibleItem';
import { type Props as BadgeProps } from '../components/Badge';
import { Utils } from '../utils';

type Props = {
  campaigns: CampaignBasicFragment[];
  onDelete: (campaign: { id: string; title: string }) => void;
};

export function CampaignsCollapsibleList({ campaigns, onDelete }: Props) {
  return (
    <>
      {campaigns.map((campaign) => (
        <CampaignsCollapsibleItem
          campaign={campaign}
          key={campaign._id ?? ''}
          campaignStatus={campaign.status as BadgeProps['status']}
          campaignName={campaign.title || ''}
          noumName={campaign.noumId?.name || ''}
          campaignStartDate={Utils.formatDate(campaign.startDate)}
          campaignEndData={
            campaign.endDate ? Utils.formatDate(campaign.endDate) : '-'
          }
          onDelete={onDelete}
        />
      ))}
    </>
  );
}
