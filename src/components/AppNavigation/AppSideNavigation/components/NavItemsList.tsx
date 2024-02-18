import { useSubNavContext } from '../../SubNav/SubNavContext';
import { useSubNavTrigger } from '../../SubNav/useSubNavTrigger';
import { getNavItemSubMenuId } from '../../SubNav/utils';
import { type NavItemOption } from '../../types';
import { useAppSideNavigationContext } from '../contexts/AppSideNavigationContext';
import { type NavItemsListCommonProps } from '../types';
import { NavItem } from './NavItem';
import S from './styles';

interface NavItemsListProps extends NavItemsListCommonProps<NavItemOption> {}

export function NavItemsList({
  items,
  showIconsOnly,
  showTooltip,
}: NavItemsListProps) {
  const { selectedItemKey, onNavItemClick } = useAppSideNavigationContext();
  const { openItem } = useSubNavContext();
  const { getSubNavTriggerProps } = useSubNavTrigger();

  return (
    <S.NavItemList>
      {items.map((item) => {
        const isSelectedDirectly = item.key === selectedItemKey;
        const isOpen = item.key === openItem?.key;
        const isSubItemSelected =
          !!item.subNavItems &&
          item.subNavItems.some((i) => i.key === selectedItemKey);

        const isActive = isSelectedDirectly || isOpen || isSubItemSelected;

        if (item.subNavItems && item.subNavItems.length > 0) {
          return (
            <NavItem.Item
              key={item.key}
              variant="nav"
              isActive={isActive}
              item={item}
              showIconOnly={showIconsOnly}
              showTooltip={showTooltip}
              aria-haspopup={true}
              aria-controls={getNavItemSubMenuId(item)}
              {...getSubNavTriggerProps(item)}
            />
          );
        }

        return (
          <NavItem.Item
            key={item.key}
            isActive={isActive}
            variant="nav"
            item={item}
            showIconOnly={showIconsOnly}
            showTooltip={showTooltip}
            onClick={() => onNavItemClick(item)}
          />
        );
      })}
    </S.NavItemList>
  );
}
