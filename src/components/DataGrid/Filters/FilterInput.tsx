import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  useFormContext,
} from 'react-hook-form';

type FilterInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'control'>;

export function FilterInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FilterInputProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>();

  return <Controller {...props} control={control} />;
}
