import {
  type GlobalSearchEntity,
  type ProjectChamberType,
  type UserOutput,
} from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';
import { type LinkedNoumOptionType } from '@/screens/LinkNoum/components/types';

interface ChamberVisibilityBase {
  spaceId: string;
  visibility?: string;
  handleClose: () => void;
}

export type ChamberVisibilityInviteModalProps = {
  isOpen: boolean;
  linkedNoums?: LinkedNoumOptionType[];
  isOnlyInvite?: boolean;
  isSEOEnabled?: boolean;
} & ChamberVisibilityBase;

export type VisibilityProps = {
  key: string;
  label: string;
  type: 'value';
  value: ProjectChamberType;
  description?: string;
  selected?: boolean;
  labelColor?: string;
  icon?: JSX.Element;
};

export type InviteStatusProps = {
  key: string;
  label: string;
  type: 'value';
  value: TInviteStatus;
  description?: string;
  selected?: boolean;
  labelColor?: string;
  icon?: JSX.Element;
};

export type VisibilityDropdownProps = DropdownValueType<ProjectChamberType>;

export type InvitedUser = {
  connectionId?: string;
  connectionStatus?: string;
  isMember?: boolean;
  avatar?: string;
  isVerified?: boolean;
} & UserOutput;

type TInviteStatus = 'Pending' | 'Accepted' | 'Declined' | 'Cancel' | 'Resend';

export type InviteStatusDropdownProps = DropdownValueType<TInviteStatus>;

export type ChamberInvitedUserProps = {
  user: InvitedUser;
  onSelect: (user: InvitedUser, value: TInviteStatus) => void;
  isNonNoumTab?: boolean;
};

export type InviteUserTabProps = {
  spaceId: string;
};

export type InviteNonUserPickerProps = {
  connectedUsers: InvitedUser[];
  spaceId: string;
};

export type CheckNewInviteResult = {
  isNew: boolean;
  isUnregistered: boolean;
  user?: GlobalSearchEntity;
};

export enum InviteMemberTabId {
  NoumenaMembers = 'NOUMENA_MEMBERS',
  NonNoumenaMembers = 'NON_NOUMENA_MEMBERS',
}
