import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { EventsStatus } from '@/apollo/generated/types';
import { render, fireEvent } from '@/test-utils';
import { type ISocialHallContext } from '@/screens/SocialHall/types';
import AttendeeHeader from './AttendeeHeaderOld';

const mockClass = vi.fn();

const eventDetails = {
  title: 'Design Corner',
  eventDate: new Date(),
  eventStatus: EventsStatus.PreEvent,
  isInstantEvent: false,
};

vi.mock('@/hooks', () => ({
  useTranslation: vi.fn().mockReturnValue({
    t: vi.fn(),
  }),
  useSocialHallCall: vi.fn().mockReturnValue({
    leaveCall: vi.fn(),
  }),
  useTimer: vi.fn().mockReturnValue({
    startTimer: vi.fn(),
    remainTime: 1000,
  }),
  useWindowDimensions: vi.fn().mockReturnValue({
    width: 1200,
  }),
  useHeaderTimer: vi.fn().mockReturnValue({
    formattedTime: '10:00',
  }),
  useAuth: vi.fn().mockReturnValue({
    isUnregistered: false,
  }),
  useDeviceType: vi.fn(() => ({})),
  DeviceTypeEnum: { MOBILE: vi.fn(() => 'mobile') },
}));

function updateSocialHallContext(value: Partial<ISocialHallContext>) {
  mockClass.mockReturnValue({
    ...value,
    setShowBuzzRoom: vi.fn(),
    eventDetails,
  });
}

vi.mock('@/providers', () => ({
  useSocialHallContext: () => mockClass(),
  useSocialHallEventContext: vi.fn().mockReturnValue({
    eventDetails: {
      title: 'Design Corner',
      eventDate: new Date(),
      isInstantEvent: false,
    },
    isEventHost: false,
  }),
  useSocialHallCallContext: vi.fn().mockReturnValue({
    onLeaveCall: vi.fn(),
    onLeaveQuiet: vi.fn(),
    onExitSocialHallCall: vi.fn(),
  }),
}));

describe('<AttendeeHeader />', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test(`check header rendered enough or not`, () => {
    updateSocialHallContext({ showBuzzRoom: false });
    const onViewAttendees = vi.fn();
    const { container, getByTestId } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <AttendeeHeader onViewAttendees={onViewAttendees} />,
        </ApolloProvider>
      </BrowserRouter>,
    );
    const StyledAttendeeHeader = getByTestId('attendee_header');
    expect(StyledAttendeeHeader).toHaveStyle(`
      width: 100%;
      height: fit-content;
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      justify-content: center;
      background-color: var(--bg-card-neutral-alt-default);
      padding: 16px 40px;
      border-top: 1px solid var(--bg-separator-neutral-default);
      border-bottom: 1px solid var(--bg-separator-neutral-default);
      box-sizing: border-box;
    `);

    expect(getByTestId('dropdown_wrapper')).toBeInTheDocument();
    expect(getByTestId('three_dot_button')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test('check Leave Event Button is Rendered and clicked', () => {
    updateSocialHallContext({ showBuzzRoom: false });
    const onViewAttendees = vi.fn();
    const { getByTestId } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <AttendeeHeader onViewAttendees={onViewAttendees} />,
        </ApolloProvider>
      </BrowserRouter>,
    );
    expect(getByTestId('leave_event_button')).toBeInTheDocument();
    fireEvent.click(getByTestId('leave_event_button'));
  });

  test('check Counter clock value is rendered or not', async () => {
    updateSocialHallContext({ showBuzzRoom: false });
    const onViewAttendees = vi.fn();
    const { getByTestId } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <AttendeeHeader onViewAttendees={onViewAttendees} />,
        </ApolloProvider>
      </BrowserRouter>,
    );
    expect(getByTestId('counter_clock')).toBeInTheDocument();
  });

  test('check BuzzRoom Leave Quietly Button is Rendered and Clicked', async () => {
    updateSocialHallContext({ showBuzzRoom: true });
    const onViewAttendees = vi.fn();
    const { getByTestId } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <AttendeeHeader onViewAttendees={onViewAttendees} />,
        </ApolloProvider>
      </BrowserRouter>,
    );
    expect(getByTestId('leave_quietly_button')).toBeInTheDocument();
    fireEvent.click(getByTestId('leave_quietly_button'));
  });
});
