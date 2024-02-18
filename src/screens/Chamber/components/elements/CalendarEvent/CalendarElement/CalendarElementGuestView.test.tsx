import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@/test-utils';
import { CalendarElementGuestView } from './CalendarElementGuestView';

describe('<CalendarElementGuestView>', () => {
  const onAccept = vi.fn();
  const onAttend = vi.fn();
  const onAttending = vi.fn();
  const onDecline = vi.fn();
  const onEditEvent = vi.fn();
  const onGoLive = vi.fn();
  const onJoin = vi.fn();
  const onNotAttending = vi.fn();
  const onRefetchEvents = vi.fn();
  test('render expanded', () => {
    const { queryByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <BrowserRouter>
          <CalendarElementGuestView
            events={[]}
            masterNoumId=""
            onAccept={onAccept}
            onAttend={onAttend}
            onAttending={onAttending}
            onDecline={onDecline}
            onEditEvent={onEditEvent}
            onGoLive={onGoLive}
            onJoin={onJoin}
            onNotAttending={onNotAttending}
            onRefetchEvents={onRefetchEvents}
          />
        </BrowserRouter>
      </ApolloProvider>,
    );

    expect(queryByTestId('events-list-expanded')).toBeTruthy();
  });
  test('render collapsed', () => {
    const { queryByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <BrowserRouter>
          <CalendarElementGuestView
            events={[]}
            masterNoumId=""
            onAccept={onAccept}
            onAttend={onAttend}
            onAttending={onAttending}
            onDecline={onDecline}
            onEditEvent={onEditEvent}
            onGoLive={onGoLive}
            onJoin={onJoin}
            onNotAttending={onNotAttending}
            onRefetchEvents={onRefetchEvents}
          />
        </BrowserRouter>
      </ApolloProvider>,
    );

    expect(queryByTestId('guest-events-list-collapsed')).toBeTruthy();
  });
});
