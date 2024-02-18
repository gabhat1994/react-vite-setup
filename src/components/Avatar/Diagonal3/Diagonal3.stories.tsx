import { type Meta } from '@storybook/react';

import { DiagonalAvatar3 } from './Diagonal3';
import { DiagonalAvatar3Size } from './types';

export default {
  title: 'Atoms/Avatar/Diagonal 3',
  component: DiagonalAvatar3,
  argTypes: {
    size: {
      options: Object.keys(DiagonalAvatar3Size),
      control: { type: 'radio' },
    },
  },
} as Meta<typeof DiagonalAvatar3>;

export const Primary = {
  args: {
    urls: [
      'https://www.w3schools.com/howto/img_avatar2.png',
      'https://www.w3schools.com/w3images/avatar6.png',
    ],
  },
};
