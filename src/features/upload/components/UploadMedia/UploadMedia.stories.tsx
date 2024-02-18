import { type StoryFn, type Meta } from '@storybook/react';
import { imageTypes, mediaTypes, videoTypes } from '@/constants/fileTypes';

import UploadMedia, { type UploadMediaProps } from './UploadMedia';

export default {
  title: 'Atoms/UploadMedia',
  argTypes: {
    acceptedFileTypes: {
      options: [mediaTypes, imageTypes, videoTypes],
      control: { type: 'radio' },
    },
    maxSize: {
      type: Number,
    },
    onUploading: {
      type: 'function',
    },
    type: {
      defaultValue: 'profile',
    },
  },
} as Meta<typeof UploadMedia>;

const Template: StoryFn<typeof UploadMedia> = (props: UploadMediaProps) => (
  <UploadMedia {...props} />
);

export const UploadMediaComponent = {
  render: Template,

  args: {
    acceptedFileTypes: mediaTypes,
  },
};
