import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import { getClient, getLink } from '@/apollo/client';
import { bodyTypography } from '../../../../components/Typography';
import { ElementWrapper } from './ElementWrapper';

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
  width: 783px;
  @media (max-width: 425px) {
    width: min-content;
  }
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
  title: 'UI/Chambers/Element Wrapper',
  component: ElementWrapper,

  args: {
    currentTitle: 'Image',
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
} as Meta<typeof ElementWrapper>;

export const Example = {
  render: ({ ...args }) => {
    const alt = 'Example alt';
    return (
      <ApolloProvider client={getClient(getLink(args.authorizationToken))}>
        <WrapperContainer>
          <WrapperContent>
            <Description>Element wrapper</Description>
            <ElementWrapper
              spaceId=""
              element={{
                __typename: undefined,
                _id: undefined,
                bodyContent: undefined,
                bodyContentJson: undefined,
                bodyContentType: undefined,
                draft: undefined,
                elementType: undefined,
                headerContent: undefined,
                percentCompleted: undefined,
                position: undefined,
                status: undefined,
                tempStatus: undefined,
                unSaved: undefined,
                viewOnly: undefined,
              }}
              isSpecialCollapsing={true}
              {...args}
            >
              <img
                alt={alt}
                width="100%"
                src="https://assets.justinmind.com/wp-content/webp-express/webp-images/uploads/2020/05/charts-ui-kit-dashboard-design-tips-example.png.webp"
              />
            </ElementWrapper>
          </WrapperContent>
        </WrapperContainer>
      </ApolloProvider>
    );
  },
};
