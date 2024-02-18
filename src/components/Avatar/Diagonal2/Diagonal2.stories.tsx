import { type Meta } from '@storybook/react';

import { DiagonalAvatar2 } from './Diagonal2';
import { DiagonalAvatar2Size } from './types';

export default {
  title: 'Atoms/Avatar/Diagonal 2',
  component: DiagonalAvatar2,
  argTypes: {
    size: {
      options: Object.keys(DiagonalAvatar2Size),
      control: { type: 'radio' },
    },
  },
} as Meta<typeof DiagonalAvatar2>;

export const Primary = {
  args: {
    urls: [
      'https://www.w3schools.com/howto/img_avatar2.png',
      'https://www.w3schools.com/w3images/avatar6.png',
    ],
  },
};
