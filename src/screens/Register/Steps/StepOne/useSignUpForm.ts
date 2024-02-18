import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { type ObjectShape } from 'yup/lib/object';
import { useForm } from 'react-hook-form';
import { t } from 'i18next';

import {
  NAME_REGEX,
  REFFERAL_CODE_REGEX,
  TWO_LETTERED_NAME_REGEX,
} from '@/constants/regex';
import { isValidPhoneNumber } from '@/utils/phonenumber';
import { isValidEmail } from '@/utils/email';
import { type Maybe } from '@/apollo/generated/types';
import { type SignUpValues } from './types';

interface IUseSignUpForm {
  userInfo: Maybe<SignUpValues>;
  onChangeUserInfo: (data: SignUpValues) => void;
}

export const useSignUpForm = ({ userInfo }: IUseSignUpForm) => {
  const schemaObj: ObjectShape = {
    email: yup
      .string()
      .trim()
      .email(t('noumena.signup.error.incorrect_email'))
      .required(t('noumena.input.complete_field'))
      .test(
        'validateEmail',
        t('noumena.signup.error.incorrect_email'),
        (value) => isValidEmail(value || ''),
      ),
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
    phone: yup
      .string()
      .trim()
      .when('phone', (value) =>
        value?.length
          ? yup
              .string()
              .required()
              .test(
                'validatePhone',
                t('noumena.signup.error.incorrect_phone_number'),
                (phone) => {
                  if (!phone || phone.includes('-')) return false;
                  return isValidPhoneNumber(`+${phone}`);
                },
              )
          : yup.string().notRequired(),
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
  const signUpFormSchema = yup
    .object()
    .shape(schemaObj, [
      ['referralCode', 'referralCode'],
      ['phone', 'phone'],
    ])
    .required();

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    setValue,
    trigger,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<SignUpValues>({
    resolver: yupResolver(signUpFormSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: userInfo?.email,
      firstName: userInfo?.firstName,
      lastName: userInfo?.lastName,
      dob: userInfo?.dob,
      phone: userInfo?.phone,
      referralCode: userInfo?.referralCode,
    },
  });

  useEffect(() => {
    if (userInfo?.referralCode) {
      setValue('referralCode', userInfo?.referralCode);
      trigger('referralCode');
    } else {
      setValue('referralCode', '');
      trigger('referralCode');
    }
  }, [setValue, trigger, userInfo?.referralCode]);

  return {
    control,
    errors,
    isValid,
    getValues,
    handleSubmit,
    reset,
    setError,
    clearErrors,
  };
};
