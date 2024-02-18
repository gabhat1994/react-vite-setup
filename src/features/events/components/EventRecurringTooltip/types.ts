import type { RecurringDetails } from '@/apollo/generated/types';
import type { EventDurationBadgeVariant } from '../EventDurationBadge';
import type { TooltipPosition } from '../EventItem/types';

export interface EventRecurringProps {
  position: TooltipPosition;
  recurringDetails: RecurringDetails;
  variant: EventDurationBadgeVariant;
}
