import { t } from 'i18next';

import { Icon } from '@/components/Icon';
import { type JoinButtonProps } from './types';
import { EventButton } from './styles';

export const JoinEventButton = ({
  width,
  flex,
  onClick,
  isColumnBreakPoint,
}: JoinButtonProps) => (
  <EventButton
    data-title={
      isColumnBreakPoint
        ? t('noumena.editor.event.button.join_event')
        : undefined
    }
    testId="join-event-button"
    primary
    width={width}
    flex={flex}
    onClick={onClick}
    rightIcon={<Icon name="enter_event_m" size={24} />}
  >
    {isColumnBreakPoint ? '' : t('noumena.editor.event.button.join_event')}
  </EventButton>
);

export default JoinEventButton;
