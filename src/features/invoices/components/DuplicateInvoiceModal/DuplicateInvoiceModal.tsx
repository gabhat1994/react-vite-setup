import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import React from 'react';

type DuplicateInvoiceModalProps = {
  onConfirm: () => void;
  onClose: () => void;
  isOpenModal: boolean;
};

const DuplicateInvoiceModal: React.FC<DuplicateInvoiceModalProps> = ({
  onConfirm,
  onClose,
  isOpenModal,
}) => {
  const { isMobile } = useBreakpoints();
  return (
    <Modal
      isFullScreen={isMobile}
      open={isOpenModal}
      testId="update_invoice_modal"
      size={ModalSize.S}
      onClose={onClose}
      disableBackdropClick
    >
      <ModalHeader>
        <TSpan
          font="heading-xs-bold"
          colorToken="--text-modal-header-neutral-default"
        >
          Duplicate Invoice
        </TSpan>
      </ModalHeader>
      <ModalBody>
        <Stack padding="0 0 16px">
          <TSpan
            font="body-l"
            colorToken="--text-modal-neutral-default"
            textAlign="center"
          >
            Are you sure you want to duplicate this invoice? Duplicating the
            invoice will create a new copy with the same details.
            <TSpan
              font="body-l-bold"
              colorToken="--text-modal-neutral-default"
              textAlign="center"
            >
              {' Please review the details before proceeding.'}
            </TSpan>
          </TSpan>
        </Stack>
      </ModalBody>
      <ModalFooter flexDirection="column" gap={16}>
        <Button primary onClick={onConfirm} size="full" testId="close_btn">
          Duplicate Invoice
        </Button>
        <Button tertiary onClick={onClose} size="full" testId="close_btn">
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DuplicateInvoiceModal;
