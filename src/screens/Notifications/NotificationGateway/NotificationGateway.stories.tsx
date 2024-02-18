import { NetworkStatus } from '@apollo/client';
import { faker } from '@faker-js/faker';
import { type Meta, type StoryFn } from '@storybook/react';
import { t } from 'i18next';
import { MockedProvider } from '@apollo/client/testing';
import { Stack } from '@/layout';
import { SideModal } from '@/components/SideModal';
import {
  InvitationStatus,
  NotificationType,
  UserRole,
} from '@/apollo/generated/types';
import { type NotificationFragment } from '@/apollo/graphql';
import NotificationsList from '../List';
import {
  createChamber,
  createConnection,
  createContract,
  createEvent,
  createGroup,
  createNotification,
  createStatementOfWork,
  createTimeAgo,
  createUser,
  createUsers,
} from '../mocks';
import { NotificationHandlersContext } from '../NotificationHandlersContext';
import { type NotificationsListProps } from '../types';

export default {
  title: 'UI/Notifications',
  component: NotificationsList,
} as Meta<typeof NotificationsList>;

const hostMasterId = '1234';

function delayedNoop() {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 800);
  });
}
function prepareNotification(
  notification: NotificationFragment,
  index: number,
): NotificationFragment {
  return {
    ...notification,
    updatedAt: createTimeAgo({ hours: (index + 1) * 3 }),
    unread: faker.datatype.boolean(),
  };
}

const Template: StoryFn<typeof NotificationsList> = (
  props: NotificationsListProps,
) => (
  <MockedProvider>
    <NotificationHandlersContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        masterId: hostMasterId,
        userStatus: 'PENDING',
        markAsRead: delayedNoop,
        navigateToNoum: delayedNoop,
        navigateToMyNoum: delayedNoop,
        navigateToPost: delayedNoop,
        navigateToMoneyPage: delayedNoop,
        navigateToMoneyDetailsPage: delayedNoop,
        refreshCurrentUser: delayedNoop,
        navigateToSocialHall: delayedNoop,
        navigateToApplicationReview: delayedNoop,
        events: {
          acceptEventInvitation: delayedNoop,
          goLiveEvent: delayedNoop,
          joinEvent: delayedNoop,
          rejectEventInvitation: delayedNoop,
          showEventDetails: delayedNoop,
        },
        connections: {
          acceptConnection: delayedNoop,
          rejectConnection: delayedNoop,
          refetchConnectionData: delayedNoop,
        },
        memberInvitations: {
          acceptInvitation: delayedNoop,
          rejectInvitation: delayedNoop,
          acceptRolePromotion: delayedNoop,
          rejectRolePromotion: delayedNoop,
        },
        navigateToInvoice: delayedNoop,
        navigateToPlanDetails: delayedNoop,
        navigateToContract: delayedNoop,
        navigateToStatementOfWork: delayedNoop,
      }}
    >
      <SideModal
        showCloseButton
        enableAnimation
        title={t('noumena.notifications.header')}
        open={true}
        topOffset={0}
      >
        <Stack vertical fullWidth align="stretch" justify="stretch">
          <NotificationsList {...props} />
        </Stack>
      </SideModal>
    </NotificationHandlersContext.Provider>
  </MockedProvider>
);

export const EmptyList = {
  render: Template,

  args: {
    notifications: [],
    networkStatus: NetworkStatus.ready,
  },
};

export const Loading = {
  render: Template,

  args: {
    notifications: [],
    networkStatus: NetworkStatus.loading,
  },
};

export const Events = {
  render: Template,

  args: {
    notifications: [
      createNotification({
        type: NotificationType.EventDeleted,
        users: createUsers(1),
        event: createEvent(InvitationStatus.Pending, UserRole.Participant),
      }),
      createNotification({
        type: NotificationType.EventDeleted,
        users: createUsers(1),
        event: createEvent(InvitationStatus.Accepted, UserRole.Cohost),
      }),
      createNotification({
        type: NotificationType.EventDeleted,
        users: createUsers(1),
        event: createEvent(InvitationStatus.Accepted, UserRole.Participant),
      }),
      createNotification({
        type: NotificationType.EventDateModified,
        users: createUsers(1),
        event: createEvent(InvitationStatus.Pending, UserRole.Participant),
      }),
      createNotification({
        type: NotificationType.EventDateModified,
        users: createUsers(1),
        event: createEvent(InvitationStatus.Accepted, UserRole.Cohost),
      }),
      createNotification({
        type: NotificationType.EventDateModified,
        users: createUsers(1),
        event: createEvent(InvitationStatus.Accepted, UserRole.Participant),
      }),
      createNotification({
        type: NotificationType.EventLive,
        users: createUsers(1),
        event: createEvent(),
      }),
      createNotification({
        type: NotificationType.EventLive,
        users: createUsers(1),
        event: createEvent(undefined, UserRole.Host),
      }),
      createNotification({
        type: NotificationType.EventStarting,
        users: createUsers(1),
        event: createEvent(undefined, UserRole.Host),
      }),
      createNotification({
        type: NotificationType.EventStarting,
        users: createUsers(1),
        event: createEvent(undefined, UserRole.Participant),
      }),
      createNotification({
        type: NotificationType.EventReminder,
        users: createUsers(1),
        event: createEvent(),
      }),
      createNotification({
        type: NotificationType.EventReminder,
        users: createUsers(1),
        event: createEvent(undefined, UserRole.Host),
      }),
      createNotification({
        type: NotificationType.EventInvitee,
        users: createUsers(1),
        event: createEvent(InvitationStatus.Pending, UserRole.Participant),
      }),
      createNotification({
        type: NotificationType.EventInvitee,
        users: createUsers(1),
        event: createEvent(InvitationStatus.Pending, UserRole.Cohost),
      }),
    ].map(prepareNotification),
    networkStatus: NetworkStatus.ready,
  },
};

