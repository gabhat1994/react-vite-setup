type DurationFormat = 'simple' | 'formatted';

export const getFormattedDuration = (
  length: number,
  format: DurationFormat = 'simple',
): string => {
  if (length === 0) return format === 'simple' ? `00:00` : '0 s';

  let formattedDuration = '';
  const hours = Math.floor(length / 3600);

  if (hours > 0)
    formattedDuration = `${hours}${format === 'formatted' ? ' h ' : ':'}`;

  const minutes = Math.floor((length % 3600) / 60);
  formattedDuration += `${
    formattedDuration
      ? String(minutes).padStart(2, '0')
      : format === 'formatted' && minutes === 0
      ? ''
      : String(minutes).padStart(2, '0')
  }`;
  formattedDuration += formattedDuration
    ? format === 'formatted'
      ? ' m '
      : ':'
    : '';

  const seconds = Math.floor(length % 60);
  formattedDuration += `${String(seconds).padStart(2, '0')}${
    format === 'formatted' ? ' s' : ''
  }`;

  return formattedDuration;
};
