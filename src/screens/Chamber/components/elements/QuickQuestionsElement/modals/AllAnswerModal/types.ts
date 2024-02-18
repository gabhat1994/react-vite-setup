import { type AnswerOutput, type NoumQuestionOutput } from '@/apollo/generated/types';

export type AllAnswerProps = {
  question: NoumQuestionOutput;
  onClose: () => void;
  isOpen: boolean;
  onShowAllTips?: (answer: AnswerOutput) => void;
};
