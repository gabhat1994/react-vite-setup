import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Spacer } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';

import { type PrivacyModalProps } from './types';
import { useModalData } from './useModalData';

export const EventConfirmationModal = ({
  type,
  loading,
  onClose,
  onConfirm,
}: PrivacyModalProps) => {
  const { message, description, yesButton, noButton, confirmIntent } =
    useModalData({ type });

  return (
    <Modal
      open
      size={ModalSize.S}
      testId="event-confirmation-modal"
      disableBackdropClick
    >
      <ModalHeader data-testid="event-confirmation-modal-message">
        {message}
      </ModalHeader>
      <ModalBody>
        <TSpan
          font="body-l"
          textAlign="center"
          data-testid="event-confirmation-modal-description"
          colorToken="--text-modal-neutral-default"
        >
          {description}
        </TSpan>
      </ModalBody>
      <Spacer height={16} />
      <ModalFooter gap={16} flexDirection="column" marginTop={12}>
        <Button
          primary
          intent={confirmIntent}
          size="full"
          loading={Boolean(loading)}
          onClick={onConfirm}
          data-testid="confirm-button"
        >
          {yesButton}
        </Button>
        <Button
          tertiary
          intent="negative"
          size="full"
          disabled={Boolean(loading)}
          onClick={onClose}
          data-testid="cancel-button"
        >
          {noButton}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
