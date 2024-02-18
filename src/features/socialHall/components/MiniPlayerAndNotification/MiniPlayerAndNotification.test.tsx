import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@/test-utils';
import { singleNotification } from './data';
import { MiniPlayerAndNotification } from './MiniPlayerAndNotification';

vi.mock('@/providers', () => ({
  useSocialHallContext: vi.fn().mockReturnValue({
    showMiniPlayer: false,
    activeSocialHallGroup: {
      _id: 1,
    },
    userActiveGroupData: {
      data: {
        userActiveSocialHallGroup: {
          _id: 1,
        },
      },
    },
  }),
  useSocialHallEventContext: vi.fn().mockReturnValue({
    hostJoined: false,
  }),
  useSocialHallCallContext: vi.fn().mockReturnValue({
    onLeaveCall: vi.fn(),
  }),
}));

describe('<MiniPlayerAndNotification />', () => {
  const props = {
    closeMiniPlayer: vi.fn(),
    showUserPopup: false,
    showGroupPopup: false,
    attendeeId: '',
    groupId: '',
    onCloseGroupPopup: vi.fn(),
    onCloseUserPopup: vi.fn(),
  };
  test(`check mini player and notification is displayed or not`, () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <MiniPlayerAndNotification
            showMiniPlayerNotification={true}
            initialNotifications={singleNotification}
            {...props}
          />
          ,
        </ApolloProvider>
      </BrowserRouter>,
    );
    const MainWrapper = getByTestId('main_wrapper');
    expect(MainWrapper).toHaveStyle(`
      position: absolute;
      left: 36px;
      bottom: 88px;
      width: 100%;
      height: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      width: calc(100% - 72px);
      gap: 16px;
    `);

    expect(getByTestId('main_wrapper')).toBeInTheDocument();
    expect(getByTestId('player_wrapper')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
