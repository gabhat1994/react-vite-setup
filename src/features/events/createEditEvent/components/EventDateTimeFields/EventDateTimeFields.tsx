import { Spacer } from '@/layout';
import { FieldWrapper } from '@/features/events/styles';

import { EventTime } from './components/EventTime';
import { EventDateTimeFieldsWrapper } from './styles';
import { EventRepeat } from './components/EventRepeat';
import { EventTimeZone } from './components/EventTimeZone';

export const EventDateTimeFields = () => (
  <FieldWrapper>
    <EventDateTimeFieldsWrapper data-testid="event-datetime-fields-wrapper">
      <EventTime />
      <Spacer height={16} />
      <EventTimeZone />
      <Spacer height={16} />
      <EventRepeat />
    </EventDateTimeFieldsWrapper>
  </FieldWrapper>
);
