import { Button } from '@/components/Button';
import { useNotificationButton } from './NotificationButtons';
import { type NotificationButtonProps } from './types';

export function NotificationButton({
  variant,
  onClick,
  ...buttonProps
}: NotificationButtonProps) {
  const { loadingVariant, onButtonClick } = useNotificationButton();

  return (
    <Button
      {...buttonProps}
      primary={variant === 'primary'}
      secondary={variant === 'secondary'}
      size="small"
      disabled={loadingVariant !== null}
      loading={loadingVariant === variant}
      onClick={(e) => {
        // Prevent bubbling up to notification item, as it has its own onClick handler.
        e.stopPropagation();
        if (onClick) {
          onButtonClick(variant, () => onClick?.(e));
        }
      }}
    />
  );
}
