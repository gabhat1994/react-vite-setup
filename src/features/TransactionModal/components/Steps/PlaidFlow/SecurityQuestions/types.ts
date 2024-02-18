import { createContext, type Dispatch, type SetStateAction } from 'react';

export interface TQuestions {
  id: string;
  question: string;
}

export type TSecurityQuestions = {
  questionOne: TQuestions;
  questionSecond: TQuestions;
  questionThird: TQuestions;
};

export interface FormValues {
  answerOne: string;
  answerSecond: string;
  answerThree: string;
}

export type TSecurityQuestionsProps = {
  children: React.ReactNode;
  passCode: string | null;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
  loading?: boolean;
};

type TSecurityQuestionContext = {
  securityQuestions: TSecurityQuestions;
  questionsArray: TQuestions[] | undefined;
  setSecurityQuestions:
    | Dispatch<SetStateAction<TSecurityQuestions>>
    | undefined;
  handlePreviousStep: () => void;
  handleSubmit: () => void;
};

export const SecurityQuestionContext = createContext<TSecurityQuestionContext>({
  securityQuestions: {
    questionOne: { id: '', question: '' },
    questionSecond: { id: '', question: '' },
    questionThird: { id: '', question: '' },
  },
  questionsArray: undefined,
  setSecurityQuestions: undefined,
  handlePreviousStep: () => null,
  handleSubmit: () => null,
});
