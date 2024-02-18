import { t } from 'i18next';
import { Chips } from '@/components/Chips/Chips';
import { useLaunchDarkly } from '@/hooks';
import NewAuthLayout from '@/layout/NewAuthLayout';
import { AppStyled } from '../../styles';
import SignUpForm from './SignUpForm/index';
import Screen from './styles';
import { OnboardingScreenLayout } from '../../OnboardingScreenLayout';

const OnboardingQuestions = () => {
  const { flags } = useLaunchDarkly();

  if (flags.newSignUp) {
    return (
      <NewAuthLayout>
        <SignUpForm />
      </NewAuthLayout>
    );
  }

  return (
    <OnboardingScreenLayout>
      <AppStyled data-testid="SIGN_UP" className="App">
        <Chips style={{ borderRadius: 8, marginTop: 28 }}>
          {t(`noumena.register.onboarding_questions.step`)}
        </Chips>
        <Screen data-testid="onboardingQuestionsContainer">
          <SignUpForm />
        </Screen>
      </AppStyled>
    </OnboardingScreenLayout>
  );
};

export default OnboardingQuestions;
