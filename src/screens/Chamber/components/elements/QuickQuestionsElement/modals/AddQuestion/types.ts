export type AddQuestionProps = {
  isEmpty?: boolean;
  refetch?: () => void;
  onClose: () => void;
  isOpen: boolean;
  spaceId: string;
};

export type EditElementSchema = {
  question: string;
  date: Date;
  url?: string;
};
