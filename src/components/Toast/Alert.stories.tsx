import { type Meta, type StoryObj } from '@storybook/react';
import generate from 'uniqid';

import { Alert } from './Alert';

export default {
  title: 'Atoms/Toast Alert',
  component: Alert,
  argTypes: {
    type: {
      options: ['success', 'error', 'primary', 'subtle'],
      control: { type: 'inline-radio' },
    },
  },
} as Meta<typeof Alert>;

export const Primary: StoryObj<typeof Alert> = {
  render: (props) => <Alert {...props} />,
  args: {
    id: generate(),
    type: 'error',
    message: 'Please enter the verification code',
    autoHideTime: 5000,
  },
};
