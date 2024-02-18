import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Spacer } from '@/layout';
import { TSpan } from '@/components/Typography';
import { useSocialHallContext } from '@/providers';
import { type EventCancelAttendeeModalProps } from './types';

export const EventCancelAttendeeModal = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
  title,
  description,
  confirmButton,
  cancelButton,
  isUnblocked,
}: EventCancelAttendeeModalProps) => {
  const { isPersonalSocialHall } = useSocialHallContext();
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size={ModalSize.S}
      testId="cancel-event-attendee-modal"
      disableBackdropClick
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <TSpan
          font="body-l"
          textAlign="center"
          colorToken="--text-modal-neutral-default"
        >
          {!isPersonalSocialHall && description}
        </TSpan>
      </ModalBody>
      <Spacer height={16} />
      <ModalFooter gap={16} flexDirection="column" marginTop={12}>
        <Button
          primary
          loading={loading}
          intent={isUnblocked ? undefined : 'negative'}
          size="full"
          onClick={onConfirm}
          data-testid="confirm-button"
        >
          {confirmButton}
        </Button>
        <Button
          tertiary
          intent="negative"
          size="full"
          onClick={onClose}
          data-testid="cancel-button"
        >
          {cancelButton}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
