import { type ReactNode } from 'react';
import { Avatar } from '@/components/Avatar/Avatar';
import { Icon } from '@/components/Icon';
import S from '../styles';

interface NavItemUserButtonProps {
  avatarUrl: string;
  children: ReactNode;
}

export function NavItemUserButton({
  avatarUrl,
  children,
}: NavItemUserButtonProps) {
  return (
    <S.UserButton
      neutral
      leftIcon={<Avatar size="M" url={avatarUrl} />}
      rightIcon={<Icon name="chevron_small_right_m" size={24} />}
    >
      {children}
    </S.UserButton>
  );
}
