import * as yup from 'yup';
import { t } from 'i18next';
import {
  NAME_REGEX,
  SSN_REGEX,
  TWO_LETTERED_NAME_REGEX,
  NAME_REGEX_PAYMENTS,
} from '@/constants/regex';

const userDetailsInputSchema = yup
  .object({
    firstName: yup
      .string()
      .trim()
      .required(t(`noumena.input.not_empty`))
      .min(2, t('noumena.signup.first_name.too_short'))
      .max(20, t('noumena.signup.first_name.too_long'))
      .test(
        'Two letter name validation',
        t('noumena.signup.two_digit_first_name.incorrect'),
        (value) => {
          if (value && value.length <= 2) {
            return TWO_LETTERED_NAME_REGEX.test(value);
          }
          return true;
        },
      )
      .matches(NAME_REGEX, t(`noumena.signup.first_name.incorrect`))
      .matches(NAME_REGEX_PAYMENTS, t(`noumena.signup.first_name.incorrect`)),
    lastName: yup
      .string()
      .trim()
      .required(t(`noumena.input.not_empty`))
      .min(2, t('noumena.signup.last_name.too_short'))
      .max(20, t('noumena.signup.last_name.too_long'))
      .test(
        'Two letter name validation',
        t('noumena.signup.two_digit_last_name.incorrect'),
        (value) => {
          if (value && value.length <= 2) {
            return TWO_LETTERED_NAME_REGEX.test(value);
          }
          return true;
        },
      )
      .matches(NAME_REGEX, t(`noumena.signup.last_name.incorrect`))
      .matches(NAME_REGEX_PAYMENTS, t(`noumena.signup.first_name.incorrect`)),
    ssn: yup
      .string()
      .trim()
      .required(t(`noumena.input.not_empty`))
      .matches(SSN_REGEX, t(`noumena.signup.ssn.incorrect`)),
    dateOfBirth: yup.date().required(t(`noumena.input.not_empty`)),
  })
  .required();

export default userDetailsInputSchema;
