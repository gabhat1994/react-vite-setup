import { usePlaidLink } from 'react-plaid-link';
import { captureException } from '@sentry/react';
import { t } from 'i18next';
import {
  type FunctionComponent,
  useCallback,
  useContext,
  useState,
  useMemo,
} from 'react';

import { useToast } from '@/hooks';
import { Spacer, Stack } from '@/layout';
import {
  ModalHeader,
  ModalFooter,
  ModalSize,
  ModalBody,
} from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { usePlaidToken } from '@/features/money/hooks';
import { useCreateAccountDwollaMutation } from '@/apollo/graphql/mutations/paymentAccounts.generated';
import { useCheckPassCodeExistsQuery } from '@/apollo/graphql';
import { LINKS } from '@/constants/links';
import { PaymentDataContext } from '@/features/TransactionModal/contexts/PaymentDataContext';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import { ComponentStates } from '@/features/TransactionModal/types';
import SecurityQuestions from './SecurityQuestions/SecurityQuestions';
import { SetupPin } from './SetupPin/SetupPin';

const PlaidFlow: FunctionComponent = () => {
  const { addToast } = useToast();
  const { plaidToken, loading } = usePlaidToken();
  const { isMobile, setPaymentState, setModalSize } =
    useContext(PaymentStateContext);
  const { refetchPaymentData } = useContext(PaymentDataContext);
  const [userPassCode, setUserPassCode] = useState<string>('');
  const [isPassCodeExist, setIsPassCodeExist] = useState(false);
  const [step, setStep] = useState(0);
  const [plaidStep, setPlaidStep] = useState(true);

  const { loading: passCodeLoading } = useCheckPassCodeExistsQuery({
    fetchPolicy: 'network-only',
    onCompleted: ({ checkPassCodeExists }) =>
      setIsPassCodeExist(checkPassCodeExists),
    onError: (error) => {
      addToast('error', 'none', error.message);
      captureException(error, {
        tags: { section: 'checkpasscode-exists-Non-noumena' },
      });
    },
  });

  const [gqlCreateAccountDwolla, { loading: dwollaAccountCreationLoading }] =
    useCreateAccountDwollaMutation({
      onCompleted: () => {
        addToast(
          'success',
          'none',
          t('noumena.money.money-detail.accountLinkSuccess'),
        );
        if (setModalSize) {
          setModalSize(ModalSize.M);
          setPaymentState(ComponentStates.PAYMENT_SELECT);
          refetchPaymentData();
        }
      },
      onError: (error) => {
        addToast('error', 'none', error.message);
        captureException(error, {
          tags: { section: 'create-account-dwolla-non-noumena' },
        });
      },
    });

  const renderSecurityQuestion = useCallback(() => {
    setModalSize(ModalSize.M);
    setStep(2);
  }, [setModalSize]);

  const renderPassCode = useCallback(() => {
    setModalSize(ModalSize.M);
    setStep(1);
  }, [setModalSize]);

  const renderPlaidIntroScreen = useCallback(() => {
    setModalSize(ModalSize.L);
    setStep(0);
  }, [setModalSize]);

  const onPassCodeConfirm = useCallback((val: string) => {
    setUserPassCode(val);
  }, []);

  const handleLinkNavigation = () => {
    window.open(LINKS.HOW_PLAID_WORKS, '_blank');
  };

  const handleInternalPlaidStep = () => {
    setPlaidStep(!plaidStep);
  };

  const renderAccountNotFoundScreen = useCallback(() => {
    setModalSize(ModalSize.M);
    setPaymentState(ComponentStates.BANK_ACCOUNT_NOT_FOUND_IN_PLAID);
  }, [setModalSize, setPaymentState]);

  const plaidOption = useMemo(
    () => ({
      token: plaidToken,
      onSuccess: (token: string) => {
        if (token) {
          gqlCreateAccountDwolla({
            variables: {
              plaidToken: token,
            },
          });
        }
      },
      onExit: () => {
        renderAccountNotFoundScreen();
      },
    }),
    [plaidToken, gqlCreateAccountDwolla, renderAccountNotFoundScreen],
  );

  const { open, ready } = usePlaidLink(plaidOption);

  const PlaidIntroText = () => (
    <Stack vertical align="center" justify="center">
      <TSpan
        font="heading-xs-bold"
        colorToken="--text-modal-header-neutral-default"
        textAlign="center"
      >
        {t(`noumena.money.nonnoumena.plaid.intro.screen`)}
      </TSpan>
      <Spacer height={20} />
      <TSpan textAlign="center" colorToken="--text-modal-neutral-default">
        {t(`noumena.money.nonnoumena.plaid.intro.helperTextOne`)}
      </TSpan>
      <Spacer height={20} />
      <TSpan textAlign="center" colorToken="--text-modal-neutral-default">
        {t(`noumena.money.nonnoumena.plaid.intro.helperTextTwo`)}
      </TSpan>
      <Spacer height={20} />
      <TSpan
        font="link-m"
        colorToken="--text-modal-neutral-default"
        textAlign="center"
        onClick={handleInternalPlaidStep}
        cursor="pointer"
      >
        {t(`noumena.money.money-detail.howPalidWorkd`)}
      </TSpan>
    </Stack>
  );

  const PlaidHowItWorksText = () => (
    <Stack vertical align="center" justify="center">
      <TSpan colorToken="--text-modal-neutral-default">
        {t('noumena.non.noumena.plaid.how.it.works.one')}
      </TSpan>
      <TSpan colorToken="--text-modal-neutral-default">
        {t('noumena.non.noumena.plaid.how.it.works.two')}
        <TSpan
          font="link-m"
          colorToken="--text-modal-neutral-default"
          textAlign="center"
          onClick={handleLinkNavigation}
          cursor="pointer"
        >
          here.
        </TSpan>
      </TSpan>
    </Stack>
  );

  return (
    <>
      {step === 0 && (
        <div>
          <ModalHeader>
            {plaidStep
              ? t(`noumena.money.money-detail.addAccount`)
              : t('noumena.money.money-detail.howPalidWorkd')}
          </ModalHeader>
          <ModalBody align="center">
            {plaidStep ? <PlaidIntroText /> : <PlaidHowItWorksText />}
          </ModalBody>
          <ModalFooter>
            {plaidStep ? (
              <Button
                loading={
                  loading || passCodeLoading || dwollaAccountCreationLoading
                }
                disabled={!ready || dwollaAccountCreationLoading}
                size="full"
                primary
                onClick={() => {
                  if (isPassCodeExist) {
                    if (ready && open) {
                      open();
                    }
                    return;
                  }
                  renderPassCode();
                }}
              >
                {t(`noumena.money.money-detail.Continue`)}
              </Button>
            ) : (
              <Button
                loading={
                  loading || passCodeLoading || dwollaAccountCreationLoading
                }
                disabled={!ready || dwollaAccountCreationLoading}
                size="full"
                primary
                onClick={handleInternalPlaidStep}
              >
                {t('noumena.close')}
              </Button>
            )}
          </ModalFooter>
        </div>
      )}
      {step === 1 && (
        <SetupPin
          onPassCodeConfirm={onPassCodeConfirm}
          onContinueButtonClick={renderSecurityQuestion}
          handleBack={renderPlaidIntroScreen}
        >
          <ModalHeader>
            <SetupPin.Header
              font="heading-s-bold"
              colorToken="--text-body-header-neutral-default"
            />
          </ModalHeader>
          <ModalBody align="center">
            <SetupPin.HelperText />
            <Spacer height={24} />
            <SetupPin.Otp />
            <Spacer height={28} />
            <SetupPin.ShowPasswordButton />
            <Spacer height={79} />
          </ModalBody>
          <ModalFooter gap={12} flexDirection={isMobile ? 'column' : 'row'}>
            <SetupPin.BackButton />
            <SetupPin.ContinueButton />
          </ModalFooter>
        </SetupPin>
      )}
      {step === 2 && (
        <SecurityQuestions
          handleNextStep={() => {
            if (ready && open) {
              open();
            }
          }}
          passCode={userPassCode}
          handlePreviousStep={renderPassCode}
          loading={dwollaAccountCreationLoading}
        >
          <ModalHeader>
            <SecurityQuestions.Header
              font="heading-s-bold"
              colorToken="--text-body-header-neutral-default"
            />
          </ModalHeader>
          <ModalBody align="center">
            <SecurityQuestions.HelperText />
            <Spacer height={16} />
            <SecurityQuestions.Questions />
          </ModalBody>
          <ModalFooter gap={12} flexDirection={isMobile ? 'column' : 'row'}>
            <SecurityQuestions.BackButton />
            <SecurityQuestions.ContinueButton />
          </ModalFooter>
        </SecurityQuestions>
      )}
    </>
  );
};

export default PlaidFlow;
