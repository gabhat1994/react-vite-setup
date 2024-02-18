import { formatSectionedDate } from '@/utils/date';
import { TimeAgo } from './styles';
import { type NotificationTimestampProps } from './types';

export function NotificationTimestamp({ value }: NotificationTimestampProps) {
  return (
    <TimeAgo data-testid="notification-timestamp">
      {formatSectionedDate(value)}
    </TimeAgo>
  );
}
