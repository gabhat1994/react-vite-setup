import {
  type Maybe,
  type ConnectionPermissionTypeEnum,
  type SpaceConnection,
  type UserOutput,
} from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';

export type ChamberPermissionModalProps = {
  spaceId: string;
  isOpen: boolean;
  onClose: () => void;
  onInvite: () => void;
  linkedCount?: number;
};

export interface ChamberConnectedUsersProps {
  spaceId: string;
  connections: Maybe<SpaceConnection>[];
  loading?: boolean;
  onChangePermission: (
    connectionId: Maybe<string> | undefined,
    permission: ConnectionPermissionTypeEnum,
  ) => void;
  onClose: () => void;
  onInvite: () => void;
}

export type ChamberConnectedUserProps = {
  user: UserOutput;
  currentPermission: Maybe<ConnectionPermissionTypeEnum> | undefined;
  onChangePermission: (value: ConnectionPermissionTypeEnum) => void;
  isNonMember?: boolean;
};

export type PermissionProps = {
  key: string;
  label: string;
  type: 'value';
  value: ConnectionPermissionTypeEnum;
  description?: string;
  selected?: boolean;
  labelColor?: string;
};

export type PermissionDropdownProps =
  DropdownValueType<ConnectionPermissionTypeEnum>;

export type ChangePermissionsConfirmationModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  count: number;
};
