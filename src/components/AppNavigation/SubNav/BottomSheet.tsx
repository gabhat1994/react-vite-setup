import { BottomSheet, BottomSheetList } from '@/components/BottomSheet';
import S from '../AppSideNavigation/components/styles';
import { useSubNavContext } from './SubNavContext';
import { type ChildrenProps, type SubNavItemOption } from './types';
import { getNavItemSubMenuId } from './utils';

interface SubNavBottomSheetProps<T> {
  children(props: ChildrenProps<T>): void;
}

export function SubNavBottomSheet<T extends SubNavItemOption>({
  children,
}: SubNavBottomSheetProps<T>) {
  const subNavContext = useSubNavContext<T>();
  const { openItem, close, displayMode } = subNavContext;

  if (displayMode !== 'bottom-sheet') {
    return null;
  }

  return (
    <BottomSheet
      open={!!openItem}
      onClose={close}
      enableCloseButton
      enableAnimation
      usePortal
      id={openItem ? getNavItemSubMenuId(openItem) : 'sidenav-bottom-sheet'}
      role="menu"
      aria-label={openItem?.label}
    >
      {openItem && (
        <S.Padding top bottom>
          <BottomSheetList>{children(subNavContext)}</BottomSheetList>
        </S.Padding>
      )}
    </BottomSheet>
  );
}
