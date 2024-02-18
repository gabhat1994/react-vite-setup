import { type SubNavDisplayMode } from '../SubNav/types';
import { type NavUserItemOption, type NavItemOption } from '../types';

export type NavItemsListVariant = 'nav' | 'sub-nav';

export interface AppSideNavigationProps {
  isOpen: boolean;
  isPersistent: boolean;
  subNavMode: SubNavDisplayMode;
  selectedItemKey: string | null;
  onSelectItem(item: NavItemOption): void;
  onOpen(): void;
  onClose(): void;
  onGoBack?(): void;
  createNavItem: NavItemOption;
  mainNavItems: NavItemOption[];
  toolsNavItems: NavItemOption[];
  userNavItem: NavUserItemOption;
  defaultIsExpanded?: boolean;
  onToggleExpanded?(isExpanded: boolean): void;
}

export interface NavItemsListCommonProps<T> {
  items: T[];
  showIconsOnly?: boolean;
  showTooltip?: boolean;
}
