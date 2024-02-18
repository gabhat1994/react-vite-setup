import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { useInitialSignUp } from '@/features/onboarding/hooks';
import RenderResendOTPMessage from './RenderResendOTPMessage';
import { type ResendOTPInfoProps } from './types';

const ResendOTPInfo = ({ handleResendOtp }: ResendOTPInfoProps) => {
  const { t } = useTranslation();
  const { nextRequestAfter, isResendOTPDisabled, timedOut } =
    useInitialSignUp();
  return isResendOTPDisabled ? (
    <TSpan font="body-m" colorToken="--text-body-neutral-default">
      <RenderResendOTPMessage
        handleTimedOut={timedOut}
        duration={nextRequestAfter}
      />
    </TSpan>
  ) : (
    <Button
      primary
      textOnly
      size="small"
      onClick={handleResendOtp}
      data-testid="handleResendOtpID"
      style={{ borderRadius: 0 }}
    >
      <TSpan colorToken="--text-button-brand-secondary-default">
        {t('noumena.register.otp.resend_code')}
      </TSpan>
    </Button>
  );
};

export default ResendOTPInfo;
