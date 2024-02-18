import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, waitFor } from '@/test-utils';

import PayeeInNoumena from '.';

describe('Add Payee in Noumena', () => {
  it('Should render the screen Add Payee in Noumena', () => {
    const { container } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <PayeeInNoumena />
      </ApolloProvider>,
    );
    expect(container).toBeTruthy();
  });
  it('Should disabled Add Payee button on render ', async () => {
    const { getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <PayeeInNoumena />
      </ApolloProvider>,
    );
    const button = getByTestId('add-payee-in-noumena');
    await waitFor(() => expect(button).toBeDisabled());
  });
});
