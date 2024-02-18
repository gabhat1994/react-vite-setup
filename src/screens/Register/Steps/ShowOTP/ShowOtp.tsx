import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly, useWindowDimensions } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { OtpInput } from '@/components/Otp/OtpInput';
import { Spacer } from '@/layout';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';

import EVENTS from '@/constants/trackingEvents';
import ROUTES from '@/constants/routes';
import { sizes } from '@/constants/devices';
import { Chips } from '@/components/Chips/Chips';
import { trackEvent } from '@/utils/tracking';
import { useCountDownTimer } from '@/hooks/countDownTimer';
import { defaultResendRequests } from '@/providers/OnboardingProvider';
import { QuickSignUpScreenLayout } from '@/screens/QuickSignUp/QuickSignUpScreenLayout';
import { useInitialSignUp } from '@/features/onboarding/hooks';
import { OnboardingScreenLayout } from '../../OnboardingScreenLayout';
import { AppStyled, StyledStep } from '../../styles';
import ResendOTPInfo from './ResendOTPInfo';
import { Screen } from '../StepOne/styles';
import { FullWidthStack, OtpStyled } from './styles';
import { ShowOtpV2 } from './ShowOtpV2';

const tabletWidth = parseInt(sizes.TABLET, 10) || 768;

export const ShowOtp = () => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const { loading: loadingUser } = useAuth();
  const {
    loading,
    userInfo,
    submitOtp,
    signUpEmail,
    signUpUser,
    remainingRequests,
    nextRequestAfter,
    isSigningUpFromNextApp,
    backUrl,
    quickSignUpNoumId,
  } = useInitialSignUp();
  const [seconds] = useCountDownTimer(nextRequestAfter);
  const navigate = useNavigate();
  const abortController = useRef<AbortController>(new AbortController());
  const { flags } = useLaunchDarkly();

  const [otp, setOtp] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isMobile = useMemo(() => width < tabletWidth, [width]);

  const handleSubmitOtp = useCallback(async () => {
    abortController.current = new AbortController();
    if (!otp || otp.length !== 4 || isLoading || loadingUser) return;
    setIsLoading(true);
    const isOtpVerified = await submitOtp(otp, abortController.current.signal);
    if (isOtpVerified) {
      await signUpUser();
    } else {
      setOtp('');
    }
    setIsLoading(false);
  }, [otp, isLoading, loadingUser, submitOtp, signUpUser]);

  const handleBack = useCallback(() => {
    trackEvent(EVENTS.ONBOARDING.OTP.BACK);
    navigate(
      isSigningUpFromNextApp
        ? `${ROUTES.QUICK_SIGN_UP}?quickNoumID=${quickSignUpNoumId}&backurl=${backUrl}`
        : ROUTES.SIGN_UP,
      {
        replace: true,
      },
    );
  }, [backUrl, isSigningUpFromNextApp, navigate, quickSignUpNoumId]);

  useEffect(() => {
    window.onpopstate = (e) => {
      e.preventDefault();
      if (window.location.pathname.includes(ROUTES.SIGN_UP_OTP)) handleBack();
    };
  }, [handleBack]);

  const handleResendOtp = () => {
    abortController.current.abort();
    setOtp('');
    trackEvent(EVENTS.ONBOARDING.OTP.RESEND);
    signUpEmail(userInfo?.email || '');
  };

  useEffect(() => {
    if (!userInfo && !isSigningUpFromNextApp) navigate(ROUTES.SIGN_UP);
  }, [userInfo, navigate, isSigningUpFromNextApp]);

  useEffect(() => {
    if (!userInfo && isSigningUpFromNextApp)
      navigate(
        `${ROUTES.QUICK_SIGN_UP}?quickNoumID=${quickSignUpNoumId}&backurl=${backUrl}`,
      );
  }, [userInfo, navigate, isSigningUpFromNextApp, quickSignUpNoumId, backUrl]);

  const disableBackBtn =
    isLoading ||
    loadingUser ||
    (remainingRequests === defaultResendRequests && seconds !== 0);

  if (flags.newSignUp) {
    return (
      <ShowOtpV2
        otp={otp}
        email={userInfo?.email || ''}
        handleBack={handleBack}
        handleResendOtp={handleResendOtp}
        handleSubmitOtp={handleSubmitOtp}
        isLoading={isLoading}
        loading={loading}
        loadingUser={loadingUser}
        setOpt={(val) => setOtp(val)}
      />
    );
  }

  if (isSigningUpFromNextApp) {
    return (
      <QuickSignUpScreenLayout onBackClick={handleBack}>
        <AppStyled data-testid="SIGN_UP_OTP" className="App">
          <Screen vertical data-testid="otpContainer">
            <Spacer height={16} />
            <OtpStyled>
              <TSpan
                colorToken="--text-body-header-neutral-default"
                font="heading-m-bold"
                $fill
                style={{ whiteSpace: isMobile ? undefined : 'nowrap' }}
              >
                {t('noumena.register.otp.verify_email')}
              </TSpan>
              <Spacer height={16} />
              <div>
                <TSpan
                  font="body-l"
                  $fill
                  colorToken="--text-body-neutral-default"
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
                    values={{ email: userInfo?.email || '' }}
                  />
                </TSpan>
              </div>
              <Spacer height={32} />
              <OtpInput
                value={otp}
                onChange={(val) => setOtp(val)}
                onEnter={handleSubmitOtp}
              />
              <Spacer height={32} />
              <FullWidthStack>
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
                  {t('noumena.next.text')}
                </Button>
              </FullWidthStack>
              <Spacer height={35} />
              <FullWidthStack align="center" justify="center">
                <ResendOTPInfo handleResendOtp={handleResendOtp} />
              </FullWidthStack>
              <Spacer height={isMobile ? 24 : 32} />
              <FullWidthStack align="center" justify="center">
                <TSpan
                  font="body-s"
                  $fill
                  colorToken="--text-body-neutral-disabled"
                  textAlign="center"
                >
                  {t('noumena.register.otp.thanks')}
                </TSpan>
              </FullWidthStack>
            </OtpStyled>
          </Screen>
        </AppStyled>
      </QuickSignUpScreenLayout>
    );
  }

  return (
    <OnboardingScreenLayout>
      <AppStyled data-testid="SIGN_UP_OTP" className="App">
        <StyledStep>
          <Chips primary size="medium">
            {t('noumena.sign_up.stepper', { currentStep: 1, allSteps: 2 })}
          </Chips>
        </StyledStep>
        <Screen vertical data-testid="otpContainer">
          <Spacer height={16} />
          <OtpStyled>
            <TSpan
              colorToken="--text-body-header-neutral-default"
              font="heading-m-bold"
              $fill
            >
              {t('noumena.register.otp.verify_email')}
            </TSpan>
            <Spacer height={16} />
            <div>
              <TSpan
                font="body-l"
                $fill
                colorToken="--text-body-neutral-default"
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
                  values={{ email: userInfo?.email || '' }}
                />
              </TSpan>
            </div>
            <Spacer height={32} />
            <OtpInput
              value={otp}
              onChange={(val) => setOtp(val)}
              onEnter={handleSubmitOtp}
            />
            <Spacer height={32} />
            <FullWidthStack>
              <Button
                leftIcon={
                  <Icon
                    color={
                      disableBackBtn
                        ? '--icon-button-neutral-disabled'
                        : '--icon-button-neutral-default'
                    }
                    name="arrow_left_m"
                    size={16}
                  />
                }
                style={{ minWidth: '100px' }}
                onClick={handleBack}
                disabled={disableBackBtn}
              >
                {t('noumena.back.text')}
              </Button>
              <Spacer width={16} />
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
                {t('noumena.next.text')}
              </Button>
            </FullWidthStack>
            <Spacer height={35} />
            <FullWidthStack align="center" justify="center">
              <ResendOTPInfo handleResendOtp={handleResendOtp} />
            </FullWidthStack>
            <Spacer height={isMobile ? 24 : 32} />
            <FullWidthStack align="center" justify="center">
              <TSpan
                font="body-s"
                $fill
                colorToken="--text-body-neutral-disabled"
                textAlign="center"
              >
                {t('noumena.register.otp.thanks')}
              </TSpan>
            </FullWidthStack>
          </OtpStyled>
        </Screen>
      </AppStyled>
    </OnboardingScreenLayout>
  );
};
