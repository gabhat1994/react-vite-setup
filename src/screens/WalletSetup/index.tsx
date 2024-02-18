import { useCallback, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import { useNavigate } from 'react-router';
import { Stepper } from '@/components/Stepper';
import noumenaLogo from '@/assets/images/noumena-logo.png';
import {
  useGetPersonalInfoLazyQuery,
  useGetWalletQuery,
} from '@/apollo/graphql';
import { Spinner } from '@/components/Spinner';
import ROUTES from '@/constants/routes';

import { useToast } from '@/hooks';
import { type WalletStatus } from '@/features/money/types';
import { WalletUtils } from '@/features/money/utils';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from './Steps/StepThree';
import StepFour from './Steps/StepFour';
import StepFive from './Steps/StepFive';
import StepSix from './Steps/StepSix';
import Done from './Steps/Done';
import {
  Header,
  Logo,
  StepperContainer,
  MainContiner,
  Container,
} from './styles';
import {
  EWalletSetup,
  type TUser,
  type TPayload,
  type SetupWalletContextTypes,
} from './types';
import { initPayLoad, SetupWalletContext } from './context';

const WalletSetup = () => {
  const { addToast, addSuccessIconToast } = useToast();
  const navigateTo = useNavigate();

  const [steps, setSteps] = useState<number>(1);
  const [payLoad, setPayLoad] = useState<TPayload>(initPayLoad);
  const [passCode, setPasscode] = useState<string | null>(null);

  const [gqlPersonalInfo, { loading: loadingPersonalInfo }] =
    useGetPersonalInfoLazyQuery();

  const { loading: loadingWalletInfo } = useGetWalletQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ getWalletBalance }) => {
      const status = (getWalletBalance?.status || '') as WalletStatus;
      const canCreateWallet = WalletUtils.canCreateWallet(status);
      if (canCreateWallet) return;
      addSuccessIconToast(t('noumena.wallet.already.created.message'));
      navigateTo(ROUTES.MONEY);
    },
  });
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
      setSteps((_steps) => _steps + 1);
    }
  }, [steps, setSteps]);
  const handlePreviousStep = useCallback(() => {
    if (steps > 0) {
      setSteps((_steps) => _steps - 1);
    }
  }, [steps, setSteps]);

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
      case 6:
        return <StepSix />;
      default:
        return <Done />;
    }
  };

  const fetch = useCallback(async () => {
    try {
      const { data } = await gqlPersonalInfo();
      if (data) {
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
      }
    } catch (error) {
      if (error) {
        addToast('error', 'none', `Unexpected Error Occured`);
      }
    }
  }, [addToast, gqlPersonalInfo]);

  useEffect(() => {
    fetch();
  }, [fetch]);

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
      setSteps,
    ],
  );

  const handleBack = useCallback(() => {
    navigateTo(ROUTES.MONEY);
  }, [navigateTo]);

  const loading = loadingWalletInfo || loadingPersonalInfo;

  return (
    <SetupWalletContext.Provider value={contextValue}>
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          <Header data-testid="setup-wallet-flow-header">
            <Logo src={noumenaLogo} onClick={handleBack} />
          </Header>
          <MainContiner>
            {steps <= EWalletSetup.TOTAL_STEPS && steps >= 0 && (
              <StepperContainer>
                <Stepper
                  currentStep={steps}
                  completed={EWalletSetup.TOTAL_STEPS}
                />
              </StepperContainer>
            )}
            {getCurretStep()}
          </MainContiner>
        </Container>
      )}
    </SetupWalletContext.Provider>
  );
};
export default WalletSetup;
