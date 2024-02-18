import { type Meta, type StoryObj } from '@storybook/react';

import { ProgressBar } from './ProgressBar';

export default {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  argTypes: {
    percentage: {
      options: [25, 50, 75, 100],
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
} as Meta<typeof ProgressBar>;

export const Primary: StoryObj<typeof ProgressBar> = {
  args: {
    percentage: 10,
    isLabel: true,
    color: 'red',
    barSize: 25,
  },
};
