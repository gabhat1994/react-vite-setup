import { Trans } from 'react-i18next';
import NewAuthLayout from '@/layout/NewAuthLayout';
import { Main } from '@/layout/NewAuthLayout/childrenStyles';
import { Stack } from '@/layout';
import { Button, TSpan } from '@/components';
import { useBreakpoints } from '@/hooks';
import { OtpInput } from '@/components/Otp/OtpInput';
import { t } from 'i18next';
import { OtpWrapper, ActionButtonWrapper } from './stylesV2';
import ResendOTPInfo from './ResendOTPInfo';

type ShowOtpV2Props = {
  handleBack: () => void;
  email: string;
  otp?: string;
  setOpt: (val?: string) => void;
  handleSubmitOtp: () => Promise<void>;
  loading: boolean;
  isLoading: boolean;
  loadingUser: boolean;
  handleResendOtp: () => void;
};

export const ShowOtpV2 = ({
  handleBack,
  email,
  otp,
  setOpt,
  handleSubmitOtp,
  loading,
  isLoading,
  loadingUser,
  handleResendOtp,
}: ShowOtpV2Props) => {
  const { isMobile } = useBreakpoints();
  return (
    <NewAuthLayout showBackButton onBackClick={handleBack}>
      <Main justify={isMobile ? 'flex-start' : 'center'}>
        <Stack vertical gap={16} align="center">
          <TSpan
            colorToken="--text-body-header-neutral-default"
            font={isMobile ? 'heading-xs-bold' : 'heading-m-bold'}
            textAlign="center"
            style={{ whiteSpace: isMobile ? undefined : 'nowrap' }}
          >
            {t('noumena.register.otp.verify_email')}
          </TSpan>
          <TSpan
            font="body-l"
            $fill
            colorToken="--text-body-neutral-default"
            textAlign="center"
          >
            <Trans
              i18nKey="noumena.register.otp.check_your_email"
              components={{
                Text: (
                  <TSpan
                    font="body-l"
                    $fill
                    colorToken="--text-body-neutral-highlighted"
                  />
                ),
              }}
              values={{ email }}
            />
          </TSpan>
        </Stack>
        <OtpWrapper>
          <OtpInput value={otp} onChange={setOpt} onEnter={handleSubmitOtp} />
          <ActionButtonWrapper>
            <Button
              id="verify-email-signup-next-btn"
              primary
              size="full"
              onClick={handleSubmitOtp}
              disabled={
                isLoading || loadingUser || !otp || otp?.trim().length < 4
              }
              data-testid="submitOtp"
              loading={isLoading || loading || loadingUser}
            >
              {t('noumena.confirm_and_signup')}
            </Button>
            <Stack fullWidth align="center" justify="center">
              <ResendOTPInfo handleResendOtp={handleResendOtp} />
            </Stack>
          </ActionButtonWrapper>
        </OtpWrapper>
        <TSpan
          font="body-s"
          colorToken="--text-body-neutral-disabled"
          textAlign="center"
        >
          {t('noumena.register.otp.thanks')}
        </TSpan>
      </Main>
    </NewAuthLayout>
  );
};
