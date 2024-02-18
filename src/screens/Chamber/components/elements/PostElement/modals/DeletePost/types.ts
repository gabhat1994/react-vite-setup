export type DeletePostProps = {
  postId: string;
  isDeleting?: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
};
