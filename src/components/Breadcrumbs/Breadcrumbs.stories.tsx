import React from 'react';
import styled from 'styled-components';
import { Icon } from '@/components/Icon';
import { Breadcrumbs } from './Breadcrumbs';
import { type BreadcrumbsProps } from './types';

export default {
  title: 'Atoms/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    title: {
      defaultValue: 'Welcome',
      control: { type: 'text' },
    },
    leftIcon: { table: { disable: true } },
    leftSecondaryIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
    rightSecondaryIcon: { table: { disable: true } },
  },
};

const Container = styled.div`
  background-color: var(--bg-body-neutral-alt-highlighted);
`;

export const All = {
  render: (props: BreadcrumbsProps) => (
    <Container>
      <Breadcrumbs
        leftIcon={
          <Icon name="more_m" size={24} color="--icon-button-neutral-default" />
        }
        {...props}
      />
      <Breadcrumbs
        leftIcon={
          <Icon name="more_m" size={24} color="--icon-button-neutral-default" />
        }
        leftSecondaryIcon={
          <Icon name="more_m" size={24} color="--icon-button-neutral-default" />
        }
        {...props}
      />
      <Breadcrumbs
        rightIcon={
          <Icon name="more_m" size={24} color="--icon-button-neutral-default" />
        }
        {...props}
      />
      <Breadcrumbs
        rightIcon={<Icon name="more_m" size={24} />}
        rightSecondaryIcon={
          <Icon name="more_m" size={24} color="--icon-button-neutral-default" />
        }
        {...props}
      />
    </Container>
  ),
};

export const SidePanel = {
  render: (props: BreadcrumbsProps) => (
    <Container>
      <Breadcrumbs
        leftIcon={
          <Icon
            name="close_m"
            size={24}
            color="--icon-button-neutral-default"
          />
        }
        rightIcon={
          <Icon name="more_m" size={24} color="--icon-button-neutral-default" />
        }
        rightSecondaryIcon={<Icon name="more_m" size={24} />}
        {...props}
      />
    </Container>
  ),
};
