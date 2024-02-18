import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, useForm, useFormContext } from 'react-hook-form';
import * as yup from 'yup';

export enum SelectedUserType {
  Existing = 'EXISTING',
  New = 'NEW',
}

// eslint-disable-next-line no-template-curly-in-string
const requiredMessage = '${label} cannot be empty.';

const noumContactFormSchema = yup.object({
  userId: yup.string().required(requiredMessage).ensure().label('User'),
  userType: yup
    .mixed<SelectedUserType>()
    .oneOf(Object.values(SelectedUserType))
    .required(),
  fullName: yup
    .string()
    .ensure()
    .required(requiredMessage)
    .trim()
    .label('Full Name'),
  contactName: yup
    .string()
    .required(requiredMessage)
    .trim()
    .ensure()
    .label('Contact Name'),
  email: yup
    .string()
    .email()
    .required(requiredMessage)
    .trim()
    .ensure()
    .label('Email Address'),
  title: yup.string().required(requiredMessage).trim().ensure().label('Title'),
  companyName: yup.string().ensure().trim().label('Company Name'),
  country: yup
    .string()
    .required(requiredMessage)
    .ensure()
    .trim()
    .label('Country'),
  city: yup.string().required(requiredMessage).ensure().trim().label('City'),
  street: yup
    .string()
    .required(requiredMessage)
    .ensure()
    .trim()
    .label('Street'),
  apartmentNo: yup.string().trim().ensure().label('Apartment No.'),
  state: yup.string().required(requiredMessage).ensure().trim().label('State'),
  zipCode: yup
    .string()
    .required(requiredMessage)
    .ensure()
    .trim()
    .label('Zip code'),
});

export type NoumContactFormValues = yup.InferType<typeof noumContactFormSchema>;

interface UseNoumContactFormOptions {
  defaultValues?: DefaultValues<NoumContactFormValues>;
}

export function useNoumContactForm({
  defaultValues,
}: UseNoumContactFormOptions = {}) {
  return useForm<NoumContactFormValues>({
    defaultValues,
    resolver: yupResolver(noumContactFormSchema),
    mode: 'onBlur',
  });
}

export function useNoumContactFormContext() {
  return useFormContext<NoumContactFormValues>();
}
