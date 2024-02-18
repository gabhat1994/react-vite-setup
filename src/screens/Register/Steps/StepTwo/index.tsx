import { type FC } from 'react';
import { SignUpForm } from './SignUpForm';
import Screen from './styles';
import { type SignUpStepTwoInterface } from './types';

const SignUpStepTwo: FC<SignUpStepTwoInterface> = ({
  setStep,
  setUserInfo,
  userInfo,
}) => (
  <Screen data-testid="stepTwoContainer">
    <SignUpForm
      setStep={setStep}
      setUserInfo={setUserInfo}
      userInfo={userInfo}
    />
  </Screen>
);

export default SignUpStepTwo;
