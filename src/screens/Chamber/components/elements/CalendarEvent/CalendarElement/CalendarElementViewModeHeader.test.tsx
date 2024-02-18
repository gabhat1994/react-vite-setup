import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@/test-utils';
import { CalendarElementViewModeHeader } from './CalendarElementViewModeHeader';

describe('<CalendarElementViewModeHeader>', () => {
  test('render', () => {
    const handleDropdownClick = vi.fn();
    const onAddEvent = vi.fn();
    const { queryByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <BrowserRouter>
          <CalendarElementViewModeHeader
            showAddEventBtn={true}
            handleDropdownClick={handleDropdownClick}
            onAddEvent={onAddEvent}
            chamberId="1233"
            hasEvents={true}
            isStartNowModalOpen
            toggleStartNowModal={() => {}}
          />
        </BrowserRouter>
      </ApolloProvider>,
    );

    expect(queryByTestId('calendar-element-header')).toBeTruthy();
  });
});
