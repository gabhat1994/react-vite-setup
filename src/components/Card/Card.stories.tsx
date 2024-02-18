import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { bodyTypography } from '../Typography';
import { Card } from './Card';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 60px 0px;
  align-items: center;
  background-color: var(--bg-body-neutral-alt-highlighted);
  width: 100%;
  min-height: 100vh;
`;
const WrapperContent = styled.div`
  width: 783px;
`;

const Description = styled.span`
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding: 24px;
  text-align: center;
  color: var(--text-card-brand-primary-default);
  ${bodyTypography.bodyXLargeBold};
`;

export default {
  title: 'Atoms/Card',
  component: Card,
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, www.google.com sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    bgImageUrl: '',
    bgImagePosition: '',
  },
} as Meta<typeof Card>;

export const Example = {
  render: ({ ...args }) => (
    <Wrapper>
      <WrapperContent>
        <Description>Card example</Description>
        <Card {...args} />
      </WrapperContent>
    </Wrapper>
  ),
};

export const ExampleWithImage = {
  render: ({ ...args }) => (
    <Wrapper>
      <WrapperContent>
        <Description>Card example</Description>
        <Card {...args} />
      </WrapperContent>
    </Wrapper>
  ),

  args: {
    bgImageUrl:
      'https://images.unsplash.com/photo-1649791069748-9e61375148d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60',
    bgImagePosition: 'center',
  },
};
