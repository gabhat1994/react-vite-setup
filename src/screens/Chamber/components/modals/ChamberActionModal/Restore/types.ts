export type ChamberRestoreModalBodyProps = {
  version: string;
};

export interface ChamberRestoreModalProps {
  spaceId: string;
  isOpen: boolean;
  cancelCallback: (isSuccess?: boolean) => void;
  version: string;
  emptyElementErrorMessage?: string | undefined | null;
  sucessCallback: () => void;
}
