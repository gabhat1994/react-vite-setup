import { ApolloProvider } from '@apollo/client';
import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { getClient, getLink } from '@/apollo/client';
import { bodyTypography } from '@/components/Typography';
import QuickQuestionsElement from './QuickQuestionsElement';

const WrapperContainer = styled.div`
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
  width: 100%;
`;

const Description = styled.span`
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 24px;
  text-align: center;
  color: var(--text-card-brand-primary-default);
  ${bodyTypography.bodyXLargeBold};
`;

export default {
  title: 'UI/Chambers/Quick Questions/Quick Questions Element',
  component: QuickQuestionsElement,

  args: {
    currentTitle: 'Quick Questions',
    isEditing: true,
    id: '1',
    currentIndex: 0,
    children: <> Wrapper Content</>,
  },

  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    currentIndex: {
      table: {
        disable: true,
      },
    },
    totalIndex: {
      table: {
        disable: true,
      },
    },
    id: {
      table: {
        disable: true,
      },
    },
    currentTitle: {
      table: {
        disable: true,
      },
    },
    setCurrentTitle: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof QuickQuestionsElement>;

export const Primary = {
  render: ({ ...args }) => (
    <ApolloProvider client={getClient(getLink(args.authorizationToken))}>
      <WrapperContainer>
        <WrapperContent>
          <Description>Message Element wrapper</Description>
          <QuickQuestionsElement
            spaceId=""
            element={{
              __typename: undefined,
              _id: undefined,
            }}
            isSpecialCollapsing={true}
            {...args}
          />
        </WrapperContent>
      </WrapperContainer>
    </ApolloProvider>
  ),
};
