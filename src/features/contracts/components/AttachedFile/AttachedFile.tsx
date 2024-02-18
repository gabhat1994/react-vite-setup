import { Icon } from '@/components/Icon';
import { type IconProps } from '@/components/Icon/Icon';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

interface AttachedFileProps {
  title: string;
  iconName?: IconProps['name'];
}

export function AttachedFile({
  title,
  iconName = 'file_xs',
}: AttachedFileProps) {
  return (
    <Stack gap={8} align="center">
      <Icon name={iconName} size={16} />
      <TSpan font="body-m">{title}</TSpan>
    </Stack>
  );
}
