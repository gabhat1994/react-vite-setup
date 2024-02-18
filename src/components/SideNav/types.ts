import { type SideNavItemProps } from './SideNavItem/types';

export interface SideNavProps {
  navItems: SideNavItemProps[];
  onNavChange: (e: string) => void;
  activeNavValue: string;
  isNoumSideBar?: boolean;
  loading?: boolean;
}
