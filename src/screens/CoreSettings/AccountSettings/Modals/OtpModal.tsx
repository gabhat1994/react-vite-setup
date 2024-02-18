import { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { OtpInput } from '@/components/Otp/OtpInput';
import { Spacer } from '@/layout';
import { TSpan } from '@/components/Typography';
import {
  useOtpVerificationMutation,
  useGenerateOtpForVerificationMutation,
} from '@/apollo/graphql';
import { type Maybe, type OtpResponseOutput } from '@/apollo/generated/types';
import { type OtpModalProps, TypeEnum } from '../types';
import { StyledButton, FourDigitOtp, StyledTSpan } from '../styles';

export const OtpModal = ({
  cancelCallback,
  errorMsg,
  onVerifyFailed,
  onVerifySuccess,
  phoneOrEmail,
  onEmailOrPhoneOtpFailed,
  onEmailOrPhoneOtpSuccess,
  type,
}: OtpModalProps) => {
  const { t } = useTranslation();

  const [otp, setOtp] = useState('');

  const [otpVerificationMutation] = useOtpVerificationMutation({
    variables: {
      otp: otp ? parseInt(otp, 10) : null,
      phone: type === TypeEnum.phone ? phoneOrEmail : null,
      email: type === TypeEnum.email ? phoneOrEmail : null,
    },
  });

  const [generateOtpForVerificationMutation] =
    useGenerateOtpForVerificationMutation({
      variables: {
        phone: type === TypeEnum.phone ? phoneOrEmail : null,
        email: type === TypeEnum.email ? phoneOrEmail : null,
      },
    });

  const onVerify = useCallback(async () => {
    await otpVerificationMutation().then((response) => {
      const data = response.data ? response.data.OTPVerification : {};
      const message = data?.message ? data?.message : '';
      if (data?.error) {
        onVerifyFailed(message);
        return;
      }
      onVerifySuccess(type === 'phone' ? message : t('noumena.email.verified'));
    });
  }, [onVerifyFailed, onVerifySuccess, otpVerificationMutation, t, type]);

  useEffect(() => {
    if (errorMsg !== '') {
      setOtp('');
    }
  }, [errorMsg]);

  const handleClick = useCallback(async () => {
    await generateOtpForVerificationMutation().then((response) => {
      const data: Maybe<OtpResponseOutput | undefined> =
        response?.data?.generateOTPForVerification;
      if (data?.error) {
        onEmailOrPhoneOtpFailed(type, data);
        return;
      }
      onEmailOrPhoneOtpSuccess(type, data, phoneOrEmail);
    });
  }, [
    phoneOrEmail,
    type,
    generateOtpForVerificationMutation,
    onEmailOrPhoneOtpFailed,
    onEmailOrPhoneOtpSuccess,
  ]);

  const EmailHeader = () => {
    let text = phoneOrEmail;
    if (phoneOrEmail.length > 30) {
      const arr = phoneOrEmail.split('@');
      text = `${arr[0].substring(0, 30 - arr[1].length)}...@${arr[1]}`;
    }
    return (
      <StyledTSpan
        font="body-l"
        colorToken="--text-body-neutral-default"
        textAlign="center"
      >
        {t('noumena.reset.password.otp.sub.heading.one')}{' '}
        <TSpan colorToken="--text-body-neutral-highlighted">{text}</TSpan>{' '}
        {t('noumena.reset.password.otp.sub.heading.two')}
      </StyledTSpan>
    );
  };

  return (
    <Modal isFullScreen={false} open={true} size={ModalSize.M}>
      <ModalHeader isFullScreen={false} bottomPadding={16} topPadding={0}>
        {type === 'phone'
          ? t('noumena.sign_up.phone_verification')
          : t('noumena.reset.password.otp.heading')}
      </ModalHeader>
      <ModalBody isFullScreen={false}>
        {type === 'phone' ? (
          <FourDigitOtp>
            <TSpan font="body-l" colorToken="--text-body-neutral-default">
              {t('noumena.enter_otp_code.text')}
              <br />
            </TSpan>
            <TSpan font="body-l" colorToken="--text-body-neutral-highlighted">
              {type === 'phone' ? '+' : ''}
              {phoneOrEmail}
            </TSpan>
          </FourDigitOtp>
        ) : (
          <EmailHeader />
        )}
        <Spacer height={32} />
        <OtpInput value={otp} onChange={(val) => setOtp(val || '')} />
        <Spacer height={32} />
        <StyledButton>
          <Button
            secondary
            textOnly
            data-testid="resend-verify-button"
            onClick={handleClick}
          >
            {t('noumena.resend_verification_code.text')}
          </Button>
        </StyledButton>
        <Spacer height={8} />
      </ModalBody>
      <ModalFooter isFullScreen={false}>
        <Button
          tertiary
          size="full"
          onClick={cancelCallback}
          testId="secondaryBtn"
          textTestId="secondaryBtnLabel"
        >
          {t('noumena.cancel')}
        </Button>
        <Spacer width={20} />
        <Button
          size="full"
          testId="primaryBtn"
          textTestId="primaryBtnLabel"
          onClick={onVerify}
          primary
          disabled={!otp}
        >
          {t('noumena.confirm')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
