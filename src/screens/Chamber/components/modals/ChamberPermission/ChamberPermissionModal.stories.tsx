import { type Meta } from '@storybook/react';

import { ChamberPermissionModal } from './ChamberPermissionModal';

export default {
  title: 'UI/Chambers/ChamberPermissionModal',
  component: ChamberPermissionModal,
} as Meta<typeof ChamberPermissionModal>;

export const Primary = {
  args: {
    isOpen: {
      options: [true, false],
      defaultValue: false,
      control: { type: 'radio' },
    },
  },
};
