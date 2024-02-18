import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, act } from '@/test-utils';
import { PushNotificationProvider } from '@/test-utils/contexts/PushNotificationContext';
import { ControlPanel } from './ControlPanel';
import { type ControlPanelProps } from './types';

vi.mock('@/providers', () => ({
  useSocialHallContext: vi.fn().mockReturnValue({}),
  useSocialHallCallContext: vi.fn().mockReturnValue({
    isMuted: true,
    onLeaveCall: vi.fn(),
    toggleCamera: vi.fn(),
    toggleMuteCall: vi.fn(),
    isCameraEnable: true,
    localVideoTrack: null,
    onSendSubscriptionMessage: vi.fn(),
  }),
  useSocialHallEventContext: vi.fn().mockReturnValue({}),
}));

describe('<ControlPanel />', () => {
  const props: ControlPanelProps = {
    onToggleChat: vi.fn(),
    onToggleMember: vi.fn(),
    showMembersPanel: true,
    isReconnecting: false,
  };
  test.skip(`Render ControlPanel`, async () => {
    await act(async () => {
      const { container, getByTestId } = render(
        <BrowserRouter>
          <PushNotificationProvider>
            <ApolloProvider
              client={new ApolloClient({ cache: new InMemoryCache() })}
            >
              <ControlPanel {...props} />
            </ApolloProvider>
          </PushNotificationProvider>
        </BrowserRouter>,
      );
      expect(getByTestId('control_panel_wrapper')).toBeInTheDocument();
      expect(container).toBeTruthy();
    });
  });
});
