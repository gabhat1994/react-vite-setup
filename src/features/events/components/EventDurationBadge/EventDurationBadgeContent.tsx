import { type FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Timer from '@/components/Timer/Timer';
import { EventDurationText } from './styles';
import { type EventDurationBadgeContentProps } from './types';

export const EventDurationBadgeContent: FC<EventDurationBadgeContentProps> = ({
  variant,
  diffSeconds,
  showCountDown,
  startDateTime,
  startTime,
  endTime,
  isToday = false,
  showEndTime,
}) => {
  const { t } = useTranslation();
  let content: JSX.Element | string = '';
  let colorToken = '--text-badge-neutral-default';

  if (variant === 'urgent') {
    colorToken = '--text-badge-neutral-alt-default';
    content = t('noumena.event.event_duration.live_now');
  } else if (!showCountDown) {
    if (isToday && showEndTime) {
      content = t('noumena.date.today_start_end_time', { startTime, endTime });
    } else if (isToday) {
      content = t('noumena.date.today_start_time', { startTime });
    } else {
      content = `${startDateTime} - ${endTime}`;
    }
  } else if (diffSeconds > 60)
    content = (
      <Trans
        i18nKey="noumena.event.event_duration.starts_in"
        components={{
          timer: <Timer initialSeconds={diffSeconds} unit="minute" />,
        }}
      />
    );
  if (!content) return null;

  return (
    <EventDurationText colorToken={colorToken}>{content}</EventDurationText>
  );
};
