export type DeleteMyRequestProps = {
  requestId: string;
  isDeleting?: boolean;
  isOpen?: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  component?: () => JSX.Element;
  isInvite?: boolean;
};
