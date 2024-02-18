import { forwardRef, type Ref, type HTMLAttributes } from 'react';
import { HeaderWrapper } from './styles';

interface IHeader extends HTMLAttributes<HTMLDivElement> {
  isBorderRadius?: boolean;
}

export const Header = forwardRef(
  (
    { isBorderRadius = true, children, ...rest }: IHeader,
    ref: Ref<HTMLDivElement>,
  ) => (
    <HeaderWrapper
      ref={ref}
      isBorderRadius={isBorderRadius}
      data-testid="header"
      {...rest}
    >
      {children}
    </HeaderWrapper>
  ),
);
