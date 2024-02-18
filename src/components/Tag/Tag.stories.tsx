import { type Meta } from '@storybook/react';
import { Icon } from '@/components/Icon';
import { Tag } from './Tag';

export default {
  title: 'Atoms/Tag',
  component: Tag,

  argTypes: {
    avatar: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
    rightIcon: {
      table: {
        disable: true,
      },
    },
    primary: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof Tag>;

export const LeftIcon = {
  args: {
    secondary: false,
    children: 'Tag Content',
    icon: (
      <Icon
        name="placeholder_m"
        size={20}
        color="--icon-tag-neutral-alt-default"
      />
    ),
  },
};

export const RightIcon = {
  args: {
    secondary: false,
    children: 'Tag Content',
    rightIcon: <Icon name="close_m" size={20} color="--icon-tag-neutral" />,
  },
};

export const WithoutIcons = {
  args: {
    secondary: false,
    children: 'Tag Content',
  },
};
