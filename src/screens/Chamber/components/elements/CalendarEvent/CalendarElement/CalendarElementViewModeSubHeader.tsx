import { EventFilter } from '@/features/events/components';

import { type SubHeaderProps } from './types';
import { SubHeaderWrapper } from './styles';

export const CalendarElementViewModeSubHeader = ({
  activeFilter,
  onFilterChange,
}: SubHeaderProps) => (
  <SubHeaderWrapper data-testid="calendar-element-viewmode-subheader">
    <EventFilter
      visible
      activeFilter={activeFilter}
      onChange={onFilterChange}
      type="calendar"
    />
  </SubHeaderWrapper>
);
