export type EventLabelVariant = 'not_attending' | 'finished' | 'already_joined';

export interface EventLabelProps {
  variant: EventLabelVariant;
  width?: string;
  flex?: number | string;
}
