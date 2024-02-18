import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';
import { Button } from '@/components/Button';
import { useAuth } from '@/features/auth/contexts';
import ROUTES from '@/constants/routes';
import { useLaunchDarkly } from '@/hooks';
import { PageStyled } from './styles';
import { AppStyled } from '../../styles';
import { OnboardingScreenLayout } from '../../OnboardingScreenLayout';
import { SignupPendingV2 } from './SignupPendingV2';

const SignupStepPending = () => {
  const { user, loading, currentUserLoading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { flags } = useLaunchDarkly();
  const onContinue = () => {
    if (user) navigate(ROUTES.HOME);
  };
  const userInfoLoading = loading || currentUserLoading;

  if (flags.newSignUp) {
    return (
      <SignupPendingV2
        name={user?.firstName || ''}
        loading={loading || !!currentUserLoading}
        onContinue={onContinue}
      />
    );
  }

  return (
    <OnboardingScreenLayout>
      <AppStyled data-testid="SIGN_UP" className="App">
        <PageStyled data-testid="stepPendingContainer">
          <Spacer height={138} />
          <Stack fullWidth>
            <TSpan
              colorToken="--text-body-header-neutral-default"
              font="heading-m-bold"
              $fill
            >
              {t(`noumena.sign_up.step_pending.title`)}, {user?.firstName}!
            </TSpan>
          </Stack>
          <Stack fullWidth>
            <TSpan font="body-l" $fill colorToken="--text-body-neutral-default">
              {t(`noumena.register.step_pending.description`)}
            </TSpan>
          </Stack>
          <Spacer height={8} />
          <Stack fullWidth>
            <Button
              data-testid="stepPendingButton"
              primary
              size="full"
              loading={userInfoLoading}
              disabled={userInfoLoading}
              onClick={onContinue}
            >
              {t(`noumena.continue_to_noumena`)}
            </Button>
          </Stack>
        </PageStyled>
      </AppStyled>
    </OnboardingScreenLayout>
  );
};

export default SignupStepPending;
