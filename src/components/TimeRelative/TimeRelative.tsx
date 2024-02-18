import { type FC, useMemo } from 'react';
import { formatDistance } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { TSpan } from '../Typography';
import { type TimeRelativeProps } from './types';

export const TimeRelative: FC<TimeRelativeProps> = ({
  date,
  fromDate,
  font,
  colorToken,
}) => {
  const { t } = useTranslation();
  const text = formatDistance(date, fromDate || new Date());

  const formatedTimeString = useMemo(
    () =>
      !fromDate && text === 'less than a minute'
        ? t('noumena.notification.now')
        : new Date(date).getTime() <
          (fromDate ? new Date(fromDate).getTime() : Date.now())
        ? t('noumena.notification.time_ago', { timeString: text })
        : t('noumena.notification.time_later', { timeString: text }),
    [fromDate, date, text, t],
  );

  return (
    <TSpan
      data-testid="time-relative-testid"
      font={font}
      colorToken={colorToken}
    >
      {formatedTimeString}
    </TSpan>
  );
};

export default TimeRelative;
