import { forwardRef, type Ref, type HTMLAttributes } from 'react';
import { SubHeaderWrapper } from './styles';

interface IHeader extends HTMLAttributes<HTMLDivElement> {}

export const SubHeader = forwardRef(
  ({ children, ...rest }: IHeader, ref: Ref<HTMLDivElement>) => (
    <SubHeaderWrapper ref={ref} data-testid="SubHeader" {...rest}>
      {children}
    </SubHeaderWrapper>
  ),
);
