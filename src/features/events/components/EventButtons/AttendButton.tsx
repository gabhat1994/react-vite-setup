import { t } from 'i18next';

import { Icon } from '@/components/Icon';
import { type AttendButtonProps } from './types';
import { EventButton } from './styles';

export const AttendButton = ({
  width,
  minWidth,
  flex,
  isLoading,
  onClick,
  isColumnBreakPoint,
}: AttendButtonProps) => (
  <EventButton
    tooltipText={
      isColumnBreakPoint ? t('noumena.event.button.attend') : undefined
    }
    tooltipPosition="top-center"
    testId="attend-button"
    tertiary
    width={width}
    minWidth={minWidth}
    flex={flex}
    leftIcon={<Icon name="notifications_m" size={24} />}
    loading={isLoading}
    disabled={isLoading}
    onClick={onClick}
  >
    {isColumnBreakPoint ? '' : t('noumena.event.button.attend')}
  </EventButton>
);

export default AttendButton;
