import { type EventFragment } from '@/apollo/graphql';

export interface EventDetailModalProps {
  isOpen: boolean;
  eventId: string;
  onClose?: () => void;
  onEditEvent?: (ev: EventFragment) => void;
}
