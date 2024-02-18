import { NetworkStatus } from '@apollo/client';
import { type TransProps } from 'react-i18next';
import { intersectionObserver } from '@/test-utils/stubs';
import { fireEvent, render, waitFor, within } from '@/test-utils';
import {
  InvitationStatus,
  NotificationInviteStatus,
  NotificationType,
  UserRole,
} from '@/apollo/generated/types';
import {
  type NotificationHandlers,
  NotificationHandlersContext,
} from '../NotificationHandlersContext';
import NotificationsList from '../List';
import {
  createChamber,
  createConnection,
  createEvent,
  createGroup,
  createNotification,
  createUser,
  createUsers,
} from '../mocks';

vi.mock('i18next', async () => ({
  ...(await vi.importActual<{}>('i18next')),
  t: vi.fn((key) => key),
}));

vi.mock('react-i18next', async () => ({
  ...(await vi.importActual<{}>('react-i18next')),
  Trans: ({ i18nKey }: TransProps<string>) => <span>{i18nKey}</span>,
}));

const Wrapper: React.FC<{ overrideValues?: Partial<NotificationHandlers> }> = ({
  children,
  overrideValues = {},
}) => (
  <NotificationHandlersContext.Provider
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    value={{
      ...{
        masterId: '1234',
        userStatus: 'PENDING',
        events: {
          acceptEventInvitation: vi.fn(),
          rejectEventInvitation: vi.fn(),
          goLiveEvent: vi.fn(),
          joinEvent: vi.fn(),
          showEventDetails: vi.fn(),
        },
        connections: {
          acceptConnection: vi.fn(),
          rejectConnection: vi.fn(),
          refetchConnectionData: vi.fn(),
        },
        memberInvitations: {
          acceptInvitation: vi.fn(),
          rejectInvitation: vi.fn(),
          acceptRolePromotion: vi.fn(),
          rejectRolePromotion: vi.fn(),
        },
        navigateToNoum: vi.fn(),
        navigateToSocialHall: vi.fn(),
        navigateToMyNoum: vi.fn(),
        navigateToPost: vi.fn(),
        navigateToMoneyPage: vi.fn(),
        navigateToMoneyDetailsPage: vi.fn(),
        markAsRead: vi.fn(),
        refreshCurrentUser: vi.fn(),
        navigateToInvoice: vi.fn(),
        navigateToPlanDetails: vi.fn(),
        navigateToContract: vi.fn(),
        navigateToStatementOfWork: vi.fn(),
        navigateToApplicationReview: vi.fn(),
      },
      ...overrideValues,
    }}
  >
    {children}
  </NotificationHandlersContext.Provider>
);