export const Connections = {
  render: Template,

  args: {
    notifications: [
      createNotification({
        type: NotificationType.Invite,
        users: createUsers(1),
        inviteId: '654',
        data: {
          connection: createConnection(),
        },
      }),
      createNotification({
        type: NotificationType.InviteReminder,
        users: createUsers(1),
        inviteId: '654',
        data: {
          connection: createConnection(),
        },
      }),
      createNotification({
        type: NotificationType.InviteAccepted,
        data: {
          connection: createConnection(),
        },
        inviteId: '654',
      }),
      createNotification({
        type: NotificationType.NewAdminConnection,
        users: createUsers(4),
      }),
      createNotification({
        type: NotificationType.NewReferralConnection,
        users: createUsers(3),
      }),
      createNotification({
        type: NotificationType.NoumConnection,
        users: createUsers(1),
      }),
      createNotification({
        type: NotificationType.FavoriteConnection,
        data: {
          chamber: createChamber(),
          connection: createConnection(),
        },
        users: createUsers(1),
      }),
      createNotification({
        type: NotificationType.GuestConnection,
        data: {
          chamber: createChamber(),
          connection: createConnection(),
        },
        users: createUsers(1),
      }),
      createNotification({
        type: NotificationType.ConnectionRequested,
        data: {
          chamber: createChamber(),
          connection: createConnection(),
        },
      }),
      createNotification({
        type: NotificationType.ConnectionRequestedReminder,
        data: {
          chamber: createChamber(),
          connection: createConnection(),
        },
      }),
      createNotification({
        type: NotificationType.ConnectionRequestDeclined,
        data: {
          chamber: createChamber(),
          connection: createConnection(),
        },
      }),
      createNotification({
        type: NotificationType.ConnectionRequestAccepted,
        users: createUsers(1),
        data: {
          chamber: createChamber(),
          connection: createConnection(),
        },
      }),
      createNotification({
        type: NotificationType.ConnectionInviteDeclined,
        users: createUsers(1),
        data: {
          chamber: createChamber(),
          connection: createConnection(),
        },
      }),
      createNotification({
        type: NotificationType.ConnectionInvited,
        users: createUsers(1),
        data: {
          chamber: createChamber(),
          connection: createConnection(),
        },
      }),
      createNotification({
        type: NotificationType.ConnectionInvitedReminder,
        users: createUsers(1),
        data: {
          chamber: createChamber(),
          connection: createConnection(),
        },
      }),
      createNotification({
        type: NotificationType.ConnectionInviteAccepted,
        users: createUsers(1),
        data: {
          chamber: createChamber(),
          connection: createConnection(),
        },
      }),
      createNotification({
        type: NotificationType.ConnectionDisconnected,
        users: createUsers(1),
        data: {
          chamber: createChamber(),
          connection: createConnection(),
        },
      }),
      createNotification({
        type: NotificationType.Connected,
        users: createUsers(1),
        data: {
          chamber: createChamber(),
          connection: createConnection(),
        },
      }),
      createNotification({
        type: NotificationType.UserDisconnectFromProjectNoum,
        users: createUsers(1),
        data: {
          chamber: createChamber(),
          connection: createConnection(),
        },
      }),
      createNotification({
        type: NotificationType.SpaceConversation,
        users: createUsers(3),
        data: {
          chamber: createChamber(),
        },
      }),
    ].map(prepareNotification),
    networkStatus: NetworkStatus.ready,
  },
};

const contractSowOwner = createUser();
const contractSowCounterparty = createUser();

