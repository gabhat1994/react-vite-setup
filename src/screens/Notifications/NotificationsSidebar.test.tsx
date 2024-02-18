import { BrowserRouter } from 'react-router-dom';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { queryHelpers } from '@testing-library/dom';
import MockDate from 'mockdate';
import { intersectionObserver } from '@/test-utils/stubs';
import { fireEvent, render, waitFor } from '@/test-utils';
import {
  MarkNotificationAsReadDocument,
  type MarkNotificationAsReadMutation,
  MarkNotificationsAsViewedDocument,
  type MarkNotificationsAsViewedMutation,
  type NotificationFragment,
  NotificationsDocument,
  type NotificationsQuery,
  NotificationsUnreadCountDocument,
  type NotificationsUnreadCountQuery,
  UpdateNotificationsReadStatusDocument,
  type UpdateNotificationsReadStatusMutation,
} from '@/apollo/graphql';
import { NotificationType } from '@/apollo/generated/types';
import { createNotification, createTimeAgo, createUsers } from './mocks';
import NotificationsSidebar from './NotificationsSidebar';

vi.mock('i18next', async () => ({
  ...(await vi.importActual<{}>('i18next')),
  t: vi.fn((key) => key),
}));

const createNotificationsMock = (
  notifications: NotificationFragment[],
): MockedResponse<NotificationsQuery> => ({
  request: {
    query: NotificationsDocument,
    variables: {
      offset: 0,
      limit: 20,
      filter: {
        category: null,
      },
    },
  },
  result: {
    data: {
      notifications: {
        count: notifications.length,
        unreadCount: notifications.length,
        data: notifications,
      },
    },
  },
});

const createMarkAsReadMutationMock = (
  notification: NotificationFragment,
): MockedResponse<MarkNotificationAsReadMutation> => ({
  request: {
    query: MarkNotificationAsReadDocument,
    variables: { id: notification._id },
  },
  result: {
    data: { markNotificationAsRead: { ...notification, unread: false } },
  },
});

const createUpdateNotificationReadStatusMutationMock =
  (): MockedResponse<UpdateNotificationsReadStatusMutation> => ({
    request: {
      query: UpdateNotificationsReadStatusDocument,
      variables: { _id: null },
    },
    result: {
      data: {
        updateNotificationsReadStatus: {
          unreadCount: 0,
        },
      },
    },
  });

const createNotificationsUnreadCountMock =
  (): MockedResponse<NotificationsUnreadCountQuery> => ({
    request: {
      query: NotificationsUnreadCountDocument,
      variables: {},
    },
    result: {
      data: {
        notificationsUnreadCount: {
          total: 0,
          Noums: 0,
          Community: 0,
          Money: 0,
          Other: 0,
        },
      },
    },
  });

const createMarkAsViewedMutationMock = (
  date: Date,
): MockedResponse<MarkNotificationsAsViewedMutation> => ({
  request: {
    query: MarkNotificationsAsViewedDocument,
    variables: { date: date.toISOString() },
  },
  result: {
    data: {
      updateUserActionLog: {
        lastCheckedNotificationsDate: date.toISOString(),
      },
    },
  },
});

const Wrapper: React.FC<{ mocks?: ReadonlyArray<MockedResponse> }> = ({
  children,
  mocks = [],
}) => (
  <MockedProvider mocks={mocks} addTypename={true}>
    <BrowserRouter>{children}</BrowserRouter>
  </MockedProvider>
);

