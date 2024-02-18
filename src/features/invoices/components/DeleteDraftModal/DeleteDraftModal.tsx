import React from 'react';
import { Modal } from '@/components/ExtendedModal/Modal';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';

type DeleteDraftModalProps = {
  isOpenModal: boolean;
  isDraft?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
const DeleteDraftModal: React.FC<DeleteDraftModalProps> = ({
  isOpenModal,
  isDraft = true,
  onClose,
  onConfirm,
}) => (
  <Modal
    isFullScreen={false}
    open={isOpenModal}
    testId="delete_draft_modal"
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
        {isDraft ? 'Delete Draft Invoice' : 'Delete Invoice'}
      </TSpan>
      <TSpan
        data-testid="confirm_text"
        font="body-l"
        textAlign="center"
        colorToken="--text-modal-neutral-default"
      >
        {isDraft
          ? ' Are you sure you want to permanently delete this draft invoice?'
          : ' Are you sure you want to permanently delete this invoice?'}
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
          {isDraft ? 'Delete Draft' : 'Delete Invoice'}
        </Button>
        <Button tertiary onClick={onClose} size="full" testId="cancel_btn">
          Close
        </Button>
      </Stack>
    </Stack>
  </Modal>
);

export default DeleteDraftModal;
