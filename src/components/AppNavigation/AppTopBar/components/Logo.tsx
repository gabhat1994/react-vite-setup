import { TopBarIconButton } from './IconButton';

interface TopBarLogoProps {
  label?: string;
  onClick?(): void;
}

export function TopBarLogo({ label, onClick }: TopBarLogoProps) {
  return (
    <TopBarIconButton
      name="brand_logo"
      color="--bg-brand-logo-brand-primary-default"
      label={label}
      onClick={onClick}
    />
  );
}
