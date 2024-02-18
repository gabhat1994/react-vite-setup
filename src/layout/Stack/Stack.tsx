import { forwardRef, type HTMLAttributes, type Ref } from 'react';
import { StackItemStyled, StackStyled } from './styles';

import { type ItemProps, type StackProps } from './types';

export const StackItem = ({
  children,
  ...props
}: ItemProps & HTMLAttributes<HTMLDivElement>) => (
  <StackItemStyled data-testid="stackitem" {...props}>
    {children}
  </StackItemStyled>
);

StackStyled.displayName = 'Stack';

export const Stack = forwardRef(
  (
    { children, ...props }: StackProps & HTMLAttributes<HTMLDivElement>,
    ref: Ref<HTMLDivElement>,
  ) => (
    <StackStyled data-testid="stack" ref={ref} {...props}>
      {children}
    </StackStyled>
  ),
);

/**
 * A Stack is a container that helps you define the layout of children components.
 * This is basically a wrapper around flexbox.
 */
export default Stack;
