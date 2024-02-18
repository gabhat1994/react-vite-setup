import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import IdentityServices from '@/services/rest/identity';
import { useRecaptcha, useToast, useToggle } from '@/hooks';
import { useCallback, useState } from 'react';
import {
  usePasswordStrength,
  passwordSchema,
} from '@/features/social-authentication';
import ROUTES from '@/constants/routes';
import { emailFormSchema } from './schema';
import { type Steps, type EmailForm, type CreatePasswordForm } from './type';

export const useResetPassword = () => {
  const { generateOtpForResetPassword, resetPassword, verifyPasswordOtp } =
    IdentityServices;
  const recaptcha = useRecaptcha();
  const navigate = useNavigate();
  const toast = useToast();
  const [disableBackButton, setDisableBackButton] = useState(false);
  const [loading, toggleLoading] = useToggle(false);
  const [isFieldFocused, toggleIsFieldFocused] = useToggle(false);
  const [timeElapsed, toggleTimeElapsed] = useState(false);
  const [visible, toggleVisibility] = useToggle(false);
  const { analysis, analyzePassword } = usePasswordStrength();

  const [step, setStep] = useState<Steps>('enter-email');
  const [otp, setOtp] = useState('');
  const [request, setRequest] = useState({
    nextRequestAfter: '',
    nextRequestAfterInSecond: 0,
    remainingRequest: 3,
  });

  const emailForm = useForm<EmailForm>({
    mode: 'all',
    resolver: yupResolver(emailFormSchema),
  });

  const createPasswordForm = useForm<CreatePasswordForm>({
    mode: 'all',
    resolver: yupResolver(passwordSchema),
  });

  const { watch, setError } = createPasswordForm;

  const generateOtp = async (value: EmailForm) => {
    if (!recaptcha.recaptchaToken) return;
    toggleLoading();
    const token = await recaptcha.returnNewReCaptcha();
    toggleTimeElapsed(false);
    const response = await generateOtpForResetPassword(value.email, token);
    if (response.errorMessage) {
      toast.addErrorToast(response.errorMessage);
      toggleLoading();
      return;
    }

    if (response.remainingRequest === 0 && step !== 'otp-validation') {
      toast.addErrorToast('Otp limited exceeded');
      toggleLoading();
      return;
    }

    setRequest({
      remainingRequest: response.remainingRequest,
      nextRequestAfter: response.nextRequestAfter,
      nextRequestAfterInSecond: response.nextRequestAfterInSecond,
    });
    if (response.remainingRequest === 0) {
      setDisableBackButton(false);
    } else {
      setDisableBackButton(true);
    }
    toggleLoading();
    setStep('otp-validation');
  };

  const verifyOtpFunc = useCallback(
    async ($otp: string) => {
      toggleLoading();
      setOtp($otp);
      const email = emailForm.getValues('email');
      const token = await recaptcha.returnNewReCaptcha();
      const resp = await verifyPasswordOtp({ email, token, otp: $otp });
      if (resp?.errorMessage) {
        toast.addErrorToast(resp.errorMessage);
      } else {
        setStep('create-password');
        setDisableBackButton(false);
      }
      toggleLoading();
    },
    [emailForm, recaptcha, toast, toggleLoading, verifyPasswordOtp],
  );

  const resetPasswordFunc = async (value: CreatePasswordForm) => {
    toggleLoading();
    const email = emailForm.getValues('email');
    const { password } = value;
    const token = await recaptcha.returnNewReCaptcha();
    const res = await resetPassword({ email, password, otp, token });
    if (res?.errorMessage) {
      setError('password', {
        message: res.errorMessage,
      });
    } else {
      setStep('success');
    }
    toggleLoading();
  };

  const login = useCallback(() => {
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  const handleBack = useCallback(() => {
    switch (step) {
      case 'enter-email':
        navigate(ROUTES.LOGIN);
        break;
      case 'otp-validation':
        toggleTimeElapsed(true);
        setStep('enter-email');
        break;
      default:
        toggleTimeElapsed(true);
        setStep('enter-email');
    }
  }, [navigate, step, toggleTimeElapsed]);

  const showPasswordHelper = !!(watch('password')?.length && isFieldFocused);

  const showBackButton = step !== 'success';

  const onToggleTimer = () => {
    setDisableBackButton(false);
    toggleTimeElapsed(true);
  };

  return {
    formMethods: {
      emailForm,
      createPasswordForm,
    },

    handlers: {
      generateOtp,
      onToggleTimer,
      analyzePassword,
      toggleIsFieldFocused,
      toggleVisibility,
      resetPasswordFunc,
      login,
      handleBack,
      verifyOtpFunc,
    },

    password: {
      analysis,
      visible,
      showPasswordHelper,
    },

    request,
    loading,
    step,
    timeElapsed,
    showBackButton,
    disableBackButton,
  };
};
