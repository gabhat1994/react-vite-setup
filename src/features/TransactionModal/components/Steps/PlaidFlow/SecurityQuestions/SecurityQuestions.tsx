import { useCallback, useMemo, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { captureException } from '@sentry/react';
import { Spinner } from '@/components/Spinner';
import {
  useGetSecurityQuestionsQuery,
  useCreatePassCodeMutation,
} from '@/apollo/graphql';
import { useToast } from '@/hooks';
import {
  type FormValues,
  type TQuestions,
  type TSecurityQuestions,
  type TSecurityQuestionsProps,
  SecurityQuestionContext,
} from './types';
import { FallbackModal } from './style';
import Header from './Header';
import HelperText from './HelperText';
import Questions from './Questions';
import BackButton from './BackButton';
import ContinueButton from './ContinueButton';

const SecurityQuestions = ({
  children,
  handlePreviousStep,
  passCode,
  handleNextStep,
  loading = false,
}: TSecurityQuestionsProps) => {
  const { addToast } = useToast();
  const [questionsArray, setQuestionsArray] = useState<TQuestions[]>();
  const [securityQuestions, setSecurityQuestions] =
    useState<TSecurityQuestions>({
      questionOne: { id: '', question: '' },
      questionSecond: { id: '', question: '' },
      questionThird: { id: '', question: '' },
    });

  const formMethods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { answerOne: '', answerSecond: '', answerThree: '' },
  });

  useGetSecurityQuestionsQuery({
    onCompleted: ({ getQuestionnaire }) => {
      setQuestionsArray(getQuestionnaire);
    },
    onError: (error) => {
      addToast('error', 'none', error.message);
      captureException(error, {
        tags: { section: 'getSecurity-questions' },
      });
    },
  });

  const [createPassCodeMutation] = useCreatePassCodeMutation({
    onCompleted: () => handleNextStep(),
    onError: (error) => {
      if (error.message === 'PassCode already generated') {
        addToast('error', 'none', ` Pin Code already generated`);
        handleNextStep();
      } else {
        addToast('error', 'none', ` ${error?.message}`);
      }
    },
  });

  const handleSubmit = useCallback(() => {
    const {
      formState: { errors },
    } = formMethods;
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      const { answerOne, answerSecond, answerThree } = formMethods.getValues();
      const payload = [
        { id: securityQuestions.questionOne.id, answer: answerOne },
        { id: securityQuestions.questionSecond.id, answer: answerSecond },
        { id: securityQuestions.questionThird.id, answer: answerThree },
      ];
      if (passCode) {
        createPassCodeMutation({
          variables: {
            input: {
              passCode,
              securityQuestions: payload,
            },
          },
        });
      }
    }
  }, [
    formMethods,
    securityQuestions.questionOne.id,
    securityQuestions.questionSecond.id,
    securityQuestions.questionThird.id,
    passCode,
    createPassCodeMutation,
  ]);

  const contextValue = useMemo(
    () => ({
      securityQuestions,
      questionsArray,
      setSecurityQuestions,
      handlePreviousStep,
      handleSubmit,
    }),
    [
      securityQuestions,
      questionsArray,
      setSecurityQuestions,
      handleSubmit,
      handlePreviousStep,
    ],
  );

  return (
    <SecurityQuestionContext.Provider value={contextValue}>
      {loading ? (
        <FallbackModal>
          <Spinner />
        </FallbackModal>
      ) : (
        <FormProvider {...formMethods}>{children}</FormProvider>
      )}
    </SecurityQuestionContext.Provider>
  );
};

SecurityQuestions.Header = Header;
SecurityQuestions.HelperText = HelperText;
SecurityQuestions.Questions = Questions;
SecurityQuestions.BackButton = BackButton;
SecurityQuestions.ContinueButton = ContinueButton;

export default SecurityQuestions;
