import { t } from 'i18next';

import { type EventLabelProps } from './types';
import { EventLabelWrapper, Label } from './styles';

export const EventLabel = ({ variant, width, flex }: EventLabelProps) => (
  <EventLabelWrapper
    data-testid="event-label"
    variant={variant}
    width={width}
    flex={flex}
  >
    <Label font="button-m" variant={variant}>
      {variant === 'not_attending' && t('noumena.event.label.not_attending')}
      {variant === 'finished' && t('noumena.event.label.finished')}
      {variant === 'already_joined' && t('noumena.event.label.already_joined')}
    </Label>
  </EventLabelWrapper>
);
