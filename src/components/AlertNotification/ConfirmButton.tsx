import { Button } from '@/components/Button';
import { type ComponentProps } from 'react';

type ConfirmButtonProps = ComponentProps<typeof Button> & {};

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  primary = true,
  size = 'full_small',
  ...rest
}) => (
  <Button primary={primary} size={size} {...rest}>
    {rest.children}
  </Button>
);
