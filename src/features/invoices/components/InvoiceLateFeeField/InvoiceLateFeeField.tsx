import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@/components/TextField';
import { Stack } from '@/layout';

import { SelectField } from '@/components/SelectField';
import { getErrorProps, numberTransformer } from '@/utils/forms';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { InvoiceUtils } from '../../utils/invoice';
import { type InvoiceFormValues } from '../../hooks/useInvoiceForm';
import { LateFeeOption } from '../../types';

type InvoiceLateFeeFieldProps = {
  disabled?: boolean;
};

const InvoiceLateFeeField: React.FC<InvoiceLateFeeFieldProps> = ({
  disabled,
}) => {
  const { control, setValue, watch } = useFormContext<InvoiceFormValues>();
  const { isTablet } = useBreakpoints();

  return (
    <Stack gap={8} vertical={isTablet}>
      <Controller
        control={control}
        name="lateFeeType"
        render={({ field }) => (
          <SelectField
            inputSize="small"
            onChange={(option) => {
              field.onChange(option.value);

              setValue('lateFeeValue', undefined, {
                shouldValidate: option.value === LateFeeOption.NO_LATE_FEE,
              });
            }}
            value={field.value}
            disabled={disabled}
            options={InvoiceUtils.lateFeeOptions}
            usePortal
            renderContainerFromBottom
          />
        )}
      />

      {watch('lateFeeType') !== LateFeeOption.NO_LATE_FEE && (
        <Controller
          control={control}
          name="lateFeeValue"
          render={({ field, fieldState }) => (
            <TextField
              inputSize="small"
              label={
                watch('lateFeeType') === LateFeeOption.FIXED_AMOUNT
                  ? 'Fixed Fee'
                  : 'Late Fee in %'
              }
              numberOnly
              {...numberTransformer.fieldProps(field)}
              {...getErrorProps(fieldState)}
            />
          )}
        />
      )}
    </Stack>
  );
};

export default InvoiceLateFeeField;
