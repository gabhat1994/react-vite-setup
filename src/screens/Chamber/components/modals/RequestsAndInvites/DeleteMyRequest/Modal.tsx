import React, { useCallback } from 'react';
import { t } from 'i18next';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalSize,
} from '@/components/ExtendedModal';
import { Spacer, Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { type DeleteMyRequestProps } from './types';

export const DeleteMyRequest: React.FC<DeleteMyRequestProps> = ({
  isDeleting,
  onClose,
  isOpen,
  onDelete,
  component,
  isInvite,
}) => {
  const handleDelete = useCallback(async () => {
    onClose();
    await onDelete();
    // success message
  }, [onDelete, onClose]);
  return (
    <Modal
      isFullScreen={false}
      open={isOpen ?? false}
      testId="delete_request"
      onClose={onClose}
      disableBackdropClick={isDeleting}
      disableEscapeKeyDown={isDeleting}
      size={ModalSize.S}
    >
      <ModalHeader isFullScreen={false}>
        {isInvite
          ? t('noumena.chambers.RequestsAndInvites.invitation.delete.title')
          : t('noumena.chambers.RequestsAndInvites.request.delete.title')}
      </ModalHeader>
      <ModalBody isFullScreen={false}>
        <TSpan
          data-testid="delete_confirm_text"
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign="center"
        >
          {isInvite
            ? t(
                'noumena.chambers.RequestsAndInvites.invitation.delete.description',
              )
            : t(
                'noumena.chambers.RequestsAndInvites.request.delete.description',
              )}
        </TSpan>
        <Spacer height={16} />
        {component && <Stack fullWidth>{component()}</Stack>}
      </ModalBody>
      <ModalFooter isFullScreen={false} flexDirection="column" gap={16}>
        <Button
          testId="request_delete_btn"
          disabled={false}
          loading={isDeleting}
          intent="negative"
          size="full"
          onClick={handleDelete}
        >
          {isInvite
            ? t('noumena.chambers.RequestsAndInvites.invitation.delete.confirm')
            : t('noumena.chambers.RequestsAndInvites.request.delete.confirm')}
        </Button>
        <Button
          tertiary
          onClick={onClose}
          size="full"
          testId="request_delete_cancel_btn"
        >
          {t('noumena.modal.no_keep_it')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteMyRequest;
