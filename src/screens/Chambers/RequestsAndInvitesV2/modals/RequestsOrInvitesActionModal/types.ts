import {
  type SpaceConnection,
  type ConnectionRequestTypeEnum,
} from '@/apollo/generated/types';

export type RequestOrInvitesActionModalProps = {
  isOpen?: boolean;
  item: SpaceConnection;
  onClose: () => void;
  isActionLoading?: boolean;
  actionType?: ConnectionRequestTypeEnum;
  onConfirm: () => void;
  isInvite?: boolean;
  isReceived?: boolean;
};
