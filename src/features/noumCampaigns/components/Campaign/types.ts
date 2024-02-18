import { type ProjectNoumCampaignStatus } from '@/apollo/generated/types';

type Actions = 'Refresh' | 'Cancel';

export type CampaignHeaderProps = Pick<
  CampaignComponentProps,
  | 'id'
  | 'status'
  | 'startedAt'
  | 'onDelete'
  | 'selectBroadcast'
  | 'unformattedStartTime'
>;

export type CampaignProps = {
  id: string;
  unformattedStartTime: string;
  startedAt: string | null;
  refreshedAt: string | null;
  finishedAt: string | null;
  status?: ProjectNoumCampaignStatus;
  invitesSent: number;
  views: number;
  clicksToNoums: number;
  connectionsMade: number;
  connectionsDeclined: number;
  followersGained: number;
};

export type CampaignComponentProps = CampaignProps & {
  onDelete: () => void;
  selectBroadcast: (campaignId: string) => void;
};

export type CampaignActionProps = {
  key: string;
  label: string;
  type: 'value';
  value: Actions;
  description?: string;
  selected?: boolean;
  labelColor?: string;
};

export enum CampaignSummaryItemMap {
  INIVITES_SENT = 'invitesSent',
  VIEWS = 'views',
  CLICKS_TO_NOUMS = 'clicksToNoums',
  CONNECTIONS_MADE = 'connectionsMade',
  CONNECTIONS_DECLINED = 'connectionsDeclined',
  FOLLOWERS_GAINED = 'followersGained',
}

export type CampaignSummaryOption = {
  translationKey: string;
  mapKey: CampaignSummaryItemMap;
};

export type CampaignSummaryItem = {
  property: string;
  value: number | string | null;
};
