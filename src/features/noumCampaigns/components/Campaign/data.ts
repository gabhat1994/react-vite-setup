import {
  type CampaignActionProps,
  CampaignSummaryItemMap,
  type CampaignSummaryOption,
} from './types';

const {
  CLICKS_TO_NOUMS,
  CONNECTIONS_DECLINED,
  CONNECTIONS_MADE,
  FOLLOWERS_GAINED,
  INIVITES_SENT,
  VIEWS,
} = CampaignSummaryItemMap;

const enPrefixKey = 'noumena.chamber_edit.broadcasting.campaign.table.label';

export const campaignActionOptions: CampaignActionProps[] = [
  {
    key: 'invite-cancel',
    label: 'Cancel Campaign',
    type: 'value',
    description: '',
    value: 'Cancel',
    labelColor: '--text-tablecell-header-danger-primary-highlighted',
  },
];

export const campaignSummaryOptions: CampaignSummaryOption[] = [
  {
    translationKey: `${enPrefixKey}.inivites_sent`,
    mapKey: INIVITES_SENT,
  },
  {
    translationKey: `${enPrefixKey}.views`,
    mapKey: VIEWS,
  },
  {
    translationKey: `${enPrefixKey}.clicks_to_noums`,
    mapKey: CLICKS_TO_NOUMS,
  },
  {
    translationKey: `${enPrefixKey}.connections_made`,
    mapKey: CONNECTIONS_MADE,
  },
  {
    translationKey: `${enPrefixKey}.connections_declined`,
    mapKey: CONNECTIONS_DECLINED,
  },
  {
    translationKey: `${enPrefixKey}.followers_gained`,
    mapKey: FOLLOWERS_GAINED,
  },
];
