import { noop } from 'lodash';
import {
  createContext,
  type ReactNode,
  useMemo,
  useContext,
  useState,
  type SetStateAction,
  type Dispatch,
} from 'react';
import { useNavigate } from 'react-router';
import { type AppLayoutMode } from './types';

interface AppLayoutContextValues {
  isSideMenuOpen: boolean;
  toggleSideMenu: Dispatch<SetStateAction<boolean>>;
  hasSideNav: boolean;
  onGoBack?(): void;
  onNavigate(url: string): void;
}

const AppLayoutContext = createContext<AppLayoutContextValues>({
  isSideMenuOpen: false,
  toggleSideMenu: noop,
  hasSideNav: false,
  onGoBack: undefined,
  onNavigate: noop,
});

export interface AppLayoutProviderProps {
  children: ReactNode;
  mode?: AppLayoutMode;
  hasSideNav: boolean;
  onGoBack?(): void;
}
export function AppLayoutProvider({
  children,
  mode = 'normal',
  hasSideNav,
  onGoBack,
}: AppLayoutProviderProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const navigate = useNavigate();

  const value = useMemo(
    () => ({
      isSideMenuOpen,
      toggleSideMenu: setIsSideMenuOpen,
      hasSideNav,
      onGoBack,
      onNavigate: (url: string) => {
        if (mode === 'focused') {
          window.open(url, '_blank');
        } else {
          navigate(url);
        }
      },
    }),
    [isSideMenuOpen, hasSideNav, onGoBack, mode, navigate],
  );

  return (
    <AppLayoutContext.Provider value={value}>
      {children}
    </AppLayoutContext.Provider>
  );
}

export function useAppLayout() {
  return useContext(AppLayoutContext);
}
