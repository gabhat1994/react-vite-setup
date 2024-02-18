import { type EventsStatus } from '@/apollo/generated/types';

export interface EventDurationBadgeProps {
  notClickable?: boolean;
  height?: number;
  showEndTime?: boolean;
  eventDate: Date;
  durationInSeconds: number;
  children?: React.ReactNode;
  status?: EventsStatus;
  isEventDetailPage?: boolean;
  isRecurrirng?: boolean;
}

export interface EventDurationBadgeContentProps {
  variant: EventDurationBadgeVariant;
  diffSeconds: number;
  showCountDown?: boolean;
  isToday?: boolean;
  showEndTime?: boolean;
  startDateTime: string;
  startTime: string;
  endTime: string;
}

export type EventDurationBadgeVariant = 'regular' | 'urgent';
