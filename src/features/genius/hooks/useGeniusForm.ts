import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, useForm } from 'react-hook-form';

import * as yup from 'yup';

export const geniusFormSchema = yup.object({
  prompt: yup.string().required(),
});

export type GeniusFormValues = yup.InferType<typeof geniusFormSchema>;

interface UseInvoiceFormOptions {
  defaultValues?: DefaultValues<GeniusFormValues>;
}

export function useGeniusForm({ defaultValues }: UseInvoiceFormOptions = {}) {
  return useForm<GeniusFormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(geniusFormSchema),
  });
}
