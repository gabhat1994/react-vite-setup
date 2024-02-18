import { type Dispatch, type RefAttributes, type SetStateAction } from 'react';
import { type LinkProps } from 'react-router-dom';
import { type Icons } from '../../Icon/Icon';

interface SideMenuItemTypes {
  icon: keyof typeof Icons;
  label: string;
  id: string;
  value: string;
  active?: boolean;
  onItemChange?: (value: string, external: boolean) => void;
  disabled?: boolean;
  external?: boolean;
  setIsShown?: Dispatch<SetStateAction<boolean>>;
}

export type SideMenuItemProps = LinkProps &
  RefAttributes<HTMLAnchorElement> &
  SideMenuItemTypes;
