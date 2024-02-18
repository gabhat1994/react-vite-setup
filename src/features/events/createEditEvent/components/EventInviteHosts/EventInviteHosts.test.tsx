import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from '@/test-utils';
import { EventInviteHosts } from './EventInviteHosts';

describe('<EventInviteHosts>', () => {
  test('EventInviteHosts', () => {
    const { queryByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <EventInviteHosts />
      </ApolloProvider>,
    );

    expect(queryByTestId('event-hosts-field')).toBeTruthy();
  });
});
