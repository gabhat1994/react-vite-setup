import { t } from 'i18next';
import * as yup from 'yup';

export const verifyFundingSourceFormSchema = yup
  .object({
    amount1: yup
      .number()
      .label('Amount 1')
      .transform((value, originalValue) =>
        originalValue === '' ? null : value,
      )
      .nullable()
      .required(t('noumena.input.complete_field'))
      .typeError(({ label }) => `${label} must be a number.`)
      .min(0.01)
      .max(0.09),
    amount2: yup
      .number()
      .label('Amount 2')
      .transform((value, originalValue) =>
        originalValue === '' ? null : value,
      )
      .nullable()
      .required(t('noumena.input.complete_field'))
      .typeError(({ label }) => `${label} must be a number.`)
      .min(0.01)
      .max(0.09),
  })
  .required();
