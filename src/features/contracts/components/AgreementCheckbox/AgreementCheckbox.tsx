import { type ReactNode } from 'react';
import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';
import { TickCheckbox } from '@/components/Checkbox';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

interface AgreementCheckboxProps<FormValues> {
  label: ReactNode;
  name: Path<FormValues>;
  disabled?: boolean;
}
export function AgreementCheckbox<FormValues extends FieldValues>({
  label,
  name,
  disabled,
}: AgreementCheckboxProps<FormValues>) {
  const { control } = useFormContext<FormValues>();

  return (
    <Stack gap={8}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState }) => (
          <TickCheckbox
            size={16}
            isChecked={value}
            onChange={onChange}
            hasError={!!fieldState.error}
            disabled={disabled}
          />
        )}
      />
      <TSpan font="footnote">{label}</TSpan>
    </Stack>
  );
}
