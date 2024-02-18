import { CampaignAudienceTarget } from '@/apollo/generated/types';

export const campaignOptions = [
  {
    id: CampaignAudienceTarget.EntireCommunity,
    heading: 'noumena.chamber_edit.new_broadcasting.list_header_1',
    description: 'noumena.chamber_edit.new_broadcasting.list_description_1',
  },
  {
    id: CampaignAudienceTarget.MyCircle,
    heading: 'noumena.chamber_edit.new_broadcasting.list_header_2',
    description: 'noumena.chamber_edit.new_broadcasting.list_description_2',
  },
  {
    id: CampaignAudienceTarget.MyNoums,
    heading: 'noumena.chamber_edit.new_broadcasting.list_header_3',
    description: 'noumena.chamber_edit.new_broadcasting.list_description_3',
  },
  {
    id: CampaignAudienceTarget.FollowersOfMyNoums,
    heading: 'noumena.chamber_edit.new_broadcasting.list_header_4',
    description: 'noumena.chamber_edit.new_broadcasting.list_description_4',
  },
];
