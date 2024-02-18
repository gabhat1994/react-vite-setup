import { Avatar } from '@/components/Avatar/Avatar';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

interface EntityDisplayProps {
  avatarUrl?: string;
  name: string;
}

export function EntityDisplay({ name, avatarUrl }: EntityDisplayProps) {
  return (
    <Stack gap={8} align="center">
      <Avatar size="M" url={avatarUrl} />
      <TSpan font="body-m">{name}</TSpan>
    </Stack>
  );
}
