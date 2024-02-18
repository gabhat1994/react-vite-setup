import {
  createContext,
  type ReactNode,
  type FC,
  useMemo,
  type Dispatch,
  type SetStateAction,
  useState,
  useCallback,
} from 'react';
import { t } from 'i18next';
import { useAuth } from '@/features/auth/contexts';
import { useRecaptcha } from '@/hooks/recaptcha';
import { useSendOTP } from '@/hooks/useSendOTP';
import { useToast } from '@/hooks/toast';
import { type Maybe } from '@/apollo/generated/types';
import { type SignUpValues } from '@/screens/Register/Steps/StepOne/types';
import { IdentityServices } from '@/services/rest/identity';
import { setLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { handleBackendError } from '@/screens/Register/helpers';
import { type SignUpValues as RegisterValues } from '@/screens/Register/types';
import errors from '@/constants/errors';

export const defaultResendRequests = 3;

export const OnboardingContext = createContext<{
  loading: boolean;
  isResendOTPDisabled: boolean;
  recaptchaToken: Maybe<string>;
  userInfo: Maybe<SignUpValues> & Maybe<{ password?: string }>;
  nextRequestAfter: number;
  remainingRequests: number;
  setDisableResendOTP: Dispatch<SetStateAction<boolean>>;
  setUserInfo: Dispatch<SetStateAction<Maybe<SignUpValues>>>;
  signUpUser: () => Promise<void>;
  submitOtp: (otp: string, signal: AbortSignal) => Promise<boolean>;
  signUpEmail: (email: string) => Promise<boolean>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  timedOut: () => void;
  returnNewReCaptcha: () => Promise<string>;
  showBlockedErrorMsg: () => void;
  isSigningUpFromNextApp: boolean;
  setIsSigningUpFromNextApp: Dispatch<SetStateAction<boolean>>;
  quickSignUpNoumId: Maybe<string>;
  setQuickSignUpNoumID: Dispatch<SetStateAction<Maybe<string>>>;
  backUrl: Maybe<string>;
  setBackUrl: Dispatch<SetStateAction<Maybe<string>>>;
  isLoggingingUpFromNextApp: boolean;
  setIsLoggingingUpFromNextApp: Dispatch<SetStateAction<boolean>>;
}>({
  loading: true,
  isResendOTPDisabled: false,
  recaptchaToken: null,
  userInfo: null,
  nextRequestAfter: 0,
  remainingRequests: defaultResendRequests,
  setDisableResendOTP: () => {},
  setUserInfo: () => {},
  signUpUser: () => new Promise(() => {}),
  submitOtp: () => new Promise(() => {}),
  signUpEmail: () => new Promise(() => {}),
  setLoading: () => {},
  timedOut: () => {},
  returnNewReCaptcha: () => new Promise(() => {}),
  showBlockedErrorMsg: () => {},
  isSigningUpFromNextApp: false,
  setIsSigningUpFromNextApp: () => {},
  quickSignUpNoumId: null,
  setQuickSignUpNoumID: () => {},
  backUrl: null,
  setBackUrl: () => {},
  isLoggingingUpFromNextApp: false,
  setIsLoggingingUpFromNextApp: () => {},
});

export const OnboardingProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { addToast } = useToast();
  const { submitOtpByTypedValue } = useSendOTP();
  const { recaptchaToken, returnNewReCaptcha } = useRecaptcha();
  const { signUp } = useAuth();

  const [userInfo, setUserInfo] = useState<Maybe<SignUpValues>>(null);
  const [isResendOTPDisabled, setDisableResendOTP] = useState<boolean>(false);
  const [nextRequestAfter, setNextRequestAfter] = useState<number>(0);
  const [quickSignUpNoumId, setQuickSignUpNoumID] =
    useState<Maybe<string>>(null);
  const [backUrl, setBackUrl] = useState<Maybe<string>>(null);
  const [remainingRequests, setRemainingCount] = useState<number>(
    defaultResendRequests,
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [isSigningUpFromNextApp, setIsSigningUpFromNextApp] =
    useState<boolean>(false);
  const [isLoggingingUpFromNextApp, setIsLoggingingUpFromNextApp] =
    useState<boolean>(false);

  const signUpUser = useCallback(async () => {
    if (!userInfo) return;
    setLoading(true);
    const response = isSigningUpFromNextApp
      ? await IdentityServices.serviceNonNoumenaSignup({
          lastName: userInfo.lastName,
          firstName: userInfo.firstName,
          email: userInfo.email,
          noumId: quickSignUpNoumId!,
        })
      : await IdentityServices.serviceSignup(userInfo as RegisterValues);
    if (response && !response.errorMessage) {
      setLocalStorage(
        accessLocalStorage.ACCESS_TOKEN,
        response.token.accessToken,
      );
      setLocalStorage(
        accessLocalStorage.REFRESH_TOKEN,
        response.token.refreshToken,
      );

      if (response.user) {
        signUp();
      }
      setUserInfo({
        email: '',
        firstName: '',
        lastName: '',
        dob: '',
        phone: undefined,
        referralCode: undefined,
      });
    } else {
      addToast(
        'error',
        'none',
        response.errorStatus === 102
          ? errors.BLOCKED_IP
          : handleBackendError(response) || '',
      );
    }
  }, [userInfo, isSigningUpFromNextApp, quickSignUpNoumId, signUp, addToast]);

  const submitOtp = useCallback(
    async (otp: string, signal: AbortSignal) => {
      if (!userInfo?.email) return false;
      setLoading(true);
      const response = await submitOtpByTypedValue(
        otp,
        userInfo.email,
        userInfo.phone || '',
        signal,
      );

      const result = !!(response && !response.errorMessage);
      if (!result) {
        addToast(
          'error',
          'none',
          response.errorStatus === 102
            ? errors.BLOCKED_IP
            : handleBackendError(response) || '',
          undefined,
          400,
        );
      }
      setLoading(false);
      return result;
    },
    [userInfo, addToast, submitOtpByTypedValue, setLoading],
  );

  const signUpEmail = useCallback(
    async (email: string): Promise<boolean> => {
      if (!email) {
        throw new Error('Email required');
      }
      setLoading(true);
      const token = await returnNewReCaptcha();
      const response = await IdentityServices.signUpEmail(email, token, false);

      const isSuccess = !!(response && !response.errorMessage);

      if (isSuccess) {
        requestAfter(
          response.nextRequestAfterInSecond,
          response.remainingRequest,
        );
        addToast('success', 'none', t('noumena.verification_code_sent.text'));
      } else {
        const errorMsg =
          response.errorStatus === 102
            ? errors.BLOCKED_IP
            : `${t('noumena.toast_error.text')}: ${handleBackendError(
                response,
              )}`;
        addToast('error', 'none', errorMsg);
      }
      setLoading(false);

      return isSuccess;
    },
    [returnNewReCaptcha, addToast, setLoading],
  );

  const requestAfter = (
    nextRequestAfterInSecond: number,
    remainingRequest: number,
  ) => {
    setDisableResendOTP(
      nextRequestAfterInSecond > 0 ||
        remainingRequest !== defaultResendRequests,
    );
    setNextRequestAfter(nextRequestAfterInSecond);
    setRemainingCount(remainingRequest);
  };

  const timedOut = useCallback(() => {
    setDisableResendOTP(false);
    setNextRequestAfter(0);
  }, [setDisableResendOTP, setNextRequestAfter]);

  const showBlockedErrorMsg = useCallback(() => {
    addToast('error', 'none', errors.BLOCKED_IP);
  }, [addToast]);

  const payload = useMemo(
    () => ({
      userInfo,
      isResendOTPDisabled,
      loading,
      nextRequestAfter,
      remainingRequests,
      recaptchaToken: recaptchaToken as Maybe<string>,
      setDisableResendOTP,
      setUserInfo,
      signUpUser,
      submitOtp,
      signUpEmail,
      setLoading,
      timedOut,
      returnNewReCaptcha,
      showBlockedErrorMsg,
      isSigningUpFromNextApp,
      setIsSigningUpFromNextApp,
      quickSignUpNoumId,
      setQuickSignUpNoumID,
      backUrl,
      setBackUrl,
      isLoggingingUpFromNextApp,
      setIsLoggingingUpFromNextApp,
    }),
    [
      userInfo,
      isResendOTPDisabled,
      loading,
      nextRequestAfter,
      remainingRequests,
      recaptchaToken,
      setDisableResendOTP,
      setUserInfo,
      signUpUser,
      submitOtp,
      signUpEmail,
      setLoading,
      timedOut,
      returnNewReCaptcha,
      showBlockedErrorMsg,
      isSigningUpFromNextApp,
      setIsSigningUpFromNextApp,
      quickSignUpNoumId,
      setQuickSignUpNoumID,
      backUrl,
      setBackUrl,
      isLoggingingUpFromNextApp,
      setIsLoggingingUpFromNextApp,
    ],
  );

  return (
    <OnboardingContext.Provider value={payload}>
      {children}
    </OnboardingContext.Provider>
  );
};
