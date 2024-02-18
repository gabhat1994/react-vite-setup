import type { Ref, ReactNode, InputHTMLAttributes } from 'react';

import { type Maybe } from '@/common/types';
import { type Placement } from '@popperjs/core';
import { type DropdownItemType } from '@/components/Dropdown';
import { type BottomStatus } from '@/components/Infinite/types';

import type { IUser, IUserDropdown } from '../../types/context';

interface UserSearchInputChildProps {
  selectedOptions: IUserDropdown[];
  onClose: (shouldSave: boolean) => void;
}

export interface UserSearchInputProps {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  inputRef?: Ref<HTMLInputElement>;
  hasSelectedOption: boolean;
  isOpened: boolean;
  selectedOptions: IUserDropdown[];
  onUnSelectUser: (k: string) => void;
  onClose: (shouldSave: boolean) => void;
}

export interface UsersSearchSelectorProps {
  type: 'cohost' | 'member';
  chamberId: Maybe<string>;
  initialOpen?: boolean;
  initialData?: IUser[];
  members?: IUser[];
  dropdownProps: {
    placement: Placement;
    usePortal: boolean;
  };
  searchPlaceholder: string;
  emptyText?: string;
  onChangeSelectedUsers: (users: IUser[]) => void;
  onFinish?: () => void;
  onlyFavorites?: boolean;
  onlyConnected?: boolean;
  multiselect?: boolean;
  children?: (props: UserSearchInputChildProps) => ReactNode;
  renderSearch: (props: UserSearchInputProps) => ReactNode;
}

export interface UserOptionItemProps {
  option: DropdownItemType<IUser>;
  activeItem: IUserDropdown | null;
  showCheck: boolean;
  onSelect: (v: IUserDropdown) => void;
  members?: IUser[];
  cohosts?: IUser[];
}

export interface UserOptionRendererProps
  extends Omit<UserOptionItemProps, 'showCheck' | 'option'> {
  options: DropdownItemType<IUser>[];
  multiselect?: boolean;
  onlyFavorites?: boolean;
  fetchMoreStatus: BottomStatus;
  onFetchMore: () => void;
  renderSearch?: () => ReactNode;
}

export interface SelectedUserProps {
  data: IUserDropdown;
  multiselect?: boolean;
  onRemove: (id: string) => void;
}
