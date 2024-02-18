import { t } from 'i18next';
import { useEventTimezone } from '@/features/events/hooks';

import { Container } from './styles';
import { TimezonePicker } from './TimezonePicker';

export const EventTimeZone = () => {
  const {
    timezone,
    availableTimezones,
    searchText,
    loading,
    onChangeTimezone,
    onChangeSearch,
    onFetchMore,
  } = useEventTimezone();

  return (
    <Container noBorder data-testid="event-timezone-wrapper">
      <TimezonePicker
        label={t('noumena.event.modal.timezone')}
        timezone={timezone}
        availableTimezones={availableTimezones}
        searchText={searchText}
        loading={loading}
        onChangeTimezone={onChangeTimezone}
        onChangeSearch={onChangeSearch}
        onFetchMore={onFetchMore}
      />
    </Container>
  );
};
