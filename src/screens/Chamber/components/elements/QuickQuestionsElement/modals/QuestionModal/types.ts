export type QuestionModalProps = {
  questionId: string;
  refetch?: () => void;
  answerBody?: string;
  isOpenModal?: boolean;
  isClosedModal?: boolean;
  loading?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
};
