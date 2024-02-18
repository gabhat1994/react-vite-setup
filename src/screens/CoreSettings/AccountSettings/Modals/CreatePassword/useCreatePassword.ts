import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  usePasswordStrength,
  passwordSchema,
} from '@/features/social-authentication';
import { useError, useToast, useToggle } from '@/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/features/auth/contexts';
import {
  useGenerateOtpForPasswordCreationMutation,
  useValidateOtpForPasswordMutation,
} from '@/apollo/graphql';
import { t } from 'i18next';
import { type Screen, type EnterPasswordForm } from './CreatePasswordTypes';

type UseEditCreatePasswordProps = {
  onPasswordUpdate?: () => void;
};

export const useEditCreatePassword = ({
  onPasswordUpdate,
}: UseEditCreatePasswordProps) => {
  const { user, refetchUserData } = useAuth();
  const toast = useToast();
  const logger = useError();
  const { analysis, analyzePassword } = usePasswordStrength();
  const [screen, setScreen] = useState<Screen>('enter-password');
  const [visible, toggleVisibility] = useToggle(false);
  const [timeElapsed, setTimeElapsed] = useState(false);
  const [request, setRequest] = useState({
    nextRequestAfter: '',
    nextRequestAfterInSecond: 0,
    remainingRequest: 3,
  });

  const email = user?.email;

  const formMethods = useForm<EnterPasswordForm>({
    mode: 'all',
    resolver: yupResolver(passwordSchema),
  });

  const [generateOtp, { loading: generatingOtp }] =
    useGenerateOtpForPasswordCreationMutation({
      onError: (error) => {
        logger.logError(error, 'generate-otp-create-password', true);
      },

      onCompleted: ({ generateOTPForPasswordCreation }) => {
        const {
          success,
          message,
          remainingRequest,
          nextRequestAfter,
          nextRequestAfterInSecond,
        } = generateOTPForPasswordCreation || {};
        if (success && message) {
          toast.addSuccessIconToast(message);
          setRequest({
            remainingRequest: remainingRequest || 0,
            nextRequestAfter: nextRequestAfter || '',
            nextRequestAfterInSecond: nextRequestAfterInSecond || 0,
          });
          setScreen('otp-verification');
        }

        if (!success && message) {
          toast.addErrorToast(message);
        }
      },
    });

  const [initiateCreatePassword, { loading: creatingPassword }] =
    useValidateOtpForPasswordMutation({
      onCompleted: ({ validateResetPasswordOTP }) => {
        const { success, message } = validateResetPasswordOTP || {};

        if (!success && message) {
          toast.addErrorToast(message);
          return;
        }
        toast.addSuccessIconToast(
          message || t('noumena.password.create.successful'),
        );
        refetchUserData();
        onPasswordUpdate?.();
      },
      onError: (error) => logger.logError(error, 'create-password', true),
    });

  const createPassword = async (otp: string) => {
    if (!otp) return;
    const password = formMethods.getValues('password');
    initiateCreatePassword({
      variables: {
        otp,
        newPassword: password,
      },
    });
  };

  const handleGenerateOtp = () => {
    setTimeElapsed(false);
    generateOtp();
  };

  const onToggleTimer = () => setTimeElapsed(true);

  const showHelper = !!(formMethods.watch('password') || '').length;

  return {
    screen,
    timeElapsed,
    request,
    email,
    formMethods,

    loading: {
      generatingOtp,
      creatingPassword,
    },
    password: {
      analysis,
      visible,
      showHelper,
    },

    handlers: {
      analyzePassword,
      toggleVisibility,
      generateOtp: handleGenerateOtp,
      createPassword,
      toggleTimeElapsed: onToggleTimer,
    },
  };
};
