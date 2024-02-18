import type { UsersSearchSelectorProps } from '@/features/events/components/UsersSearchSelector/types';
import type { IUser } from '@/features/events/types/context';

export interface MemberPickerProps extends Partial<UsersSearchSelectorProps> {
  btnLabel?: string;
  onBtnClick?: () => void;
  onChange: (users: IUser[]) => void;
}
export interface AddMemberModalProps extends Partial<UsersSearchSelectorProps> {
  testId?: string;
  type: 'cohost' | 'member';
  modalTitle: string;
  onClose: () => void;
  isShowModal: boolean;
  btnLabel: string;
  onChange: (users: IUser[]) => void;
}
