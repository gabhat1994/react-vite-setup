import { Controller, useFormContext } from 'react-hook-form';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';

import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Spinner } from '@/components/Spinner';
import InvoiceStatusBadge from '../InvoiceStatusBadge/InvoiceStatusBadge';
import { type InvoiceFormValues } from '../../hooks/useInvoiceForm';
import S from './styles';
import { useInvoiceNumber } from './hooks/useInvoiceNumber';

type InvoiceNumberFieldProps = {
  disabled?: boolean;
};

const InvoiceNumberField: React.FC<InvoiceNumberFieldProps> = ({
  disabled,
}) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<InvoiceFormValues>();

  const { loading, resetInvoiceNumber, suggestedSequenceNumber } =
    useInvoiceNumber({ disabled });

  const { isTablet, isMobile } = useBreakpoints();
  const hasError = !!errors.invoiceNumber && !loading;
  const [currentNumber, status] = watch(['invoiceNumber', 'status']);

  return (
    <Stack
      gap={16}
      align="center"
      fullWidth
      padding={hasError ? '0 0 16px 0' : '0'}
    >
      <S.InvoiceNumberLabel font={isMobile ? 'body-l-bold' : 'body-xl-bold'}>
        Invoice No.
      </S.InvoiceNumberLabel>

      <Stack align="center" gap={4}>
        <Controller
          control={control}
          defaultValue=""
          name="invoiceNumber"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <S.TextFieldInput
              value={value}
              onChange={onChange}
              disabled={disabled}
              inputSize="small"
              error={hasError}
              helperText={hasError ? error?.message : ''}
              label={disabled && !value ? '—' : undefined}
              helperTextAbsolute
              maxLength={8}
              onlyAlphanumeric
              hideLengthHelperText
              rightIcon={
                loading ? (
                  <S.SpinnerContainer>
                    <Spinner />
                  </S.SpinnerContainer>
                ) : undefined
              }
            />
          )}
        />
        {!loading && !disabled && currentNumber !== suggestedSequenceNumber && (
          <Button
            size="small"
            icon={<Icon name="revert_m" size={24} />}
            neutral
            onClick={resetInvoiceNumber}
            tooltipText="Reset invoice number to auto-generated"
            tooltipPosition={isTablet ? 'bottom-left' : 'bottom-right'}
          />
        )}
      </Stack>
      <InvoiceStatusBadge status={status} />
    </Stack>
  );
};

export default InvoiceNumberField;
