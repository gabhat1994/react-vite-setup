import { useCallback, useState, Fragment, useEffect } from 'react';
import { useResetSecurityQuestions } from '@/features/money/hooks';
import { type QuestionOutput } from '@/apollo/generated/types';
import Form from './Form';
import PassCodeScreen from './PassCodeScreen';
import Done from './Done';
import { type TPayLoad, InternalStates } from './type';

const ForgotPin = () => {
  const [state, setState] = useState<InternalStates>(
    InternalStates.RESET_PIN_ANSWER,
  );

  const [securityQuestions, setSequrityQuestions] = useState<QuestionOutput[]>(
    [],
  );
  const [payLoad, setPayLoad] = useState<TPayLoad>({
    securityQuestion: [],
    passCode: '',
  });

  const { resetSecurityQuestions, questions } = useResetSecurityQuestions();

  useEffect(() => {
    setSequrityQuestions(questions);
  }, [questions]);

  // useGetSecurityQuestionsResetQuery({
  //   fetchPolicy: 'network-only',
  //   onCompleted: ({ getSecurityQuestionsForReset }) => {
  //     if(resetSecurityQuestions){
  //       setSequrityQuestions(getSecurityQuestionsForReset)
  //     }else{
  //       const randomIndex = Math.floor(Math.random() * 3);
  //       setSequrityQuestions([{
  //         id: getSecurityQuestionsForReset[randomIndex].id,
  //         question: getSecurityQuestionsForReset[randomIndex].question,
  //       }]);
  //     }
  //   },
  //   onError: (error) => {
  //     addToast('error', 'none', `${error.message}`);
  //     captureException(error, {
  //       tags: {
  //         section: 'createCustomerPayeeMutationPayeeInNoumena',
  //       },
  //     });
  //   },
  // });

  const changeInternalState = useCallback((_state: InternalStates) => {
    setState(_state);
  }, []);

  const getScreen = useCallback(() => {
    switch (state) {
      case InternalStates.RESET_PIN_ANSWER:
        return (
          <Form
            onChangeState={changeInternalState}
            securityQuestions={securityQuestions}
            setPaylod={setPayLoad}
            resetSecurityQuestions={resetSecurityQuestions}
          />
        );
      case InternalStates.RESET_PIN_NEW_PIN:
        return (
          <PassCodeScreen
            payLoad={payLoad}
            onChangeState={changeInternalState}
            setPaylod={setPayLoad}
            resetSecurityQuestions={resetSecurityQuestions}
          />
        );
      case InternalStates.RESET_PIN_DONE:
        return <Done />;
      default:
        return null;
    }
  }, [
    state,
    changeInternalState,
    securityQuestions,
    resetSecurityQuestions,
    payLoad,
  ]);

  return <Fragment>{getScreen()}</Fragment>;
};

export default ForgotPin;
