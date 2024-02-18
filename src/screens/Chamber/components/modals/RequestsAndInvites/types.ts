import { type Maybe } from '@/common/types';

export interface ReceivedRequestsTabProps {
  noumId?: Maybe<string>;
  isChambersScreen?: boolean;
  refetchReceivedRequests?: () => void;
}
export interface IRequestsAndInvites extends ReceivedRequestsTabProps {
  isOpen: boolean;
  isInviteOnly?: boolean;
  isChambersScreen?: boolean;
  handleClose: () => void;
}

export interface InvitedByMeTabProps {
  isNotPrivateNoum?: boolean;
  noumId: string;
  isChambersScreen?: boolean;
}

export enum ResolvingAnimationState {
  Default,
  FadeOut,
  FadeIn,
}

export interface MyRequestsTabProps {
  noumId?: Maybe<string>;
}

export interface RequestsOrInviteProps {
  refetch: () => void;
  connectionId?: string | null;
  requestFromChamberId?: string | null;
  requestToChamberId?: string | null;
  noumId: string;
  isInvite?: boolean;
  name?: string | null;
  requestedAt?: string | null;
  title?: string | null;
  profileImage?: string | null;
  isChamberBox?: boolean;
  isNotPrivateNoum?: boolean;
  isChambersScreen?: boolean;
}
