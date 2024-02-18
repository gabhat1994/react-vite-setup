import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { OtpInput } from '@/components/Otp/OtpInput';
import { useFormContext } from 'react-hook-form';
import { useBreakpoints } from '@/hooks';
import * as S from '../stylesv2';
import OTPResend from './OTPResend';
import {
  type EmailForm,
  type OtpScreenProps,
  type OtpVerifyProps,
} from './type';

export const OTPVerify = ({
  onConfirm,
  ...props
}: OtpScreenProps & OtpVerifyProps) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState<string>();
  const { getValues } = useFormContext<EmailForm>();
  const enteredEmail = getValues('email');
  const onEnter = () => {
    if (otp?.trim().length === 4 && otp.indexOf(' ') < 0) {
      onConfirm(otp);
    }
  };
  const { isMobile } = useBreakpoints();

  return (
    <S.Form>
      <Stack vertical gap={isMobile ? 24 : 32} align="center">
        <Stack vertical gap={16} align="center">
          <TSpan
            font="heading-m-bold"
            colorToken="--text-body-header-neutral-default"
          >
            {t('noumena.reset.password.otp.heading')}
          </TSpan>
          <TSpan
            font="body-l"
            colorToken="--text-body-neutral-default"
            textAlign="center"
          >
            <Trans
              i18nKey="noumena.reset.password.otp.sub.heading.two.v2"
              values={{ enteredEmail }}
              components={{
                b: <TSpan colorToken="--text-body-neutral-highlighted" />,
              }}
            />
          </TSpan>
        </Stack>
        <S.StyledStack gap={24} fullWidth>
          <OtpInput
            value={otp}
            onChange={(val) => setOtp(val)}
            isDisabled={props.loading}
            onEnter={onEnter}
          />
          <Button
            id="verify-email-signin-next-btn"
            data-testid="otp-submit-button"
            primary
            size="full"
            disabled={!otp || otp?.trim()?.length !== 4 || props.loading}
            onClick={() => onConfirm(otp || '')}
          >
            {t('noumena.confirm')}
          </Button>
          <OTPResend {...props} />
        </S.StyledStack>
        <S.FooterNote textAlign="center">
          {t('noumena.reset-password.secure')}
        </S.FooterNote>
      </Stack>
    </S.Form>
  );
};
