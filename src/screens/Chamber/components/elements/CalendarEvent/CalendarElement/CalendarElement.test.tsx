import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from '@/test-utils';
import { CalendarElement } from './CalendarElement';

describe('<CalendarElement>', () => {
  test('render edit', () => {
    const { queryByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <CalendarElement
          element={{
            __typename: 'ElementOutput',
          }}
          spaceId=""
          isEditing
        />
      </ApolloProvider>,
    );

    expect(queryByTestId('calendar-element-edit')).toBeTruthy();
  });
});
