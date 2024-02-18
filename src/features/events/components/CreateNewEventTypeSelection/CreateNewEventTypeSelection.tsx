import { Icon } from '@/components/Icon';
import { useBreakpoints } from '@/hooks';
import { Button } from '@/components/Button';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { addEventDropdownOptions } from '@/screens/Chamber/components/elements/CalendarEvent/CalendarElement/constants';
import { ButtonUtils } from '@/components/Button/utils';
import { useUserLiveEventDetails } from '../../hooks';
import type { CreateNewEventTypeSelectionProps } from './types';

export const CreateNewEventTypeSelection = ({
  chamberId,
  hasEvents,
  isPrimaryBtn = true,
  tooltipMessage,
  tooltipVisibility,
  tooltipPosition,
  handleDropdownClick,
}: CreateNewEventTypeSelectionProps) => {
  const { isMobile } = useBreakpoints();
  const { isAnotherEventLive } = useUserLiveEventDetails(chamberId);

  return (
    <Dropdown
      hideIcons
      disabled={!hasEvents}
      onSelectOption={handleDropdownClick}
      options={addEventDropdownOptions(isAnotherEventLive)}
      usePortal={isMobile}
      observerMinHeight="0"
      containerPadding="12px"
      containerWidth={isAnotherEventLive ? 'auto' : '150px'}
      padding="0"
    >
      {({ targetProps, targetRef }: DropdownTargetProps<HTMLButtonElement>) => (
        <Button
          disabled={tooltipVisibility}
          data-testId="event-type-btn-trigger"
          ref={targetRef}
          {...targetProps}
          {...ButtonUtils.getTooltipProps({
            message: tooltipMessage || '',
            position: tooltipPosition,
            visible: tooltipVisibility,
          })}
          size="small"
          loading={!hasEvents}
          icon={
            <Icon
              name="add_s"
              size={16}
              color={
                isPrimaryBtn
                  ? '--icon-button-neutral-alt-default'
                  : '--icon-button-brand-secondary-default'
              }
            />
          }
          primary={isPrimaryBtn}
          secondary={!isPrimaryBtn}
        />
      )}
    </Dropdown>
  );
};
