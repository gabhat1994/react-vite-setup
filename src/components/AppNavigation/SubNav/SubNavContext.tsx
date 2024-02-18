import { noop } from 'lodash';
import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { type SubNavDisplayMode, type SubNavItemOption } from './types';

export interface SubNavContextValues<T> {
  openItem: T | null;
  displayMode: SubNavDisplayMode;
  open(item: T): void;
  close(): void;
  toggle(item: T): void;
}

export const SubNavContext = createContext<
  SubNavContextValues<SubNavItemOption>
>({
  openItem: null,
  displayMode: 'popper',
  open: noop,
  close: noop,
  toggle: noop,
});

interface SubNavContextProviderProps {
  children: ReactNode;
  displayMode: SubNavDisplayMode;
  onClose?(): void;
  onOpen?(): void;
}

export function SubNavContextProvider({
  children,
  displayMode,
  onClose,
  onOpen,
}: SubNavContextProviderProps) {
  const [openItem, setOpenItem] = useState<SubNavItemOption | null>(null);

  const value = useMemo(
    () => ({
      openItem,
      displayMode,
      open: (item: SubNavItemOption) => {
        setOpenItem(item);
        onOpen?.();
      },
      close: () => {
        setOpenItem(null);
        onClose?.();
      },
      toggle: (item: SubNavItemOption) => {
        const newOpenItem: SubNavItemOption | null =
          item.key === openItem?.key ? null : item;

        setOpenItem(newOpenItem);
        if (newOpenItem) {
          onOpen?.();
        } else {
          onClose?.();
        }
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openItem],
  );

  return (
    <SubNavContext.Provider value={value}>{children}</SubNavContext.Provider>
  );
}

export function useSubNavContext<T extends SubNavItemOption>() {
  return useContext(SubNavContext) as SubNavContextValues<T>;
}
