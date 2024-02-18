import {
  type ConnectionRequestStatus,
  type ConnectionRequestTypeEnum,
  type UserOutput,
} from '@/apollo/generated/types';
import { type UserBasicOutputFragment } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';

export type MembersModalProps = {
  isOpen?: boolean;
  user: UserOutput | undefined | null;
  onClose: () => void;
  isActionLoading?: boolean;
  actionType?: ConnectionRequestTypeEnum;
  onConfirm: () => void;
  connectionStatus?: ConnectionRequestStatus;
  date: string;
  dateText?: string;
};

export interface MemberRequest {
  user: Maybe<UserBasicOutputFragment>;
  gap?: number;
  date: string;
  dateText?: string;
  projectName?: string;
  type?: string;
  isCurrentUser?: boolean;
}

export interface ProjectRequest {
  profileURL: string;
  date?: string;
  userName?: string;
  projectName: string;
  noumId: string;
  isRequested?: boolean;
}
