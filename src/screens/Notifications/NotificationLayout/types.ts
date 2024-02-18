import { type ButtonProps } from '@/components/Button/types';

type Avatars = Array<string | undefined>;

export interface NotificationItemProps {
  avatars: Avatars;
  isViewed: boolean;
  title?: React.ReactNode;
  body: React.ReactNode;
  timestamp: string | Date;
  buttons?: React.ReactNode;
  redirectUrl?: string;
  message?: string | undefined | null;
  ['data-testid']?: string;
  onClick?: () => void;
  avatarMode?: NotificationAvatarMode;
  hideButtonsAfterAction?: boolean;
}

type NotificationAvatarMode = 'inline' | 'nested';

export interface NotificationAvatarProps {
  avatars: Avatars;
  mode?: NotificationAvatarMode;
}

export interface NotificationTimestampProps {
  value: string | Date;
}

export type LayoutProps = Pick<NotificationItemProps, 'isViewed'>;

export type NotificationButtonVariant = 'primary' | 'secondary';

export type NotificationButtonProps = Omit<
  ButtonProps,
  'size' | 'primary' | 'secondary' | 'tertiary'
> & {
  variant: NotificationButtonVariant;
};