export const ContractsAndSows = {
  render: Template,

  args: {
    notifications: [
      createNotification({
        type: NotificationType.ContractIssuedOwner,
        users: [contractSowOwner],
        data: {
          contractId: createContract(),
        },
      }),
      createNotification({
        type: NotificationType.SowIssuedOwner,
        users: [contractSowOwner],
        data: {
          sowId: createStatementOfWork(),
        },
      }),
      createNotification({
        type: NotificationType.ContractSignedOwner,
        users: [contractSowOwner],
        data: {
          contractId: createContract(),
        },
      }),
      createNotification({
        type: NotificationType.SowSignedOwner,
        users: [contractSowOwner],
        data: {
          sowId: createStatementOfWork(),
        },
      }),
      createNotification({
        type: NotificationType.ContractRejectedOwner,
        users: [contractSowOwner],
        data: {
          contractId: createContract(),
        },
      }),
      createNotification({
        type: NotificationType.SowRejectedOwner,
        users: [contractSowOwner],
        data: {
          sowId: createStatementOfWork(),
        },
      }),

      createNotification({
        type: NotificationType.SowIssuedCounterParty,
        users: [contractSowCounterparty],
        data: {
          sowId: createStatementOfWork(),
        },
      }),
      createNotification({
        type: NotificationType.ContractIssuedCounterParty,
        users: [contractSowCounterparty],
        data: {
          contractId: createContract(),
        },
      }),
      createNotification({
        type: NotificationType.ContractSignedCounterParty,
        users: [contractSowCounterparty],
        data: {
          contractId: createContract(),
        },
      }),
      createNotification({
        type: NotificationType.SowSignedCounterParty,
        users: [contractSowCounterparty],
        data: {
          sowId: createStatementOfWork(),
        },
      }),
      createNotification({
        type: NotificationType.ContractRejectedCounterParty,
        users: [contractSowCounterparty],
        data: {
          contractId: createContract(),
        },
      }),
      createNotification({
        type: NotificationType.SowRejectedCounterParty,
        users: [contractSowCounterparty],
        data: {
          sowId: createStatementOfWork(),
        },
      }),
    ].map(prepareNotification),
    networkStatus: NetworkStatus.ready,
  },
};

export const UserStatus = {
  render: Template,

  args: {
    notifications: [
      createNotification({
        type: NotificationType.UserActive,
        users: createUsers(1),
      }),
      createNotification({
        type: NotificationType.UserDeactivated,
        users: createUsers(1),
      }),
      createNotification({
        type: NotificationType.UserInactive,
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
      createNotification({
        type: NotificationType.UserUnregisgtered,
        users: createUsers(1),
      }),
    ].map(prepareNotification),
    networkStatus: NetworkStatus.ready,
  },
};

export const PostsAndComments = {
  render: Template,

  args: {
    notifications: [
      createNotification({
        type: NotificationType.NewIndividualPost,
        data: {
          chamber: createChamber(),
        },
        users: createUsers(4),
      }),
      createNotification({
        type: NotificationType.Comment,
        users: createUsers(4),
      }),
      createNotification({
        type: NotificationType.CommentMentioned,
        users: createUsers(1),
      }),
      createNotification({
        type: NotificationType.CommentReplied,
        users: createUsers(1),
      }),
      createNotification({
        type: NotificationType.CommentRepliedMentioned,
        users: createUsers(1),
      }),
      createNotification({
        type: NotificationType.CommentReplyThread,
        users: createUsers(1),
        adminUserId: createUser(),
      }),
      createNotification({
        type: NotificationType.Like,
        users: createUsers(4),
      }),
      createNotification({
        type: NotificationType.PostMentioned,
        users: createUsers(2),
      }),
      createNotification({
        type: NotificationType.PostRejected,
        users: createUsers(1),
      }),
    ].map(prepareNotification),
    networkStatus: NetworkStatus.ready,
  },
};

export const Groups = {
  render: Template,

  args: {
    notifications: [
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
    ].map(prepareNotification),
    networkStatus: NetworkStatus.ready,
  },
};

export const Noum = {
  render: Template,

  args: {
    notifications: [
      createNotification({
        type: NotificationType.NoumFollowed,
        users: createUsers(3),
        data: {
          chamber: createChamber(),
        },
      }),
      createNotification({
        type: NotificationType.NoumUnfollowed,
        users: createUsers(3),
        data: {
          chamber: createChamber(),
        },
      }),
      createNotification({
        type: NotificationType.NoumPublished,
        data: {
          chamber: createChamber(),
        },
      }),
      createNotification({
        type: NotificationType.NoumArchived,
        data: {
          chamber: createChamber(),
        },
      }),
      createNotification({
        type: NotificationType.NoumUnarchived,
        data: {
          chamber: createChamber(),
        },
      }),
      createNotification({
        type: NotificationType.QuestionCreated,
        users: createUsers(1),
        data: {
          chamber: createChamber(),
        },
      }),
      createNotification({
        type: NotificationType.QuestionAnswered,
        users: createUsers(1),
        data: {
          chamber: createChamber(),
        },
      }),
      createNotification({
        type: NotificationType.CampaignRefreshed,
        users: createUsers(1),
        data: {
          chamber: createChamber(),
        },
      }),
      createNotification({
        type: NotificationType.CampaignExpired,
        users: createUsers(1),
        data: {
          chamber: createChamber(),
        },
      }),
    ].map(prepareNotification),
    networkStatus: NetworkStatus.ready,
  },
};

export const System = {
  render: Template,

  args: {
    notifications: [
      createNotification({
        type: NotificationType.CqScoreUpdate,
        users: createUsers(1),
      }),

      createNotification({
        type: NotificationType.TokenRewarded,
        users: createUsers(1),
        data: {
          message: 'Custom backend response related to rewarded tokens.',
        },
      }),
    ].map(prepareNotification),
    networkStatus: NetworkStatus.ready,
  },
};
