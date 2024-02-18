import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from '@/test-utils';
import { EventTimeZone } from './index';

describe('<EventTimezoneField>', () => {
  test('EventTimezoneField', () => {
    const { getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <EventTimeZone />
      </ApolloProvider>,
    );

    expect(getByTestId('event-timezone-wrapper')).toBeInTheDocument();
  });
});
