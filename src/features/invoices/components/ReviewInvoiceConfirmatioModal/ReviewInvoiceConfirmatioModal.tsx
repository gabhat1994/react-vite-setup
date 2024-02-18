import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Stack } from '@/layout';
import { type AllCurrencyEnum } from '@/apollo/generated/types';
import convertToCurrency from '@/utils/currencyToCurrency';

type ReviewInvoiceConfirmatioModalProps = {
  isOpenModal: boolean;
  amount: number;
  currency: AllCurrencyEnum;
  customerName: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
};

const ReviewInvoiceConfirmatioModal: React.FC<
  ReviewInvoiceConfirmatioModalProps
> = ({ isOpenModal, amount, currency, customerName, onConfirm, onCancel }) => {
  const [isLoading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <Modal
      isFullScreen={false}
      open={isOpenModal}
      testId="add_new_customer_modal"
      size={ModalSize.S}
      isScrollableContent={false}
    >
      <ModalHeader>Review Invoice</ModalHeader>
      <ModalBody gap={16} maxHeight={600}>
        <TSpan
          textAlign="center"
          font="body-l"
          colorToken="--text-modal-neutral-default"
        >
          Do you confirm the issuance of an invoice for{' '}
          <TSpan font="body-l-bold">
            {convertToCurrency(amount, currency, 2)}
          </TSpan>{' '}
          to <TSpan font="body-l-bold">{customerName}</TSpan>?
        </TSpan>
        <TSpan
          textAlign="center"
          font="body-l"
          colorToken="--text-modal-neutral-default"
        >
          Invoices can’t be edited after they’ve been paid.
        </TSpan>

        <Stack vertical gap={16} fullWidth>
          <Button
            size="full"
            primary
            onClick={handleConfirm}
            loading={isLoading}
          >
            Confirm & Send to Customer
          </Button>
          <Button size="full" tertiary onClick={onCancel}>
            Continue Editing
          </Button>
        </Stack>
      </ModalBody>
    </Modal>
  );
};

export default ReviewInvoiceConfirmatioModal;
