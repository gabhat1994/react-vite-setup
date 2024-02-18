import React from 'react';
import { Modal } from '@/components/ExtendedModal/Modal';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';

type DeleteLineItemModalProps = {
  isOpenModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
const DeleteLineItemModal: React.FC<DeleteLineItemModalProps> = ({
  isOpenModal,
  onClose,
  onConfirm,
}) => (
  <Modal
    isFullScreen={false}
    open={isOpenModal}
    testId="delete_line_item_modal"
    onClose={onClose}
    disableBackdropClick
  >
    <Stack
      gap={16}
      padding={14}
      vertical
      maxWidth={327}
      align="center"
      justify="center"
    >
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
        <br /> <br />
        This cannot be undone.
      </TSpan>

      <Stack vertical gap={16} fullWidth padding="12px 0 0">
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
          Close
        </Button>
      </Stack>
    </Stack>
  </Modal>
);

export default DeleteLineItemModal;
