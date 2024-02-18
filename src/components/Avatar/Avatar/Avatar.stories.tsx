import { type Meta } from '@storybook/react';

import { Avatar } from '.';
import { AvatarSize } from './types';

export default {
  title: 'Atoms/Avatar/Single',
  component: Avatar,
  argTypes: {
    size: {
      options: Object.keys(AvatarSize),
      control: { type: 'radio' },
    },
    maximumFileSize: { table: { disable: true } },
    onContentChange: { table: { disable: true } },
    editable: { table: { disable: true } },
    fileSize: { table: { disable: true } },
    isUploadComplete: { table: { disable: true } },
    isUploadStarted: { table: { disable: true } },
    onClear: { table: { disable: true } },
    onClose: { table: { disable: true } },
    disabled: { table: { disable: true } },
    height: { table: { disable: true } },
    width: { table: { disable: true } },
    borderRadius: { type: 'number' },
  },
} as Meta<typeof Avatar>;

export const Primary = {
  args: {
    url: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
};
