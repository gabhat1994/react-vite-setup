import { t } from 'i18next';
import { subDays } from 'date-fns';

import { TSpan } from '@/components';
import { DatePicker } from '@/components/DatePicker';
import { useEventDateTime } from '@/features/events/hooks';
import { useCreateEditEventContext } from '@/features/events/contexts';

import {
  Container,
  DateTimeContainer,
  TimePickerContainer,
  StartToEndTimeLabel,
  DateTimeSeparator,
} from './styles';
import { EventTimePicker } from '../EventTimePicker';
import { EventDurationPicker } from '../EventDurationPicker';

export const EventTime = () => {
  const { eventDate, setEventDate, onSetFormEventDate } =
    useCreateEditEventContext();

  const initialDate = eventDate || new Date();

  const startDate = useEventDateTime({
    initialDate,
    error: false,
    onChange: (date) => {
      setEventDate(date);
      onSetFormEventDate(date);
    },
  });

  if (!startDate.date || !startDate.time) return null;

  return (
    <Container data-testid="event-datetime-wrapper">
      <DateTimeContainer vertical fullWidth data-testid="date-time-container">
        <DatePicker
          required
          error={startDate.dateTimeError}
          placement="bottom-end"
          dateFormat="MMM dd, yyyy"
          showIcon={true}
          label="Date"
          value={startDate.date}
          disabled={{ from: new Date(0), to: subDays(new Date(), 1) }}
          onChange={(newDate?: Date) => {
            startDate.onChangeDateTime('date', newDate);
          }}
        />
        <DateTimeSeparator />
        <TimePickerContainer align="center" basis="0" grow={1}>
          <EventTimePicker
            date={startDate.date}
            time={startDate.time}
            availableTimes={startDate.availableTimes}
            error={startDate.dateTimeError}
            onChange={(newDate?: Date) => {
              startDate.onChangeDateTime('time', newDate);
            }}
          />
          <StartToEndTimeLabel>
            <TSpan colorToken="--text-card-neutral-default" font="body-l">
              {t('noumena.event.modal.date_time_to')}
            </TSpan>
          </StartToEndTimeLabel>
          <EventDurationPicker />
        </TimePickerContainer>
      </DateTimeContainer>
    </Container>
  );
};
