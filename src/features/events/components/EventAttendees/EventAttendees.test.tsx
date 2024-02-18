import { cleanup, render } from '@/test-utils';
import { EventAttendees } from './EventAttendees';

const onViewAttendees = vi.fn();

describe('<EventAttendees />', () => {
  const avatarUrls = [
    'https://www.w3schools.com/howto/img_avatar2.png',
    'https://www.w3schools.com/howto/img_avatar2.png',
    'https://www.w3schools.com/howto/img_avatar2.png',
    'https://www.w3schools.com/howto/img_avatar2.png',
  ];
  afterEach(() => {
    cleanup();
  });

  test('render event attendees component', () => {
    const { getByTestId } = render(
      <EventAttendees
        avatarUrls={avatarUrls}
        isHost={true}
        onViewAttendees={onViewAttendees}
      />,
    );
    expect(getByTestId('event-attendees-testid')).toBeInTheDocument();
  });
  test("using empty array for avatarUrls doesn't render event attendees component", () => {
    const { queryByTestId } = render(
      <EventAttendees
        avatarUrls={[]}
        isHost={true}
        onViewAttendees={onViewAttendees}
      />,
    );
    expect(queryByTestId('event-attendees-testid')).toBeNull();
  });
  test('isHost: false renders event attendees component', () => {
    const { getByTestId } = render(
      <EventAttendees
        avatarUrls={avatarUrls}
        isHost={false}
        onViewAttendees={onViewAttendees}
      />,
    );
    expect(getByTestId('event-attendees-testid')).toBeInTheDocument();
  });
});
