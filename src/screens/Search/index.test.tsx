import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MemoryRouter } from 'react-router';
import { render } from '@/test-utils';
import Search from '.';

describe('ShowOtp', () => {
  test('render', () => {
    const { container } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </ApolloProvider>,
    );
    expect(container).toBeTruthy();
  });
});
