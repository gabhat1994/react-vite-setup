import { useEffect, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Spacer } from '@/layout';
import { type EventModalProps } from './types';

export const EventModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmButton,
  cancelButton,
  countDown,
  remainTime,
  isConfirmButtonPrimary,
  onCloseModal,
}: EventModalProps) => {
  const [remainSecond, setRemainSecond] = useState(3);

  useEffect(() => {
    if (countDown) {
      setRemainSecond(Math.floor(remainTime! / 1000));
      if (Math.ceil(remainTime! / 1000) === 1) {
        onClose();
      }
    }
  }, [onClose, countDown, remainTime]);

  return (
    <Modal
      open={isOpen}
      size={ModalSize.S}
      onClose={onCloseModal}
      testId="default-event-modal"
      disableBackdropClick
    >
      <ModalHeader>{title}</ModalHeader>
      {countDown && <ModalHeader>{` ${remainSecond}...`}</ModalHeader>}
      <ModalBody style={{ alignItems: 'center' }}>
        <TSpan
          font="body-l"
          textAlign="center"
          colorToken="--text-modal-neutral-default"
          data-testid="event-confirmation-modal-description"
        >
          {description}
        </TSpan>
      </ModalBody>
      <Spacer height={16} />
      <ModalFooter
        isFullScreen={false}
        gap={16}
        flexDirection="column"
        marginTop={12}
      >
        {confirmButton && (
          <Button
            primary={isConfirmButtonPrimary}
            intent={isConfirmButtonPrimary ? undefined : 'negative'}
            size="full"
            onClick={onConfirm}
            data-testid="confirm-button"
          >
            {confirmButton}
          </Button>
        )}
        {cancelButton && (
          <Button
            tertiary
            intent="negative"
            size="full"
            onClick={onClose}
            data-testid="cancel-button"
          >
            {cancelButton}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};
