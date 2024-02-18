import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from '@/test-utils';
import { CalendarElementViewModeSubHeader } from './CalendarElementViewModeSubHeader';

describe('<CalendarElementViewModeSubHeader>', () => {
  const onFilterChange = vi.fn();
  const onViewModeChange = vi.fn();
  test('render', () => {
    const { queryByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <CalendarElementViewModeSubHeader
          activeFilter=""
          activeViewMode=""
          onFilterChange={onFilterChange}
          onViewModeChange={onViewModeChange}
        />
      </ApolloProvider>,
    );

    expect(queryByTestId('calendar-element-viewmode-subheader')).toBeTruthy();
  });
});
