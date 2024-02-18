import { type Meta } from '@storybook/react';
import { LabelGroup, LabelWrap } from '@/components/StorybookHelpers/LabelWrap';
import { Icon } from '@/components/Icon';
import { Chips } from './Chips';
import { type CommonChipsProps } from './types';

export default {
  title: 'Atoms/Chips',
  component: Chips,
  argTypes: {
    size: {
      options: ['medium', 'large'],
      control: { type: 'select' },
    },
    rightIcon: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof Chips>;

export const Primary = {
  render: (props: CommonChipsProps) => (
    <Chips
      primary
      icon={
        <Icon
          name="close_s"
          size={20}
          color="--icon-skillbadge-brand-primary-selected"
        />
      }
      {...props}
    >
      Label
    </Chips>
  ),
};

export const All = () => (
  <>
    <h4>Primary Large</h4>
    <LabelGroup columns={3} style={{ width: '350px' }}>
      <LabelWrap label="No Icon">
        <Chips primary size="large">
          Label
        </Chips>
      </LabelWrap>
      <LabelWrap label="Left icon">
        <Chips
          primary
          size="large"
          icon={
            <Icon
              name="close_s"
              size={20}
              color="--icon-skillbadge-brand-primary-selected"
            />
          }
        >
          Label
        </Chips>
      </LabelWrap>
      <LabelWrap label="Right icon">
        <Chips
          primary
          size="large"
          rightIcon={
            <Icon
              name="close_s"
              size={20}
              color="--icon-skillbadge-brand-primary-selected"
            />
          }
        >
          Label
        </Chips>
      </LabelWrap>
    </LabelGroup>
    <h4>Primary Medium</h4>
    <LabelGroup columns={3} style={{ width: '350px' }}>
      <LabelWrap label="No Icon">
        <Chips primary size="medium">
          Label
        </Chips>
      </LabelWrap>
      <LabelWrap label="Left icon">
        <Chips
          primary
          size="medium"
          icon={
            <Icon
              name="close_s"
              size={20}
              color="--icon-skillbadge-brand-primary-selected"
            />
          }
        >
          Label
        </Chips>
      </LabelWrap>
      <LabelWrap label="Right icon">
        <Chips
          primary
          size="medium"
          rightIcon={
            <Icon
              name="close_s"
              size={20}
              color="--icon-skillbadge-brand-primary-selected"
            />
          }
        >
          Label
        </Chips>
      </LabelWrap>
    </LabelGroup>
    <h4>Secondary</h4>
    <LabelGroup columns={2} style={{ width: '200px' }}>
      <LabelWrap label="Large">
        <Chips secondary size="large">
          Label
        </Chips>
      </LabelWrap>
      <LabelWrap label="Medium">
        <Chips secondary size="medium">
          Label
        </Chips>
      </LabelWrap>
    </LabelGroup>
    <h4>Text Only</h4>
    <LabelGroup columns={1} style={{ width: '150px' }}>
      <LabelWrap label="">
        <Chips
          textOnly
          icon={
            <Icon
              name="add_s"
              size={20}
              color="--icon-skillbadge-brand-primary-selected"
            />
          }
          size="large"
        >
          Label
        </Chips>
      </LabelWrap>
    </LabelGroup>
  </>
);
