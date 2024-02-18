import {
  InvitationStatus,
  InvoiceStatusEnum,
  NotificationType,
  UserRole,
} from '@/apollo/generated/types';
import { useToast } from '@/hooks';
import { EventUtils } from '@/utils/event';
import { notEmpty } from '@/utils/notEmpty';
import { UserUtil } from '@/utils/user';
import { t } from 'i18next';
import { useNotificationHandlers } from '../NotificationHandlersContext';
import { type NotificationGatewayProps } from '../types';
import CampaignExpired from './Items/CampaignExpired';
import CampaignOffer from './Items/CampaignOffer';
import CampaignRefreshed from './Items/CampaignRefreshed';
import CampaignReport from './Items/CampaignReport';
import Comment from './Items/Comment';
import CommentMentioned from './Items/CommentMentioned';
import CommentReplied from './Items/CommentReplied';
import CommentRepliedMentioned from './Items/CommentRepliedMentioned';
import CommentReplyThread from './Items/CommentReplyThread';
import Connected from './Items/Connected';
import ConnectionDisconnected from './Items/ConnectionDisconnected';
import ConnectionInviteAccepted from './Items/ConnectionInviteAccepted';
import ConnectionInviteDeclined from './Items/ConnectionInviteDeclined';
import ConnectionInvited from './Items/ConnectionInvited';
import ConnectionRequestAccepted from './Items/ConnectionRequestAccepted';
import ConnectionRequestDeclined from './Items/ConnectionRequestDeclined';
import ConnectionRequested from './Items/ConnectionRequested';
import ContractIssuedCounterparty from './Items/ContractIssuedCounterparty';
import ContractIssuedOwner from './Items/ContractIssuedOwner';
import ContractRejectedCounterparty from './Items/ContractRejectedCounterparty';
import ContractRejectedOwner from './Items/ContractRejectedOwner';
import ContractSignedCounterparty from './Items/ContractSignedCounterparty';
import ContractSignedOwner from './Items/ContractSignedOwner';
import CqScoreUpdate from './Items/CqScoreUpdate';
import EventDateModified from './Items/EventDateModified';
import EventDeleted from './Items/EventDeleted';
import EventInvitee from './Items/EventInvitee';
import EventLive from './Items/EventLive';
import EventReminder from './Items/EventReminder';
import EventStarting from './Items/EventStarting';
import FavoriteConnection from './Items/FavoriteConnection';
import GroupInvite from './Items/GroupInvite';
import GuestConnection from './Items/GuestConnection';
import InstantEventInvite from './Items/InstantEventInvite';
import Invite from './Items/Invite';
import InviteAccepted from './Items/InviteAccepted';
import InvoiceAmendedClient from './Items/InvoiceAmendedClient';
import InvoiceAmendedFreelancer from './Items/InvoiceAmendedFreelancer';
import InvoiceFullyPaidClient from './Items/InvoiceFullyPaidClient';
import InvoiceFullyPaidFreelancer from './Items/InvoiceFullyPaidFreelancer';
import InvoiceIsOverdueClient from './Items/InvoiceIsOverdueClient';
import InvoiceIsOverdueFreelancer from './Items/InvoiceIsOverdueFreelancer';
import InvoiceManualReminderFreelancer from './Items/InvoiceManualReminderFreelancer';
import InvoiceManualReminderOverdueClient from './Items/InvoiceManualReminderOverdueClient';
import InvoiceManualReminderPartiallyPaidClient from './Items/InvoiceManualReminderPartiallyPaidClient';
import InvoiceOnDraftStateReminder from './Items/InvoiceOnDraftStateReminder';
import InvoicePartiallyPaidClient from './Items/InvoicePartiallyPaidClient';
import InvoicePartiallyPaidFreelancer from './Items/InvoicePartiallyPaidFreelancer';
import InvoicePaymentFailedClient from './Items/InvoicePaymentFailedClient';
import InvoicePaymentFailedFreelancer from './Items/InvoicePaymentFailedFreelancer';
import InvoiceSentClient from './Items/InvoiceSentClient';
import InvoiceSentFreelancer from './Items/InvoiceSentFreelancer';
import JoinRequest from './Items/JoinRequest';
import Like from './Items/Like';
import ManagerAccessTerminated from './Items/ManagerAccessTerminated';
import ManagerAccessTerminatedAndDisconnected from './Items/ManagerAccessTerminatedAndDisconnected';
import ManagerInviteAcceptedOwner from './Items/ManagerInviteAcceptedOwner';
import ManagerInviteDeclinedOwner from './Items/ManagerInviteDeclinedOwner';
import ManagerInviteExpired from './Items/ManagerInviteExpired';
import ManagerInviteExpiredOwner from './Items/ManagerInviteExpiredOwner';
import ManagerInvited from './Items/ManagerInvited';
import ManagerResignedAndDisconnectedOwner from './Items/ManagerResignedAndDisconnectedOwner';
import ManagerResignedOwner from './Items/ManagerResignedOwner';
import MemberInvitedToNoum from './Items/MemberInvitedToNoum';
import MemberRoleUpdated from './Items/MemberRoleUpdated';
import MicroDepositVerificationInProcess from './Items/MicroDepositVerificationInProcess';
import MicroDepositVerified from './Items/MicroDepositVerified';
import NewAdminConnection from './Items/NewAdminConnection';
import NewGroupPost from './Items/NewGroupPost';
import NewIndividualPost from './Items/NewIndividualPost';
import NewReferralConnection from './Items/NewReferralConnection';
import NoumAboutToExpire from './Items/NoumAboutToExpire';
import NoumArchived from './Items/NoumArchived';
import NoumFollow from './Items/NoumFollow';
import NoumPublished from './Items/NoumPublished';
import NoumUnarchived from './Items/NoumUnarchived';
import NoumUnfollow from './Items/NoumUnfollow';
import NoumUnusedRenewSlots from './Items/NoumUnusedRenewSlots';
import NoumUnusedSetupSlots from './Items/NoumUnusedSetupSlots';
import PostMentioned from './Items/PostMentioned';
import PostRejected from './Items/PostRejected';
import QuestionAnswered from './Items/QuestionAnswered';
import QuestionCreated from './Items/QuestionCreated';
import RiseApplicationStatusConnectedUser from './Items/RiseApplicationStatusConnectedUser';
import RiseApplicationStatusUpdate from './Items/RiseApplicationStatusUpdate';
import SpaceConversation from './Items/SpaceConversation';
import StatementOfWorkIssuedCounterparty from './Items/StatementOfWorkIssuedCounterparty';
import StatementOfWorkIssuedOwner from './Items/StatementOfWorkIssuedOwner';
import StatementOfWorkRejectedCounterparty from './Items/StatementOfWorkRejectedCounterparty';
import StatementOfWorkRejectedOwner from './Items/StatementOfWorkRejectedOwner';
import StatementOfWorkSignedCounterparty from './Items/StatementOfWorkSignedCounterparty';
import StatementOfWorkSignedOwner from './Items/StatementOfWorkSignedOwner';
import SubscriptionUpcomingPayment from './Items/SubscriptionUpcomingPayment';
import TokenRewarded from './Items/TokenRewarded';
import UnhandledNotification from './Items/UnhandledNotification';
import UserActive from './Items/UserActive';
import UserDeactivated from './Items/UserDeactivated';
import UserDisconnectFromProjectNoum from './Items/UserDisconnectFromProjectNoum';
import UserPending from './Items/UserPending';
import UserRejected from './Items/UserRejected';
import WalletApproved from './Items/WalletApproved';
import WalletRejected from './Items/WalletRejected';
import WalletSetupRequest from './Items/WalletSetupRequest';
import WalletUploadDocuments from './Items/WalletUploadDocuments';
import {
  type BaseContractNotificationProps,
  type BaseEventNotificationProps,
  type BaseInvoiceNotificationProps,
  type BaseNotificationProps,
  type BaseNoumConnectionNotificationProps,
  type BaseNoumMemberNotificationProps,
  type BaseNoumNotificationProps,
  type BasePostNotificationProps,
  type BaseStatementOfWorkNotificationProps,
} from './Items/types';
import {
  getConnectionStatus,
  getNoumAvatar,
  getUserAvatar,
  getUserWithNoumAvatars,
} from './utils';

