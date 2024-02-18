import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { Icon } from '@/components/Icon';
import S from '../styles';

interface NavItemCreateButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  showIconOnly?: boolean;
}

export const NavItemCreateButton = forwardRef<
  HTMLButtonElement,
  NavItemCreateButtonProps
>(({ children, showIconOnly, ...buttonProps }, ref) => {
  if (showIconOnly) {
    return (
      <S.IconButton
        ref={ref}
        icon={<Icon name="add_m" size={24} />}
        {...buttonProps}
      />
    );
  }

  return (
    <S.CreateButton
      ref={ref}
      leftIcon={<Icon name="add_m" size={24} />}
      {...buttonProps}
    >
      {showIconOnly ? null : children}
    </S.CreateButton>
  );
});
