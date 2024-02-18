import { type StoryFn } from '@storybook/react';
import { Icon } from '../Icon';
import { Radiobox, type RadioboxProps } from './Radiobox';

export default {
  title: 'Atoms/Radiobox',
  component: Radiobox,
  argTypes: {
    isChecked: {
      control: { type: 'boolean' },
    },
  },
};

const Template: StoryFn<typeof Radiobox> = (props: RadioboxProps) => (
  <Radiobox
    isChecked={props.isChecked}
    icon={
      <Icon
        name="radio_btn_m"
        size={12}
        color={
          props.isChecked ? 'primary' : '--icon-radiobutton-inactive-default'
        }
      />
    }
  />
);

export const Primary = {
  render: Template,

  args: {
    isChecked: false,
  },
};
