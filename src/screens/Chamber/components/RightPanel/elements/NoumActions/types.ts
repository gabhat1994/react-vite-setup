import {
  type ConnectionRequestTypeEnum,
  type Maybe,
} from '@/apollo/generated/types';
import { type UserBasicOutputFragment } from '@/apollo/graphql';

export interface UserActionProps {
  loading?: boolean;
  connectionStatus?: Maybe<ConnectionRequestTypeEnum> | undefined;
  onHandle: (status: ConnectionRequestTypeEnum) => Promise<boolean>;
  isNoumEditor?: boolean;
}

export enum UserActionMode {
  /** Accept or Decline invitation */
  handleInvitation = 'handleInvitation',

  /** Connect or Disconnect noum */
  handleConnection = 'handleConnection',

  /** Send or Cancel request */
  handleRequest = 'handleRequest',

  /** Invited by Home Noum but declined, so need next invitation */
  handleWaitInvitation = 'handleWaitInvitation',
}

export enum HandleFollowSearch {
  source = 'source',
  featured = 'featured',
}

export interface NoumEditorUserActionProps {
  isNoumEditor?: boolean;
}

export type NoumEditorInvitedProps = {
  onHandleInvitation: (nextStatus: ConnectionRequestTypeEnum) => Promise<void>;
  invitedFrom: Maybe<UserBasicOutputFragment> | undefined;
};

export type NoumEditorOwnerActionsProps = {
  onEdit: () => void;
};

export interface IRiseNoumUserApplyButton {
  isNoumEditor?: boolean;
}
