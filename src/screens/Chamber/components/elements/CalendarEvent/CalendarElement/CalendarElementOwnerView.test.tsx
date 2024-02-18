import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@/test-utils';
import { EventsFilter } from '@/apollo/generated/types';
import { CalendarElementOwnerView } from './CalendarElementOwnerView';
import { type CalendarElementOwnerViewProps } from './types';

describe('<CalendarElementOwnerView>', () => {
  const onAccept = vi.fn();
  const onAttend = vi.fn();
  const onAttending = vi.fn();
  const onDecline = vi.fn();
  const onEditEvent = vi.fn();
  const onGoLive = vi.fn();
  const onJoin = vi.fn();
  const onNotAttending = vi.fn();
  const onRefetchEvents = vi.fn();
  const onAddEvent = vi.fn();
  const onChangeFilter = vi.fn();
  const onChangeViewMode = vi.fn();
  const calendarElementOwnerProps: CalendarElementOwnerViewProps = {
    activeFilter: EventsFilter.Attending,
    activeViewMode: '',
    events: [],
    eventsCount: 0,
    loading: false,
    masterNoumId: '',
    onAccept,
    onAddEvent,
    onAttend,
    onAttending,
    onChangeFilter,
    onChangeViewMode,
    onDecline,
    onEditEvent,
    onGoLive,
    onJoin,
    onNotAttending,
    onRefetchEvents,
  };
  test('ShowSubHeader', () => {
    const { queryByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <BrowserRouter>
          <CalendarElementOwnerView
            {...calendarElementOwnerProps}
            loading={false}
          />
        </BrowserRouter>
      </ApolloProvider>,
    );

    expect(queryByTestId('calendar-element-viewmode-subheader')).toBeTruthy();
  });

  test('CalendarEventsListExpanded', () => {
    const { queryByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <BrowserRouter>
          <CalendarElementOwnerView
            {...calendarElementOwnerProps}
            eventsCount={5}
          />
        </BrowserRouter>
      </ApolloProvider>,
    );

    expect(queryByTestId('events-list-expanded')).toBeTruthy();
  });
  test('CalendarNoEvents', () => {
    const { queryByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <BrowserRouter>
          <CalendarElementOwnerView
            {...calendarElementOwnerProps}
            eventsCount={0}
            loading={false}
          />
        </BrowserRouter>
      </ApolloProvider>,
    );

    expect(queryByTestId('calendar-no-events-wrapper')).toBeTruthy();
  });
});
