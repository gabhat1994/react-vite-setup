import { type StoryFn, type Meta } from '@storybook/react';
import { type Ref, createRef } from 'react';

import { Badge } from './Badge';
import { type BadgeProps } from './types';

export default {
  title: 'Atoms/Badge',
  argTypes: {
    size: {
      options: ['medium', 'large'],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof Badge>;

const Template: StoryFn<typeof Badge> = ({ size, text }: BadgeProps) => {
  const ref: Ref<HTMLDivElement> = createRef();
  return <Badge size={size} text={text} ref={ref} />;
};

export const Primary = {
  render: Template,

  args: {
    size: 'medium',
    text: '123',
  },
};
