import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { intersectionObserver } from '@/test-utils/stubs';
import { render, cleanup, act } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { client } from '@/apollo/client';
import {
  CurrentUserDocument,
  type CurrentUserQuery,
  EventsDocument,
  GetEventsDocument,
  GetSpaceByTypeDocument,
  PreCalculateNoumLinkDataDocument,
  UnreadNotificationsCountDocument,
  type UnreadNotificationsCountQuery,
} from '@/apollo/graphql';
import { EventSubscriptionType } from '@/apollo/generated/types';
import LinkedNoum from './index';
import * as spaceTypeMock from './mockForTest.json';

const user = {
  _id: '624fbb408eaeb3c5fbe40eb2',
  access: true,
  userStatus: 'ACTIVE',
};

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
        unreadCount: count,
      },
    },
  },
});

const getEventsMock = {
  request: {
    query: GetEventsDocument,
    variables: {
      chamberId: '628e70b4beea5a017a6e362e',
    },
  },
  result: () => ({ data: { getEvents: getEventsMock } }),
};

const getSpaceByTypeMock = {
  request: {
    query: GetSpaceByTypeDocument,
    variables: {
      type: 'HOME',
    },
  },
  result: () => ({ data: spaceTypeMock.data }),
};

const subscriptionsEventsMock = {
  request: {
    query: EventsDocument,
    variables: {
      userId: user._id,
    },
  },
  result: () => ({
    data: {
      events: {
        type: EventSubscriptionType.GoLive,
        eventId: '',
        userId: user._id,
      },
    },
  }),
};

const currentUserMock: MockedResponse<CurrentUserQuery> = {
  request: {
    query: CurrentUserDocument,
  },
  result: () => ({ data: { currentUser: user } }),
};
const unreadCount = 876;

const preCalculatemock = {
  request: {
    query: PreCalculateNoumLinkDataDocument,
    variables: {
      linkedNoumIDs: [],
    },
  },
  result: () => ({
    data: {
      preCalculateNoumLinkData: {
        connectionsCount: 13,
        followersCount: 6,
      },
    },
  }),
};

const mocks = (): MockedResponse[] => [
  getEventsMock,
  subscriptionsEventsMock,
  subscriptionsEventsMock,
  currentUserMock,
  createUnreadNotificationsMock(unreadCount),
  preCalculatemock,
  preCalculatemock,
  getSpaceByTypeMock,
];

describe('<LinkedNoum />', () => {
  const initialEntries = ['/link-noum'];
  beforeAll(() => {
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: {
        register: vi.fn(), // Choose your favourite mocking library
        addEventListener: vi.fn(),
      },
    });
  });
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });
  afterAll(() => {
    cleanup();
  });

  test('Testing for rendering', async () => {
    await act(async () => {
      const { container } = render(
        <MockedProvider addTypename={false} mocks={mocks()}>
          <AuthProvider client={client} initialUser={user}>
            <MemoryRouter initialEntries={initialEntries}>
              <LinkedNoum />
            </MemoryRouter>
          </AuthProvider>
        </MockedProvider>,
      );
      expect(container).toBeTruthy();
    });
  });
});
