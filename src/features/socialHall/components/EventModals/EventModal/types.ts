export type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description?: string;
  confirmButton?: string;
  isConfirmButtonPrimary?: boolean;
  cancelButton?: string;
  countDown?: boolean;
  remainTime?: number;
  onCloseModal?: () => void;
};
