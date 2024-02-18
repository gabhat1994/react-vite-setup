import { type ReactNode } from 'react';
import { SubNavContextProvider } from '../SubNav/SubNavContext';
import * as S from './styles';

interface AppTopBarProps {
  children: ReactNode;
}

export function AppTopBar({ children }: AppTopBarProps) {
  return (
    <SubNavContextProvider displayMode="popper">
      <S.TopBarContainer>{children}</S.TopBarContainer>
    </SubNavContextProvider>
  );
}
