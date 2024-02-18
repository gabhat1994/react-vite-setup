import { Button } from '@/components/Button';
import { type ComponentProps } from 'react';

type ConfirmButtonProps = ComponentProps<typeof Button> & {};

export const DismissButton: React.FC<ConfirmButtonProps> = ({
  tertiary = true,
  size = 'full_small',
  ...rest
}) => (
  <Button tertiary={tertiary} size={size} {...rest}>
    {rest.children}
  </Button>
);
