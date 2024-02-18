import { type Meta } from '@storybook/react';
import { NestedAvatar } from './NestedAvatar';
import { type NestedAvatarProps } from './types';

export default {
  title: 'Atoms/Avatar/NestedAvatar',
  component: NestedAvatar,
  argTypes: {
    size: {
      control: { type: 'radio' },
    },
  },
  args: {
    urls: [
      'https://www.w3schools.com/howto/img_avatar2.png',
      'https://www.w3schools.com/w3images/avatar6.png',
    ],
  },
} as Meta<typeof NestedAvatar>;

export const Primary = {
  render: (props: NestedAvatarProps) => <NestedAvatar urls={props.urls} />,
};
