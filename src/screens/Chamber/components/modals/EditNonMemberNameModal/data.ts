import * as yup from 'yup';
import { t } from 'i18next';
import { type Maybe, type UserOutput } from '@/apollo/generated/types';
import { NAME_REGEX, TWO_LETTERED_NAME_REGEX } from '@/constants/regex';
import { type UserFragment } from '@/apollo/graphql/fragments';

export const formValues = (user: Maybe<UserOutput | UserFragment>) => ({
  firstName: user?.firstName ?? '',
  lastName: user?.lastName ?? '',
});

export const userProfileInputSchema = yup
  .object({
    firstName: yup
      .string()
      .trim()
      .required(t('noumena.home_noum.about_me.error.name_required'))
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
      .matches(
        NAME_REGEX,
        t('noumena.home_noum.about_me.error.first_name_alpha_only'),
      ),
    lastName: yup
      .string()
      .trim()
      .required(t('noumena.home_noum.about_me.error.name_required'))
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
      .matches(
        NAME_REGEX,
        t('noumena.home_noum.about_me.error.last_name_alpha_only'),
      ),
  })
  .required();
