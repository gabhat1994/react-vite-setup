import BasicChipsTabsForm from '@/components/Tabs/TabsForm';

import { eventFilters } from './constants';
import { type EventFilterProps } from './types';
import { EventFiltersWrapper } from './styles';

export const EventFilter = ({
  visible = true,
  activeFilter,
  onChange,
  type,
}: EventFilterProps) => {
  if (!visible) return null;

  return (
    <EventFiltersWrapper
      data-testid="event-filter"
      isCalendar={type === 'calendar'}
    >
      <BasicChipsTabsForm
        onChange={onChange}
        inputList={eventFilters}
        selectedId={activeFilter}
        mode={type === 'calendar' ? 'isUnderline' : 'isBackground'}
        isWithoutImage
        fontSize="--font-input-small-size"
        textFont="--font-body-medium-regular-font"
        manualScroll
        tabWidth={type === 'calendar' ? '55px' : 'auto'}
      />
    </EventFiltersWrapper>
  );
};
