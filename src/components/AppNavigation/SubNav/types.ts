import { type SubNavContextValues } from './SubNavContext';

export interface ChildrenProps<T> extends SubNavContextValues<T> {}

export interface SubNavItemOption {
  key: string;
  label: string;
  subNavItems?: SubNavItemOption[];
}

export type SubNavDisplayMode = 'bottom-sheet' | 'popper';
