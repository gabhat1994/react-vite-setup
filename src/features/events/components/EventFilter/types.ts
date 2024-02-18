import { type EventItemProps } from '../EventItem/types';

export interface EventFilterProps {
  visible?: boolean;
  activeFilter: string;
  onChange: (f: string) => void;
  type: EventItemProps['type'];
}
