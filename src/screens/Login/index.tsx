import { useCallback, useMemo, useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { t } from 'i18next';

import AuthScreenLayout from '@/layout/AuthScreenLayout';
import {
  useToast,
  useScreenDensity,
  useRecaptcha,
  useLaunchDarkly,
} from '@/hooks';
import { useAuth } from '@/features/auth/contexts';

import errors from '@/constants/errors';
import { setLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { useInitialSignUp } from '@/features/onboarding/hooks';
import { ROUTES } from '@/constants/routes';
import LoginForm from './LoginForm';
import OTPVerifyForm from './OTPVerifyForm';
import OTPResend from './OTPResend';

import { type LoginData, LoginStep, type VerifyResp } from './types';
import Screen from './styles';
import { LoginV2 } from './LoginV2';

type TLocationState = {
  fromPath: string;
};

const Login = () => {
  const [searchParams] = useSearchParams();
  const { recaptchaToken } = useRecaptcha();
  const { addToast } = useToast();
  const { density } = useScreenDensity();
  const { signIn } = useAuth();
  const { state: locationState } = useLocation() as { state: TLocationState };
  const {
    flags: { newSignUp },
  } = useLaunchDarkly();

  const {
    setIsSigningUpFromNextApp,
    setQuickSignUpNoumID,
    setIsLoggingingUpFromNextApp,
    setBackUrl,
    isLoggingingUpFromNextApp,
    backUrl,
  } = useInitialSignUp();

  useEffect(() => {
    const quickNoumID = searchParams.get('quickNoumID') ?? null;
    const backurl = searchParams.get('backurl') ?? '';
    if (quickNoumID && backurl) {
      setIsSigningUpFromNextApp(false);
      setIsLoggingingUpFromNextApp(true);
      setQuickSignUpNoumID(quickNoumID);
      setBackUrl(backurl);
    } else {
      setIsSigningUpFromNextApp(false);
      setIsLoggingingUpFromNextApp(false);
    }
  }, [
    searchParams,
    setIsLoggingingUpFromNextApp,
    setIsSigningUpFromNextApp,
    setQuickSignUpNoumID,
    setBackUrl,
  ]);

  const [step, setStep] = useState<LoginStep>(LoginStep.LOGIN);
  const [loginData, setLoginData] = useState<LoginData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [remainingRequests, setRemainingCount] = useState<number>(3);
  const [isResendLoading, setIsResendLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [timeLeftForNextResend, setTimeLeftForNextResend] = useState<number>(0);

  const utmParams: Record<string, string> = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((v, k) => {
      if (k.startsWith('utm_')) {
        params[k] = v;
      }
    });
    return params;
  }, [searchParams]);

  const loginLogoType = useMemo(
    () => (density >= 2 ? 'login2x' : 'login'),
    [density],
  );

  useEffect(
    () => () => {
      setLoading(false);
    },
    [],
  );

  useEffect(() => {
    if (locationState?.fromPath) {
      setLocalStorage(
        accessLocalStorage.GUEST_REDIRECT_TO_URI,
        locationState.fromPath === ROUTES.NOT_FOUND
          ? ROUTES.HOME
          : locationState.fromPath,
      );
    }
  }, [locationState?.fromPath]);

  const onBeforeLogin = useCallback((isResend = false) => {
    if (isResend) {
      setIsResendLoading(true);
    } else {
      setLoading(true);
    }
  }, []);

  const onLoginFailed = useCallback(
    (type: 'phone' | 'email', errStatus: number, errMessage: string) => {
      let errMsg = errMessage;
      if (errStatus === 404) {
        errMsg =
          type === 'phone'
            ? t('noumena.phone_login_form.phone_number.not_exist_error')
            : t('noumena.email_login_form.email_address.not_exist_error');
      } else if (errStatus === 102) {
        errMsg = errors.BLOCKED_IP;
      }

      addToast(
        'error',
        'none',
        type === 'email'
          ? errMsg
          : `${t('noumena.toast_error.text')}: ${errMsg}`,
      );
      setErrorMessage(errMsg);
      setLoading(false);
    },
    [addToast],
  );

  const onLoginSuccess = useCallback(
    (
      msg: string,
      nextRequestAfterInSecond: number,
      remainingRequest: number,
      data: LoginData,
      isResend?: boolean,
    ) => {
      addToast(
        'success',
        'none',
        t('noumena.verification_code_sent.text') || msg,
      );
      if (!remainingRequest) {
        setTimeLeftForNextResend(0);
        setRemainingCount(0);
      } else {
        setTimeLeftForNextResend(nextRequestAfterInSecond);
        setRemainingCount(remainingRequest);
      }
      if (isResend) {
        setIsResendLoading(false);
      } else {
        setLoading(false);
      }
      setLoginData(data);
      setStep(LoginStep.VERIFY);
    },
    [addToast],
  );

  const onBeforeVerify = useCallback(() => {
    setErrorMsg('');
    setLoading(true);
  }, []);

  const onVerifyFailed = useCallback(
    (msg: string) => {
      setErrorMsg(msg);
      addToast('error', 'none', `${msg}`, undefined, 400);
      setLoading(false);
    },
    [addToast],
  );
  const onVerifySuccess = useCallback(
    (resp: VerifyResp) => {
      signIn(
        {
          accessToken: resp.token.accessToken,
          refreshToken: resp.token.refreshToken,
        },
        utmParams,
      );
    },
    [signIn, utmParams],
  );

  const clearInput = useCallback(() => {
    setLoading(false);
    setErrorMessage('');
    setErrorMsg('');
  }, []);

  const handleBack = useCallback(() => {
    if (step === LoginStep.LOGIN) {
      window.location.href = `../noums/${backUrl}`;
    } else {
      setStep(LoginStep.LOGIN);
    }
  }, [backUrl, step]);

  if (newSignUp) {
    return <LoginV2 />;
  }

  return (
    <AuthScreenLayout
      type={loginLogoType}
      showBackButton={isLoggingingUpFromNextApp}
      onBackClick={handleBack}
    >
      {step === LoginStep.LOGIN ? (
        <LoginForm
          data-testid="testLoginForm"
          recaptchaToken={recaptchaToken}
          loading={loading}
          beforeSubmit={onBeforeLogin}
          onLoginFailed={onLoginFailed}
          onLoginSuccess={onLoginSuccess}
          errorMessage={errorMessage}
          clearInput={clearInput}
        />
      ) : (
        <Screen vertical>
          <OTPVerifyForm
            loginData={loginData}
            loading={loading}
            errorMsg={errorMsg}
            backStep={() => setStep(LoginStep.LOGIN)}
            beforeSubmit={onBeforeVerify}
            onVerifyFailed={onVerifyFailed}
            onVerifySuccess={onVerifySuccess}
            isResendLoading={isResendLoading}
            remainingRequests={remainingRequests}
            timeLeftForNextResend={timeLeftForNextResend}
          />
          <OTPResend
            loginData={loginData}
            remainingRequests={remainingRequests}
            timeLeftForNextResend={timeLeftForNextResend}
            beforeSubmit={onBeforeLogin}
            onLoginFailed={onLoginFailed}
            onLoginSuccess={onLoginSuccess}
            isResendLoading={isResendLoading}
          />
        </Screen>
      )}
    </AuthScreenLayout>
  );
};

export default Login;
