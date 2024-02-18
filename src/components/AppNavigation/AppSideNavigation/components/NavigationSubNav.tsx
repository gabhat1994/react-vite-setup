import {
  BottomSheetListButton,
  BottomSheetListSeparator,
} from '@/components/BottomSheet';
import { Fragment } from 'react';
import { SubNav } from '../../SubNav';
import { useAppSideNavigationContext } from '../contexts/AppSideNavigationContext';
import { type NavItemOption } from '../../types';
import { NavItem } from './NavItem';
import S from './styles';

export function NavigationSubNav() {
  const { selectedItemKey, onNavItemClick } = useAppSideNavigationContext();

  return (
    <>
      <SubNav.BottomSheet<NavItemOption>>
        {({ openItem, close }) => (
          <>
            {openItem?.subNavItems?.map((item, index) => (
              <Fragment key={item.key}>
                {index > 0 && <BottomSheetListSeparator />}
                <BottomSheetListButton
                  onClick={() => {
                    onNavItemClick(item);
                    close();
                  }}
                >
                  {item.label}
                </BottomSheetListButton>
              </Fragment>
            ))}
          </>
        )}
      </SubNav.BottomSheet>

      <SubNav.Popper<NavItemOption> placement="right-start" distance={1}>
        {({ openItem, close }) => (
          <S.PopoverContent>
            <S.NavItemList>
              {openItem?.subNavItems?.map((item) => (
                <NavItem.Item
                  key={item.key}
                  isActive={item.key === selectedItemKey}
                  variant="sub-nav"
                  item={item}
                  onClick={() => {
                    onNavItemClick(item);
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
