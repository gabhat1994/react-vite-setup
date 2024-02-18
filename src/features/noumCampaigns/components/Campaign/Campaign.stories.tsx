import { type Meta } from '@storybook/react';
import { ProjectNoumCampaignStatus } from '@/apollo/generated/types';
import Campaign from './Campaign';
import { StoriesWrapper, StoriesCnt } from './styles';
import { type CampaignComponentProps } from './types';

export default {
  title: 'UI/Broadcast/Campaign',
  component: Campaign,

  args: {
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
  },

  argTypes: {
    startedAt: {
      table: {
        disable: true,
      },
    },
    refreshedAt: {
      table: {
        disable: true,
      },
    },
    followersGained: {
      table: {
        disable: true,
      },
    },
    connectionsMade: {
      table: {
        disable: true,
      },
    },
    connectionsDeclined: {
      table: {
        disable: true,
      },
    },
    clicksToNoums: {
      table: {
        disable: true,
      },
    },
    finishedAt: {
      table: {
        disable: true,
      },
    },
    id: {
      table: {
        disable: true,
      },
    },
    invitesSent: {
      table: {
        disable: true,
      },
    },
    views: {
      table: {
        disable: true,
      },
    },
    onDelete: {
      table: {
        disable: true,
      },
    },
    selectBroadcast: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof Campaign>;

export const SingleCampaign = {
  render: ({ ...args }: CampaignComponentProps) => (
    <StoriesCnt>
      <StoriesWrapper>
        <Campaign {...args} />
      </StoriesWrapper>
    </StoriesCnt>
  ),
};
