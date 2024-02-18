import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, fireEvent } from '@/test-utils';
import { demoAttendees, demoKnocks as mockDemoKnocks } from '../data';
import { SideBarUserListItem } from './SideBarUserListItem';

vi.mock('@/hooks', () => ({
  useToast: vi.fn().mockReturnValue({
    addToast: vi.fn(),
  }),
  useKnockUser: vi.fn().mockReturnValue({
    knockUser: () => vi.fn(),
    acceptKnock: () => vi.fn(),
    declineKnock: () => vi.fn(),
  }),
  useRefreshKnocks: vi.fn().mockReturnValue({
    userOwnKnocks: {
      data: mockDemoKnocks,
    },
  }),
  useSocialHallCall: vi.fn().mockReturnValue({
    leaveCall: vi.fn(),
  }),
  useWindowDimensions: vi.fn().mockReturnValue({
    width: 1200,
  }),
}));

describe('<SideBarUserListItem />', () => {
  test(`check user list item rendered enough or not`, () => {
    const { container, getByTestId, getByText } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <SideBarUserListItem userInfo={demoAttendees[0]} />
        </ApolloProvider>
      </BrowserRouter>,
    );
    const UserListItemWrapper = getByTestId('item_wrapper');
    expect(UserListItemWrapper).toHaveStyle(`
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 235px;
      padding: 0 24px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid var(--bg-separator-neutral-default);
      background-color: var(--bg-tablecell-neutral-alt-default);
    `);

    expect(getByTestId('avatar_wrapper')).toBeInTheDocument();
    expect(getByText('Li Rimin')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test(`check user list item close and accept button works or not`, () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <SideBarUserListItem userInfo={demoAttendees[0]} />
        </ApolloProvider>
      </BrowserRouter>,
    );

    expect(getByTestId('close_button')).toBeInTheDocument();
    fireEvent.click(getByTestId('close_button'));
    expect(getByTestId('accept_button')).toBeInTheDocument();
    fireEvent.click(getByTestId('accept_button'));
    expect(container).toBeTruthy();
  });
});
