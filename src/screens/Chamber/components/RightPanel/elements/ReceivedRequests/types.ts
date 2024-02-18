import {
  type NoumMemberWithInvitationFragment,
  type ReceivedConnectionRequestQuery,
  type RequestedConnectionQuery,
  type UserBasicOutputFragment,
  type NoumMemberForUserMembersFragment,
} from '@/apollo/graphql';
import { type ConnectionRequestStatus } from '@/apollo/generated/types';
import { type Maybe } from '@/common/types';
import { type NoumPendingConnectionFragment } from '@/apollo/graphql/fragments/noumPendingConnection.generated';

export interface IReceivedRequests {
  data?: ReceivedConnectionRequestQuery;
  loading?: boolean;
  connectionId?: string | null;
}

export interface ReceivedRequestsProps {
  noumId: Maybe<string> | undefined;
}

export interface RequestsListProps {
  isInvite?: boolean;
  showCategory?: boolean;
  data?: ReceivedConnectionRequestQuery;
  refetchReceivedRequests?: () => void;
  chamberId?: string | null;
  loading?: boolean;
  isModal?: boolean;
}

export interface InvitesOrMyRequestsListProps {
  isInvite?: boolean;
  isNotPrivateNoum?: boolean;
  isChamberBox?: boolean;
  isChambersScreen?: boolean;
  data?: RequestedConnectionQuery;
  refetch: () => void;
  chamberId?: string | null;
  loading?: boolean;
  isModal?: boolean;
}

export interface InvitedByMeListProps {
  connectionStatus?: ConnectionRequestStatus;
  data: NoumMemberWithInvitationFragment[];
  refetch: () => void;
  loading?: boolean;
  isReceived?: boolean;
}

export type ReceivedRequestProp = {
  isChambersScreen?: boolean;
  noumId?: string | null;
  disabled?: boolean;
};

export interface ReceivedListProps {
  data: NoumMemberForUserMembersFragment[] | NoumPendingConnectionFragment[];
  refetchReceivedRequests: () => void;
}

export interface ReceivedMemberRequest {
  user: Maybe<UserBasicOutputFragment>;
  gap?: number;
  type?: string;
}
