import { type UserOutput } from '@/apollo/generated/types';

export type TInvitee = Pick<UserOutput, '_id'> &
  Partial<Omit<UserOutput, '_id'>>;

export type InviteAttendeeModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  refetchAudience?: () => void;
};

export type InviteAttendeeItemProps = {
  user: TInvitee;
  isChecked: boolean;
  onCheck: () => void;
};
