import { Icon } from '@/components/Icon';
import { type IconProps } from '@/components/Icon/Icon';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

interface AttachedFileListItemProps {
  title: string;
  iconName?: IconProps['name'];
}

export function AttachedFileListItem({
  title,
  iconName = 'file_m',
}: AttachedFileListItemProps) {
  return (
    <Stack gap={12} align="center">
      <Icon name={iconName} size={24} />

      <TSpan font="body-m-bold">{title}</TSpan>
    </Stack>
  );
}
