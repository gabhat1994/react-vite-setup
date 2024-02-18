import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { type NavItemOption, type NavUserItemOption } from '../../types';

interface AppSideNavigationContextValues {
  isOpen: boolean;
  selectedItemKey: string | null;
  isExpanded: boolean;
  toggleExpanded(): void;
  createNavItem: NavItemOption;
  mainNavItems: NavItemOption[];
  toolsNavItems: NavItemOption[];
  userNavItem: NavUserItemOption;
  onNavItemClick(item: NavItemOption): void;
  onClose(): void;
  onGoBack?(): void;
}

const AppSideNavigationContext = createContext<AppSideNavigationContextValues>(
  null as unknown as AppSideNavigationContextValues,
);

interface AppSideNavigationProviderProps {
  children: ReactNode;
  isOpen: boolean;
  onClose(): void;
  onGoBack?(): void;
  selectedItemKey: string | null;
  onSelectItem(item: NavItemOption): void;
  createNavItem: NavItemOption;
  mainNavItems: NavItemOption[];
  toolsNavItems: NavItemOption[];
  userNavItem: NavUserItemOption;
  defaultIsExpanded?: boolean;
  onToggleExpanded?(isExpanded: boolean): void;
}

export function AppSideNavigationProvider({
  children,
  isOpen,
  onClose,
  onGoBack,
  selectedItemKey,
  onSelectItem,
  createNavItem,
  mainNavItems,
  toolsNavItems,
  userNavItem,
  defaultIsExpanded = false,
  onToggleExpanded,
}: AppSideNavigationProviderProps) {
  const [isExpanded, setIsExpanded] = useState(defaultIsExpanded);

  const value = useMemo(
    () => ({
      isOpen,
      selectedItemKey,
      onNavItemClick: (item: NavItemOption) => {
        onSelectItem(item);
        onClose();
      },
      onGoBack,
      onClose,
      isExpanded,
      toggleExpanded: () => {
        setIsExpanded((s) => !s);
        onToggleExpanded?.(!isExpanded);
      },
      createNavItem,
      mainNavItems,
      toolsNavItems,
      userNavItem,
    }),
    [
      createNavItem,
      isExpanded,
      isOpen,
      mainNavItems,
      onClose,
      onGoBack,
      onSelectItem,
      onToggleExpanded,
      selectedItemKey,
      toolsNavItems,
      userNavItem,
    ],
  );

  return (
    <AppSideNavigationContext.Provider value={value}>
      {children}
    </AppSideNavigationContext.Provider>
  );
}

export function useAppSideNavigationContext() {
  const context = useContext(AppSideNavigationContext);

  if (!context) {
    throw new Error(
      'useAppSideNavigationContext must be called within AppSideNavigationContext provider.',
    );
  }

  return context;
}
