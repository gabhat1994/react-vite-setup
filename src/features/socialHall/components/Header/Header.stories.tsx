import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { AttendeeHeader } from './AttendeeHeader';
import { HostHeader } from './HostHeader';
import { EventStatusEnum } from './types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 90vh;
`;

export const SocialHallHostHeader = () => (
  <Wrapper>
    <HostHeader onViewAttendees={() => {}} />
  </Wrapper>
);

export const SocialHallAttendeeHeader = () => (
  <Wrapper>
    <AttendeeHeader onViewAttendees={() => {}} />
  </Wrapper>
);

export default {
  title: 'UI/SocialHall/Header',
  component: HostHeader,
  argTypes: {
    isBuzzRoom: {
      control: { type: 'boolean' },
    },
    eventStatus: {
      options: [
        EventStatusEnum.Started,
        EventStatusEnum.Countdown,
        EventStatusEnum.NotStarted,
      ],
      control: { type: 'select' },
    },
  },
} as Meta<typeof HostHeader>;
