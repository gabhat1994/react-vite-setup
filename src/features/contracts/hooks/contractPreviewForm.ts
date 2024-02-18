import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, useForm, useFormContext } from 'react-hook-form';
import * as yup from 'yup';

const contractPreviewFormSchema = yup.object({
  isAuthorized: yup.boolean().oneOf([true]),
  termsAndConditions: yup.boolean().oneOf([true]),
  eSign: yup.boolean().oneOf([true]),
});

type ContractPreviewFormValues = yup.InferType<
  typeof contractPreviewFormSchema
>;

interface UseContractPreviewFormOptions {
  defaultValues?: DefaultValues<ContractPreviewFormValues>;
  context?: { siema: string };
}

export function useContractPreviewForm({
  defaultValues,
}: UseContractPreviewFormOptions = {}) {
  return useForm<ContractPreviewFormValues>({
    defaultValues,
    resolver: yupResolver(contractPreviewFormSchema),
    mode: 'onSubmit',
  });
}

export function useContractPreviewFormContext() {
  return useFormContext<ContractPreviewFormValues>();
}
