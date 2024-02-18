import { type RefAttributes } from 'react';
import { type LinkProps } from 'react-router-dom';
import { type Icons } from '../../Icon/Icon';

export interface SideNavItemCssProps {
  active: number;
  disabled: boolean;
  $isNoumSideBar?: boolean;
}

interface SideNavItemTypes {
  icon: keyof typeof Icons;
  label: string;
  id: string;
  value: string;
  active?: boolean;
  onItemChange?: (value: string) => void;
  disabled?: boolean;
  isNoumSideBar?: boolean;
  loading?: boolean;
}

export type SideNavItemProps = LinkProps &
  RefAttributes<HTMLAnchorElement> &
  SideNavItemTypes;
