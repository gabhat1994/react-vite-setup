import { MemoryRouter } from 'react-router';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, screen } from '@/test-utils';
import { MoreInfo } from './index';

describe('<MoreInfo />', () => {
  test('renders', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <MemoryRouter>
          <MoreInfo />
        </MemoryRouter>
      </ApolloProvider>,
    );
    const button = screen.getByTestId('submit_button');
    expect(button).toBeInTheDocument();
  });
});
