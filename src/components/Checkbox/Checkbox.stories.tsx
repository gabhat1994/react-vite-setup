import { type StoryFn } from '@storybook/react';
import { Icon } from '../Icon';
import { Checkbox, type CheckboxProps } from './Checkbox';

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    isChecked: {
      control: { type: 'boolean' },
    },
  },
};

const Template: StoryFn<typeof Checkbox> = (props: CheckboxProps) => (
  <Checkbox
    isChecked={props.isChecked}
    icon={
      <Icon
        name="tick_m"
        size={24}
        color="--icon-checkbox-neutral-alt-default"
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
