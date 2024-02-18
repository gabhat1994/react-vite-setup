import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, fireEvent, waitFor } from '@/test-utils';
import {
  type ISocialHallContext,
  type ISocialHallEventContext,
} from '@/screens/SocialHall/types';
import { EventsStatus } from '@/apollo/generated/types';
import { breakpoints } from '@/constants/devices';
import HostHeader from './HostHeaderOld';

const mockClass1 = vi.fn();
const mockClass2 = vi.fn();
const mockClass3 = vi.fn();

const eventDetails = {
  title: '',
  _id: '1001',
  cohosts: [],
  invitations: [],
  isInstantEvent: false,
  status: EventsStatus.PreEvent,
};

function updateSocialHallContext(value?: Partial<ISocialHallContext>) {
  mockClass1.mockReturnValue({
    ...value,
  });
}

function updateWindowDimension(width: number) {
  mockClass3.mockReturnValue({ width });
}

function updateSocialHallEventContext(
  value?: Partial<ISocialHallEventContext>,
) {
  mockClass2.mockReturnValue({
    ...value,
  });
}

vi.mock('@/providers', () => ({
  useSocialHallContext: () => mockClass1(),
  useSocialHallEventContext: () => mockClass2(),
  useSocialHallCallContext: vi.fn().mockReturnValue({
    onLeaveCall: vi.fn(),
    onExitSocialHallCall: vi.fn(),
  }),
}));

vi.mock('@/hooks', () => ({
  useError: vi.fn().mockReturnValue({
    logError: vi.fn(),
  }),
  useTranslation: vi.fn().mockReturnValue({
    t: vi.fn(),
  }),
  useHeaderTimer: vi.fn().mockReturnValue({
    formattedTime: '10:00',
  }),
  useTimer: vi.fn().mockReturnValue({
    startTimer: vi.fn(),
    remainTime: 1000,
  }),
  useWindowDimensions: () => mockClass3(),
  useSocialHallCall: vi.fn().mockReturnValue({
    leaveCall: vi.fn(),
  }),
  useRefreshKnocks: vi.fn().mockReturnValue({
    useRefreshKnocks: {},
    userActiveKnocks: {},
  }),
  useAuth: vi.fn().mockReturnValue({
    isUnregistered: false,
  }),
}));

describe('<HostHeader />', () => {
  describe('Desktop View', () => {
    beforeEach(() => {
      updateWindowDimension(breakpoints.TABLET_L);
    });
    test(`check header rendered enough or not`, () => {
      updateSocialHallContext();
      updateSocialHallEventContext({
        hostJoined: true,
        eventDetails,
      });
      const onViewAttendees = vi.fn();
      const { container, getByTestId } = render(
        <BrowserRouter>
          <ApolloProvider
            client={new ApolloClient({ cache: new InMemoryCache() })}
          >
            <HostHeader onViewAttendees={onViewAttendees} />
          </ApolloProvider>
        </BrowserRouter>,
      );
      const StyledHostHeader = getByTestId('host_header');
      expect(StyledHostHeader).toHaveStyle(`
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

    test('check Start Event Button is Rendered and count from 2mins', async () => {
      updateSocialHallContext({
        showBuzzRoom: false,
      });

      updateSocialHallEventContext({
        eventDetails,
        onUpdateEventStatus: vi.fn(),
      });
      const onViewAttendees = vi.fn();
      const { getByTestId } = render(
        <BrowserRouter>
          <ApolloProvider
            client={new ApolloClient({ cache: new InMemoryCache() })}
          >
            <HostHeader onViewAttendees={onViewAttendees} />
          </ApolloProvider>
        </BrowserRouter>,
      );
      expect(getByTestId('start_event_button')).toBeInTheDocument();

      await act(async () => {
        await waitFor(() => fireEvent.click(getByTestId('start_event_button')));
      });
    });

    test('check BuzzRoom Leave Quietly Button is Rendered and Clicked', async () => {
      updateSocialHallContext({ showBuzzRoom: true });
      updateSocialHallEventContext({
        isPreEvent: true,
        eventDetails,
      });
      const onViewAttendees = vi.fn();
      const { getByTestId } = render(
        <BrowserRouter>
          <ApolloProvider
            client={new ApolloClient({ cache: new InMemoryCache() })}
          >
            <HostHeader onViewAttendees={onViewAttendees} />
          </ApolloProvider>
        </BrowserRouter>,
      );
      expect(getByTestId('leave_quietly_button')).toBeInTheDocument();
      act(() => {
        fireEvent.click(getByTestId('leave_quietly_button'));
      });
    });

    test('check Counter clock value is rendered or not', async () => {
      updateSocialHallContext({
        showBuzzRoom: false,
      });
      updateSocialHallEventContext({
        isMainEvent: false,
        eventDetails,
      });
      const onViewAttendees = vi.fn();
      const { getByTestId } = render(
        <BrowserRouter>
          <ApolloProvider
            client={new ApolloClient({ cache: new InMemoryCache() })}
          >
            <HostHeader onViewAttendees={onViewAttendees} />
          </ApolloProvider>
        </BrowserRouter>,
      );
      act(() => {
        expect(getByTestId('counter_clock')).toBeInTheDocument();
      });
    });

    test('check toggle buzzroom button is visible', async () => {
      updateSocialHallContext({
        showBuzzRoom: true,
      });
      updateSocialHallEventContext({
        isMainEvent: false,
        eventDetails,
      });
      const onViewAttendees = vi.fn();
      const { getByTestId } = render(
        <BrowserRouter>
          <ApolloProvider
            client={new ApolloClient({ cache: new InMemoryCache() })}
          >
            <HostHeader onViewAttendees={onViewAttendees} />
          </ApolloProvider>
        </BrowserRouter>,
      );
      act(() => {
        expect(getByTestId('toggle_buzzroom_btn')).toBeInTheDocument();
      });
    });

    test('check finish main event button', async () => {
      updateSocialHallContext({
        showBuzzRoom: true,
      });
      updateSocialHallEventContext({
        isMainEvent: true,
        eventDetails,
      });
      const onViewAttendees = vi.fn();
      const { getByTestId } = render(
        <BrowserRouter>
          <ApolloProvider
            client={new ApolloClient({ cache: new InMemoryCache() })}
          >
            <HostHeader onViewAttendees={onViewAttendees} />
          </ApolloProvider>
        </BrowserRouter>,
      );

      expect(getByTestId('finish_main_event')).toBeInTheDocument();

      await act(async () => {
        await waitFor(() => fireEvent.click(getByTestId('finish_main_event')));
        expect(getByTestId('default-event-modal')).toBeInTheDocument();
      });
    });
  });

  describe('Mobile View', () => {
    beforeEach(() => {
      updateWindowDimension(breakpoints.MOBILE_MAX);
    });

    test('check mobile view is rendered', async () => {
      updateSocialHallContext({
        showBuzzRoom: true,
      });
      updateSocialHallEventContext({
        isMainEvent: false,
        eventDetails,
      });
      const onViewAttendees = vi.fn();
      const { getByTestId } = render(
        <BrowserRouter>
          <ApolloProvider
            client={new ApolloClient({ cache: new InMemoryCache() })}
          >
            <HostHeader onViewAttendees={onViewAttendees} />
          </ApolloProvider>
        </BrowserRouter>,
      );
      act(() => {
        expect(getByTestId('toggle_buzzroom_btn')).toBeInTheDocument();
      });
    });
  });
});
