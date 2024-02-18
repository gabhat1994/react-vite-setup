import { type Meta, type StoryFn } from '@storybook/react';
import { PostCategory } from '@/apollo/generated/types';
import { AssetItem } from './AssetItem';
import { type AssetItemProps } from './types';

export default {
  title: 'UI/Chambers/Post',
  argTypes: {
    url: {
      type: Text,
    },
    index: {
      type: Number,
    },
    onDelete: {
      type: () => {},
    },
    filetype: {
      options: [PostCategory.Image, PostCategory.Video],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
  },
} as Meta<typeof AssetItem>;

const Template: StoryFn<typeof AssetItem> = (props: AssetItemProps) => (
  <AssetItem {...props} />
);

export const PostAssetItem = {
  render: Template,

  args: {
    url: 'https://www.w3schools.com/howto/img_avatar2.png',
    index: 0,
    onDelete: () => {},
  },
};
