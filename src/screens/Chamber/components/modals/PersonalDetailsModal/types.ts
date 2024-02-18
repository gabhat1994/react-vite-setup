export interface PersonalDetailsModalProps {
  spaceId?: string;
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
  handleSuccess: (id?: string) => void;
  isUpdateMode?: boolean;
}
