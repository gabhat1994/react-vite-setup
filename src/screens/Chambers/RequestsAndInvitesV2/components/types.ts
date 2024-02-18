import {
  type Maybe,
  type ConnectionRequestTypeEnum,
  type SpaceConnection,
} from '@/apollo/generated/types';
import { type NoumMemberForUserMembersFragment } from '@/apollo/graphql';
import { type NoumPendingConnectionFragment } from '@/apollo/graphql/fragments/noumPendingConnection.generated';
import {
  type ReceivedAndSent,
  type RequestsAndInvites,
} from '../modals/RequestsAndInvitesModalV2/constants';

export type RequestsAndInvitesListProps = {
  typeId: RequestsAndInvites;
  statusId: ReceivedAndSent;
  refetchReceivedRequests: () => void;
};

export type RequestsAndInvitesItemsProps = {
  isInvite?: boolean;
  isReceived?: boolean;
  data: Maybe<SpaceConnection>[];
  refetch: () => void;
  loading?: boolean;
  isModal?: boolean;
};

export type RequestsAndInvitesItemsPropsV2 = {
  isInvite?: boolean;
  isReceived?: boolean;
  data: NoumMemberForUserMembersFragment[] | NoumPendingConnectionFragment[];
  refetch: () => void;
  loading?: boolean;
  isModal?: boolean;
};
export type RequestsOrInviteItemProps = {
  item: SpaceConnection;
  isInvite?: boolean;
  isReceived?: boolean;
  refetch: () => void;
};

export type RequstsOrInvitesItemDetailProps = {
  item: SpaceConnection;
  isReceived?: boolean;
  isInvite?: boolean;
  showMessage?: boolean;
  handleClickShowMessage?: () => void;
};

export type RequestsOrInvitesItemActionsProps = {
  isReceived?: boolean;
  handleActionClick: (nextType: ConnectionRequestTypeEnum) => void;
};

export enum ResolvingAnimationState {
  Default,
  FadeOut,
  FadeIn,
}

export type RequstsOrInvitesDetailProps = {
  item: NoumMemberForUserMembersFragment | NoumPendingConnectionFragment;
  isInvitesReceived: boolean;
  isRequestSent: boolean;
};
