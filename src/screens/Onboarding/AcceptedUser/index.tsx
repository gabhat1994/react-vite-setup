import { useCallback, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Stack } from '@/layout';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly, useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import EVENTS from '@/constants/trackingEvents';
import { trackEvent } from '@/utils/tracking';
import { TSpan } from '@/components/Typography';
import { OnboardingScreenLayout } from '@/screens/Register/OnboardingScreenLayout';
import { Title, Description, ContinueButton } from './styles';
import AcceptedUserV2 from './AcceptedUserV2';

export const AcceptedUser = () => {
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { flags } = useLaunchDarkly();

  const handleContinue = useCallback(() => {
    trackEvent(EVENTS.ONBOARDING.MORE_VERIFICATION.CONTINUE_APPROVED_USER, {
      UUID: user?._id,
    });
    navigate('/');
  }, [navigate, user]);

  if (flags.newSignUp) {
    return <AcceptedUserV2 />;
  }
  return (
    <OnboardingScreenLayout>
      <Stack vertical align="start" gap={16} maxWidth={344}>
        <Title
          colorToken="--text-body-header-neutral-default"
          font={isMobile ? 'heading-s-bold' : 'heading-m-bold'}
        >
          {t('noumena.onboarding.account_is_activated_title')}
        </Title>
        <Description colorToken="--text-body-neutral-default" font="body-l">
          <Trans
            i18nKey="noumena.onboarding.account_is_activated_description_1"
            components={{
              b: (
                <TSpan
                  font="body-l-bold"
                  colorToken="--text-body-neutral-default"
                  $fill
                />
              ),
            }}
          />
        </Description>
        <Description colorToken="--text-body-neutral-default" font="body-l">
          {t('noumena.onboarding.account_is_activated_description_2')}
        </Description>
        <ContinueButton
          primary
          testId="continue_button"
          onClick={handleContinue}
        >
          {t('noumena.onboarding.account_is_activated_continue_button')}
        </ContinueButton>
      </Stack>
    </OnboardingScreenLayout>
  );
};
export default AcceptedUser;
