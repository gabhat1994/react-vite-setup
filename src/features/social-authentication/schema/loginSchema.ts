import { isValidEmail } from '@/utils/email';
import { t } from 'i18next';
import * as yup from 'yup';

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required(t('noumena.input.complete_field'))
      .email(t('noumena.signup.error.incorrect_email'))
      .test(
        'validateEmail',
        t('noumena.signup.error.incorrect_email'),
        (value) => isValidEmail(value || ''),
      ),
    password: yup.string().required(t('noumena.input.complete_field')),
  })
  .required();
