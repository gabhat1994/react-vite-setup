import { type ReactNode } from 'react';
import * as S from './styles';

interface AppLayoutMainContentProps {
  children: ReactNode;
  fullWidth?: boolean;
}

export function AppLayoutMainContent({
  children,
  fullWidth = false,
}: AppLayoutMainContentProps) {
  return (
    <S.MainContentContainer>
      <S.MainContentBody $fullWidth={fullWidth}>{children}</S.MainContentBody>
    </S.MainContentContainer>
  );
}
