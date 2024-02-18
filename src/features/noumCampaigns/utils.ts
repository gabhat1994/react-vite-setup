import {
  type ProjectNoumCampaign,
  ProjectNoumCampaignStatus,
  type Scalars,
} from '@/apollo/generated/types';
import { type CampaignProps } from './components';

const formatDateString = (iso: Scalars['ISODate']) => {
  const [onlyDate] = iso ? iso.split('T') : [iso];
  if (onlyDate) {
    const [year, month, day] = onlyDate.split('-');
    return `${month}/${day}/${year}`;
  }
  return onlyDate;
};

export const transformCampaign = (
  data: ProjectNoumCampaign,
): CampaignProps => ({
  id: data._id as string,
  unformattedStartTime: data.startedAt,
  startedAt: formatDateString(data.startedAt),
  finishedAt: formatDateString(data.finishedAt),
  refreshedAt: formatDateString(data.refreshedAt),
  status: data.status ?? ProjectNoumCampaignStatus.Cancelled,
  clicksToNoums: data.clicksToNoums as number,
  connectionsDeclined: data.connectionsDeclined as number,
  connectionsMade: data.connectionsMade as number,
  followersGained: data.followersGained as number,
  invitesSent: data.invitesSent as number,
  views: data.views as number,
});
