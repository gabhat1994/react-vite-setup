import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, useForm, useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import { type PickRequiredRestDeepPartial } from '@/utils/types';

export const contractFormSchema = yup.object({
  title: yup
    .string()
    .required('The title of the Contract cannot be empty.')
    .trim()
    .ensure()
    .label('Title'),
  noumId: yup.string().required().ensure().label('Noum Assignment'),
  buyerId: yup.string().required().label('Buyer'),
  serviceProviderId: yup.string().required().label('Service Provider'),
  buyerDetailsComplete: yup.boolean().is([true]),
  serviceProviderDetailsComplete: yup.boolean().is([true]),
  effectiveDate: yup.date().required().label('Effective Date'),
  terminationNotice: yup
    .string()
    .ensure()
    .optional()
    .label('Termination Notice')
    .typeError(({ label, type }) => `${label} must be a ${type}.`),
  governingLaw: yup
    .object({
      country: yup.string().required().label('Country'),
      region: yup.string().required().label('Region'),
    })
    .required()
    .label('Governing Law'),
  arbitration: yup
    .object({
      country: yup.string().required().label('Country'),
      region: yup.string().required().label('Region'),
    })
    .required()
    .label('Arbitration'),
  linkedStatementsOfWork: yup
    .array(
      yup
        .object({
          statementOfWorkId: yup.string().required().ensure(),
        })
        .required(),
    )
    .required(),
});

export type ContractFormValues = yup.InferType<typeof contractFormSchema>;
export type DraftContractFormValues = PickRequiredRestDeepPartial<
  ContractFormValues,
  'noumId'
>;

interface UseContractFormOptions {
  defaultValues?: DefaultValues<ContractFormValues>;
}

export function useContractForm({
  defaultValues,
}: UseContractFormOptions = {}) {
  return useForm<ContractFormValues>({
    defaultValues,
    resolver: yupResolver(contractFormSchema),
    mode: 'onSubmit',
  });
}

export function useContractFormContext() {
  return useFormContext<ContractFormValues>();
}
