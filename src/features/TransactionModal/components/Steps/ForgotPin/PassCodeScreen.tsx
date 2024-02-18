import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useCallback,
  useContext,
} from 'react';
import { t } from 'i18next';
import {
  useCreatePassCodeMutation,
  useResetPassCodeMutation,
} from '@/apollo/graphql';
import { useError } from '@/hooks';
import { type SecurityQuestion } from '@/apollo/generated/types';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import { InternalStates, type TPayLoad } from './type';
import PassCode from './PassCode';

interface PassCodeScreenProps {
  onChangeState: (_state: InternalStates) => void;
  setPaylod: Dispatch<SetStateAction<TPayLoad>>;
  payLoad: TPayLoad;
  resetSecurityQuestions: boolean | null | undefined;
}

const PassCodeScreen: FC<PassCodeScreenProps> = ({
  onChangeState,
  setPaylod,
  payLoad,
  resetSecurityQuestions,
}) => {
  const { logError } = useError();
  const { isMobile } = useContext(PaymentStateContext);

  const onBackButtonClick = useCallback(() => {
    onChangeState(InternalStates.RESET_PIN_ANSWER);
  }, [onChangeState]);

  const onPassCodeConfirm = useCallback(
    (passCode: string) => {
      setPaylod((val) => ({ ...val, passCode }));
    },
    [setPaylod],
  );

  const [resetPassCodeMutation, { loading }] = useResetPassCodeMutation({
    variables: {
      input: {
        passCode: payLoad.passCode,
        securityQuestion: {
          id: payLoad.securityQuestion[0]?.id,
          answer: payLoad.securityQuestion[0]?.answer,
        },
      },
    },
    onCompleted: () => onChangeState(InternalStates.RESET_PIN_DONE),
    onError: (error) => {
      logError(error, 'resetPassward');
    },
  });

  const [createPassCodeMutation] = useCreatePassCodeMutation({
    variables: {
      input: {
        passCode: payLoad.passCode,
        securityQuestions: payLoad.securityQuestion as SecurityQuestion[],
      },
    },
    onCompleted: () => onChangeState(InternalStates.RESET_PIN_DONE),
    onError: (error) => {
      logError(error, 'createPassCode');
    },
  });

  return (
    <div style={{ position: 'relative' }}>
      <PassCode
        loadingState={loading}
        isMobile={isMobile}
        setupPinMainHeading={t('noumena.money.forgotpin.passcode.main_heading')}
        confirmPinMainHeading={t(
          'noumena.money.forgotpin.passcode.confirm_new_pin',
        )}
        subHeading={t('noumena.money.forgotpin.passcode.sub_heading')}
        onBackButtonClick={onBackButtonClick}
        onPassCodeConfirm={(e) => onPassCodeConfirm(e)}
        onContinueButtonClick={() =>
          resetSecurityQuestions
            ? createPassCodeMutation()
            : resetPassCodeMutation()
        }
      />
    </div>
  );
};

export default PassCodeScreen;
