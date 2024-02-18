import { isEqual } from 'lodash';
import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { usePrevious } from './previous';

interface UseSubmitOnFormChangeProps<
  FieldValues extends Record<string, unknown>,
> {
  disabled?: boolean;
  form: UseFormReturn<FieldValues>;
  onSubmit: (values: FieldValues) => void;
}

export function useSubmitOnFormChange<
  FieldValues extends Record<string, unknown>,
>({
  form,
  onSubmit,
  disabled = false,
}: UseSubmitOnFormChangeProps<FieldValues>) {
  const allValues = form.watch();
  const prevAllValues = usePrevious(allValues);
  const haveValuesChanged =
    prevAllValues !== undefined && !isEqual(allValues, prevAllValues);

  useEffect(() => {
    if (!disabled && haveValuesChanged) {
      onSubmit(allValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [haveValuesChanged, onSubmit, disabled]);
}
