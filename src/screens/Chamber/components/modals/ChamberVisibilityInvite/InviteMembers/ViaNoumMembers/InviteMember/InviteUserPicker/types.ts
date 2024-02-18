import { type InputHTMLAttributes } from 'react';
import type React from 'react';

import { type GlobalSearchEntity } from '@/apollo/generated/types';
import {
  type DropdownValueType,
  type DropdownItemType,
} from '@/components/Dropdown';

export type INoumUserDropdown = DropdownValueType<GlobalSearchEntity>;

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

export interface UserOptionItemProps {
  options: DropdownItemType<GlobalSearchEntity>[];
  multiselect?: boolean;
  activeItem: INoumUserDropdown | null;
  loading?: boolean;
  hasMore?: boolean;
  onSelect: (v: INoumUserDropdown) => void;
  onFetchMore?: () => void;
}

export interface InviteUserSearchProps {
  inputProps: InputFieldProps;
  children?: React.ReactNode;
}

export interface InviteSelectedUserProps {
  data: INoumUserDropdown;
  multiselect?: boolean;
  onRemove: (user: INoumUserDropdown) => void;
}
