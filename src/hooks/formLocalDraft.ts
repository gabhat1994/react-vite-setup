import { useState, useEffect, useCallback } from 'react';
import { type FieldValues, type UseFormReturn } from 'react-hook-form';

interface UseFormLocalDraftOptions<Values extends FieldValues> {
  form: UseFormReturn<Values>;
}

export function useFormLocalDraft<Values extends FieldValues>({
  form,
}: UseFormLocalDraftOptions<Values>) {
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  const markLocalChangesAsSaved = useCallback(() => {
    setLastSavedAt(new Date());
  }, []);

  const { reset } = form;

  useEffect(() => {
    if (lastSavedAt) {
      reset(undefined, { keepValues: true, keepDirty: false });
    }
  }, [lastSavedAt, reset]);

  return {
    lastSavedAt,
    markLocalChangesAsSaved,
  };
}
