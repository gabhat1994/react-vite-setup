import { type GlassIconName } from '../GlassIcon';

export interface NavItemOption {
  key: string;
  label: string;
  iconName?: GlassIconName;
  subNavItems?: SubNavItemOption[];
  route?: string;
}

export interface NavUserItemOption extends NavItemOption {
  avatarUrl: string;
}

export type SubNavItemOption = Omit<NavItemOption, 'subNavItems'>;
