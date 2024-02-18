import { type FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IdentityServices } from '@/services/rest/identity';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import Timer from '@/components/Timer/Timer';
import { Spinner } from '@/components/Spinner';
import { resendOtpMsgs } from '@/constants/resendOTP';
import { useRecaptcha } from '@/hooks';
import { type OTPResendProps } from './types';
import * as Styles from './styles';

const OTPResend: FC<OTPResendProps> = ({
  loginData,
  minHeight,
  isResendLoading,
  remainingRequests,
  beforeSubmit,
  onLoginFailed,
  onLoginSuccess,
  timeLeftForNextResend = 0,
}) => {
  const { t } = useTranslation();
  const { recaptchaToken, returnNewReCaptcha } = useRecaptcha();
  const [timerElapsed, setIsTimedOut] = useState<boolean>(false);

  const onLogin = useCallback(async () => {
    if (!loginData) return;
    setIsTimedOut(false);

    if (!recaptchaToken) return;
    beforeSubmit(true);

    const token = await returnNewReCaptcha();
    const signInFunc =
      loginData.type === 'phone'
        ? IdentityServices.signInPhone
        : IdentityServices.signInEmail;
    const resp = await signInFunc(loginData.value, token);

    if (resp?.errorMessage) {
      onLoginFailed(loginData.type, resp.errorStatus, resp.errorMessage);
      return;
    }

    onLoginSuccess(
      resp.message,
      resp.nextRequestAfterInSecond,
      resp.remainingRequest,
      loginData,
      true,
    );
  }, [
    loginData,
    recaptchaToken,
    beforeSubmit,
    returnNewReCaptcha,
    onLoginSuccess,
    onLoginFailed,
  ]);

  const timedOut = () => {
    setIsTimedOut(true);
  };

  const resendButton = () => (
    <Styles.StyledButton>
      <Button
        secondary
        textOnly
        onClick={onLogin}
        data-testid="resend-verify-button"
      >
        <TSpan
          colorToken="--text-button-brand-secondary-default"
          font="button-m"
        >
          {t('noumena.resend_verification_code.text')}
        </TSpan>
      </Button>
    </Styles.StyledButton>
  );

  const loadMessage = (count: number) => {
    let message = '';
    if (count === 2) {
      message = resendOtpMsgs[loginData?.type ?? 0] ?? <></>;
    }
    return (
      <div>
        <TSpan
          font="body-m"
          $fill
          colorToken="--text-body-neutral-default"
          data-testid="resend-caution-message"
        >
          {t(message)} {t(resendOtpMsgs[count])}
        </TSpan>
      </div>
    );
  };

  const loadTimer = (timeLeft: number) => (
    <>
      <Styles.StyledResendSpan data-testid="code-sent-span">
        <TSpan font="body-m" $fill colorToken="--text-body-neutral-default">
          {t('noumena.resend_otp_code_sent.text')}{' '}
        </TSpan>
      </Styles.StyledResendSpan>
      <Styles.StyledResendWaitSpan
        duration={timeLeft}
        data-testid="resend-wait-span"
      >
        <TSpan font="body-m" $fill colorToken="--text-body-neutral-default">
          {t('noumena.resend_otp_please_wait.text')}{' '}
          {<Timer initialSeconds={timeLeft} timedOut={timedOut} />}{' '}
          {t('noumena.resend_otp_before_request.text')}
        </TSpan>
      </Styles.StyledResendWaitSpan>
    </>
  );

  const renderResendOTP = () => {
    if (remainingRequests !== 0 && !timerElapsed) {
      return <>{loadTimer(timeLeftForNextResend)}</>;
    }
    if (timerElapsed || remainingRequests === 0) {
      return (
        <>
          {loadMessage(remainingRequests)}
          <Styles.StyledSpacer />
          {remainingRequests > 0 ? resendButton() : <></>}
        </>
      );
    }
    return <>{resendButton()}</>;
  };

  return (
    <Styles.StyledResendOTPWrapper minHeight={minHeight}>
      {isResendLoading ? (
        <Styles.StyledSpinner>
          <Spinner />
        </Styles.StyledSpinner>
      ) : (
        renderResendOTP()
      )}
    </Styles.StyledResendOTPWrapper>
  );
};
export default OTPResend;
