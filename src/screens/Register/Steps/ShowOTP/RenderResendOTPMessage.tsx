import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import Timer from '@/components/Timer/Timer';
import * as Styles from '@/screens/Login/OTPResend/styles';
import { TSpan } from '@/components/Typography';
import { type ResendOTPMessageProps } from './types';

const minimumTimeToShowCountDown = 90;

const RenderResendOTPMessage: FC<ResendOTPMessageProps> = ({
  duration,
  handleTimedOut,
}) => {
  const { t } = useTranslation();

  if (duration !== 0 && duration <= minimumTimeToShowCountDown) {
    return (
      <>
        <Styles.StyledResendSpan>
          <TSpan font="body-m" $fill colorToken="--text-body-neutral-default">
            {t('noumena.resend_otp_code_sent.text')}{' '}
          </TSpan>
        </Styles.StyledResendSpan>
        <Styles.StyledResendWaitSpan duration={duration}>
          <TSpan font="body-m" $fill colorToken="--text-body-neutral-default">
            {t('noumena.resend_otp_please_wait.text')}{' '}
            {<Timer initialSeconds={duration} timedOut={handleTimedOut} />}{' '}
            {t('noumena.resend_otp_before_request.text')}
          </TSpan>
        </Styles.StyledResendWaitSpan>
      </>
    );
  }
  return (
    <TSpan font="body-m" $fill colorToken="--text-body-neutral-default">
      {t('noumena.resend_otp_please_wait_24h.text')}
    </TSpan>
  );
};

export default RenderResendOTPMessage;
