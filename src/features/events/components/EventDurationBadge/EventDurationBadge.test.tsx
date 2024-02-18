import { EventsStatus } from '@/apollo/generated/types';
import { render } from '@/test-utils';
import { EventDurationBadge } from './EventDurationBadge';

describe('<EventDurationBadge />', () => {
  const durationInSeconds = 3600; // 1h
  const oneDayInMs = 1000 * 3600 * 24;
  test('renders EventDurationBadge for the event to start 30 mins', () => {
    const { getByTestId, container } = render(
      <EventDurationBadge
        eventDate={new Date(Date.now() + 30 * 60 * 1000)}
        status={EventsStatus.Upcoming}
        durationInSeconds={durationInSeconds}
      />,
    );
    expect(getByTestId('event-duration-badge-testid')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
  test('renders EventDurationBadge for the event to start in 1 hour', () => {
    const { getByTestId, container } = render(
      <EventDurationBadge
        eventDate={new Date(Date.now() + 3600 * 1000)}
        status={EventsStatus.Upcoming}
        durationInSeconds={durationInSeconds}
      />,
    );
    expect(getByTestId('event-duration-badge-testid')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
  test('renders EventDurationBadge for the event to start tomorrow', () => {
    const { getByTestId, container } = render(
      <EventDurationBadge
        eventDate={new Date(Date.now() + oneDayInMs)}
        status={EventsStatus.Upcoming}
        durationInSeconds={durationInSeconds}
      />,
    );
    expect(getByTestId('event-duration-badge-testid')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
  test('renders EventDurationBadge for the event already started', () => {
    const { getByTestId, container } = render(
      <EventDurationBadge
        eventDate={new Date(Date.now() - 10000)}
        status={EventsStatus.PreEvent}
        durationInSeconds={durationInSeconds}
      />,
    );
    expect(getByTestId('event-duration-badge-testid')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
  test('renders EventDurationBadge for the event already ended', () => {
    const { getByTestId, container } = render(
      <EventDurationBadge
        eventDate={new Date(Date.now() - durationInSeconds * 1000 - 10000)}
        status={EventsStatus.Expired}
        durationInSeconds={durationInSeconds}
      />,
    );
    expect(getByTestId('event-duration-badge-testid')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
