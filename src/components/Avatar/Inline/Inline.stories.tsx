import { type Meta } from '@storybook/react';

import { InlineAvatar } from './Inline';
import { InlineAvatarSize } from './types';

export default {
  title: 'Atoms/Avatar/Inline',
  component: InlineAvatar,
  argTypes: {
    size: {
      options: Object.keys(InlineAvatarSize),
      control: { type: 'radio' },
    },
    borderedImage: {
      control: { type: 'boolean' },
    },
  },
} as Meta<typeof InlineAvatar>;

export const Primary = {
  args: {
    urls: [
      'https://www.w3schools.com/howto/img_avatar2.png',
      'https://www.w3schools.com/w3images/avatar6.png',
    ],
  },
};
