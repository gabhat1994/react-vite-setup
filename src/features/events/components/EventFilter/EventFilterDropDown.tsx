import { Icon } from '@/components/Icon';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { eventFiltersDropDown } from './constants';
import { type EventFilterProps } from './types';
import { EventFilterDropdownButton } from './styles';

export const EventFilterDropDown = ({
  activeFilter,
  onChange,
}: Omit<EventFilterProps, 'type'>) => (
  <Stack padding="0 16px" fullWidth vertical>
    <Dropdown
      closeOnSelect
      hideIcons
      placement="bottom"
      options={eventFiltersDropDown}
      isAnimation={false}
      onSelectOption={({ value }) => {
        onChange(value);
      }}
      observerMinHeight="0"
      usePortal={false}
      containerWidth="100%"
    >
      {({
        targetProps,
        targetRef,
        toggle,
      }: DropdownTargetProps<HTMLDivElement>) => (
        <EventFilterDropdownButton
          {...targetProps}
          ref={targetRef}
          onClick={toggle}
          justify="space-between"
          fullWidth
          align="center"
          padding="8px"
        >
          <TSpan font="input-m">
            {
              eventFiltersDropDown.filter(
                (item) => item.key === activeFilter,
              )[0].label
            }
          </TSpan>
          <Icon
            size={15}
            name="chevron_down_m"
            color="--icon-button-neutral-default"
          />
        </EventFilterDropdownButton>
      )}
    </Dropdown>
  </Stack>
);
