import React, { useCallback, useState } from 'react';
import { t } from 'i18next';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalSize,
  ModalBody,
} from '@/components/ExtendedModal';
import { useToast } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { type DeletePostProps } from './types';

export const DeletePost: React.FC<DeletePostProps> = ({
  postId,
  isDeleting,
  onClose,
  onDelete,
}) => {
  const { addToast } = useToast();
  const [isAwaiting, setIsAwaiting] = useState(false);
  const handleDelete = useCallback(async () => {
    setIsAwaiting(true);
    await onDelete();
    addToast(
      'success',
      'icon',
      t('noumena.chambers.element.posts.success.delete'),
    );
    onClose();
    setIsAwaiting(false);
  }, [addToast, onDelete, onClose]);
  return (
    <Modal
      open
      testId="delete_post"
      onClose={onClose}
      disableBackdropClick={isDeleting}
      disableEscapeKeyDown={isDeleting}
      size={ModalSize.S}
    >
      <ModalHeader>
        {t('noumena.chambers.element.posts.delete.title')}
      </ModalHeader>
      <ModalBody align="center">
        <TSpan
          data-testid="delete_confirm_text"
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign="center"
        >
          {t('noumena.element_wrapper.delete_confirmation.message')}
          <br />
          {t('noumena.chambers.element.posts.delete.confirm_text')}
        </TSpan>
      </ModalBody>
      <ModalFooter flexDirection="column" gap={16}>
        <Button
          testId="post_delete_btn"
          disabled={!postId}
          loading={isDeleting || isAwaiting}
          intent="negative"
          size="full"
          onClick={handleDelete}
          spinnerColor="var(--icon-card-placeholder-neutral-default)"
        >
          {t('noumena.container.element_delete')}
        </Button>
        <Button
          tertiary
          onClick={onClose}
          size="full"
          testId="post_delete_cancel_btn"
        >
          {t('noumena.container.element_delete.cancel')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeletePost;
