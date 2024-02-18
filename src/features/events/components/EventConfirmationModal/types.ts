import type { ButtonIntent } from '@/components/Button/types';
import type { TCancelModal } from '@/features/events/types/cancelModal';

export interface PrivacyModalProps {
  type: TCancelModal;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export interface EventRecurringConfirmationModalProps {
  type: TCancelModal;
  loading?: boolean;
  onClose: () => void;
  onAllEventClicked: () => void;
  onSingleEventClicked: () => void;
}

export interface ModalDataProps {
  type: TCancelModal;
}

export interface ModalDataOutputProps {
  message: string;
  description: string;
  yesButton: string;
  noButton: string;
  confirmIntent?: ButtonIntent;
}
