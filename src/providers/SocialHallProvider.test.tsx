import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { SocialHallContext, SocialHallProvider } from '@/providers';
import { render, cleanup, waitFor } from '@/test-utils';
import { PushNotificationProvider } from '@/test-utils/contexts/PushNotificationContext';

vi.mock('@/facade/agora', () => ({
  default: {
    getDevices: vi.fn().mockReturnValue([]),
  },
}));

vi.mock('@/hooks/socialHall/useInitializeSocialHall', () => ({
  useInitializeSocialHall: vi.fn().mockReturnValue({
    initializeSocialHall: vi.fn(),
    socialHallAttendee: {
      _id: 1,
    },
  }),
}));

vi.mock('@/hooks/socialHall/useRefreshVisualizationSubscription', () => ({
  useRefreshVisualizationSubscription: vi.fn().mockReturnValue({
    refreshVisualization: vi.fn(),
  }),
}));
vi.mock('@/hooks/socialHall/useSocialHallEventSubscription', () => ({
  useSocialHallEventSubscription: vi.fn().mockReturnValue({
    eventDetails: {
      _id: '1asda319837',
    },
  }),
}));
vi.mock('@/hooks/socialHall/useSocialHallEvent', () => ({
  useSocialHallEvent: vi.fn().mockReturnValue({
    eventDetails: {
      _id: '1asda319837',
    },
  }),
}));
vi.mock('@/hooks/socialHall/useSocialHallChangesSubscription', () => ({
  useSocialHallChangesSubscription: vi.fn(),
}));
vi.mock('@/hooks/socialHall/useSocketEvent', () => ({
  useSocketEvent: vi.fn().mockReturnValue({
    initSocketInstance: vi.fn(),
  }),
}));

vi.mock('@/hooks/event/useEventAttendees', () => ({
  useEventAttendees: vi.fn().mockReturnValue({
    refetchAudience: vi.fn(),
  }),
}));

describe('SocialHallProvider', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the provider component', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <MockedProvider>
          <PushNotificationProvider>
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
          </PushNotificationProvider>
        </MockedProvider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(getByTestId('socialHallAttendeeId')).toBeTruthy();
    });
  });
});
