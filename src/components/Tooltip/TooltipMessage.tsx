import { type ReactNode } from 'react';
import * as S from './styles';

interface TooltipMessageProps {
  children: ReactNode;
}

export function TooltipMessage({ children }: TooltipMessageProps) {
  return (
    <S.TooltipMessageContainer>
      <S.TooltipMessage>{children}</S.TooltipMessage>
    </S.TooltipMessageContainer>
  );
}
