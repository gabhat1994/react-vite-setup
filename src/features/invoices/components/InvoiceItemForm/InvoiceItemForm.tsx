import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reach } from 'yup';
import { isNumber } from 'lodash';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { type WizardMode } from '@/hooks/fieldArrayWizard/useFieldArrayWizard';
import convertToCurrency from '@/utils/currencyToCurrency';
import { Icon } from '@/components/Icon';
import getCurrencySymbol from '@/utils/getCurrencySymbol';
import { type AllCurrencyEnum } from '@/apollo/generated/types';
import InvoiceItemFormModal from './InvoiceItemFormModal';
import { InvoiceUtils } from '../../utils/invoice';
import { type InvoiceItemFormValues } from './types';
import FormTextField from './FormTextField';
import { invoiceFormSchema } from '../../hooks/useInvoiceForm';
import FormSection from '../FormSection/FormSection';
import S from './styles';

type InvoiceItemFormProps = {
  values?: InvoiceItemFormValues;
  mode: WizardMode;
  currency?: AllCurrencyEnum;
  onSave({
    item,
    createAnother,
  }: {
    item: InvoiceItemFormValues;
    createAnother?: boolean;
  }): void;
  onCancel(): void;
  onDelete?(): void;
};

const InvoiceItemForm: React.FC<InvoiceItemFormProps> = ({
  onSave,
  onCancel,
  onDelete,
  values,
  currency,
  mode,
}) => {
  const [isTaxExpanded, setIsTaxExpanded] = useState(isNumber(values?.taxRate));
  const {
    watch,
    handleSubmit,
    formState: { isValid, errors },
    resetField,
    control,
  } = useForm<InvoiceItemFormValues>({
    defaultValues: values,
    mode: 'all',
    resolver: yupResolver(reach(invoiceFormSchema, 'lineItems.0')),
  });

  const { isMobile } = useBreakpoints();
  const hasError = Object.keys(errors).length > 0;

  const handleSave = (createAnother: boolean) => {
    handleSubmit((data) => {
      onSave({
        item: {
          ...data,
          taxName:
            data.taxName && isNumber(data.taxRate) ? data.taxName : undefined,
          taxRate:
            data.taxName && isNumber(data.taxRate) ? data.taxRate : undefined,
        },
        createAnother,
      });
    })();
  };

  const quantity = watch('quantity');
  const unitPrice = watch('unitPrice');
  const taxRate = watch('taxRate');
  const taxName = watch('taxName');

  const totalValue = InvoiceUtils.getItemTotalValue(
    quantity,
    unitPrice,
    taxRate,
  );

  return isMobile ? (
    <InvoiceItemFormModal
      totalValue={totalValue}
      control={control}
      isValid={isValid}
      onCancel={onCancel}
      onSave={handleSave}
      currency={currency}
    />
  ) : (
    <S.Container fullWidth hasError={hasError}>
      <FormSection
        title="Item details"
        font="body-l-bold"
        sectionSeparator={false}
        fullSize
        rightIcon={
          <TSpan font="body-l" color="--text-card-neutral-highlighted">
            {convertToCurrency(
              Number.isNaN(totalValue) ? 0 : totalValue,
              currency,
              2,
            )}
          </TSpan>
        }
      >
        <Stack fullWidth vertical gap={16} padding="12px 0 0">
          <Stack vertical padding="0 0 16px" fullWidth gap={12}>
            <Stack gap={12} fullWidth>
              <Stack vertical gap={12} fullWidth>
                <FormTextField
                  control={control}
                  name="description"
                  label="Description"
                />
              </Stack>

              <Stack gap={12} align="center">
                <FormTextField
                  control={control}
                  name="quantity"
                  numberOnly
                  integerOnly
                  label="Quantity"
                />

                <FormTextField
                  name="unitPrice"
                  label="Unit Price"
                  isCurrency
                  numberOnly
                  prefix={getCurrencySymbol(currency)}
                  control={control}
                />
              </Stack>
            </Stack>

            {isTaxExpanded ? (
              <Stack gap={12} fullWidth>
                <FormTextField
                  name="taxName"
                  label="Tax Name"
                  control={control}
                />
                <FormTextField
                  name="taxRate"
                  label="Tax Rate"
                  isCurrency
                  numberOnly
                  control={control}
                  suffix="%"
                  disabled={!taxName}
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

            {hasError && (
              <Stack padding="0 0 0 8px">
                <TSpan
                  font="footnote"
                  colorToken="--text-input-danger-primary-default"
                >
                  Please provide missing information.
                </TSpan>
              </Stack>
            )}
          </Stack>

          <Stack justify="flex-end" fullWidth gap={12}>
            <Button size="small" neutral onClick={onCancel}>
              Cancel
            </Button>
            {mode === 'edit' ? (
              <Button
                size="small"
                intent="negative"
                secondary
                onClick={onDelete}
              >
                Delete
              </Button>
            ) : (
              <Button
                softDisabled={!isValid}
                size="small"
                tertiary
                onClick={() => handleSave(true)}
              >
                Save & Add Another
              </Button>
            )}
            <Button
              softDisabled={!isValid}
              size="small"
              primary
              onClick={() => handleSave(false)}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </FormSection>
    </S.Container>
  );
};

export default InvoiceItemForm;
