import React from 'react';
import { Modal } from '@/components/ExtendedModal/Modal';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import convertToCurrency from '@/utils/currencyToCurrency';
import { type AllCurrencyEnum } from '@/apollo/generated/types';

type DeleteDraftModalProps = {
  isOpenModal: boolean;
  amount: number;
  currency: AllCurrencyEnum;
  customerName: string;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
const UpdateInvoiceModal: React.FC<DeleteDraftModalProps> = ({
  isOpenModal,
  amount,
  currency,
  customerName,
  loading,
  onClose,
  onConfirm,
}) => (
  <Modal
    isFullScreen={false}
    open={isOpenModal}
    testId="update_invoice_modal"
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
        Update Invoice
      </TSpan>
      <TSpan
        data-testid="confirm_text"
        font="body-l"
        textAlign="center"
        colorToken="--text-modal-neutral-default"
      >
        Do you want to update the invoice for{' '}
        {convertToCurrency(amount, currency)} to {customerName}?
      </TSpan>

      <Stack vertical gap={16} fullWidth padding="12px 0 0">
        <Button
          primary
          size="full"
          testId="confirm_btn"
          grow
          onClick={onConfirm}
          loading={loading}
        >
          Update Invoice
        </Button>
        <Button tertiary onClick={onClose} size="full" testId="cancel_btn">
          Continue Editing
        </Button>
      </Stack>
    </Stack>
  </Modal>
);

export default UpdateInvoiceModal;
