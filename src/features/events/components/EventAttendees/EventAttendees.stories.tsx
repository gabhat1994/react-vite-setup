import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { EventAttendees } from './EventAttendees';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  background: var(--bg-body-neutral-alt-highlighted);
`;

export default {
  title: 'UI/Event/EventAttendees',
  component: EventAttendees,
  args: {
    avatarUrls: [
      'https://www.w3schools.com/howto/img_avatar2.png',
      'https://www.w3schools.com/howto/img_avatar2.png',
      'https://www.w3schools.com/howto/img_avatar2.png',
      'https://www.w3schools.com/howto/img_avatar2.png',
    ],
  },
  argTypes: {
    isHost: {
      control: { type: 'boolean' },
    },
    isInvited: {
      control: { type: 'boolean' },
    },
    fullName: {
      control: { type: 'text' },
    },
    avatarUrls: {
      control: { type: 'object' },
    },
  },
} as Meta<typeof EventAttendees>;

export const Primary = {
  render: (args: {
    isHost: boolean;
    avatarUrls: string[];
    isInvited?: boolean;
    fullName?: string;
  }) => (
    <Wrapper>
      <EventAttendees {...args} onViewAttendees={() => null} />
    </Wrapper>
  ),
};
