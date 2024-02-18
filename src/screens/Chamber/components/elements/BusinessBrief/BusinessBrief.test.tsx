import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { cleanup, render } from '@/test-utils';
import { client } from '@/apollo/client';
import BusinessBrief from './BusinessBrief';

describe('<BusinessBrief />', () => {
  afterEach(() => {
    cleanup();
  });

  test('Should return correct text and tabs should are not exist ', () => {
    const wrapperProps = {
      currentTitle: 'PERSONAL_INTEREST',
      isBorder: true,
      spaceId: '6269b49b2314503140794492',
      totalIndex: 26,
      currentIndex: 20,
      element: {},
    };
    const { getByText } = render(
      <ApolloProvider client={client}>
        <BusinessBrief
          wrapperProps={{ ...wrapperProps }}
          currentTitle="Business Brief"
          isBorder={false}
          spaceId=""
          elementId=""
          elementPosition={1}
          isEditing
        />
      </ApolloProvider>,
    );

    expect(getByText('Business Brief')).toBeInTheDocument();
  });
});
