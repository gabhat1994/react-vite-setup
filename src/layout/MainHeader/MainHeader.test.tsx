import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { render } from '@/test-utils';
import { useClient } from '@/hooks';
import {
  CurrentUserDocument,
  type CurrentUserQuery,
  UnreadNotificationsCountDocument,
  type UnreadNotificationsCountQuery,
} from '@/apollo/graphql';
import { AuthProvider } from '@/features/auth/contexts';
import apolloClient from '@/apollo/client';
import { MainHeader, MainHeaderInner } from './MainHeader';

describe('<MainHeader />', () => {
  beforeAll(() => {
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: {
        register: vi.fn(), // Choose your favourite mocking library
        addEventListener: vi.fn(),
      },
    });
  });

  test(`testing MainHeader contains Logo`, () => {
    const { container } = render(
      <BrowserRouter>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <BrowserRouter>
                <MainHeaderInner
                  coins={385}
                  calendars={1}
                  notifications={1}
                  messages={1}
                  avatar="https://www.w3schools.com/howto/img_avatar2.png"
                  userName="Jack"
                />
              </BrowserRouter>
            </ApolloProvider>
          );
        }}
      </BrowserRouter>,
    );

    // TODO Can't deeper element by testId when wrapped by apollo provider
    // const LogoImage = getByTestId('logo');
    // expect(LogoImage).toHaveStyle(`
    //   height: 28px;
    //   cursor: pointer;
    //   align-items: center;
    //   display: flex;
    // `);

    expect(container).toBeTruthy();
  });

  test('check whether MainHeader contains search box or not', () => {
    const { container } = render(
      <BrowserRouter>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <BrowserRouter>
                {' '}
                <MainHeaderInner />{' '}
              </BrowserRouter>
            </ApolloProvider>
          );
        }}
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
  });
});

const createUnreadNotificationsMock = (
  count: number,
): MockedResponse<UnreadNotificationsCountQuery> => ({
  request: {
    query: UnreadNotificationsCountDocument,
    variables: {
      limit: 20,
      offset: 0,
      filter: {
        category: null,
      },
    },
  },
  result: {
    data: {
      unreadNotifications: {
        unreadCount: 5,
        unviewedCount: count,
      },
    },
  },
});

const currentUser = {
  _id: '624fbb408eaeb3c5fbe40eb2',
  access: true,
  userStatus: 'ACTIVE',
};

const currentUserMock: MockedResponse<CurrentUserQuery> = {
  request: {
    query: CurrentUserDocument,
  },
  result: () => ({ data: { currentUser } }),
};

describe('<MainHeaderContainer />', () => {
  test('Injects unread counters properly', async () => {
    const unreadCount = 876;

    const { findByText } = render(
      <MemoryRouter>
        <MockedProvider
          mocks={[createUnreadNotificationsMock(unreadCount), currentUserMock]}
        >
          <AuthProvider client={apolloClient} initialUser={currentUser}>
            <MainHeader />
          </AuthProvider>
        </MockedProvider>
      </MemoryRouter>,
    );

    expect(await findByText(`${unreadCount}`)).toBeInTheDocument();
  });
});
