import { NAME_REGEX, TWO_LETTERED_NAME_REGEX } from '@/constants/regex';
import { passwordSchema } from '@/features/social-authentication';
import { isValidEmail } from '@/utils/email';
import { t } from 'i18next';
import * as yup from 'yup';

export const NonNMSignUpSchema = yup.object().shape({
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
        if (value && value.length <= 2) {
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
        if (value && value.length <= 2) {
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
  password: passwordSchema.fields.password,
});
