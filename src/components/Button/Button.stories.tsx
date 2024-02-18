import { type Meta } from '@storybook/react';
import { LabelGroup, LabelWrap } from '@/components/StorybookHelpers/LabelWrap';
import { Icon } from '@/components/Icon';
import { Button } from './Button';
import { type CommonButtonProps } from './types';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    size: {
      options: ['small', 'large', 'full'],
      control: { type: 'select' },
    },
    intent: {
      options: ['positive', 'negative', undefined],
      control: { type: 'select' },
    },
    rightIcon: {
      table: {
        disable: true,
      },
    },
    leftIcon: {
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
} as Meta<typeof Button>;

export const Single = {
  render: (props: CommonButtonProps) => <Button {...props}>Submit</Button>,
};

export const All = () => (
  <>
    <LabelGroup columns={4} style={{ width: '400px' }}>
      <LabelWrap label="Default">
        <Button primary>Default (Small)</Button>
      </LabelWrap>
      <LabelWrap label="Full">
        <Button primary size="full">
          Full
        </Button>
      </LabelWrap>
      <LabelWrap label="Small">
        <Button primary size="small">
          Small
        </Button>
      </LabelWrap>
      <LabelWrap label="Text Only">
        <Button textOnly intent="negative" size="small">
          Text Only
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h2>Default Size</h2>
    <h4>Primary Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button primary>No Icon</Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button primary disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          primary
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          primary
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          primary
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button primary loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h4>Secondary Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button secondary>No Icon</Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button secondary disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          secondary
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-brand-secondary-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          secondary
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-brand-secondary-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          secondary
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-brand-secondary-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button secondary loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h4>Tertiary Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button tertiary>No Icon</Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button tertiary disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          tertiary
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          tertiary
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          tertiary
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button tertiary loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h4>Negative Primary Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button primary intent="negative">
          No Icon
        </Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button primary intent="negative" disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          primary
          intent="negative"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          primary
          intent="negative"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          primary
          intent="negative"
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button primary intent="negative" loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h4>Negative Secondary Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button secondary intent="negative">
          No Icon
        </Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button secondary intent="negative" disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          secondary
          intent="negative"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-danger-secondary-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          secondary
          intent="negative"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-danger-secondary-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          secondary
          intent="negative"
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-danger-secondary-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button secondary intent="negative" loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h4>Positive Primary Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button primary intent="positive">
          No Icon
        </Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button primary intent="positive" disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          primary
          intent="positive"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          primary
          intent="positive"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          primary
          intent="positive"
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button primary intent="positive" loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h4>Positive Secondary Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button secondary intent="positive">
          No Icon
        </Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button secondary intent="positive" disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          secondary
          intent="positive"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-success-secondary-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          secondary
          intent="positive"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-success-secondary-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          secondary
          intent="positive"
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-success-secondary-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button secondary intent="positive" loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h4>Neutral Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button neutral>No Icon</Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button neutral disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          neutral
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          neutral
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          neutral
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button neutral loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>

    <h2>Small Size</h2>
    <h4>Primary Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button size="small" primary>
          No Icon
        </Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button size="small" primary disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          size="small"
          primary
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          size="small"
          primary
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          size="small"
          primary
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button size="small" primary loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h4>Secondary Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button size="small" secondary>
          No Icon
        </Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button size="small" secondary disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          size="small"
          secondary
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-brand-secondary-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          size="small"
          secondary
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-brand-secondary-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          size="small"
          secondary
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-brand-secondary-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button size="small" secondary loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h4>Tertiary Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button size="small" tertiary>
          No Icon
        </Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button size="small" tertiary disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          size="small"
          tertiary
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          size="small"
          tertiary
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          size="small"
          tertiary
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button size="small" tertiary loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h4>Negative Primary Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button size="small" primary intent="negative">
          No Icon
        </Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button size="small" primary intent="negative" disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          size="small"
          primary
          intent="negative"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          size="small"
          primary
          intent="negative"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          size="small"
          primary
          intent="negative"
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button size="small" primary intent="negative" loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h4>Negative Secondary Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button size="small" secondary intent="negative">
          No Icon
        </Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button size="small" secondary intent="negative" disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          size="small"
          secondary
          intent="negative"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-danger-secondary-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          size="small"
          secondary
          intent="negative"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-danger-secondary-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          size="small"
          secondary
          intent="negative"
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-danger-secondary-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button size="small" secondary intent="negative" loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h4>Positive Primary Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button size="small" primary intent="positive">
          No Icon
        </Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button size="small" primary intent="positive" disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          size="small"
          primary
          intent="positive"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          size="small"
          primary
          intent="positive"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          size="small"
          primary
          intent="positive"
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button size="small" primary intent="positive" loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h4>Positive Secondary Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button size="small" secondary intent="positive">
          No Icon
        </Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button size="small" secondary intent="positive" disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          size="small"
          secondary
          intent="positive"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-success-secondary-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          size="small"
          secondary
          intent="positive"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-success-secondary-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          size="small"
          secondary
          intent="positive"
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-success-secondary-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button size="small" secondary intent="positive" loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
    <h4>Neutral Type</h4>
    <LabelGroup columns={6} style={{ width: '300px' }}>
      <LabelWrap label="Default">
        <Button size="small" neutral>
          No Icon
        </Button>
      </LabelWrap>
      <LabelWrap label="Disabled">
        <Button size="small" neutral disabled>
          Disabled
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Right">
        <Button
          size="small"
          neutral
          rightIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
        >
          Icon-Right
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon-Left">
        <Button
          size="small"
          neutral
          leftIcon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
        >
          Icon-Left
        </Button>
      </LabelWrap>
      <LabelWrap label="Icon">
        <Button
          size="small"
          neutral
          icon={
            <Icon
              name="placeholder_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
        />
      </LabelWrap>
      <LabelWrap label="Loading">
        <Button size="small" neutral loading>
          Loading
        </Button>
      </LabelWrap>
    </LabelGroup>
  </>
);
