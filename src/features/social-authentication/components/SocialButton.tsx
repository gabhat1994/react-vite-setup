import { Icon, TSpan } from '@/components';
import { type ButtonProps } from '@/components/Button/types';
import { type IconProps } from '@/components/Icon/Icon';
import { StyledButton } from './styles';

type SocialAuthenticationProps = ButtonProps & {
  name: IconProps['name'];
  label: string;
};

export const SocialButton = ({
  name,
  label,
  ...rest
}: SocialAuthenticationProps) => (
  <StyledButton leftIcon={<Icon name={name} size={24} />} size="full" {...rest}>
    <TSpan font="button-m" colorToken="--text-button-neutral-default">
      {label}
    </TSpan>
  </StyledButton>
);
