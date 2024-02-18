import { useState } from 'react';
import { OtpInput } from '@/components/Otp/OtpInput';
import { Spacer, Stack } from '@/layout';
import { Button } from '@/components';
import {
  type OtpVerifyProps,
  type OtpScreenProps,
} from '@/screens/Login/ResetPassword/type';
import OTPResend from '@/screens/Login/ResetPassword/OTPResend';
import { t } from 'i18next';
import { Form } from './styles';

export const OtpVerifyForm = ({
  onConfirm,
  onCloseModal,
  ...rest
}: OtpScreenProps & OtpVerifyProps & { onCloseModal?: () => void }) => {
  const [otp, setOtp] = useState<string>();

  const onEnter = () => {
    if (otp?.trim().length === 4 && otp.indexOf(' ') < 0) {
      onConfirm(otp);
    }
  };
  return (
    <Form>
      <OtpInput
        value={otp}
        onChange={(val) => setOtp(val)}
        isDisabled={rest.loading}
        onEnter={onEnter}
      />

      <Spacer height={32} />
      <OTPResend {...rest} />
      <Spacer height={16} />
      <Stack gap={8}>
        <Button size="full" onClick={onCloseModal}>
          {t('noumena.cancel')}
        </Button>
        <Button
          primary
          disabled={
            !otp || otp?.trim()?.length !== 4 || rest.createPasswordLoading
          }
          loading={rest.createPasswordLoading}
          size="full"
          onClick={() => onConfirm(otp || '')}
        >
          {t('noumena.confirm')}
        </Button>
      </Stack>
    </Form>
  );
};
