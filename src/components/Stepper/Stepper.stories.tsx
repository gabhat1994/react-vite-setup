import { type Meta, type StoryObj } from '@storybook/react';

import { Stepper } from './Stepper';

export default {
  title: 'Atoms/Stepper',
  component: Stepper,
  argTypes: {
    currentStep: {
      options: [1, 2, 3, 4, 5],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof Stepper>;

export const Primary: StoryObj<typeof Stepper> = {
  args: {
    currentStep: 1,
    completed: 5,
  },
};
