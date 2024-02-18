import {
  type InvitationStatus,
  type Maybe,
  type NoumMemberStatus,
  type UserRole,
} from '@/apollo/generated/types';
import {
  type NotificationFragment,
  type InvoiceOutputFragment,
  type NoumMemberBasicFragment,
} from '@/apollo/graphql';
import {
  type ContractBasic,
  type StatementOfWork,
} from '@/features/contracts/types';
import {
  type UserBasicOutputFragment,
  type UserFragment,
} from '@/apollo/graphql/fragments';
import {
  type NotificationAvatarProps,
  type NotificationItemProps,
} from '../../NotificationLayout/types';
import { type NotificationConnectionStatus } from '../../types';

export type BaseNotificationProps = {
  avatars: NotificationAvatarProps['avatars'];
  avatarMode: NotificationAvatarProps['mode'];
  isViewed: boolean;
  timestamp: string | Date;
  users: Array<UserBasicOutputFragment | UserFragment>;
  onClick?: () => void;
};

// Wallet
export type WalletSetupRequestProps = BaseNotificationProps & {};

// Invoices

export type BaseInvoiceNotificationProps = BaseNotificationProps & {
  invoice?: InvoiceOutputFragment;
  invoiceStatus?: string;
};

// Contracts & SOWs

export type BaseContractNotificationProps = BaseNotificationProps & {
  contract: Maybe<ContractBasic> | undefined;
};
export type ContractIssuedOwnerProps = BaseContractNotificationProps;
export type ContractIssuedCounterpartyProps = BaseContractNotificationProps;
export type ContractSignedOwnerProps = BaseContractNotificationProps;
export type ContractSignedCounterpartyProps = BaseContractNotificationProps;
export type ContractRejectedOwnerProps = BaseContractNotificationProps;
export type ContractRejectedCounterpartyProps = BaseContractNotificationProps;

export type BaseStatementOfWorkNotificationProps = BaseNotificationProps & {
  statementOfWork: Maybe<StatementOfWork> | undefined;
};
export type StatementOfWorkIssuedOwnerProps =
  BaseStatementOfWorkNotificationProps;
export type StatementOfWorkIssuedCounterpartyProps =
  BaseStatementOfWorkNotificationProps;
export type StatementOfWorkSignedOwnerProps =
  BaseStatementOfWorkNotificationProps;
export type StatementOfWorkSignedCounterpartyProps =
  BaseStatementOfWorkNotificationProps;
export type StatementOfWorkRejectedOwnerProps =
  BaseStatementOfWorkNotificationProps;
export type StatementOfWorkRejectedCounterpartyProps =
  BaseStatementOfWorkNotificationProps;

// Posts
export type BasePostNotificationProps = BaseNotificationProps;
export type NewIndividualPostProps = BasePostNotificationProps &
  BaseNoumNotificationProps;
export type CommentProps = BasePostNotificationProps;
export type CommentMentionedProps = BasePostNotificationProps;
export type CommentRepliedProps = BasePostNotificationProps;
export type CommentRepliedMentionedProps = BasePostNotificationProps;
export type CommentReplyThreadProps = BasePostNotificationProps & {
  postAuthor?: NotificationFragment['adminUserId'];
};
export type LikeProps = BasePostNotificationProps;
export type PostMentionedProps = BasePostNotificationProps;
export type PostRejectedProps = BasePostNotificationProps;

// Groups
export type GroupInviteProps = BaseNotificationProps & {
  group: NotificationFragment['group'];
};
export type JoinRequestProps = BaseNotificationProps & {
  group: NotificationFragment['group'];
};
export type NewGroupPostProps = BaseNotificationProps & {
  group: NotificationFragment['group'];
};

// Noums
export type BaseNoumNotificationProps = BaseNotificationProps & {
  noumName?: string;
  noumOwner?: Maybe<UserBasicOutputFragment> | undefined;
};

export type NoumFollowProps = BaseNotificationProps & BaseNoumNotificationProps;
export type NoumUnfollowProps = BaseNotificationProps &
  BaseNoumNotificationProps;
export type NoumPublishedProps = BaseNotificationProps &
  BaseNoumNotificationProps;
export type NoumArchivedProps = BaseNotificationProps &
  BaseNoumNotificationProps;
export type NoumUnarchivedProps = BaseNotificationProps &
  BaseNoumNotificationProps;
export type QuestionAnsweredProps = BaseNotificationProps &
  BaseNoumNotificationProps;
export type QuestionCreatedProps = BaseNotificationProps &
  BaseNoumNotificationProps;
export type CampaignRefreshedProps = BaseNotificationProps &
  BaseNoumNotificationProps;
export type CampaignExpiredProps = BaseNotificationProps &
  BaseNoumNotificationProps;

// Connections
export type InviteProps = BaseNotificationProps & {
  invitationStatus: NotificationConnectionStatus;
  onAccept: () => void;
  onReject: () => void;
  isReminder: boolean;
};
export type InviteAcceptedProps = BaseNotificationProps & {
  requestTo?: Maybe<UserBasicOutputFragment> | undefined;
};
export type NewAdminConnectionProps = BaseNotificationProps & {
  admin?: NotificationFragment['adminUserId'];
};
export type NewReferralConnectionProps = BaseNotificationProps;

