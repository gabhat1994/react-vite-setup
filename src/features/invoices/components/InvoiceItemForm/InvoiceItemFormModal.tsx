import React from 'react';
import { type Control } from 'react-hook-form';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import convertToCurrency from '@/utils/currencyToCurrency';
import { type AllCurrencyEnum } from '@/apollo/generated/types';
import getCurrencySymbol from '@/utils/getCurrencySymbol';
import { type InvoiceItemFormValues } from './types';
import FormTextField from './FormTextField';

type InvoiceItemFormModalProps = {
  totalValue: number;
  isValid: boolean;
  control: Control<InvoiceItemFormValues, unknown>;
  currency?: AllCurrencyEnum;
  onSave(createAnother: boolean): void;
  onCancel(): void;
};

const InvoiceItemFormModal: React.FC<InvoiceItemFormModalProps> = ({
  onSave,
  onCancel,
  totalValue,
  control,
  isValid,
  currency,
}) => (
  <Modal open isFullScreen onClose={onCancel} disableBackdropClick>
    <ModalHeader isFullScreen>Add item</ModalHeader>
    <ModalBody isFullScreen>
      <TSpan font="body-m-bold" colorToken="--text-card-neutral-highlighted">
        Item Details
      </TSpan>
      <Stack gap={12} padding="16px 0" vertical fullWidth>
        <FormTextField
          control={control}
          name="description"
          label="Description"
        />

        <FormTextField control={control} name="quantity" label="Quantity" />

        <FormTextField
          name="unitPrice"
          label="Unit Price"
          isCurrency
          numberOnly
          control={control}
          prefix={getCurrencySymbol(currency)}
          hideLeftIconPlace
        />

        <FormTextField
          name="taxRate"
          label="Tax"
          numberOnly
          control={control}
          suffix="%"
          hideLeftIconPlace
        />
      </Stack>
      <Stack padding="16px 0 0">
        <TSpan font="body-l-bold">
          {convertToCurrency(totalValue, currency, 2)}
        </TSpan>
      </Stack>
    </ModalBody>
    <ModalFooter isFullScreen>
      <Stack gap={16} fullWidth>
        <Button
          softDisabled={!isValid}
          size="full"
          tertiary
          onClick={() => onSave(true)}
        >
          Save & Add Another
        </Button>
        <Button
          softDisabled={!isValid}
          size="full"
          primary
          onClick={() => onSave(false)}
        >
          Save
        </Button>
      </Stack>
    </ModalFooter>
  </Modal>
);

export default InvoiceItemFormModal;
