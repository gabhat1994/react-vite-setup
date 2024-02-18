import { type InputHTMLAttributes } from 'react';
import type React from 'react';

import {
  type DropdownValueType,
  type DropdownItemType,
} from '@/components/Dropdown';
import { type UserBasicOutputFragment } from '@/apollo/graphql/fragments';

export type IUserDropdown = DropdownValueType<UserBasicOutputFragment>;

export interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export interface UserOptionItemProps {
  options: DropdownItemType<UserBasicOutputFragment>[];
  multiselect?: boolean;
  activeItem: IUserDropdown | null;
  loading?: boolean;
  hasMore?: boolean;
  onSelect: (v: IUserDropdown) => void;
  onFetchMore?: () => void;
}

export interface MessageUserPickerProps {
  data: UserBasicOutputFragment[];
  initialValue?: UserBasicOutputFragment[];
  onSelectUsers: (users: UserBasicOutputFragment[]) => void;
  multiselect?: boolean;
  initLoading?: boolean;
  loading?: boolean;
  hasMore?: boolean;
  onFetchMore?: () => void;
  onSetSearch?: (search: string) => void;
  CustomOptionsContent?: React.ReactNode;
}

export interface MessageUserSearchProps {
  inputProps: InputFieldProps;
  cancellable?: boolean;
  hasSelectedOption?: boolean;
  onCancel: () => void;
  children?: React.ReactNode;
}

export interface MessageSelectedUserProps {
  data: IUserDropdown;
  multiselect?: boolean;
  onRemove: (user: UserBasicOutputFragment) => void;
}

export interface MessageUserPickerForwardRefProps {
  cancel?: () => void;
}