describe('NotificationsSidebar', () => {
  // eslint-disable-next-line no-console
  const originalWarn = console.warn;
  const mockedDate = new Date('2023-01-01T11:22:33Z');

  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.warn = (...args) => {
      // TODO: find out why `Should call onClose on notification click` test produces this warning
      if (/requested in refetchQueries options.include array/.test(args[0])) {
        return;
      }

      originalWarn.call(console, ...args);
    };
  });

  afterAll(() => {
    // eslint-disable-next-line no-console
    console.error = originalWarn;
  });

  beforeEach(() => {
    MockDate.set(mockedDate);
    intersectionObserver.mock();
  });
  afterEach(() => {
    MockDate.reset();
    intersectionObserver.restore();
  });

  test('Should render with mandatory props', () => {
    const { getByText } = render(
      <Wrapper>
        <NotificationsSidebar open={true} onClickEvent={vi.fn()} />,
      </Wrapper>,
    );
    expect(getByText('noumena.notifications.header')).toBeInTheDocument();
  });

  test('Should call onClose on notification click', async () => {
    const onCloseFn = vi.fn();
    const notificationsCount = 3;
    const notifications = Array.from({ length: notificationsCount }).map(() =>
      createNotification({
        type: NotificationType.Invite,
        users: createUsers(1),
        unread: true,
        updatedAt: createTimeAgo({ minutes: 15 }).toISOString(),
      }),
    );

    const component = render(
      <Wrapper
        mocks={[
          createNotificationsMock(notifications),
          createMarkAsReadMutationMock(notifications[0]),
          createNotificationsUnreadCountMock(),
          createMarkAsViewedMutationMock(mockedDate),
        ]}
      >
        <NotificationsSidebar
          open={true}
          onClickEvent={vi.fn()}
          onClose={onCloseFn}
        />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(component.getAllByRole('listitem')).toHaveLength(
        notificationsCount,
      );
    });

    const [firstItem] = component.getAllByRole('listitem');

    fireEvent.click(firstItem);

    expect(onCloseFn).toHaveBeenCalled();
  });

  test('Should mark notification as read', async () => {
    const notificationsCount = 3;
    const notifications = Array.from({ length: notificationsCount }).map(() =>
      createNotification({
        type: NotificationType.Invite,
        users: createUsers(1),
        unread: true,
        updatedAt: createTimeAgo({ minutes: 15 }).toISOString(),
      }),
    );

    const component = render(
      <Wrapper
        mocks={[
          createNotificationsMock(notifications),
          createMarkAsReadMutationMock(notifications[0]),
          createNotificationsUnreadCountMock(),
          createMarkAsViewedMutationMock(mockedDate),
        ]}
      >
        <NotificationsSidebar open={true} onClickEvent={vi.fn()} />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(component.getAllByRole('listitem')).toHaveLength(
        notificationsCount,
      );
    });

    const [firstItem] = component.getAllByRole('listitem');

    fireEvent.click(firstItem);

    await waitFor(() => {
      expect(
        queryHelpers.queryAllByAttribute(
          'data-unread',
          component.getByTestId('notifications-list'),
          'false',
        ),
      ).toHaveLength(1);
    });
  });

  test('Should mark all notifications as read', async () => {
    const notificationsCount = 3;
    const notifications = Array.from({ length: notificationsCount }).map(() =>
      createNotification({
        type: NotificationType.Invite,
        users: createUsers(1),
        unread: true,
        updatedAt: createTimeAgo({ minutes: 15 }).toISOString(),
      }),
    );

    const component = render(
      <Wrapper
        mocks={[
          createNotificationsMock(notifications),
          createUpdateNotificationReadStatusMutationMock(),
          createNotificationsUnreadCountMock(),
          createMarkAsViewedMutationMock(mockedDate),
        ]}
      >
        <NotificationsSidebar open={true} onClickEvent={vi.fn()} />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(component.getAllByRole('listitem')).toHaveLength(
        notificationsCount,
      );
    });

    fireEvent.click(
      component.getByText('noumena.notifications.mark_all_as_read'),
    );

    await waitFor(() => {
      expect(
        queryHelpers.queryAllByAttribute(
          'data-unread',
          component.getByTestId('notifications-list'),
          'false',
        ),
      ).toHaveLength(0);
    });
  });
});
