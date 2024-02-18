import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reach } from 'yup';
import { isNumber } from 'lodash';
import { Modal } from '@/components/ExtendedModal/Modal';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { type InvoiceLineItem } from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { TSpan } from '@/components/Typography';
import FormTextField from '../InvoiceItemForm/FormTextField';
import { invoiceFormSchema } from '../../hooks/useInvoiceForm';
import { type InvoiceItemFormValues } from '../InvoiceItemForm/types';

type EditModalProps = {
  isOpenModal: boolean;
  item?: InvoiceLineItem;
  onClose: () => void;
  onConfirm: (values: InvoiceItemFormValues) => void;
};
export const EditModal: React.FC<EditModalProps> = ({
  isOpenModal,
  item,
  onClose,
  onConfirm,
}) => {
  const { isMobile } = useBreakpoints();
  const { handleSubmit, control, watch, resetField } =
    useForm<InvoiceItemFormValues>({
      defaultValues: {
        id: item?.id,
        description: item?.description,
        unitPrice: item?.unitPrice,
        taxRate: item?.taxRate ?? 0,
        quantity: item?.quantity,
        currency: item?.currency,
        taxName: item?.taxLabel ?? undefined,
      },
      mode: 'all',
      resolver: yupResolver(reach(invoiceFormSchema, 'lineItems.0')),
    });

  const [isTaxExpanded, setIsTaxExpanded] = useState(() =>
    isNumber(item?.taxRate),
  );

  const onSubmit = () => {
    handleSubmit((data) => {
      onConfirm(data);
    })();
  };

  return (
    <Modal
      isFullScreen={isMobile}
      open={isOpenModal}
      testId="add_new_customer_modal"
      size={ModalSize.L}
      onClose={onClose}
      isScrollableContent
      disableBackdropClick
    >
      <ModalHeader
        action={
          <Button
            tertiary
            onClick={onClose}
            size="small"
            icon={<Icon name="arrow_left_m" size={24} />}
          />
        }
      >
        Edit Item
      </ModalHeader>
      <ModalBody hasScrollBar>
        <Stack gap={16} padding="8px 0 0" vertical fullWidth>
          <FormTextField
            control={control}
            label="Description"
            name="description"
            inputSize="small"
            withValidation
          />

          <FormTextField
            control={control}
            label="Unit Price"
            name="unitPrice"
            numberOnly
            isCurrency
            hideLeftIconPlace
            inputSize="small"
            withValidation
          />

          {isTaxExpanded ? (
            <Stack fullWidth gap={8}>
              <Stack fullWidth>
                <FormTextField
                  label="Tax Name"
                  control={control}
                  inputSize="small"
                  name="taxName"
                  withValidation
                  helperText="Enter tax type (e.g. VAT)"
                />
              </Stack>

              <Stack gap={8}>
                <FormTextField
                  label="Tax"
                  control={control}
                  inputSize="small"
                  name="taxRate"
                  numberOnly
                  isCurrency
                  suffix="%"
                  disabled={!watch('taxName')}
                  withValidation
                />
                <Button
                  size="small"
                  intent="negative"
                  secondary
                  onClick={() => {
                    resetField('taxRate', {
                      defaultValue: null,
                      keepError: false,
                      keepDirty: false,
                    });
                    resetField('taxName', {
                      defaultValue: null,
                      keepError: false,
                      keepDirty: false,
                    });

                    setIsTaxExpanded(false);
                  }}
                  icon={<Icon name="delete_m" size={24} />}
                />
              </Stack>
            </Stack>
          ) : (
            <Button
              size="small"
              neutral
              onClick={() => setIsTaxExpanded(true)}
              leftIcon={
                <Icon
                  name="add_m"
                  size={24}
                  color="--text-button-brand-primary-default"
                />
              }
            >
              <TSpan
                font="button-m"
                colorToken="--text-button-brand-primary-default"
              >
                Add tax
              </TSpan>
            </Button>
          )}
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Stack fullWidth gap={16}>
          <Button
            primary
            size="full"
            testId="confirm_btn"
            tertiary
            grow
            loading={false}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button primary size="full" onClick={onSubmit}>
            Save Changes
          </Button>
        </Stack>
      </ModalFooter>
    </Modal>
  );
};
