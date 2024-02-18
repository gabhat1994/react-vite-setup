import SignUpForm from './SignUpForm/index';
import Screen from './styles';
import { type SignUpStepThreeInterface } from './types';

const SignUpStepThree: React.FC<SignUpStepThreeInterface> = ({
  setStep,
  userInfo,
  setUserInfo,
  setUserOutput,
}) => (
  <Screen data-testid="stepThreeContainer">
    <SignUpForm
      setStep={setStep}
      userInfo={userInfo}
      setUserInfo={setUserInfo}
      setUserOutput={setUserOutput}
    />
  </Screen>
);

export default SignUpStepThree;
