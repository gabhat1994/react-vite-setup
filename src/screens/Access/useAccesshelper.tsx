import { useCallback, useEffect, useState } from 'react';
import { t } from 'i18next';
import { useNavigate } from 'react-router';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { useRecaptcha, useToast } from '@/hooks';
import { IdentityServices } from '@/services/rest/identity';
import errors from '@/constants/errors';
import { setLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { type LoginData, type OTPVerifyData } from '../Login/types';

export const useAccessHelper = () => {
  const { addToast } = useToast();

  const { signIn, user, initialNoumId, loading: authLoading } = useAuth();

  const [loginData, setLoginData] = useState<LoginData>();
  const [otp, setOtp] = useState<string>();
  const [otpSent, setOtpSent] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [remainingRequests, setRemainingCount] = useState<number>(3);
  const [isResendLoading, setIsResendLoading] = useState<boolean>(false);
  const [timeLeftForNextResend, setTimeLeftForNextResend] = useState<number>(0);

  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const redirectUri = params.get('redirectUrl');

  const { recaptchaToken } = useRecaptcha();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const onLogin = useCallback(async () => {
    if (token) {
      const resp = await IdentityServices.ottValidate(token);
      if (!resp.errorMessage && resp.isValid) {
        setLoader(false);
        setLoginData({ type: 'email', value: resp.email });
      } else {
        navigate(ROUTES.ACCESS_DENIED);
      }
    }
  }, [navigate, token]);

  useEffect(() => {
    if (!token) {
      return;
    }
    if (!user?._id) {
      onLogin();
    } else {
      navigate(redirectUri ? `../${redirectUri}` : '../');
    }
  }, [onLogin, token, user?._id, navigate, redirectUri]);

  useEffect(() => {
    const uri = redirectUri || '';
    setLocalStorage(accessLocalStorage.GUEST_REDIRECT_TO_URI, uri);
  }, [redirectUri]);

  useEffect(() => {
    if (isSignedIn && !authLoading && user && !initialNoumId) {
      navigate(ROUTES.GUEST_HOME);
    }
  }, [user, initialNoumId, navigate, authLoading, isSignedIn, redirectUri]);

  useEffect(() => {
    const onOttValidate = async () => {
      if (!otpSent && recaptchaToken && loginData?.value) {
        const resp = await IdentityServices.signInEmail(
          loginData?.value,
          recaptchaToken,
        );
        if (resp) {
          setOtpSent(true);
        }
      }
    };
    if (loginData?.value && recaptchaToken) {
      onOttValidate();
    }
  }, [loginData?.value, otpSent, recaptchaToken]);

  const disabledSubmit = useCallback(
    (
      _otp: string | undefined,
      _loginData?: LoginData | undefined,
      _isResendLoading?: boolean | undefined,
    ) =>
      !_loginData ||
      !_loginData.value ||
      !_otp ||
      _otp.length !== 4 ||
      _isResendLoading,
    [],
  );

  const beforeSubmit = useCallback(() => {
    setErrorMsg('');
    setLoading(true);
  }, []);

  const onVerifyFailed = useCallback(
    (msg: string) => {
      setErrorMsg(msg);
      addToast(
        'error',
        'none',
        msg === errors.BLOCKED_IP
          ? msg
          : `${t('noumena.toast_error.text')}: ${msg}`,
      );
      setLoading(false);
    },
    [addToast],
  );

  const onVerifySuccess = useCallback(
    (resp) => {
      signIn({
        accessToken: resp.token.accessToken,
        refreshToken: resp.token.refreshToken,
        noumId: resp.noumId,
      });
      setIsSignedIn(true);
    },
    [signIn],
  );

  const onVerify = useCallback(async () => {
    if (!otp || !loginData || disabledSubmit(otp, loginData, isResendLoading))
      return;
    beforeSubmit();

    const data: OTPVerifyData = { ...loginData, otp };

    const verifyFunc = IdentityServices.signInEmailVerification;

    const resp = await verifyFunc(data.value, data.otp, token ?? '');

    if (resp?.errorMessage) {
      onVerifyFailed(
        resp.errorStatus === 102 ? errors.BLOCKED_IP : resp.errorMessage,
      );
      return;
    }
    onVerifySuccess(resp);
  }, [
    beforeSubmit,
    disabledSubmit,
    isResendLoading,
    loginData,
    onVerifyFailed,
    onVerifySuccess,
    otp,
    token,
  ]);

  const onEnter = () => {
    if (otp?.trim().length === 4 && otp.indexOf(' ') < 0) {
      onVerify();
    }
  };

  useEffect(() => {
    if (errorMsg !== '') {
      setOtp('');
    }
  }, [errorMsg]);

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
    },
    [addToast],
  );

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
        errMsg = t('noumena.email_login_form.email_address.not_exist_error');
      }

      addToast('error', 'none', `${t('noumena.toast_error.text')}: ${errMsg}`);
      setLoading(false);
    },
    [addToast],
  );

  return {
    otp,
    setOtp,
    loading,
    isResendLoading,
    loginData,
    remainingRequests,
    timeLeftForNextResend,
    onEnter,
    onLoginSuccess,
    onBeforeLogin,
    onLoginFailed,
    disabledSubmit,
    onVerify,
    loader,
    ottEmail: loginData?.value,
  };
};