describe('NotificationGateway', () => {
  beforeEach(() => {
    intersectionObserver.mock();
  });
  afterEach(() => {
    intersectionObserver.restore();
  });

  test('Should render empty list', () => {
    const { getByTestId } = render(
      <Wrapper>
        <NotificationsList
          notifications={[]}
          fetchNextPage={vi.fn()}
          networkStatus={NetworkStatus.ready}
          totalCount={0}
        />
      </Wrapper>,
    );
    expect(getByTestId('empty-list')).toBeInTheDocument();
  });

  test('Should render list loading state', () => {
    const { getByTestId } = render(
      <Wrapper>
        <NotificationsList
          notifications={[]}
          fetchNextPage={vi.fn()}
          networkStatus={NetworkStatus.loading}
          totalCount={0}
        />
      </Wrapper>,
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  test('Should render events', async () => {
    const notifications = [
      createNotification({
        type: NotificationType.EventLive,
        users: createUsers(1),
        unread: true,
        event: createEvent(),
      }),
      createNotification({
        type: NotificationType.EventLive,
        users: createUsers(1),
        unread: true,
        event: createEvent(undefined, UserRole.Host),
      }),
      createNotification({
        type: NotificationType.EventReminder,
        users: createUsers(1),
        unread: false,
        event: createEvent(),
      }),
      createNotification({
        type: NotificationType.EventReminder,
        users: createUsers(1),
        unread: false,
        event: createEvent(undefined, UserRole.Host),
      }),
      createNotification({
        type: NotificationType.EventInvitee,
        users: createUsers(1),
        unread: false,
        event: createEvent(
          InvitationStatus.Pending,
          UserRole.Cohost,
          undefined,
          false,
        ),
      }),
      createNotification({
        type: NotificationType.EventInvitee,
        users: createUsers(1),
        unread: false,
        event: createEvent(),
      }),
      createNotification({
        type: NotificationType.EventDateModified,
        users: createUsers(1),
        unread: true,
        event: createEvent(InvitationStatus.Pending, UserRole.Participant),
      }),
      createNotification({
        type: NotificationType.EventDateModified,
        users: createUsers(1),
        unread: true,
        event: createEvent(InvitationStatus.Accepted, UserRole.Cohost),
      }),
      createNotification({
        type: NotificationType.EventDateModified,
        users: createUsers(1),
        unread: true,
        event: createEvent(InvitationStatus.Accepted, UserRole.Participant),
      }),
      createNotification({
        type: NotificationType.EventDeleted,
        users: createUsers(1),
        unread: true,
        event: createEvent(InvitationStatus.Pending, UserRole.Participant),
      }),
      createNotification({
        type: NotificationType.EventDeleted,
        users: createUsers(1),
        unread: true,
        event: createEvent(InvitationStatus.Accepted, UserRole.Cohost),
      }),
      createNotification({
        type: NotificationType.EventDeleted,
        users: createUsers(1),
        unread: true,
        event: createEvent(InvitationStatus.Accepted, UserRole.Participant),
      }),
      createNotification({
        type: NotificationType.EventStarting,
        users: createUsers(1),
        unread: true,
        event: createEvent(undefined, UserRole.Host),
      }),
      createNotification({
        type: NotificationType.EventStarting,
        users: createUsers(1),
        unread: true,
        event: createEvent(undefined, UserRole.Participant),
      }),
    ];
    const goLiveFn = vi.fn();
    const acceptEventInvitationFn = vi.fn();
    const joinEventFn = vi.fn();
    const rejectEventInvitationFn = vi.fn();

    const { getByTestId, getByText } = render(
      <Wrapper
        overrideValues={{
          events: {
            goLiveEvent: goLiveFn,
            acceptEventInvitation: acceptEventInvitationFn,
            joinEvent: joinEventFn,
            rejectEventInvitation: rejectEventInvitationFn,
            showEventDetails: vi.fn(),
          },
        }}
      >
        <NotificationsList
          notifications={notifications}
          fetchNextPage={vi.fn()}
          networkStatus={NetworkStatus.ready}
          totalCount={notifications.length}
        />
      </Wrapper>,
    );
    expect(getByTestId('section-title')).toBeInTheDocument();

    // event live
    expect(
      getByText('noumena.notification_type.event_live.guest.body'),
    ).toBeInTheDocument();

    fireEvent.click(getByText('noumena.notifications.events.join_now'));
    await waitFor(() => {
      expect(joinEventFn).toHaveBeenNthCalledWith(
        1,
        notifications[0],
        notifications[0].event,
      );
    });

    expect(
      getByText('noumena.notification_type.event_live.host.body'),
    ).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(
        within(getByTestId('EventLive')).getByText(
          'noumena.notifications.events.go_live_now',
        ),
      );
    });
    expect(goLiveFn).toHaveBeenNthCalledWith(
      1,
      notifications[1],
      expect.objectContaining(notifications[1].event),
    );

    // event reminder
    expect(
      getByText('noumena.notification_type.event_reminder.host.body'),
    ).toBeInTheDocument();

    expect(
      getByText('noumena.notification_type.event_reminder.guest.body'),
    ).toBeInTheDocument();

    // event starting host
    expect(
      getByText(
        'noumena.calendar.notification.description.host_event_starting',
      ),
    ).toBeInTheDocument();

    await waitFor(() => {
      const [goLiveButton] = within(
        getByTestId('EventStartingHost'),
      ).getAllByRole('button');
      fireEvent.click(goLiveButton);
    });

    expect(goLiveFn).toHaveBeenNthCalledWith(
      2,
      notifications[12],
      expect.objectContaining(notifications[12].event),
    );

    // event starting participant
    expect(
      getByText(
        'noumena.calendar.notification.description.participant_event_starting',
      ),
    ).toBeInTheDocument();

    await waitFor(() => {
      const [joinButton] = within(
        getByTestId('EventStartingParticipant'),
      ).getAllByRole('button');
      fireEvent.click(joinButton);
    });

    expect(joinEventFn).toHaveBeenNthCalledWith(
      3,
      notifications[13],
      expect.objectContaining(notifications[13].event),
    );

    // event cohost invitee
    expect(
      getByText('noumena.notification_type.event_cohost_invitee.body'),
    ).toBeInTheDocument();

    const [cohostInviteeAcceptButton, cohostInviteeRejectButton] = within(
      getByTestId('EventCohostInvitee'),
    ).getAllByRole('button');
    fireEvent.click(cohostInviteeAcceptButton!);
    await waitFor(async () => {
      expect(acceptEventInvitationFn).toBeCalledWith(
        notifications[4],
        notifications[4].event,
        notifications[4].event?.id?.recurring,
      );
    });

    fireEvent.click(cohostInviteeRejectButton!);
    await waitFor(() => {
      expect(rejectEventInvitationFn).toBeCalledWith(
        notifications[4],
        notifications[4].event,
        notifications[4].event?.id?.recurring,
      );
    });

    // event invitee
    expect(
      getByText('noumena.notification_type.event_invitee.body'),
    ).toBeInTheDocument();

    const [inviteeAcceptButton, inviteeRejectButton] = within(
      getByTestId('EventInvitee'),
    ).getAllByRole('button');

    fireEvent.click(inviteeAcceptButton!);
    await waitFor(() => {
      expect(acceptEventInvitationFn).toBeCalledWith(
        notifications[5],
        notifications[5].event,
        notifications[5].event?.id?.recurring,
      );
    });
    fireEvent.click(inviteeRejectButton!);
    await waitFor(() => {
      expect(rejectEventInvitationFn).toBeCalledWith(
        notifications[4],
        notifications[4].event,
        notifications[4].event?.id?.recurring,
      );
    });

    // event date modified
    expect(
      getByText('noumena.notification_type.event_date_modified.cohost.body'),
    ).toBeInTheDocument();
    expect(
      getByText('noumena.notification_type.event_date_modified.attendee.body'),
    ).toBeInTheDocument();
    expect(
      getByText(
        'noumena.notification_type.event_date_modified.pending_invitation.body',
      ),
    ).toBeInTheDocument();

    // event deleted
    expect(
      getByText('noumena.notification_type.event_deleted.cohost.body'),
    ).toBeInTheDocument();
    expect(
      getByText('noumena.notification_type.event_deleted.attendee.body'),
    ).toBeInTheDocument();
    expect(
      getByText(
        'noumena.notification_type.event_deleted.pending_invitation.body',
      ),
    ).toBeInTheDocument();
  });

  test('Should render connection notifications', async () => {
    const inviteId = '654';
    const chamber = createChamber();
    const connection = createConnection();
    const newReferralConnectionUsers = createUsers(3);

    const notifications = [
      createNotification({
        type: NotificationType.Invite,
        users: createUsers(1),
        data: {
          chamber,
          connection,
        },
        inviteId,
        inviteStatus: NotificationInviteStatus.Invited,
      }),
      createNotification({
        type: NotificationType.NewAdminConnection,
        users: createUsers(4),
      }),
      createNotification({
        type: NotificationType.NewReferralConnection,
        users: newReferralConnectionUsers,
      }),
      createNotification({
        type: NotificationType.FavoriteConnection,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.GuestConnection,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.ConnectionRequested,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.ConnectionRequestDeclined,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.ConnectionRequestAccepted,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.ConnectionInviteDeclined,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.ConnectionInvited,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.ConnectionInviteAccepted,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.ConnectionDisconnected,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.Connected,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.InviteAccepted,
        data: {
          connection,
        },
      }),
      createNotification({
        type: NotificationType.SpaceConversation,
        users: createUsers(3),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.InviteReminder,
        users: createUsers(1),
        data: {
          chamber,
          connection,
        },
        inviteId,
        inviteStatus: NotificationInviteStatus.Invited,
      }),
      createNotification({
        type: NotificationType.ConnectionRequestedReminder,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.ConnectionInvitedReminder,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.UserDisconnectFromProjectNoum,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
    ];

    const acceptConnectionFn = vi.fn();
    const rejectConnectionFn = vi.fn();
    const refetchConnectionDataFn = vi.fn();
    const markAsReadFn = vi.fn();
    const navigateToNoumFn = vi.fn();

    const { getByText, getByTestId } = render(
      <Wrapper
        overrideValues={{
          connections: {
            acceptConnection: acceptConnectionFn,
            rejectConnection: rejectConnectionFn,
            refetchConnectionData: refetchConnectionDataFn,
          },
          markAsRead: markAsReadFn,
          navigateToNoum: navigateToNoumFn,
        }}
      >
        <NotificationsList
          notifications={notifications}
          fetchNextPage={vi.fn()}
          networkStatus={NetworkStatus.ready}
          totalCount={notifications.length}
        />
      </Wrapper>,
    );

    // invite
    expect(
      getByText('noumena.notification_type.invite.body'),
    ).toBeInTheDocument();

    const [inviteAcceptButton, inviteRejectButton] = within(
      getByTestId('Invite'),
    ).getAllByRole('button');

    fireEvent.click(inviteAcceptButton!);
    await waitFor(() => {
      expect(acceptConnectionFn).toBeCalledWith(
        notifications[0],
        notifications[0].data?.connection?._id,
      );
    });
    fireEvent.click(inviteRejectButton!);
    await waitFor(() => {
      expect(rejectConnectionFn).toBeCalledWith(
        notifications[0],
        notifications[0].data?.connection?._id,
      );
    });

    // new admin connection
    const newAdminConnectionEl = getByText(
      'noumena.notification_type.new_admin_connection.body',
    );

    expect(newAdminConnectionEl).toBeInTheDocument();
    fireEvent.click(newAdminConnectionEl);

    // new referral connection
    const newReferralConnectionEl = getByText(
      'noumena.notification_type.new_referral_connection.body',
    );

    expect(newReferralConnectionEl).toBeInTheDocument();
    fireEvent.click(newReferralConnectionEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[2],
      newReferralConnectionUsers[0].chamber?._id,
    );

    // favorite connection
    const favoriteConnectionEl = getByText(
      'noumena.notification_type.favorite_connection.body',
    );

    expect(favoriteConnectionEl).toBeInTheDocument();
    fireEvent.click(favoriteConnectionEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[3],
      chamber._id,
    );

    // guest connection
    const guestConnectionEl = getByText(
      'noumena.notification_type.guest_connection.body',
    );

    expect(guestConnectionEl).toBeInTheDocument();
    fireEvent.click(guestConnectionEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[4],
      chamber._id,
    );

    // connection requested
    const connectionRequestedEl = getByText(
      'noumena.notification_type.connection_requested.body',
    );

    expect(connectionRequestedEl).toBeInTheDocument();
    fireEvent.click(connectionRequestedEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[5],
      chamber._id,
    );

    // connection request declined
    const connectionReqDeclinedEl = getByText(
      'noumena.notification_type.connection_request_declined.body',
    );

    expect(connectionReqDeclinedEl).toBeInTheDocument();
    fireEvent.click(connectionReqDeclinedEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[6],
      chamber._id,
    );

    // connection request accepted
    const connectionReqAcceptedEl = getByText(
      'noumena.notification_type.connection_request_accepted.body',
    );

    expect(connectionReqAcceptedEl).toBeInTheDocument();
    fireEvent.click(connectionReqAcceptedEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[7],
      chamber._id,
    );

    // connection invite declined
    const connectionInviteDeclinedEl = getByText(
      'noumena.notification_type.connection_invite_declined.body',
    );

    expect(connectionInviteDeclinedEl).toBeInTheDocument();
    fireEvent.click(connectionInviteDeclinedEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[8],
      chamber._id,
    );

    // connection invited
    const connectionInvitedEl = getByText(
      'noumena.notification_type.connection_invited.body',
    );

    expect(connectionInvitedEl).toBeInTheDocument();
    fireEvent.click(connectionInvitedEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[9],
      chamber._id,
    );

    // connection invite accepted
    const connectionInviteAccepted = getByText(
      'noumena.notification_type.connection_invite_accepted.body',
    );

    expect(connectionInviteAccepted).toBeInTheDocument();
    fireEvent.click(connectionInviteAccepted);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[10],
      chamber._id,
    );

    // connection disconnected
    const connectionDisconnectedEl = getByText(
      'noumena.notification_type.connection_disconnected.body',
    );

    expect(connectionDisconnectedEl).toBeInTheDocument();
    fireEvent.click(connectionDisconnectedEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[11],
      chamber._id,
    );

    // connected
    const connectedEl = getByText('noumena.notification_type.connected.body');

    expect(connectedEl).toBeInTheDocument();
    fireEvent.click(connectedEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[12],
      chamber._id,
    );

    // inviteAccepted
    const inviteAcceptedEl = getByText(
      'noumena.notification_type.invite_accepted.body',
    );

    expect(inviteAcceptedEl).toBeInTheDocument();
    fireEvent.click(inviteAcceptedEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[13],
      connection.requestTo?.uid?.chamber?._id,
    );

    // spaceConversation
    const spaceConversationEl = getByText(
      'noumena.notification_type.space_conversation.body',
    );

    expect(spaceConversationEl).toBeInTheDocument();
    fireEvent.click(spaceConversationEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[14],
      chamber._id,
    );

    // invite reminder
    expect(
      getByText('noumena.notification_type.invite_reminder.body'),
    ).toBeInTheDocument();

    const [inviteReminderAcceptButton, inviteReminderRejectButton] = within(
      getByTestId('InviteReminder'),
    ).getAllByRole('button');

    fireEvent.click(inviteReminderAcceptButton!);
    await waitFor(() => {
      expect(acceptConnectionFn).toBeCalledWith(
        notifications[15],
        notifications[15].data?.connection?._id,
      );
    });
    fireEvent.click(inviteReminderRejectButton!);
    await waitFor(() => {
      expect(rejectConnectionFn).toBeCalledWith(
        notifications[15],
        notifications[15].data?.connection?._id,
      );
    });

    // connection requested
    const connectionRequestedReminderEl = getByText(
      'noumena.notification_type.connection_requested_reminder.body',
    );

    expect(connectionRequestedReminderEl).toBeInTheDocument();
    fireEvent.click(connectionRequestedReminderEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[16],
      chamber._id,
    );

    // connection invited
    const connectionInvitedReminderEl = getByText(
      'noumena.notification_type.connection_invited_reminder.body',
    );

    expect(connectionInvitedReminderEl).toBeInTheDocument();
    fireEvent.click(connectionInvitedReminderEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[17],
      chamber._id,
    );

    // user disconnected
    const userDisconnectedEl = getByText(
      'noumena.notification_type.user_disconnect_from_project_noum.body',
    );

    expect(userDisconnectedEl).toBeInTheDocument();
    fireEvent.click(userDisconnectedEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[18],
      chamber._id,
    );
  });

  test('Should render user status notifications', () => {
    const notifications = [
      createNotification({
        type: NotificationType.UserActive,
        users: createUsers(1),
      }),
      createNotification({
        type: NotificationType.UserPending,
        users: createUsers(1),
      }),
      createNotification({
        type: NotificationType.UserRejected,
        users: createUsers(1),
      }),
    ];

    const markAsReadFn = vi.fn();

    const { getByText } = render(
      <Wrapper
        overrideValues={{
          markAsRead: markAsReadFn,
        }}
      >
        <NotificationsList
          notifications={notifications}
          fetchNextPage={vi.fn()}
          networkStatus={NetworkStatus.ready}
          totalCount={notifications.length}
        />
      </Wrapper>,
    );

    // userActive
    const userActiveEl = getByText(
      'noumena.notification_type.user_active.title',
    );
    expect(userActiveEl).toBeInTheDocument();
    expect(
      getByText('noumena.notifications.refresh_my_status'),
    ).toBeInTheDocument();
    fireEvent.click(userActiveEl);

    // user pending
    const userPendingEl = getByText(
      'noumena.notification_type.user_pending.title',
    );
    expect(userPendingEl).toBeInTheDocument();
    fireEvent.click(userPendingEl);

    // user rejected
    const userRejectedEl = getByText(
      'noumena.notification_type.user_rejected.title',
    );
    expect(userRejectedEl).toBeInTheDocument();
    fireEvent.click(userRejectedEl);

    expect(markAsReadFn).toBeCalledTimes(3);
  });

  test('Should render post and comments notifications', () => {
    const notifications = [
      createNotification({
        type: NotificationType.Comment,
        users: createUsers(4),
        userId: createUser(),
        unread: true,
      }),
      createNotification({
        type: NotificationType.CommentMentioned,
        users: createUsers(1),
        userId: createUser(),
      }),
      createNotification({
        type: NotificationType.CommentReplied,
        users: createUsers(1),
        userId: createUser(),
        unread: true,
      }),
      createNotification({
        type: NotificationType.CommentRepliedMentioned,
        users: createUsers(1),
        userId: createUser(),
        unread: true,
      }),
      createNotification({
        type: NotificationType.CommentReplyThread,
        users: createUsers(1),
        adminUserId: createUser(),
        userId: createUser(),
        unread: true,
      }),
      createNotification({
        type: NotificationType.Like,
        users: createUsers(4),
        userId: createUser(),
      }),
      createNotification({
        type: NotificationType.PostMentioned,
        users: createUsers(2),
        userId: createUser(),
      }),
      createNotification({
        type: NotificationType.PostRejected,
        users: createUsers(1),
      }),
    ];

    const markAsReadFn = vi.fn();

    const { getByText } = render(
      <Wrapper
        overrideValues={{
          markAsRead: markAsReadFn,
          navigateToNoum: markAsReadFn,
        }}
      >
        <NotificationsList
          notifications={notifications}
          fetchNextPage={vi.fn()}
          networkStatus={NetworkStatus.ready}
          totalCount={notifications.length}
        />
      </Wrapper>,
    );

    // comment
    const commentEl = getByText('noumena.notification_type.comment.body');
    expect(commentEl).toBeInTheDocument();
    fireEvent.click(commentEl);

    // comment mentioned
    const commentMentionedEl = getByText(
      'noumena.notification_type.comment_mentioned.body',
    );
    expect(commentMentionedEl).toBeInTheDocument();
    fireEvent.click(commentMentionedEl);

    // comment replied
    const commentRepliedEl = getByText(
      'noumena.notification_type.comment_replied.body',
    );
    expect(commentRepliedEl).toBeInTheDocument();
    fireEvent.click(commentRepliedEl);

    // comment replied mentioned
    const commentRepliedMentionedEl = getByText(
      'noumena.notification_type.comment_replied_mentioned.body',
    );
    expect(commentRepliedMentionedEl).toBeInTheDocument();
    fireEvent.click(commentRepliedMentionedEl);

    // comment reply thread
    const commentReplyThreadEl = getByText(
      'noumena.notification_type.comment_reply_thread.body',
    );
    expect(commentReplyThreadEl).toBeInTheDocument();
    fireEvent.click(commentReplyThreadEl);

    // like
    const likeEl = getByText('noumena.notification_type.like.body');
    expect(likeEl).toBeInTheDocument();
    fireEvent.click(likeEl);

    // post mentioned
    const postMentionedEl = getByText(
      'noumena.notification_type.post_mentioned.body',
    );
    expect(postMentionedEl).toBeInTheDocument();
    fireEvent.click(postMentionedEl);

    // post rejected
    const postRejectedEl = getByText(
      'noumena.notification_type.post_rejected.body',
    );
    expect(postRejectedEl).toBeInTheDocument();
    fireEvent.click(postRejectedEl);

    expect(markAsReadFn).toBeCalledTimes(1);
  });

  test('Should render group notifications', () => {
    const notifications = [
      createNotification({
        type: NotificationType.GroupInvite,
        users: createUsers(1),
        group: createGroup(),
        inviteId: '653',
      }),
      createNotification({
        type: NotificationType.JoinRequest,
        users: createUsers(1),
        group: createGroup(),
      }),
      createNotification({
        type: NotificationType.NewGroupPost,
        users: createUsers(1),
        group: createGroup(),
      }),
    ];

    const markAsReadFn = vi.fn();

    const { getByText } = render(
      <Wrapper
        overrideValues={{
          markAsRead: markAsReadFn,
        }}
      >
        <NotificationsList
          notifications={notifications}
          fetchNextPage={vi.fn()}
          networkStatus={NetworkStatus.ready}
          totalCount={notifications.length}
        />
      </Wrapper>,
    );

    // group invite
    const groupInviteEl = getByText(
      'noumena.notification_type.group_invite.body',
    );
    expect(groupInviteEl).toBeInTheDocument();
    fireEvent.click(groupInviteEl);

    // join request
    const joinRequestEl = getByText(
      'noumena.notification_type.join_request.body',
    );
    expect(joinRequestEl).toBeInTheDocument();
    fireEvent.click(joinRequestEl);

    // new group post
    const newGroupPostEl = getByText(
      'noumena.notification_type.new_group_post.body',
    );
    expect(newGroupPostEl).toBeInTheDocument();
    fireEvent.click(newGroupPostEl);

    expect(markAsReadFn).toBeCalledTimes(3);
  });

  test('Should call fetchMore', () => {
    const notifications = [
      createNotification({
        type: NotificationType.GroupInvite,
        users: createUsers(1),
        group: createGroup(),
        inviteId: '653',
      }),
    ];

    const fetchNextPage = vi.fn();

    const { getAllByTestId } = render(
      <Wrapper>
        <NotificationsList
          notifications={notifications}
          fetchNextPage={fetchNextPage}
          networkStatus={NetworkStatus.ready}
          totalCount={notifications.length + 1}
        />
      </Wrapper>,
    );

    intersectionObserver.simulate({
      target: getAllByTestId('observer')[0],
      isIntersecting: true,
    });

    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  test('Should render noum notifications', async () => {
    const chamber = createChamber();

    const notifications = [
      createNotification({
        type: NotificationType.NoumFollowed,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.NoumUnfollowed,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.NoumPublished,
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.NoumArchived,
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.NoumUnarchived,
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.QuestionCreated,
        users: createUsers(1),
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.QuestionAnswered,
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.CampaignRefreshed,
        data: {
          chamber,
        },
      }),
      createNotification({
        type: NotificationType.CampaignExpired,
        data: {
          chamber,
        },
      }),
    ];

    const navigateToNoumFn = vi.fn();
    const markAsReadFn = vi.fn();

    const { getByText } = render(
      <Wrapper
        overrideValues={{
          navigateToNoum: navigateToNoumFn,
          markAsRead: markAsReadFn,
        }}
      >
        <NotificationsList
          notifications={notifications}
          fetchNextPage={vi.fn()}
          networkStatus={NetworkStatus.ready}
          totalCount={notifications.length}
        />
      </Wrapper>,
    );

    // follow
    const followEl = getByText('noumena.notification_type.noum_follow.body');
    expect(followEl).toBeInTheDocument();
    fireEvent.click(followEl);
    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[0],
      chamber._id,
    );

    // unfollow
    const unfollowEl = getByText(
      'noumena.notification_type.noum_unfollow.body',
    );
    expect(unfollowEl).toBeInTheDocument();
    fireEvent.click(unfollowEl);

    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[1],
      chamber._id,
    );

    // noum published
    const noumPublishedEl = getByText(
      'noumena.notification_type.noum_published.body',
    );
    expect(noumPublishedEl).toBeInTheDocument();
    fireEvent.click(noumPublishedEl);

    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[2],
      chamber._id,
    );

    // noum archived
    const noumArchivedEl = getByText(
      'noumena.notification_type.noum_archived.body',
    );
    expect(noumArchivedEl).toBeInTheDocument();
    fireEvent.click(noumArchivedEl);

    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[3],
      chamber._id,
    );

    // noum unarchived
    const noumUnarchivedEl = getByText(
      'noumena.notification_type.noum_unarchived.body',
    );
    expect(noumUnarchivedEl).toBeInTheDocument();
    fireEvent.click(noumUnarchivedEl);

    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[4],
      chamber._id,
    );

    // // question created
    const questionCreatedEl = getByText(
      'noumena.notification_type.noum_question_created.body',
    );
    expect(questionCreatedEl).toBeInTheDocument();
    fireEvent.click(questionCreatedEl);

    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[5],
      chamber._id,
    );

    // question answered
    const questionAnsweredEl = getByText(
      'noumena.notification_type.noum_question_answered.body',
    );
    expect(questionAnsweredEl).toBeInTheDocument();
    fireEvent.click(questionAnsweredEl);

    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[6],
      chamber._id,
    );

    // campaign refreshed
    const campaignRefreshedEl = getByText(
      'noumena.notification_type.campaign_refreshed.body',
    );
    expect(campaignRefreshedEl).toBeInTheDocument();
    fireEvent.click(campaignRefreshedEl);

    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[7],
      chamber._id,
    );

    // campaign expired
    const campaignExpiredEl = getByText(
      'noumena.notification_type.campaign_expired.body',
    );
    expect(campaignExpiredEl).toBeInTheDocument();
    fireEvent.click(campaignExpiredEl);

    expect(navigateToNoumFn).toHaveBeenLastCalledWith(
      notifications[8],
      chamber._id,
    );
  });
});
