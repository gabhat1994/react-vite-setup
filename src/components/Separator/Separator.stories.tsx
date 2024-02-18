import { type StoryFn, type Meta } from '@storybook/react';

import { Separator } from './Separator';
import { type SeparatorProps } from './types';

export default {
  title: 'Atoms/Separator',
  argTypes: {
    size: {
      options: ['thin', 'thick'],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof Separator>;

const Template: StoryFn<typeof Separator> = ({
  size,
  ...rest
}: SeparatorProps) => <Separator size={size} {...rest} />;

export const SeparatorComponent = {
  render: Template,

  args: {
    size: 'thin',
  },
};
