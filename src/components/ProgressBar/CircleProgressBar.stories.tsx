import { type Meta, type StoryObj } from '@storybook/react';

import { CircleProgressBar } from './CircleProgressBar';

export default {
  title: 'Atoms/CircleProgressBar',
  component: CircleProgressBar,
  argTypes: {
    percentage: {
      options: [0, 25, 50, 75, 100],
      control: { type: 'radio' },
    },
    backgroudColor: {
      options: [
        undefined,
        'var(--bg-progressbar-brand-primary-highlighted)',
        'var(--bg-progressbar-brand-primary-default)',
        'var(--bg-progressbar-neutral-alt-default)',
        'var(--bg-progressbar-neutral-disabled)',
        'var(--bg-progressbar-neutral-default)',
      ],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof CircleProgressBar>;

export const Primary: StoryObj<typeof CircleProgressBar> = {
  args: {
    percentage: 30,
    isLabel: true,
    color: 'red',
    barSize: 8,
    circleSize: 200,
    transTime: 2000,
  },
};
