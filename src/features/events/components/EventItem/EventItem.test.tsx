import { type Event, EventsStatus } from '@/apollo/generated/types';
import { render } from '@/test-utils';

import { EventItem } from './EventItem';

const testId = 'event-item-testid';

const eventData: Event = {
  cohosts: [],
  invitations: [],
  _id: '62b4b24d4bf8e9000dceb82e',
  title: 'YL Test event 1',
  description: 'This is a test event1',
  eventDate: '2022-06-30T16:00:00.000Z',
  duration: 3600,
  timezone: {
    _id: 'Pacific/Niue',
    offset: 'UTC-11:00',
    text: '-11:00 Niue Time - Alofi',
    value: null,
    abbr: 'NUT',
    utcOffset: 'UTC-11:00',
    timezone: 'Pacific/Niue',
    __typename: 'Timezone',
  },
  totalAttendees: 0,
  status: EventsStatus.Upcoming,
  chamberId: {
    _id: '6288938897ffc4addf44c384',
    uid: {
      _id: '627a8ec281116f5c88787bf9',
      firstName: 'Yunlai',
      lastName: 'Che',
    },
  },
};

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockedUsedNavigate,
}));

const onClick = vi.fn();

describe('<EventItem/>', () => {
  test('Should render', () => {
    const onViewAttendees = vi.fn();
    const { getByTestId } = render(
      <EventItem
        event={eventData}
        chamberId={eventData.chamberId?._id || ''}
        onJoinEvent={onClick}
        onGoLive={onClick}
        onEditEvent={onClick}
        onAccept={onClick}
        onDecline={onClick}
        onAttend={onClick}
        onAttending={onClick}
        onNotAttending={onClick}
        onViewAttendees={onViewAttendees}
        type="notification"
      />,
    );
    expect(getByTestId(testId)).toBeInTheDocument();
  });
});
