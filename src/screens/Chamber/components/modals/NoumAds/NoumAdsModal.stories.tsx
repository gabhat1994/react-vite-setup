import { type Meta } from '@storybook/react';

import { NoumAdsModal } from './NoumAdsModal';

export default {
  title: 'UI/Chambers/NoumAdsModal',
  component: NoumAdsModal,
} as Meta<typeof NoumAdsModal>;

export const Primary = {
  args: {
    isOpen: {
      options: [true, false],
      defaultValue: false,
      control: { type: 'radio' },
    },
  },
};
