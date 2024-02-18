import { type ReactNode } from 'react';
import { type FontType, TSpan } from '@/components/Typography/Typography';
import * as S from './styles';

interface ButtonLinkProps {
  children: ReactNode;
  onClick: () => void;
  font?: FontType;
  colorToken?: string;
}

export function ButtonLink({
  children,
  font,
  colorToken,
  ...buttonProps
}: ButtonLinkProps) {
  return (
    <S.ButtonLink {...buttonProps}>
      <TSpan font={font} colorToken={colorToken}>
        {children}
      </TSpan>
    </S.ButtonLink>
  );
}
