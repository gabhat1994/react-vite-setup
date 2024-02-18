import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { SocialHallContext, SocialHallProvider } from '@/providers';
import { render, cleanup, waitFor } from '@/test-utils';

vi.mock('@/facade/agora', () => ({
  default: {
    getDevices: vi.fn().mockReturnValue([]),
  },
}));

vi.mock('@/providers', () => ({
  useSocialHallEventContext: vi.fn().mockReturnValue({
    eventDetails: {
      _id: '1asda319837',
    },
  }),
}));

vi.mock('@/hooks/socialHall', () => ({
  useAgoraEvents: vi.fn(),
  useSocialHallCall: vi.fn().mockReturnValue({
    onMuteCall: vi.fn(),
    startCall: vi.fn(),
    leaveCall: vi.fn(),
    publishAudio: vi.fn(),
    closeAgoraConnection: vi.fn(),
    onExitSocialHallCall: vi.fn(),
  }),
  useSocialHallMessage: vi.fn().mockReturnValue({
    createMessage: vi.fn(),
  }),
  useInitializeSocialHall: vi.fn().mockReturnValue({
    initializeSocialHall: vi.fn(),
    socialHallAttendee: {
      _id: 1,
    },
  }),

  useCustomGroupSubscription: vi.fn().mockReturnValue({
    hostJoined: false,
  }),

  useRefreshVisualizationSubscription: vi.fn().mockReturnValue({
    refreshVisualization: vi.fn(),
  }),

  useEventStatusChange: vi.fn().mockReturnValue({
    isMainEvent: false,
    userEventRole: '',
  }),

  useSocialHallEventSubscription: vi.fn().mockReturnValue({
    eventDetails: {
      _id: '1asda319837',
    },
  }),
  useSocialHallChangesSubscription: vi.fn(),
}));

vi.mock('@/hooks/event', () => ({
  useEventAttendees: vi.fn().mockReturnValue({
    refetchAudience: vi.fn(),
  }),
}));

describe('SocialHallProvider', () => {
  afterEach(() => {
    cleanup();
  });

  it.skip('should render the provider component', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <MockedProvider>
          <SocialHallProvider>
            <SocialHallContext.Consumer>
              {(value) => (
                <>
                  <span data-testid="socialHallAttendeeId">
                    {value.socialHallAttendee?._id}
                  </span>
                </>
              )}
            </SocialHallContext.Consumer>
          </SocialHallProvider>
        </MockedProvider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(getByTestId('socialHallAttendeeId')).toBeTruthy();
    });
  });
});
