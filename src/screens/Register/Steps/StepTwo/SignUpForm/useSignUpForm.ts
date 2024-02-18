import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { t } from 'i18next';
import { omit } from 'lodash';
import {
  NAME_REGEX,
  TWO_LETTERED_NAME_REGEX,
  REFFERAL_CODE_REGEX,
} from '@/constants/regex';
import { type SignUpValues } from '@/screens/Register/types';
import { handleBackendError } from '@/screens/Register/helpers';
import { IdentityServices } from '@/services/rest/identity';
import Errors from '@/constants/errors';
import { type SignUpFormSchema } from './types';

interface IUseSignUpForm {
  userInfo: SignUpValues | undefined;
  onSetStep: Dispatch<SetStateAction<number>>;
  onChangeUserInfo: (data: SignUpValues) => void;
  hasRefCode: boolean;
}

export const useSignUpForm = ({
  userInfo,
  onSetStep,
  onChangeUserInfo,
  hasRefCode,
}: IUseSignUpForm) => {
  const [loading, setLoading] = useState<boolean>(false);

  const formSchema = useMemo(() => {
    const schema: SignUpFormSchema = {
      firstName: yup
        .string()
        .trim()
        .required(t(`noumena.input.not_empty`))
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
        .required(t(`noumena.input.not_empty`))
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
    };
    if (hasRefCode) {
      schema.referralCode = yup
        .string()
        .trim()
        .required(t(`noumena.input.not_empty`))
        .max(5, t(`noumena.signup.referral_code.max_error`))
        .min(4, t(`noumena.signup.referral_code.min_error`))
        .matches(
          REFFERAL_CODE_REGEX,
          t(`noumena.signup.referral_code.incorrect`),
        );
    }
    return yup.object({ ...schema }).required();
  }, [hasRefCode]);

  const {
    control,
    setError,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpValues>({
    resolver: yupResolver(formSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: {
      firstName: userInfo?.firstName,
      lastName: userInfo?.lastName,
      referralCode: userInfo?.referralCode,
    },
  });

  useEffect(() => {
    if (hasRefCode) {
      setValue('referralCode', userInfo?.referralCode);
      trigger('referralCode');
    } else {
      setValue('referralCode', '');
      trigger('referralCode');
    }
  }, [hasRefCode, setValue, trigger, userInfo?.referralCode]);

  const onSubmit: SubmitHandler<SignUpValues> = useCallback(
    async (data) => {
      setLoading(true);
      if (data.referralCode) {
        const resp = await IdentityServices.serviceValidateReferralCode(
          data.referralCode,
        );
        if (
          !resp.errorMessage &&
          resp?.isValid &&
          resp?.countExceed === false
        ) {
          onChangeUserInfo({ ...userInfo, ...data });
          setLoading(false);
          onSetStep(3);
          return;
        }

        if (resp.errorStatus === 102) {
          throw new Error(Errors.BLOCKED_IP);
        }

        setError(
          'referralCode',
          {
            type: 'focus',
            message: handleBackendError(resp),
          },
          { shouldFocus: true },
        );
        setLoading(false);
        throw new Error(handleBackendError(resp));
      } else {
        onChangeUserInfo({ ...userInfo, ...omit(data, ['referralCode']) });
        setLoading(false);
        onSetStep(3);
      }
    },
    [setError, onSetStep, onChangeUserInfo, userInfo],
  );

  return {
    control,
    errors,
    isValid,
    loading,
    onSubmit: handleSubmit(onSubmit),
  };
};
