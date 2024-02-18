import { useCallback } from 'react';
import { ToastProvider } from '@/providers';

import { Stack } from '@/layout';
import { useToast } from '@/hooks';
import { Button } from '../Button';
import { type AlertButtonType, type AlertType } from './types';

const ToastWithProviderAndHook: React.FC<{
  type: AlertType;
  buttonType: AlertButtonType;
  message: string;
}> = ({ type, buttonType, message }) => {
  const { addToast } = useToast();

  const handleClick = useCallback(() => {
    addToast(type, buttonType, message);
  }, [addToast, message, buttonType, type]);

  return (
    <Stack vertical>
      <Button primary size="small" onClick={handleClick}>
        Show Notification
      </Button>
    </Stack>
  );
};

export const ToastEample = {
  render: (props: {
    type: AlertType;
    buttonType: AlertButtonType;
    message: string;
  }) => (
    <ToastProvider>
      <ToastWithProviderAndHook {...props} />
    </ToastProvider>
  ),
};

export default {
  title: 'Atoms/Toast',
  component: ToastEample,
  argTypes: {
    type: {
      options: ['success', 'error', 'primary', 'subtle'],
      control: { type: 'inline-radio', default: 'primary' },
    },
    buttonType: {
      options: ['none', 'icon', 'label'],
      control: { type: 'inline-radio', default: 'icon' },
    },
    message: {
      control: { type: 'text', default: 'Alert Message' },
    },
  },
};