// Noum Connections
export type BaseNoumConnectionNotificationProps = BaseNoumNotificationProps & {
  requestFrom?: Maybe<UserBasicOutputFragment> | undefined;
  requestTo?: Maybe<UserBasicOutputFragment> | undefined;
  message?: string | undefined | null;
};
export type GuestConnectionProps = BaseNotificationProps &
  BaseNoumConnectionNotificationProps;
export type FavoriteConnectionProps = BaseNotificationProps &
  BaseNoumConnectionNotificationProps;

export type ConnectionDisconnectedProps = BaseNotificationProps &
  BaseNoumConnectionNotificationProps;
export type ConnectionInviteAcceptedProps = BaseNotificationProps &
  BaseNoumConnectionNotificationProps;

export type ConnectionInvitedProps = BaseNotificationProps &
  BaseNoumConnectionNotificationProps & {
    onAccept?: () => void;
    onReject?: () => void;
    isReminder: boolean;
  };
export type ConnectionInviteDeclinedProps = BaseNotificationProps &
  BaseNoumConnectionNotificationProps;
export type ConnectionRequestAcceptedProps = BaseNotificationProps &
  BaseNoumConnectionNotificationProps;
export type ConnectionRequestDeclinedProps = BaseNotificationProps &
  BaseNoumConnectionNotificationProps;
export type ConnectionRequestedProps = BaseNotificationProps &
  BaseNoumConnectionNotificationProps & {
    isReminder: boolean;
  };
export type ConnectedProps = BaseNotificationProps &
  BaseNoumConnectionNotificationProps;
export type UserDisconnectFromProjectNoumProps = BaseNotificationProps &
  BaseNoumConnectionNotificationProps;
export type SpaceConversationProps = BaseNotificationProps &
  BaseNoumConnectionNotificationProps;

// Events
export type BaseEventNotificationProps = BaseNotificationProps & {
  event: NotificationFragment['event'];
  userRole: UserRole;
  invitationStatus: InvitationStatus;
};
export type EventInviteeProps = BaseNotificationProps &
  BaseEventNotificationProps & {
    onAccept: (isAcceptAll: boolean) => void;
    onReject: (isRejectAll: boolean) => void;
  };
export type EventReminderProps = BaseNotificationProps &
  BaseEventNotificationProps;
export type EventLiveProps = BaseNotificationProps &
  BaseEventNotificationProps & {
    onJoin: () => void;
    onGoLive: () => void;
  };
export type EventStartingProps = BaseNotificationProps &
  BaseEventNotificationProps & {
    onJoin: () => void;
    onGoLive: () => void;
  };
export type EventDateModifiedProps = BaseNotificationProps &
  BaseEventNotificationProps & {
    invitationStatus: InvitationStatus;
  };
export type EventDeletedProps = BaseNotificationProps &
  BaseEventNotificationProps & {
    invitationStatus: InvitationStatus;
  };
export type EventInstantProps = BaseEventNotificationProps &
  Pick<BaseNotificationProps, 'avatars' | 'timestamp' | 'isViewed'> & {
    onJoin: () => void;
  };
// Admin messages
export type CqScoreUpdateProps = BaseNotificationProps;
export type UserActiveProps = BaseNotificationProps & {
  isUserPending: boolean;
  onRefresh: () => void;
};
export type UserDeactivatedProps = BaseNotificationProps;
export type UserPendingProps = BaseNotificationProps;
export type UserRejectedProps = BaseNotificationProps;

export type TokenRewardedProps = BaseNotificationProps & {
  message: string;
};

export type UnhandledNotificationProps = BaseNotificationProps & {
  type: string;
};

export type AdminMessageProps = Pick<
  BaseNotificationProps,
  'isViewed' | 'timestamp' | 'onClick'
> &
  Pick<NotificationItemProps, 'buttons' | 'body'> & {
    title?: string;
  };

export type RiseApplicationStatusUpdateProps = BaseNotificationProps & {
  message: string;
};

export type SubscriptionUpcomingPaymentProps = BaseNotificationProps & {
  planName: string;
  message: string;
};

export type NoumAboutToExpireProps = BaseNotificationProps & {
  noumExpiryDays: string | number;
  noumName: string;
  message: string;
};

export type NoumUnusedRenewSlotsProps = BaseNotificationProps & {
  message: string;
};
export type NoumUnusedSetupSlotsProps = BaseNotificationProps & {
  message: string;
};
export type CampaignReportProps = BaseNotificationProps & {
  message: string;
};
export type MicroDepositVerifiedProps = BaseNotificationProps & {
  message: string;
};
export type MicroDepositVerificationInProcessProps = BaseNotificationProps & {
  message: string;
  onGoToWallet: () => void;
};
export type CampaignOfferProps = BaseNotificationProps & {
  message: string;
};
export type WalletApprovedProps = BaseNotificationProps & {
  message: string;
  onGoToWallet: () => void;
};
export type WalletRejectedProps = BaseNotificationProps & {
  message: string;
};
export type WalletUploadDocumentProps = BaseNotificationProps & {
  message: string;
  onUploadDocuments: () => void;
};

// Manager

export type BaseNoumMemberNotificationProps = BaseNoumNotificationProps & {
  noumId: string;
  status: Maybe<NoumMemberStatus> | undefined;
  noumMember: Maybe<NoumMemberBasicFragment> | undefined;
};

export type MemberInvitedToNoumProps = BaseNoumMemberNotificationProps & {
  onAccept: () => Promise<void>;
  onReject: () => Promise<void>;
};

export type ManagerInvitedProps = BaseNoumMemberNotificationProps & {
  notification: NotificationFragment;
};
