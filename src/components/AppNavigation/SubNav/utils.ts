import { type SubNavItemOption } from './types';

export function getNavItemTriggerId(item: SubNavItemOption): string {
  return `AppSideNavigation-SubNavTrigger-${item.key}`;
}
export function getNavItemSubMenuId(item: SubNavItemOption): string {
  return `AppSideNavigation-SubNav-${item.key}`;
}
