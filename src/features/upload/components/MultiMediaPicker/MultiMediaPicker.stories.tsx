import { type StoryFn, type Meta } from '@storybook/react';
import { imageTypes, mediaTypes, videoTypes } from '@/constants/fileTypes';

import MultiMediaPicker from './MultiMediaPicker';
import { type MultiMediaPickerProps } from './types';

export default {
  title: 'Atoms/MultiMediaPicker',
  argTypes: {
    acceptedFileTypes: {
      options: [mediaTypes, imageTypes, videoTypes],
      control: { type: 'radio' },
    },
    maxSize: {
      type: Number,
    },
    onUploadFile: {
      type: 'function',
    },
    onUploading: {
      type: 'function',
    },
  },
} as Meta<typeof MultiMediaPicker>;

const Template: StoryFn<typeof MultiMediaPicker> = (
  props: MultiMediaPickerProps,
) => <MultiMediaPicker {...props} />;

export const MultiMediaPickerComponent = {
  render: Template,

  args: {
    acceptedFileTypes: mediaTypes,
  },
};
