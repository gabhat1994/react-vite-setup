import { useCallback, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRecaptcha, useToast, useToggle } from '@/hooks';
import { usePasswordStrength } from '@/features/social-authentication';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/features/auth/contexts';
import { IdentityServices } from '@/services/rest/identity';
import ROUTES from '@/constants/routes';
import { setLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';
import errors from '@/constants/errors';
import { LINKS } from '@/constants/links';
import { NonNMSignUpSchema } from './schema';
import { type NonNMSignUpForm, type Auth, type Screen } from './accessTypes';

export const useAccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const recaptcha = useRecaptcha();
  const toast = useToast();
  const { user, loading: authLoading, initialNoumId, signIn } = useAuth();
  const [visible, toggleVisibility] = useToggle(false);
  const [fieldFocus, toggleFieldFocus] = useToggle(false);
  const [loading, setLoading] = useState(false);
  const [validating, toggleValidating] = useToggle(true);
  const [isSignedIn, toggleIsSignedIn] = useToggle(false);
  const { analysis, analyzePassword } = usePasswordStrength();
  const [screen, setScreen] = useState<Screen>('signup');
  const [auth, setAuth] = useState<Auth>({
    accessToken: '',
    noumId: 0,
    refreshToken: '',
  });

  const { ottValidate, signUpNonNoumenaMember } = IdentityServices;
  const guestToken = searchParams.get('token');
  const redirectUri = searchParams.get('redirectUrl');

  const formMethods = useForm<NonNMSignUpForm>({
    mode: 'onChange',
    resolver: yupResolver(NonNMSignUpSchema),
  });

  const termsOfUse = useCallback(() => {
    window.open(LINKS.TERMS_OF_USE, '_blank');
  }, []);

  const handleOttValidate = useCallback(async () => {
    if (!guestToken) return;
    const resp = await ottValidate(guestToken);

    if (resp?.isVerified) {
      toggleValidating();
      setScreen('invalid-link');
      return;
    }

    if (!resp.errorMessage && resp.isValid) {
      formMethods.setValue('email', resp.email, { shouldValidate: true });
      toggleValidating();
      return;
    }
    navigate(ROUTES.ACCESS_DENIED);
  }, [formMethods, guestToken, navigate, ottValidate, toggleValidating]);

  const handleSignup = async (values: NonNMSignUpForm) => {
    if (!guestToken) return;
    const token = await recaptcha.returnNewReCaptcha();
    setLoading(true);
    const resp = await signUpNonNoumenaMember({ ...values, guestToken, token });

    if (resp?.errorMessage) {
      const errorMessage =
        resp.errorStatus === 102 ? errors.BLOCKED_IP : resp.errorMessage;
      toast.addErrorToast(errorMessage);
      return;
    }

    setAuth({
      accessToken: resp.token.accessToken,
      refreshToken: resp.token.refreshToken,
      noumId: resp.noumId,
    });
    setScreen('success');
    setLoading(false);
  };

  const login = () => {
    setLoading(true);
    signIn({ ...auth });
    toggleIsSignedIn();
  };

  const handleLoginNavigation = useCallback(() => {
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  useEffect(() => {
    if (!guestToken) return;

    if (!user?._id) {
      handleOttValidate();
    } else {
      navigate(redirectUri ? `../${redirectUri}` : '../');
    }
  }, [guestToken, handleOttValidate, navigate, redirectUri, user?._id]);

  useEffect(() => {
    const uri = redirectUri || '';
    setLocalStorage(accessLocalStorage.GUEST_REDIRECT_TO_URI, uri);
  }, [redirectUri]);

  useEffect(() => {
    if (isSignedIn && !authLoading && user && !initialNoumId) {
      navigate(ROUTES.GUEST_HOME);
    }
  }, [user, initialNoumId, navigate, authLoading, isSignedIn, redirectUri]);

  const showHelper = fieldFocus && !!formMethods.watch('password')?.length;

  return {
    formMethods,
    loading,
    validating,
    screen,

    password: {
      visible,
      analysis,
      showHelper,
    },

    handlers: {
      analyzePassword,
      toggleVisibility,
      toggleFieldFocus,
      handleSignup,
      termsOfUse,
      login,
      handleLoginNavigation,
    },
  };
};
