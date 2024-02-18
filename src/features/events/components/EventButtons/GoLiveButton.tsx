import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { type GoLiveButtonProps } from './types';
import { EventButton } from './styles';

export const GoLiveButton = ({
  width,
  minWidth,
  flex,
  isLoading,
  onClick,
  disabled,
  isColumnBreakPoint,
}: GoLiveButtonProps) => (
  <EventButton
    data-title={
      isColumnBreakPoint ? t('noumena.editor.event.button.go_live') : undefined
    }
    testId="event-go-live-button"
    primary
    width={width}
    minWidth={minWidth}
    flex={flex}
    leftIcon={
      <Icon
        name="wave_right_and_left_m"
        size={24}
        color={
          disabled
            ? '--icon-button-neutral-disabled'
            : '--icon-button-neutral-alt-default'
        }
      />
    }
    loading={isLoading}
    disabled={isLoading || disabled}
    onClick={onClick}
  >
    {isColumnBreakPoint ? '' : t('noumena.editor.event.button.go_live')}
  </EventButton>
);

export default GoLiveButton;
