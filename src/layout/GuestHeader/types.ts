import { type DropdownValueType } from '@/components/Dropdown';
import { type HTMLAttributes } from 'react';

interface IGuestHeader {
  /* user name */
  userName?: string;
  leftNavButton?: boolean;
  expired?: boolean;
}

export interface GuestHeaderMenuProps {
  options: DropdownValueType<string>[];
  onSelect?: (item: string) => void;
}

export enum GuestMenuValues {
  EDIT_DATA = 'EDIT_DATA',
  LOGOUT = 'LOGOUT',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  ABOUT_NOUMENA = 'ABOUT_NOUMENA',
  TERMS_OF_USE = 'TERMS_OF_USE',
}

export type GuestHeaderProps = HTMLAttributes<HTMLDivElement> & IGuestHeader;
