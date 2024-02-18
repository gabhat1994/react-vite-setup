import type { InputHTMLAttributes } from 'react';
import type { IUserDropdown } from '@/features/events/types/context';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

export interface SearchUsersProps {
  label: string;
  isEditing?: boolean;
  hideCancelButton?: boolean;
  hideSaveButton?: boolean;
  inputProps: InputFieldProps;
  multiselect?: boolean;
  hasSelectedOption?: boolean;
  selectedOptions: IUserDropdown[];
  isOpened?: boolean;
  onClose: (shouldSave: boolean) => void;
  onUnSelectUser: (k: string) => void;
  children?: React.ReactNode;
}
