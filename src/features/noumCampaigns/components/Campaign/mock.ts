import { ProjectNoumCampaignStatus } from '@/apollo/generated/types';
import { type CampaignComponentProps } from './types';

export const campaignsListData: CampaignComponentProps[] = [
  {
    clicksToNoums: 5,
    connectionsDeclined: 6,
    connectionsMade: 13,
    finishedAt: '03/07/2022',
    followersGained: 6,
    id: '12345',
    invitesSent: 20,
    refreshedAt: '03/07/2022',
    startedAt: '02/07/2022',
    status: ProjectNoumCampaignStatus.Active,
    views: 20,
    onDelete: () => {},
    selectBroadcast: () => {},
    unformattedStartTime: '2022-08-18T12:50:33.586Z',
  },
  {
    clicksToNoums: 5,
    connectionsDeclined: 6,
    connectionsMade: 13,
    finishedAt: '03/07/2022',
    followersGained: 6,
    id: '12345',
    invitesSent: 20,
    refreshedAt: '03/07/2022',
    startedAt: '03/07/2022',
    status: ProjectNoumCampaignStatus.Finished,
    views: 20,
    onDelete: () => {},
    selectBroadcast: () => {},
    unformattedStartTime: '2022-08-19T12:50:33.586Z',
  },
  {
    clicksToNoums: 5,
    connectionsDeclined: 6,
    connectionsMade: 13,
    finishedAt: '03/07/2022',
    followersGained: 6,
    id: '12345',
    invitesSent: 20,
    refreshedAt: '03/07/2022',
    startedAt: '03/07/2022',
    status: ProjectNoumCampaignStatus.Cancelled,
    views: 20,
    onDelete: () => {},
    selectBroadcast: () => {},
    unformattedStartTime: '2022-08-20T12:50:33.586Z',
  },
];