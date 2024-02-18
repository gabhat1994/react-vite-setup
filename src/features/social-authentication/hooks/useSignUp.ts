import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useInitialSignUp } from '@/features/onboarding/hooks';
import { useToast, useToggle } from '@/hooks';
import EVENTS from '@/constants/trackingEvents';
import ROUTES from '@/constants/routes';
import { LINKS } from '@/constants/links';
import { trackEvent } from '@/utils/tracking';
import IdentityServices from '@/services/rest/identity';
import { handleBackendError } from '@/screens/Register/helpers';
import { type SignUpForm } from '../types';
import { signupSchema } from '../schema/signupSchema';
import { useSocialAuth } from './useSocialAuth';
import { usePasswordStrength } from './usePasswordStrength';

export const useSignup = () => {
  const navigate = useNavigate();
  const { addErrorToast } = useToast();
  const [searchParams] = useSearchParams();
  const initialSignup = useInitialSignUp();
  const { initiateAuth } = useSocialAuth();
  const { analysis, analyzePassword } = usePasswordStrength();

  const subscribe = useRef(true);
  const [loading, toggleLoading] = useToggle(false);
  const [referralValidating, setReferralValidating] = useState(false);
  const [referralOwner, setReferralOwner] = useState('');
  const [visible, toggleVisibility] = useToggle(false);
  const [focus, toggleFocus] = useToggle(false);
  const [validReferral, toggleValidReferral] = useToggle();

  const { serviceValidateReferralCode, validateContact } = IdentityServices;
  const referralCodeParam = searchParams.get('referral-code') || '';
  const referralCode = referralCodeParam.replace(/[^a-zA-Z0-9]/g, '');

  const utmParams: Record<string, string> = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((v, k) => {
      if (k.startsWith('utm_')) {
        params[k] = v;
      }
    });
    return params;
  }, [searchParams]);

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    setError,
    clearErrors,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    resolver: yupResolver(signupSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: initialSignup.userInfo?.email || '',
      firstName: initialSignup.userInfo?.firstName || '',
      lastName: initialSignup.userInfo?.lastName || '',
      referralCode: initialSignup.userInfo?.referralCode || '',
      password: '',
    },
  });

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    let event = '';
    switch (e.target.name) {
      case 'email':
        event = EVENTS.ONBOARDING.INITIAL_SIGNUP_SCREEN.EMAIL;
        break;
      case 'firstName':
        event = EVENTS.ONBOARDING.INITIAL_SIGNUP_SCREEN.FIRST_NAME;
        break;
      case 'lastName':
        event = EVENTS.ONBOARDING.INITIAL_SIGNUP_SCREEN.LAST_NAME;
        break;
      case 'password':
        event = EVENTS.ONBOARDING.INITIAL_SIGNUP_SCREEN.PASSWORD;
        break;
      default:
        break;
    }
    trackEvent(event);
  }, []);

  const login = useCallback(() => {
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  const termsOfUse = useCallback(() => {
    window.open(LINKS.TERMS_OF_USE, '_blank');
  }, []);

  const setFormError = useCallback(
    (name: keyof SignUpForm, error: unknown) => {
      setError(
        name,
        { type: 'focus', message: handleBackendError(error) },
        { shouldFocus: true },
      );
    },
    [setError],
  );

  const checkReferralCode = useCallback(
    async (code: string): Promise<'valid' | 'invalid'> => {
      const resp = await serviceValidateReferralCode(code);

      if (!resp?.errorMessage && resp?.isValid && !resp?.countExceed) {
        clearErrors('referralCode');
        const { firstName = '', lastName = '' } = resp;
        const name = `${firstName} ${lastName}`;
        setReferralOwner(name);
        return 'valid';
      }
      if (resp?.errorStatus === 102) {
        initialSignup.showBlockedErrorMsg();
      }
      const error = handleBackendError(resp);
      if (error) {
        addErrorToast(error);
      }
      return 'invalid';
    },
    [addErrorToast, clearErrors, initialSignup, serviceValidateReferralCode],
  );

  const checkEmail = useCallback(
    async (enteredEmail: string): Promise<'available' | 'not-available'> => {
      const resp = await validateContact('email', enteredEmail);

      if (resp && !resp?.errorMessage) {
        clearErrors('email');
        return 'available';
      }
      if (resp?.errorStatus === 102) {
        initialSignup.showBlockedErrorMsg();
      }
      setFormError('email', resp);
      return 'not-available';
    },
    [clearErrors, initialSignup, setFormError, validateContact],
  );

  const checkReferralCodeFromParams = useCallback(async () => {
    setReferralValidating(true);
    const codeStatus = await checkReferralCode(referralCode);
    if (codeStatus === 'valid') {
      toggleValidReferral();
      setValue('referralCode', referralCode);
    }
    setReferralValidating(false);
  }, [checkReferralCode, referralCode, setValue, toggleValidReferral]);

  const signup = useCallback(
    async (val: SignUpForm) => {
      toggleLoading();
      if (val.referralCode) {
        const codeStatus = await checkReferralCode(val.referralCode);
        if (codeStatus === 'invalid') {
          toggleLoading();
          return;
        }
      }
      const emailStatus = await checkEmail(val.email);
      if (emailStatus === 'not-available') {
        toggleLoading();
        return;
      }
      initialSignup.setUserInfo((previousInfo) => ({
        ...previousInfo,
        ...val,
      }));
      trackEvent(EVENTS.ONBOARDING.INITIAL_SIGNUP_SCREEN.SUBMIT, {
        Email: initialSignup.userInfo?.email,
        Phone: initialSignup.userInfo?.phone,
        FirstName: initialSignup.userInfo?.firstName,
        LastName: initialSignup.userInfo?.lastName,
        DateOfBirth: initialSignup.userInfo?.dob,
        ReferralCode: initialSignup.userInfo?.referralCode,
        ...utmParams,
      });
      const isSignUpSuccess = await initialSignup.signUpEmail(val.email);
      if (isSignUpSuccess) {
        if (initialSignup.isSigningUpFromNextApp) {
          navigate(ROUTES.SIGN_UP_OTP);
        } else {
          navigate(ROUTES.SIGN_UP_OTP, { replace: true });
        }
      }
      toggleLoading();
    },
    [
      checkEmail,
      checkReferralCode,
      initialSignup,
      navigate,
      toggleLoading,
      utmParams,
    ],
  );

  useEffect(() => {
    if (referralCode && subscribe.current) {
      checkReferralCodeFromParams();
    }
    return () => {
      subscribe.current = false;
    };
  }, [checkReferralCodeFromParams, referralCode]);

  const showHelper = !!(watch('password') || '').length && focus;

  return {
    loading,
    validReferral,
    recaptchaToken: initialSignup.recaptchaToken,
    referralValidating,
    referralCode,
    referralOwner,
    formMethods: {
      control,
      getValues,
      reset,
      setError,
      clearErrors,
      watch,
      errors,
      isValid,
    },

    password: {
      visible,
      focus,
      toggleVisibility,
      passwordCheck: analysis,
      showHelper,
    },

    handlers: {
      toggleFocus,
      analyze: analyzePassword,
      handleFocus,
      login,
      termsOfUse,
      initiateAuth,
      handleSubmit: handleSubmit(signup),
    },
  };
};
