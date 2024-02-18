import React, { useCallback } from 'react';
import { type DeepPartial, FormProvider, useForm } from 'react-hook-form';
import { useSubmitOnFormChange } from '@/hooks/useSubmitOnFormChange';
import { useDataGrid } from '../DataGridContext';

interface FiltersProps<FiltersMap extends Record<string, unknown>> {
  children: React.ReactNode;
  defaultValues?: DeepPartial<FiltersMap>;
  onSubmit: (values: FiltersMap) => void;
  submitOnChange?: boolean;
  clearRowSelectionOnSubmit?: boolean;
}

export function Filters<FiltersMap extends Record<string, unknown>>({
  children,
  defaultValues,
  onSubmit,
  submitOnChange = true,
  clearRowSelectionOnSubmit = true,
}: FiltersProps<FiltersMap>) {
  const { rowSelection } = useDataGrid();
  const filtersForm = useForm<FiltersMap>({
    defaultValues,
  });

  const handleFormSubmit = useCallback(
    (data: FiltersMap) => {
      if (clearRowSelectionOnSubmit) {
        rowSelection.clear();
      }
      onSubmit(data);
    },
    [clearRowSelectionOnSubmit, onSubmit, rowSelection],
  );

  useSubmitOnFormChange({
    disabled: !submitOnChange,
    form: filtersForm,
    onSubmit: handleFormSubmit,
  });

  return <FormProvider {...filtersForm}>{children}</FormProvider>;
}
