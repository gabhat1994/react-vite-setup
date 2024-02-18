import { useState } from 'react';
import { t } from 'i18next';
import { Chips } from '@/components/Chips/Chips';
import { type UserOutput } from '@/apollo/generated/types';
import { useLaunchDarkly } from '@/hooks';
import StepTwo from './Steps/StepTwo';
import StepThree from './Steps/StepThree';
import StepFour from './Steps/StepFour';
import { SignUpForm } from './Steps/StepOne';
import { AppStyled, StyledStep } from './styles';
import { type SignUpValues } from './types';
import { OnboardingScreenLayout } from './OnboardingScreenLayout';
import { SignUpFormV2 } from './Steps/StepOne/SignUpFormV2';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [userOutput, setUserOutput] = useState<UserOutput>();
  const {
    flags: { newSignUp },
  } = useLaunchDarkly();

  const [userInfo, setUserInfo] = useState<SignUpValues>({
    email: '',
    firstName: '',
    lastName: '',
    profile: {
      socialLinks: [],
    },
  });

  const getSignUpForm = () => {
    switch (step) {
      case 1:
        return <SignUpForm />;
      case 2:
        return (
          <StepTwo
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            setStep={setStep}
          />
        );
      case 3:
        return (
          <StepThree
            setStep={setStep}
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            setUserOutput={setUserOutput}
          />
        );
      case 4:
        return <StepFour userInfo={userInfo} userOutput={userOutput} />;
      default:
        return '';
    }
  };

  if (newSignUp) {
    return <SignUpFormV2 />;
  }

  return (
    <OnboardingScreenLayout>
      <AppStyled data-testid="SIGN_UP" className="App" fullWidth={newSignUp}>
        {step < 3 && !newSignUp && (
          <StyledStep>
            <Chips primary size="medium">
              {t('noumena.sign_up.stepper', { currentStep: step, allSteps: 2 })}
            </Chips>
          </StyledStep>
        )}
        {getSignUpForm()}
      </AppStyled>
    </OnboardingScreenLayout>
  );
};

export default SignUp;
