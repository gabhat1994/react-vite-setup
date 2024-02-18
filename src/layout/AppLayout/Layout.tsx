import { type ReactNode } from 'react';
import { StackItem } from '../Stack';
import {
  AppLayoutProvider,
  type AppLayoutProviderProps,
} from './AppLayoutContext';
import * as S from './styles';
import { type AppLayoutBackground } from './types';

interface AppLayoutLayoutProps
  extends Omit<AppLayoutProviderProps, 'hasSideNav'> {
  topNavbar?: ReactNode;
  sideNav?: ReactNode;
  children: ReactNode;
  background?: AppLayoutBackground;
}

export function AppLayoutLayout({
  topNavbar,
  sideNav,
  children,
  background = 'neutral-alt-highlighted',
  ...providerProps
}: AppLayoutLayoutProps) {
  return (
    <AppLayoutProvider {...providerProps} hasSideNav={!!sideNav}>
      <S.LayoutContainer $background={background}>
        <StackItem>{topNavbar}</StackItem>
        <S.LayoutBody>
          {sideNav}
          <S.LayoutMainContent>{children}</S.LayoutMainContent>
        </S.LayoutBody>
      </S.LayoutContainer>
    </AppLayoutProvider>
  );
}
