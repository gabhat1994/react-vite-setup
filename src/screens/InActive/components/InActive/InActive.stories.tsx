import { type Meta } from '@storybook/react';
import { InActive } from './InActive';
import { type InActiveProps } from './types';
import { Wrapper } from './styles';

export default {
  title: 'Atoms/InActive',
  component: InActive,
  argTypes: {
    userStatus: {
      options: [
        'REJECTED',
        'PENDING',
        'INACTIVE',
        'ACTIVE',
        'DEACTIVATED',
        'UNREGISTERED',
      ],
      control: {
        type: 'select',
      },
    },
    statusReason: {
      options: [
        'Incomplete Application',
        'Unable To Access Infomation',
        'Freelancer Status Not Verified',
        'Region Not Supported',
      ],
      control: {
        type: 'select',
      },
    },
    description: {
      control: { type: 'text' },
    },
  },
} as Meta<typeof InActive>;

export const Primary = {
  render: ({ userStatus, statusReason, description }: InActiveProps) => {
    const handleLogout = () => {};

    return (
      <Wrapper>
        <InActive
          userStatus={userStatus}
          statusReason={statusReason}
          description={description}
          handleLogout={handleLogout}
        />
      </Wrapper>
    );
  },
};
