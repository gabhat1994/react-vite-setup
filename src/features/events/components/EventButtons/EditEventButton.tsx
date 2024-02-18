import { t } from 'i18next';

import { Icon } from '@/components/Icon';
import { type EditEventButtonProps } from './types';
import { EventButton } from './styles';

export const EditEventButton = ({
  width,
  flex,
  iconOnly,
  onClick,
}: EditEventButtonProps) => (
  <EventButton
    testId="edit-event-button"
    tertiary
    iconOnly={iconOnly}
    width={width}
    flex={flex}
    leftIcon={
      <Icon name="edit_m" color="--icon-button-neutral-default" size={24} />
    }
    onClick={onClick}
  >
    {!iconOnly && t('noumena.event.button.edit_event')}
  </EventButton>
);

export default EditEventButton;
