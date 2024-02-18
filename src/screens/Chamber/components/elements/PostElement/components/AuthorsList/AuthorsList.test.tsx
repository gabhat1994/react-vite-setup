import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@/test-utils';
import { type SpaceOutput } from '@/apollo/generated/types';
import AuthorsList from './AuthorsList';
import { PostElementProvider } from '../../PostElementProvider';

describe('<AuthorsList />', () => {
  test('AuthorsList render', () => {
    const space: SpaceOutput = {
      __typename: 'SpaceOutput',
      _id: '624cfaf0cb8e6a7d595b5fe7',
      name: 'Sample Space',
      status: 'PUBLISHED',
    };

    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <MemoryRouter>
          <PostElementProvider space={space}>
            <AuthorsList />
          </PostElementProvider>
        </MemoryRouter>
      </ApolloProvider>,
    );
    const allTab = screen.getByTestId('chipsSpan');
    expect(allTab).toBeTruthy();
  });
});
