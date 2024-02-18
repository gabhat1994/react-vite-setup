import { type Meta } from '@storybook/react';
import { TimeRelative } from './TimeRelative';

export default {
  title: 'Atoms/TimeRelative',
  component: TimeRelative,
  argTypes: {
    date: {
      control: { type: 'date' },
    },
    fromDate: {
      control: { type: 'date' },
    },
    font: {
      control: { type: 'select' },
      options: ['body-s', 'body-m', 'body-l', 'body-xl'],
    },
  },
  args: {
    date: new Date(),
    fromDate: new Date(),
    colorToken: '--text-timestamp-neutral-default',
    font: 'body-s',
  },
} as Meta<typeof TimeRelative>;

export const Demo = {};

export const Now = () => <TimeRelative date={new Date()} />;
export const Before1HourFromNow = () => {
  const before1Hour = new Date();
  before1Hour.setHours(before1Hour.getHours() - 1);
  return <TimeRelative date={before1Hour} />;
};
export const After2HourFromNow = () => {
  const after1Hour = new Date();
  after1Hour.setHours(after1Hour.getHours() + 2);
  return <TimeRelative date={after1Hour} />;
};
