import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from '@/test-utils';
import { CreateEditEvent } from './CreateEditEvent';

describe('<CreateEditEvent>', () => {
  test('CreateEditEvent', () => {
    const { queryByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <CreateEditEvent />
      </ApolloProvider>,
    );

    expect(queryByTestId('create-edit-event-modal')).toBeNull();
  });
});
