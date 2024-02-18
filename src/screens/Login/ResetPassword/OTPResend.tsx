import { useTranslation } from 'react-i18next';

import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import Timer from '@/components/Timer/Timer';
import { resendOtpMsgs } from '@/constants/resendOTP';
import { useFormContext } from 'react-hook-form';
import { Stack } from '@/layout';
import * as Styles from '../OTPResend/styles';
import { type EmailForm, type OtpScreenProps } from './type';

const OTPResend = ({
  loading,
  onTimeOut,
  onResend,
  onResendForLoggedInUser,
  timeElapsed,
  remainingRequest,
  nextRequestAfterInSecond = 0,
}: OtpScreenProps) => {
  const { t } = useTranslation();
  const { getValues } = useFormContext<EmailForm>();
  const email = getValues('email');

  const resendButton = ($loading: boolean) => (
    <Styles.StyledButton>
      <Button
        secondary
        loading={$loading}
        disabled={$loading}
        textOnly
        onClick={() => {
          onResend?.({ email });
          onResendForLoggedInUser?.();
        }}
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
      message = resendOtpMsgs.email ?? <></>;
    }
    if (!resendOtpMsgs[count]) return null;
    return (
      <div>
        <TSpan
          font="body-m"
          $fill
          colorToken="--text-body-neutral-default"
          data-testid="resend-caution-message"
          textAlign="center"
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
          {<Timer initialSeconds={timeLeft} timedOut={onTimeOut} />}{' '}
          {t('noumena.resend_otp_before_request.text')}
        </TSpan>
      </Styles.StyledResendWaitSpan>
    </>
  );

  const renderResendOTP = ($loading: boolean) => {
    if (remainingRequest !== 0 && !timeElapsed) {
      return <>{loadTimer(nextRequestAfterInSecond)}</>;
    }
    if (timeElapsed || remainingRequest === 0) {
      return (
        <Stack vertical gap={16} align="center">
          {loadMessage(remainingRequest)}
          {remainingRequest > 0 ? resendButton($loading) : <></>}
        </Stack>
      );
    }
    return <>{resendButton($loading)}</>;
  };

  return (
    <Styles.StyledResendOTPWrapper minHeight="auto">
      {renderResendOTP(loading)}
    </Styles.StyledResendOTPWrapper>
  );
};
export default OTPResend;
