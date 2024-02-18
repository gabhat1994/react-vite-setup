import { type SideMenuItemProps } from './SideMenuItem/types';

export interface SideMenuProps {
  navItems: SideMenuItemProps[];
  navItemsMore?: SideMenuItemProps[];
  onNavChange: (e: string, externalLink: boolean) => void;
  handleClose?: () => void;
  isUserPending: boolean;
}

export interface InviteFriendProp {
  width?: string;
  marginLeft?: string;
  paddingLeft?: string;
  handleClick?: () => void;
  disabled?: boolean;
}
