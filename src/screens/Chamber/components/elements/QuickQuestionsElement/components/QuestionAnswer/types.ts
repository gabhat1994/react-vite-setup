export type EllipsisMenuProp = {
  questionId: string;
  refetch?: () => void;
  isClosed: boolean;
  isOwner?: boolean;
  isQuestionOwner?: boolean;
  isDropDown?: boolean;
};

export type QuestionSchema = {
  answer: string;
};
