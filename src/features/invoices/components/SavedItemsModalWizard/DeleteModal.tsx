import React from 'react';
import { Modal } from '@/components/ExtendedModal/Modal';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';

import { ModalSize } from '@/components/ExtendedModal';

type DeleteModalProps = {
  isOpenModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpenModal,
  onClose,
  onConfirm,
}) => (
  <Modal
    open={isOpenModal}
    testId="saved_items_delete_modal"
    onClose={onClose}
    size={ModalSize.S}
    disableBackdropClick
  >
    <Stack gap={32} padding={14} vertical align="center" justify="center">
      <TSpan
        font="heading-s-bold"
        colorToken="--text-modal-header-neutral-default"
      >
        Delete Item
      </TSpan>
      <TSpan
        data-testid="confirm_text"
        font="body-l"
        textAlign="center"
        colorToken="--text-modal-neutral-default"
      >
        Are you sure you want to permanently delete this item?
        <br />
        <br />
        This cannot be undone.
      </TSpan>

      <Stack vertical fullWidth gap={16}>
        <Button
          primary
          size="full"
          testId="confirm_btn"
          intent="negative"
          grow
          onClick={onConfirm}
        >
          Delete Item
        </Button>
        <Button tertiary onClick={onClose} size="full" testId="cancel_btn">
          Cancel
        </Button>
      </Stack>
    </Stack>
  </Modal>
);
