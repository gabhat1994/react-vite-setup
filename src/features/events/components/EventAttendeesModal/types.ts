import { type Attendees } from '@/apollo/generated/types';

export interface IModalControl {
  open: (eventId: string, isHost: boolean) => void;
}

export interface EventAttendeeModalProps {
  onRefetchEvents?: () => void;
  onClose?: () => void;
}

export interface EventCancelAttendeeModalProps {
  isOpen: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description?: string;
  confirmButton?: string;
  cancelButton?: string;
  countDown?: boolean;
  isUnblocked?: boolean;
}

export type AttendeeItemProps = {
  isHost: boolean | undefined;
  attendee: Attendees;
  onCancel: (user: Attendees) => void;
  isBlocked: boolean | undefined;
};
