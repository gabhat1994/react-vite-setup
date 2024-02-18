import { type AnswerOutput } from '@/apollo/generated/types';

export enum AnswerElementType {
  MY_ANSWERS = 'MyAnswers',
  MY_TIPS = 'MyTips',
  ALL_ANSWERS_MODAL = 'AllAnswersModal',
}

export type AnswerProps = {
  answer: AnswerOutput;
  type: AnswerElementType;
  isClosedQuestion: boolean;
  onTip?: () => Promise<void>;
  onShowAllTips?: () => void;
};
