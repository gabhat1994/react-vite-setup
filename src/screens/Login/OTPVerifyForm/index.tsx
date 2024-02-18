import { type FC, useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { IdentityServices } from '@/services/rest/identity';
import { Spacer } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { OtpInput } from '@/components/Otp/OtpInput';
import { Icon } from '@/components/Icon';
import { getDisplayPhoneNumber } from '@/utils/phonenumber';

import { handleBackendError } from '@/screens/Register/helpers';
import { useCountDownTimer } from '@/hooks/countDownTimer';
import errors from '@/constants/errors';
import { type LoginData, type OTPVerifyData, type VerifyResp } from '../types';
import { type OTPVerifyProps } from './types';
import { FullWidthStack, StyledSpacer } from './styles';

const OTPVerifyForm: FC<OTPVerifyProps> = ({
  loginData,
  loading,
  isResendLoading,
  errorMsg,
  backStep,
  beforeSubmit,
  onVerifyFailed,
  onVerifySuccess,
  remainingRequests,
  timeLeftForNextResend = 0,
}) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState<string>();
  const [seconds] = useCountDownTimer(timeLeftForNextResend);

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

  const onVerify = useCallback(async () => {
    if (!otp || !loginData || disabledSubmit(otp, loginData, isResendLoading))
      return;
    beforeSubmit();

    const data: OTPVerifyData = { ...loginData, otp };

    const verifyFunc =
      data.type === 'phone'
        ? IdentityServices.signInPhoneVerification
        : IdentityServices.signInEmailVerification;

    const resp: VerifyResp = await verifyFunc(
      data.type === 'phone' ? data.value.replace(/\+/g, '') : data.value,
      data.otp,
    );

    if (resp?.errorMessage) {
      onVerifyFailed(
        resp.errorStatus === 102
          ? errors.BLOCKED_IP
          : handleBackendError(resp) || resp.errorMessage,
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
  ]);

  const handleBack = useCallback(() => {
    setOtp(undefined);
    backStep();
  }, [backStep, setOtp]);

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

  const disableBackBtn =
    loading || isResendLoading || (remainingRequests === 3 && seconds !== 0);

  return (
    <>
      <TSpan font="body-l-bold" colorToken="--text-body-neutral-default" $fill>
        {t('noumena.login_in.heading')}
      </TSpan>
      <Spacer height={16} />
      <TSpan
        font="heading-m-bold"
        colorToken="--text-body-header-neutral-default"
        $fill
      >
        {t('noumena.verification.text')}{' '}
        {loginData?.type === 'email' && t('noumena.otp_verify_form.email.text')}
        {loginData?.type === 'phone' && t('noumena.otp_verify_form.phone.text')}
      </TSpan>
      <Spacer height={16} />
      <div>
        <TSpan font="body-l" $fill colorToken="--text-body-neutral-default">
          {t('noumena.enter_otp_code.text')}
        </TSpan>
        <div />
        <TSpan font="body-l" $fill colorToken="--text-body-neutral-highlighted">
          {' '}
          {loginData?.type === 'email' && loginData?.value}
          {loginData?.type === 'phone' &&
            getDisplayPhoneNumber(`+${loginData?.value}`)}
        </TSpan>
      </div>
      <StyledSpacer />
      <OtpInput
        value={otp}
        onChange={(val) => setOtp(val)}
        isDisabled={isResendLoading}
        onEnter={onEnter}
      />
      <StyledSpacer />
      <FullWidthStack>
        <Button
          data-testid="otp-back-button"
          icon={
            <Icon
              color={
                disableBackBtn
                  ? '--icon-button-neutral-disabled'
                  : '--icon-button-neutral-default'
              }
              name="arrow_left_m"
              size={24}
            />
          }
          style={{ minWidth: '102px' }}
          disabled={disableBackBtn}
          onClick={handleBack}
        >
          {t('noumena.back.text')}
        </Button>
        <Spacer width={25} />
        <Button
          id={
            loginData?.type === 'phone'
              ? 'verify-phone-signin-next-btn'
              : 'verify-email-signin-next-btn'
          }
          data-testid="otp-submit-button"
          primary
          size="full"
          disabled={disabledSubmit(otp?.trim(), loginData) || loading}
          loading={loading}
          onClick={onVerify}
        >
          {t('noumena.next.text')}
        </Button>
      </FullWidthStack>
      <StyledSpacer />
    </>
  );
};
export default OTPVerifyForm;
