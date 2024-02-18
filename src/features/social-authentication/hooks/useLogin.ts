import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useRecaptcha, useToast, useToggle } from '@/hooks';
import { IdentityServices } from '@/services/rest/identity';
import { yupResolver } from '@hookform/resolvers/yup';
import { LINKS } from '@/constants/links';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { type LogInForm } from '../types';
import { loginSchema } from '../schema/loginSchema';
import { useSocialAuth } from './useSocialAuth';

export const useLogin = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const recaptcha = useRecaptcha();
  const { signIn } = useAuth();
  const { initiateAuth } = useSocialAuth();

  const [loading, toggleLoading] = useToggle(false);
  const [visible, toggleVisibility] = useToggle(false);

  const { signInPassword } = IdentityServices;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LogInForm>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const termsOfUse = useCallback(() => {
    window.open(LINKS.TERMS_OF_USE, '_blank');
  }, []);

  const signup = useCallback(() => {
    navigate(ROUTES.SIGN_UP);
  }, [navigate]);

  const reset = useCallback(() => {
    navigate(ROUTES.RESET_PASSWORD);
  }, [navigate]);

  const login = async (values: LogInForm) => {
    if (!recaptcha.recaptchaToken) return;
    toggleLoading();
    const token = await recaptcha.returnNewReCaptcha();
    const response = await signInPassword(values.email, values.password, token);
    if (response?.errorMessage) {
      toast.addErrorToast(response.errorMessage);
      toggleLoading();
    } else {
      const { accessToken, refreshToken } = response.token;
      signIn({ accessToken, refreshToken });
    }
  };

  return {
    loading,
    formMethods: {
      control,
      errors,
      isValid,
    },
    password: {
      visible,
      toggleVisibility,
    },
    handlers: {
      termsOfUse,
      signup,
      initiateAuth,
      reset,
      login: handleSubmit(login),
    },
  };
};
