import { Button, Icon } from '@/components';
import { type SwiperButtonProps } from './types';

export function SwiperButton({ variant, disable, onClick }: SwiperButtonProps) {
  return (
    <Button
      tertiary
      onClick={onClick}
      leftIcon={
        <Icon
          name={
            variant === 'previous'
              ? 'chevron_small_left_m'
              : 'chevron_small_right_m'
          }
          size={24}
          color={
            disable
              ? '--icon-button-neutral-disabled'
              : '--icon-button-neutral-default'
          }
        />
      }
    />
  );
}
