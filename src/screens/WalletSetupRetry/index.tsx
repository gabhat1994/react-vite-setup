import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useGetPersonalInfoQuery } from '@/apollo/graphql';
import { Spinner } from '@/components/Spinner';
import ROUTES from '@/constants/routes';
import { useError } from '@/hooks';
import { Stepper } from '@/components/Stepper';
import noumenaLogo from '@/assets/images/noumena-logo.png';
import {
  Header,
  Logo,
  StepperContainer,
  MainContainer,
  Container,
} from './styles';
import {
  EWalletSetup,
  type TUser,
  type TPayload,
  type SetupWalletContextTypes,
} from './types';
import { initPayLoad, SetupWalletContext } from './context';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from './Steps/StepThree';
import StepFour from './Steps/StepFour';
import StepFive from './Steps/StepFive';
import Done from './Steps/Done';

const WalletSetupRetry = () => {
  const [customLoading, setCustomLoading] = useState(true);
  const { logError } = useError();
  const { loading: apiLoading } = useGetPersonalInfoQuery({
    onCompleted: (data) => {
      setCurrentUser({
        firstName: data.currentUser?.firstName || null,
        lastName: data.currentUser?.lastName || null,
        email: data.currentUser?.email || null,
        citizenship: data.currentUser?.citizenship || null,
        ssn:
          data.userKyc?.ssn &&
          !Number.isNaN(Number.parseInt(data?.userKyc?.ssn, 10))
            ? data?.userKyc?.ssn
            : '',
        dateOfBirth: data.userKyc?.dob
          ? Date.parse(data.userKyc?.dob)
            ? Date.parse(data.userKyc?.dob)
            : null
          : null,
        address: data?.userAddress?.zipcode
          ? {
              apartment: data?.userAddress?.apartment,
              city: data?.userAddress?.city,
              state: data?.userAddress?.state,
              street: data?.userAddress?.street,
              postalCode: data?.userAddress?.zipcode,
            }
          : null,
      });
      setCustomLoading(false);
    },
    onError: (error) => logError(error, 'setup-wallet-retry', true),
  });
  const navigateTo = useNavigate();

  const [steps, setSteps] = useState(1);
  const [payLoad, setPayLoad] = useState<TPayload>(initPayLoad);
  const [passCode, setPasscode] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<TUser>({
    firstName: null,
    lastName: null,
    citizenship: null,
    email: null,
    ssn: null,
    dateOfBirth: null,
    address: null,
  });

  const handleNextStep = useCallback(() => {
    if (steps < EWalletSetup.TOTAL_STEPS + 1) {
      setSteps((prevSteps) => prevSteps + 1);
    }
  }, [steps]);

  const handlePreviousStep = useCallback(() => {
    if (steps > 0) {
      setSteps((prevSteps) => prevSteps - 1);
    }
  }, [steps]);

  const getCurretStep = () => {
    switch (steps) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      case 5:
        return <StepFive />;
      default:
        return <Done />;
    }
  };

  const contextValue: SetupWalletContextTypes = useMemo(
    () => ({
      setPayLoad,
      payLoad,
      currentUser,
      handleNextStep,
      handlePreviousStep,
      setPasscode,
      passCode,
      setState: setSteps,
    }),
    [
      setPayLoad,
      payLoad,
      currentUser,
      handleNextStep,
      handlePreviousStep,
      setPasscode,
      passCode,
    ],
  );

  const handleBack = useCallback(() => {
    navigateTo(ROUTES.MONEY);
  }, [navigateTo]);
  const loading = customLoading || apiLoading;
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <SetupWalletContext.Provider value={contextValue}>
          <Container>
            <Header data-testid="setup-wallet-flow-header">
              <Logo src={noumenaLogo} onClick={handleBack} />
            </Header>
            <MainContainer>
              {steps <= EWalletSetup.TOTAL_STEPS && steps >= 0 && (
                <StepperContainer>
                  <Stepper
                    currentStep={steps}
                    completed={EWalletSetup.TOTAL_STEPS}
                  />
                </StepperContainer>
              )}
              {getCurretStep()}
            </MainContainer>
          </Container>
        </SetupWalletContext.Provider>
      )}
    </>
  );
};

export default WalletSetupRetry;