const NotificationGateway = ({
  notification,
}: NotificationGatewayProps): JSX.Element | null => {
  const { masterId, userStatus, ...handlers } = useNotificationHandlers();
  const { addPrimaryIconToast } = useToast();

  const users = (notification.users ?? []).filter(notEmpty);

  const eventDetails = notification.event;
  const noumDetails = notification.data?.chamber;
  const invoiceDetails = notification.data?.invoiceId;
  const contractDetails = notification.data?.contractId;
  const statementOfWorkDetails = notification.data?.sowId;
  const sourceUserNoum = notification?.sourceUserNoum;
  const noumMember = notification.data?.noumMember;

  const basicProps: BaseNotificationProps = {
    avatars: users.map(getUserAvatar),
    avatarMode: 'inline',
    isViewed: !notification.unread,
    timestamp: notification.updatedAt,
    users,
    onClick: () => {
      handlers.markAsRead(notification);
    },
  };
  const postProps: BasePostNotificationProps = {
    ...basicProps,
    onClick: () => {
      handlers.navigateToPost(notification, notification.postId);
    },
  };
  const noumProps: BaseNoumNotificationProps = {
    ...basicProps,
    avatars: getUserWithNoumAvatars(noumDetails ?? sourceUserNoum, users[0]),
    avatarMode: 'nested',
    noumName: noumDetails?.name ?? sourceUserNoum?.name ?? undefined,
    noumOwner: noumDetails?.uid,
    onClick: () => {
      handlers.navigateToNoum(notification, noumDetails?._id);
    },
  };
  const connectionNoumProps: BaseNoumConnectionNotificationProps = {
    ...noumProps,
    noumOwner:
      noumProps?.noumOwner ?? notification.data?.connection?.requestFrom?.uid,
    requestFrom: notification.data?.connection?.requestFrom?.uid,
    requestTo: notification.data?.connection?.requestTo?.uid,
    onClick: async () => {
      handlers.connections.refetchConnectionData(noumDetails?._id);
      handlers.navigateToNoum(notification, noumDetails?._id);
    },
  };
  const eventProps: BaseEventNotificationProps = {
    ...basicProps,
    event: eventDetails,
    userRole: eventDetails?.id?.currentUser?.userRole ?? UserRole.None,
    invitationStatus:
      eventDetails?.id?.currentUser?.invitation?.status ??
      InvitationStatus.None,
    avatars: EventUtils.getEventAttendeesAvatars(eventDetails?.id),
    onClick: () => handlers.events.showEventDetails(notification, eventDetails),
  };
  const invoiceProps: BaseInvoiceNotificationProps = {
    ...basicProps,
    invoice: invoiceDetails ?? undefined,
    invoiceStatus: notification.data?.invoiceStatus ?? undefined,
    onClick: () => {
      handlers.navigateToInvoice(notification, invoiceDetails?.id ?? '');
    },
  };
  const contractProps: BaseContractNotificationProps = {
    ...basicProps,
    contract: contractDetails,
    onClick: () => {
      handlers.navigateToContract(notification, contractDetails?._id ?? '');
    },
  };
  const statementOfWorkProps: BaseStatementOfWorkNotificationProps = {
    ...basicProps,
    statementOfWork: statementOfWorkDetails,
    onClick: () => {
      handlers.navigateToStatementOfWork(
        notification,
        statementOfWorkDetails?._id ?? '',
      );
    },
  };

  const memberProps: BaseNoumMemberNotificationProps = {
    ...noumProps,
    noumId: noumMember?.noumId ?? noumDetails?._id ?? '',
    status: noumMember?.status,
    noumMember,
    onClick: () => {
      handlers.navigateToNoum(notification, noumDetails?._id ?? '');
    },
  };

  switch (notification.type) {
    // Wallet
    case NotificationType.WalletSetupRequest:
      return <WalletSetupRequest {...basicProps} />;
    // Contracts & SOWs
    /** @deprecated Explicitly ignore, deprecated. */
    case NotificationType.ContractSendForSigning:
      return null;
    case NotificationType.ContractIssuedOwner:
      return <ContractIssuedOwner {...contractProps} />;
    case NotificationType.ContractIssuedCounterParty:
      return <ContractIssuedCounterparty {...contractProps} />;
    case NotificationType.ContractSignedCounterParty:
      return <ContractSignedCounterparty {...contractProps} />;
    case NotificationType.ContractSignedOwner:
      return <ContractSignedOwner {...contractProps} />;
    case NotificationType.ContractRejectedCounterParty:
      return <ContractRejectedCounterparty {...contractProps} />;
    case NotificationType.ContractRejectedOwner:
      return <ContractRejectedOwner {...contractProps} />;
    /** @deprecated Explicitly ignore, deprecated. */
    case NotificationType.SowSendForSigning:
      return null;
    case NotificationType.SowIssuedOwner:
      return <StatementOfWorkIssuedOwner {...statementOfWorkProps} />;
    case NotificationType.SowIssuedCounterParty:
      return <StatementOfWorkIssuedCounterparty {...statementOfWorkProps} />;
    case NotificationType.SowSignedCounterParty:
      return <StatementOfWorkSignedCounterparty {...statementOfWorkProps} />;
    case NotificationType.SowSignedOwner:
      return <StatementOfWorkSignedOwner {...statementOfWorkProps} />;
    case NotificationType.SowRejectedCounterParty:
      return <StatementOfWorkRejectedCounterparty {...statementOfWorkProps} />;
    case NotificationType.SowRejectedOwner:
      return <StatementOfWorkRejectedOwner {...statementOfWorkProps} />;
    // Invoice
    case NotificationType.InvoicePaymentFailedFreelancer:
      return <InvoicePaymentFailedFreelancer {...invoiceProps} />;
    case NotificationType.InvoicePaymentFailedClient:
      return <InvoicePaymentFailedClient {...invoiceProps} />;
    case NotificationType.AmemdedInvoiceFreelancer:
      return <InvoiceAmendedFreelancer {...invoiceProps} />;
    case NotificationType.AmemdedInvoiceClient:
      return <InvoiceAmendedClient {...invoiceProps} />;
    case NotificationType.InvoiceStatusChangedClient:
      return invoiceProps.invoiceStatus === InvoiceStatusEnum.Overdue ? (
        <InvoiceIsOverdueClient {...invoiceProps} />
      ) : invoiceProps.invoiceStatus === InvoiceStatusEnum.PartiallyPaid ? (
        <InvoicePartiallyPaidClient {...invoiceProps} />
      ) : invoiceProps.invoiceStatus === InvoiceStatusEnum.Paid ? (
        <InvoiceFullyPaidClient {...invoiceProps} />
      ) : invoiceProps.invoiceStatus === InvoiceStatusEnum.Issued ? (
        <InvoiceSentClient {...invoiceProps} />
      ) : null;
    case NotificationType.InvoiceStatusChangedFreelancer:
      return invoiceProps.invoiceStatus === InvoiceStatusEnum.Overdue ? (
        <InvoiceIsOverdueFreelancer {...invoiceProps} />
      ) : invoiceProps.invoiceStatus === InvoiceStatusEnum.PartiallyPaid ? (
        <InvoicePartiallyPaidFreelancer {...invoiceProps} />
      ) : invoiceProps.invoiceStatus === InvoiceStatusEnum.Paid ? (
        <InvoiceFullyPaidFreelancer {...invoiceProps} />
      ) : invoiceProps.invoiceStatus === InvoiceStatusEnum.Issued ? (
        <InvoiceSentFreelancer {...invoiceProps} />
      ) : null;
    case NotificationType.ReminderInvoiceFreelancer:
      return <InvoiceManualReminderFreelancer {...invoiceProps} />;
    case NotificationType.ReminderInvoiceClient:
      return invoiceProps.invoiceStatus === InvoiceStatusEnum.Overdue ? (
        <InvoiceManualReminderOverdueClient {...invoiceProps} />
      ) : invoiceProps.invoiceStatus === InvoiceStatusEnum.PartiallyPaid ? (
        <InvoiceManualReminderPartiallyPaidClient {...invoiceProps} />
      ) : null;
    case NotificationType.InvoiceOnDraftState:
      return <InvoiceOnDraftStateReminder {...invoiceProps} />;

    // Posts
    case NotificationType.NewIndividualPost:
      return <NewIndividualPost {...noumProps} onClick={postProps.onClick} />;
    case NotificationType.Comment:
      return <Comment {...postProps} />;
    case NotificationType.CommentMentioned:
      return <CommentMentioned {...postProps} />;
    case NotificationType.CommentReplied:
      return <CommentReplied {...postProps} />;
    case NotificationType.CommentRepliedMentioned:
      return <CommentRepliedMentioned {...postProps} />;
    case NotificationType.CommentReplyThread:
      return (
        <CommentReplyThread
          {...postProps}
          postAuthor={notification.adminUserId}
        />
      );
    case NotificationType.Like:
      return <Like {...postProps} />;
    case NotificationType.PostMentioned:
      return (
        <PostMentioned
          {...postProps}
          onClick={() => {
            handlers.navigateToNoum(notification, users[0]?.chamber?._id);
          }}
        />
      );
    case NotificationType.PostRejected:
      return <PostRejected {...postProps} />;

    // Groups
    case NotificationType.GroupInvite:
      return <GroupInvite {...basicProps} group={notification.group} />;
    case NotificationType.JoinRequest:
      return <JoinRequest {...basicProps} group={notification.group} />;
    case NotificationType.NewGroupPost:
      return <NewGroupPost {...basicProps} group={notification.group} />;

    // Noums
    case NotificationType.NoumFollowed:
      return <NoumFollow {...noumProps} />;
    /** @deprecated Explicitly ignore those, deprecated. */
    case NotificationType.NoumConnection:
      return null;
    case NotificationType.NoumUnfollowed:
      return <NoumUnfollow {...noumProps} />;
    case NotificationType.NoumPublished:
      return (
        <NoumPublished {...noumProps} avatars={[getNoumAvatar(noumDetails)]} />
      );
    case NotificationType.NoumArchived:
      return (
        <NoumArchived {...noumProps} avatars={[getNoumAvatar(noumDetails)]} />
      );
    case NotificationType.NoumUnarchived:
      return (
        <NoumUnarchived {...noumProps} avatars={[getNoumAvatar(noumDetails)]} />
      );
    case NotificationType.QuestionCreated:
      return <QuestionCreated {...noumProps} />;
    case NotificationType.QuestionAnswered:
      return (
        <QuestionAnswered
          {...noumProps}
          avatars={getUserWithNoumAvatars(noumDetails, users[0])}
        />
      );
    case NotificationType.FavoriteConnection:
      return <FavoriteConnection {...noumProps} />;
    case NotificationType.GuestConnection:
      return <GuestConnection {...noumProps} />;
    case NotificationType.ConnectionRequested:
    case NotificationType.ConnectionRequestedReminder:
      return (
        <ConnectionRequested
          {...connectionNoumProps}
          isReminder={
            notification.type === NotificationType.ConnectionRequestedReminder
          }
          message={notification.data?.connection?.message}
          avatars={getUserWithNoumAvatars(
            noumDetails,
            connectionNoumProps.requestFrom,
          )}
          avatarMode="nested"
        />
      );
    case NotificationType.ConnectionInvited:
    case NotificationType.ConnectionInvitedReminder:
      return (
        <ConnectionInvited
          {...connectionNoumProps}
          isReminder={
            notification.type === NotificationType.ConnectionInvitedReminder
          }
          message={notification.data?.connection?.message ?? ''}
          avatars={getUserWithNoumAvatars(
            noumDetails,
            connectionNoumProps.requestTo,
          )}
          avatarMode="nested"
          onAccept={() =>
            handlers.connections.acceptConnection(
              notification,
              notification.data?.connection?._id,
            )
          }
          onReject={() =>
            handlers.connections.rejectConnection(
              notification,
              notification.data?.connection?._id,
            )
          }
        />
      );
    case NotificationType.ConnectionInviteAccepted:
      return (
        <ConnectionInviteAccepted
          {...connectionNoumProps}
          avatars={getUserWithNoumAvatars(
            noumDetails,
            connectionNoumProps.requestTo,
          )}
          avatarMode="nested"
        />
      );
    case NotificationType.ConnectionInviteDeclined:
      return (
        <ConnectionInviteDeclined
          {...connectionNoumProps}
          avatars={getUserWithNoumAvatars(
            noumDetails,
            connectionNoumProps.requestTo,
          )}
          avatarMode="nested"
        />
      );
    case NotificationType.ConnectionRequestAccepted:
      return (
        <ConnectionRequestAccepted
          {...connectionNoumProps}
          avatars={getUserWithNoumAvatars(
            noumDetails,
            connectionNoumProps.requestTo,
          )}
          avatarMode="nested"
        />
      );
    case NotificationType.ConnectionRequestDeclined:
      return (
        <ConnectionRequestDeclined
          {...connectionNoumProps}
          avatars={getUserWithNoumAvatars(
            noumDetails,
            connectionNoumProps.requestTo,
          )}
          avatarMode="nested"
        />
      );
    case NotificationType.ConnectionDisconnected:
      return <ConnectionDisconnected {...noumProps} />;
    case NotificationType.Connected:
      return (
        <Connected
          {...connectionNoumProps}
          avatars={getUserWithNoumAvatars(
            noumDetails,
            connectionNoumProps.requestFrom,
          )}
          avatarMode="nested"
        />
      );
    case NotificationType.UserDisconnectFromProjectNoum:
      return (
        <UserDisconnectFromProjectNoum
          {...connectionNoumProps}
          avatars={getUserWithNoumAvatars(noumDetails, users[0])}
          avatarMode="nested"
        />
      );
    case NotificationType.SpaceConversation:
      return <SpaceConversation {...noumProps} />;

    // Noum Member
    case NotificationType.MemberInvitedToNoum:
      return (
        <MemberInvitedToNoum
          {...memberProps}
          onAccept={() =>
            handlers.memberInvitations.acceptInvitation(
              notification,
              memberProps.noumId,
            )
          }
          onReject={() =>
            handlers.memberInvitations.rejectInvitation(
              notification,
              memberProps.noumId,
            )
          }
        />
      );
    case NotificationType.ManagerInvited:
      return <ManagerInvited {...memberProps} notification={notification} />;
    case NotificationType.MemberRoleUpdated:
      return <MemberRoleUpdated {...memberProps} />;
    case NotificationType.ManagerInviteAcceptedOwner:
      return <ManagerInviteAcceptedOwner {...memberProps} />;
    case NotificationType.ManagerInviteDeclinedOwner:
      return <ManagerInviteDeclinedOwner {...memberProps} />;
    case NotificationType.ManagerInviteExpiredOwner:
      return <ManagerInviteExpiredOwner {...memberProps} />;
    case NotificationType.ManagerInviteExpired:
      return <ManagerInviteExpired {...memberProps} />;
    case NotificationType.ManagerTerminated:
      return <ManagerAccessTerminated {...memberProps} />;
    case NotificationType.ManagerTerminatedAndDisconnected:
      return <ManagerAccessTerminatedAndDisconnected {...memberProps} />;
    case NotificationType.ManagerResignedOwner:
      return <ManagerResignedOwner {...memberProps} />;
    case NotificationType.ManagerResignedAndDisconnectedOwner:
      return <ManagerResignedAndDisconnectedOwner {...memberProps} />;

    // Broadcast Campaigns
    case NotificationType.CampaignRefreshed:
      return (
        <CampaignRefreshed
          {...noumProps}
          avatars={[getNoumAvatar(noumDetails)]}
        />
      );
    case NotificationType.CampaignExpired:
      return (
        <CampaignExpired
          {...noumProps}
          avatars={[getNoumAvatar(noumDetails)]}
        />
      );

    // Connections
    case NotificationType.Invite:
    case NotificationType.InviteReminder:
      return (
        <Invite
          {...basicProps}
          isReminder={notification.type === NotificationType.InviteReminder}
          invitationStatus={getConnectionStatus(notification.data?.connection)}
          onClick={() =>
            handlers.navigateToNoum(notification, users[0].chamber?._id)
          }
          onAccept={() =>
            handlers.connections.acceptConnection(
              notification,
              notification.data?.connection?._id,
            )
          }
          onReject={() =>
            handlers.connections.rejectConnection(
              notification,
              notification.data?.connection?._id,
            )
          }
        />
      );
    case NotificationType.InviteAccepted:
      return (
        <InviteAccepted
          {...connectionNoumProps}
          avatars={[getUserAvatar(connectionNoumProps.requestTo)]}
          onClick={() =>
            handlers.navigateToNoum(
              notification,
              connectionNoumProps.requestTo?.chamber?._id,
            )
          }
        />
      );
    case NotificationType.NewAdminConnection:
      return (
        <NewAdminConnection {...basicProps} admin={notification.adminUserId} />
      );
    case NotificationType.NewReferralConnection:
      return (
        <NewReferralConnection
          {...basicProps}
          onClick={() => {
            const user = users[0];
            const isUnregisteredUser = UserUtil.isUnregistered(user);
            const isInactive = UserUtil.isInactive(user);

            if (isInactive || isUnregisteredUser) {
              addPrimaryIconToast(
                t('noumena.calendar.notification.button.inactive_user'),
              );
              return;
            }
            handlers.navigateToNoum(notification, users[0].chamber?._id);
          }}
        />
      );

    // Admin messages
    case NotificationType.CqScoreUpdate:
      return (
        <CqScoreUpdate
          {...basicProps}
          onClick={() => handlers.navigateToMoneyPage(notification)}
        />
      );
    case NotificationType.TokenRewarded:
      return (
        <TokenRewarded
          {...basicProps}
          message={notification.data?.message ?? ''}
          onClick={() => handlers.navigateToMoneyPage(notification)}
        />
      );
    case NotificationType.UserActive:
      return (
        <UserActive
          {...basicProps}
          onRefresh={() => handlers.refreshCurrentUser(notification)}
          isUserPending={userStatus === 'PENDING'}
        />
      );
    case NotificationType.UserDeactivated:
      return <UserDeactivated {...basicProps} />;
    case NotificationType.UserPending:
    case NotificationType.UserUnregisgtered:
      return <UserPending {...basicProps} />;
    case NotificationType.UserRejected:
      return <UserRejected {...basicProps} />;

    // Rise Notifications

    case NotificationType.RiseApplicationSubmitted:
      return (
        <RiseApplicationStatusUpdate
          {...basicProps}
          message={notification.data?.message || ''}
          onClick={() =>
            handlers.navigateToNoum(
              notification,
              notification?.data?.chamber?._id,
            )
          }
        />
      );

    case NotificationType.RiseApplicationStatusChanged:
      return (
        <RiseApplicationStatusUpdate
          {...basicProps}
          message={notification.data?.message || ''}
          onClick={() =>
            handlers.navigateToNoum(
              notification,
              notification?.data?.chamber?._id,
            )
          }
        />
      );

    case NotificationType.RiseApplicationFormSubmissionReview:
      return (
        <RiseApplicationStatusConnectedUser
          {...basicProps}
          message={notification.data?.message || ''}
          onClick={() =>
            handlers.navigateToNoum(
              notification,
              notification?.data?.chamber?._id,
            )
          }
        />
      );

    // Payment Notifications

    case NotificationType.PaymentSubscriptionUpcomingPayment:
      return (
        <SubscriptionUpcomingPayment
          {...basicProps}
          planName={notification?.data?.paymentSub?.planName || ''}
          message={notification?.data?.message || ''}
          onClick={() => {
            handlers.navigateToPlanDetails(
              notification,
              String(notification?.data?.paymentSub?.subscription_id ?? ''),
            );
          }}
        />
      );

    // Noum about to expire

    case NotificationType.PaymentSubscriptionNoumToBeExpired:
      return (
        <NoumAboutToExpire
          {...basicProps}
          noumName={notification?.data?.paymentSub?.noumName || ''}
          noumExpiryDays={notification?.data?.paymentSub?.noumExpiryDays || ''}
          message={notification?.data?.message || ''}
          avatars={[getNoumAvatar(noumDetails)]}
          onClick={() => {
            handlers.navigateToNoum(notification, noumDetails?._id);
          }}
        />
      );

    // Unused Renew Slots

    case NotificationType.PaymentSubscriptionNoumUnusedRenewSlots:
      return (
        <NoumUnusedRenewSlots
          {...basicProps}
          message={notification?.data?.message || ''}
          onClick={() => {
            handlers.navigateToPlanDetails(
              notification,
              String(notification?.data?.paymentSub?.subscription_id ?? ''),
            );
          }}
        />
      );
    // Unused set-up Slots

    case NotificationType.PaymentSubscriptionNoumUnusedSetupSlots:
      return (
        <NoumUnusedSetupSlots
          {...basicProps}
          message={notification?.data?.message || ''}
          onClick={() => {
            handlers.navigateToPlanDetails(
              notification,
              String(notification?.data?.paymentSub?.subscription_id ?? ''),
            );
          }}
        />
      );

    // Campaigns
    case NotificationType.SendAdCampaignReport:
      return (
        <CampaignReport
          {...basicProps}
          message={notification?.data?.message || ''}
        />
      );
    case NotificationType.SendAdCampaignOffer:
      return (
        <CampaignOffer
          {...basicProps}
          message={notification?.data?.message || ''}
        />
      );

    // Payments
    case NotificationType.OpsAdminApproval:
      return (
        <WalletApproved
          {...basicProps}
          message={notification?.data?.message || ''}
          onGoToWallet={() => handlers.navigateToMoneyPage(notification)}
        />
      );
    case NotificationType.OpsAdminRejection:
      return (
        <WalletRejected
          {...basicProps}
          message={notification?.data?.message || ''}
        />
      );
    case NotificationType.DwollaMicroDepositVerified:
      return (
        <MicroDepositVerified
          {...basicProps}
          message={notification?.data?.message || ''}
        />
      );
    case NotificationType.DwollaMicroDepositComplete:
      return (
        <MicroDepositVerificationInProcess
          {...basicProps}
          message={notification?.data?.message || ''}
          onGoToWallet={() => handlers.navigateToMoneyDetailsPage(notification)}
        />
      );
    case NotificationType.UploadKycDocument:
      return (
        <WalletUploadDocuments
          {...basicProps}
          message={notification?.data?.message || ''}
          onUploadDocuments={() =>
            handlers.navigateToApplicationReview(notification)
          }
        />
      );

    // Events
    /** @deprecated Explicitly ignore those, deprecated. */
    case NotificationType.EventCohostInvitee:
      return null;
    case NotificationType.EventInvitee:
      return (
        <EventInvitee
          {...basicProps}
          {...eventProps}
          avatars={[getUserAvatar(eventProps.event?.invitedBy)]}
          users={[eventProps.event?.invitedBy].filter(notEmpty)}
          onAccept={(isAcceptAll: boolean) =>
            handlers.events.acceptEventInvitation(
              notification,
              eventDetails,
              isAcceptAll,
            )
          }
          onReject={(isRejectAll: boolean) =>
            handlers.events.rejectEventInvitation(
              notification,
              eventDetails,
              isRejectAll,
            )
          }
        />
      );
    case NotificationType.EventDateModified:
      return <EventDateModified {...basicProps} {...eventProps} />;
    case NotificationType.EventDeleted:
      return (
        <EventDeleted
          {...basicProps}
          {...eventProps}
          // No redirect to event.
          onClick={basicProps.onClick}
        />
      );
    /** @deprecated Explicitly ignore those, deprecated. */
    case NotificationType.PreEvent:
    case NotificationType.PostEvent:
      return null;
    case NotificationType.EventReminder:
      return <EventReminder {...basicProps} {...eventProps} />;
    case NotificationType.EventLive:
      return (
        <EventLive
          {...basicProps}
          {...eventProps}
          onJoin={() => handlers.events.joinEvent(notification, eventDetails)}
          onGoLive={() =>
            handlers.events.goLiveEvent(notification, eventDetails)
          }
        />
      );
    case NotificationType.EventStarting:
      return (
        <EventStarting
          {...basicProps}
          {...eventProps}
          onJoin={() => handlers.events.joinEvent(notification, eventDetails)}
          onGoLive={() =>
            handlers.events.goLiveEvent(notification, eventDetails)
          }
        />
      );
    case NotificationType.InstantEventInvitee:
      return (
        <InstantEventInvite
          {...basicProps}
          {...eventProps}
          onJoin={() => handlers.events.joinEvent(notification, eventDetails)}
        />
      );

    default:
      return (
        <UnhandledNotification
          {...basicProps}
          type={notification.type ?? 'Unknown'}
        />
      );
  }
};

export default NotificationGateway;
