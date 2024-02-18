import { type Meta } from '@storybook/react';
import { type Timezone } from '@/apollo/generated/types';
import { LabelGroup, LabelWrap } from '@/components/StorybookHelpers/LabelWrap';
import { EventDurationBadge } from './EventDurationBadge';
import { type EventDurationBadgeProps } from './types';

const timezone: Timezone = { offset: '+5', abbr: 'DST' } as Timezone;

export default {
  title: 'UI/Event/EventDurationBadge',
  component: EventDurationBadge,
  argTypes: {
    height: {
      control: { type: 'number' },
    },
    startTimestamp: {
      control: { type: 'number' },
    },
    durationInMs: {
      control: { type: 'number' },
    },
    showCountDown: {
      control: { type: 'boolean' },
    },
  },
  args: {
    startTimestamp: Date.now() + 10000,
    durationInMs: 3600000,
    timezone,
  },
} as Meta<typeof EventDurationBadge>;

export const Primary = (props: EventDurationBadgeProps) => (
  <EventDurationBadge {...props} />
);

export const All = () => {
  const durationInSeconds = 3600;
  return (
    <LabelGroup columns={3}>
      <LabelWrap label="Live now: ">
        <EventDurationBadge
          eventDate={new Date()}
          durationInSeconds={durationInSeconds}
        >
          <div>Child</div>
        </EventDurationBadge>
      </LabelWrap>
      <LabelWrap label="Starts in 30 mins: ">
        <EventDurationBadge
          eventDate={new Date(Date.now() + 30 * 60 * 1000)}
          durationInSeconds={durationInSeconds}
        >
          <div>Child</div>
        </EventDurationBadge>
      </LabelWrap>
      <LabelWrap label="Finished: ">
        <EventDurationBadge
          eventDate={new Date(Date.now() - durationInSeconds * 1000 - 1000000)}
          durationInSeconds={durationInSeconds}
        >
          <div>Child</div>
        </EventDurationBadge>
      </LabelWrap>
      <LabelWrap label="Regular: ">
        <EventDurationBadge
          eventDate={new Date(Date.now() + 2 * durationInSeconds * 1000)}
          durationInSeconds={durationInSeconds}
        >
          <div>Child</div>
        </EventDurationBadge>
      </LabelWrap>
    </LabelGroup>
  );
};
