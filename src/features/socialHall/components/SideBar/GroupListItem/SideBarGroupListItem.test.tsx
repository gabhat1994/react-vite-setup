import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, act } from '@/test-utils';
import { demoGroups } from '../data';
import { SideBarGroupListItem } from './SideBarGroupListItem';

vi.mock('@/providers', () => ({
  useSocialHallContext: vi.fn().mockReturnValue({
    socialHallAttendee: {
      _id: '62a244e77d2faa000ec98918',
    },
  }),
  useSocialHallEventContext: vi.fn().mockReturnValue({
    isEventHost: false,
  }),
  useSocialHallCallContext: vi.fn().mockReturnValue({
    onLeaveCall: vi.fn(),
  }),
}));

vi.mock('@/hooks', () => ({
  useKnockUser: vi.fn().mockReturnValue({
    acceptLoading: true,
    declineLoading: true,
  }),
  useSocialHallCall: vi.fn().mockReturnValue({}),
  useRefreshKnocks: vi.fn().mockReturnValue({
    useRefreshKnocks: {},
    userActiveKnocks: {},
  }),
  useToast: vi.fn().mockReturnValue({
    addToast: vi.fn(),
  }),
  useWindowDimensions: vi.fn().mockReturnValue({
    width: 1200,
  }),
  useDeviceType: vi.fn(() => ({})),
  DeviceTypeEnum: { MOBILE: vi.fn(() => 'mobile') },
}));

describe('<SideBarGroupListItem />', () => {
  test(`check group list item rendered enough or not`, () => {
    const { container, getByTestId, getByText } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <SideBarGroupListItem groupInfo={demoGroups[0]} />
        </ApolloProvider>
      </BrowserRouter>,
    );
    const GroupListItemWrapper = getByTestId('item_wrapper');
    expect(GroupListItemWrapper).toHaveStyle(`
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid var(--bg-separator-neutral-default);
    `);

    expect(getByTestId('members_count')).toBeInTheDocument();
    expect(getByText('Design Corner')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test(`check group list item join button works or not`, () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <SideBarGroupListItem groupInfo={demoGroups[0]} />
        </ApolloProvider>
      </BrowserRouter>,
    );
    expect(getByTestId('join_button')).toBeInTheDocument();
    act(() => {
      fireEvent.click(getByTestId('join_button'));
    });
    expect(container).toBeTruthy();
  });
});
