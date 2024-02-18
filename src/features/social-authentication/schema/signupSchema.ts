import * as yup from 'yup';
import { t } from 'i18next';

import {
  NAME_REGEX,
  REFFERAL_CODE_REGEX,
  TWO_LETTERED_NAME_REGEX,
} from '@/constants/regex';
import { isValidEmail } from '@/utils/email';

import { passwordSchema } from './passwordSchema';

const schemaObject = {
  firstName: yup
    .string()
    .trim()
    .required(t(`noumena.input.complete_field`))
    .max(20, t(`noumena.signup.first_name.too_long`))
    .min(2, t(`noumena.signup.first_name.too_short`))
    .test(
      'Two letter name validation',
      t('noumena.signup.two_digit_first_name.incorrect'),
      (value) => {
        if (value && value.length) {
          return TWO_LETTERED_NAME_REGEX.test(value);
        }
        return true;
      },
    )
    .matches(NAME_REGEX, t(`noumena.signup.first_name.incorrect`)),
  lastName: yup
    .string()
    .trim()
    .required(t(`noumena.input.complete_field`))
    .max(20, t(`noumena.signup.last_name.too_long`))
    .min(2, t(`noumena.signup.last_name.too_short`))
    .test(
      'Two letter name validation',
      t('noumena.signup.two_digit_last_name.incorrect'),
      (value) => {
        if (value && value.length) {
          return TWO_LETTERED_NAME_REGEX.test(value);
        }
        return true;
      },
    )
    .matches(NAME_REGEX, t(`noumena.signup.last_name.incorrect`)),
  email: yup
    .string()
    .trim()
    .required(t('noumena.input.complete_field'))
    .email(t('noumena.signup.error.incorrect_email'))
    .test('validateEmail', t('noumena.signup.error.incorrect_email'), (value) =>
      isValidEmail(value || ''),
    ),
  referralCode: yup
    .string()
    .trim()
    .when('referralCode', (value) =>
      value?.length
        ? yup
            .string()
            .test(
              'validateReferralCode',
              t(`noumena.signup.referral_code.incorrect`),
              (code) => !!(code && code.trim().length === code.length),
            )
            .min(4, t(`noumena.signup.referral_code.min_error`))
            .max(5, t(`noumena.signup.referral_code.max_error`))
            .matches(
              REFFERAL_CODE_REGEX,
              t(`noumena.signup.referral_code.incorrect`),
            )
        : yup.string().notRequired(),
    ),
};
export const signupSchema = yup
  .object()
  .shape({ ...schemaObject, ...passwordSchema.fields }, [
    ['referralCode', 'referralCode'],
  ])
  .required();
