import { Avatar } from '@/components/Avatar/Avatar';
import { Icon } from '@/components/Icon';
import { SubNav } from '../../SubNav';
import { useSubNavTrigger } from '../../SubNav/useSubNavTrigger';
import * as S from '../styles';
import { NavItem } from '../../AppSideNavigation/components/NavItem';
import { type SubNavItemOption, type NavUserItemOption } from '../../types';

interface TopBarUserNavButtonProps {
  item: NavUserItemOption;
  selectedItemKey: string | null;
  onNavItemClick(item: SubNavItemOption): void;
}

export function TopBarUserNavButton({
  item,
  selectedItemKey,
  onNavItemClick,
}: TopBarUserNavButtonProps) {
  const { getSubNavTriggerProps } = useSubNavTrigger<NavUserItemOption>();

  return (
    <>
      <div {...getSubNavTriggerProps(item)}>
        <S.UserButton
          neutral
          leftIcon={<Avatar size="M" url={item.avatarUrl} />}
          rightIcon={<Icon name="chevron_small_down_m" size={24} />}
        >
          {item.label}
        </S.UserButton>
      </div>
      <SubNav.Popper<NavUserItemOption> placement="bottom-end">
        {({ openItem, close }) => (
          <S.PopoverContent>
            <S.NavItemList>
              {openItem?.subNavItems?.map((subNavItem) => (
                <NavItem.Item
                  key={subNavItem.key}
                  isActive={subNavItem.key === selectedItemKey}
                  variant="sub-nav"
                  item={subNavItem}
                  onClick={() => {
                    onNavItemClick(subNavItem);
                    close();
                  }}
                  role="menuitem"
                />
              ))}
            </S.NavItemList>
          </S.PopoverContent>
        )}
      </SubNav.Popper>
    </>
  );
}
