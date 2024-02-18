export type QuickQuestionsElementHeaderProps = {
  spaceId: string;
  currentTitle?: string;
  isAllowed?: boolean;
  children?: JSX.Element;
  openAddQuestionModal: () => void;
  selectedCustomPreviewTab?: string;
  openQuestionCount: number;
};
