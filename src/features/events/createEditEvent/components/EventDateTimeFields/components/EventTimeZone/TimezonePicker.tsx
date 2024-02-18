import { t } from 'i18next';
import { useEffect, useMemo, useState } from 'react';

import { Spacer } from '@/layout';
import { Icon } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { Dropdown } from '@/components/Dropdown';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';

import { Label } from './styles';
import type { TimezonePickerProps } from '../../types';
import { PickerRightIcon, TimezonePickerWrapper } from '../../styles';

export const TimezonePicker = ({
  timezone,
  availableTimezones,
  loading,
  searchText,
  onChangeTimezone,
  onChangeSearch,
  onFetchMore,
  label,
}: TimezonePickerProps) => {
  const deviceType = useDeviceType();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isMobile = useMemo(
    () => deviceType === DeviceTypeEnum.MOBILE,
    [deviceType],
  );

  useEffect(() => {
    if (searchText && !isOpen) {
      onChangeSearch('');
    }
  }, [isOpen, onChangeSearch, searchText]);

  const value = timezone
    ? `(${timezone?.utcOffset}) ${timezone?.timezone || ''}`
    : '';

  return (
    <TimezonePickerWrapper data-testid="timezone-picker-wrapper">
      <Dropdown
        hideIcons
        showInternalSearch
        isAnimation={false}
        isLoading={!timezone}
        closeOnSelect
        options={availableTimezones}
        placement="auto"
        inputValue={searchText}
        noAvailableOptionsText={t('noumena.event.modal.no_search_result')}
        noSearchOptionsText={t('noumena.event.modal.no_search_result')}
        onSelectOption={(option) => onChangeTimezone(option.value)}
        onInputChange={onChangeSearch}
        leftIcon={<Icon name="check_xs" size={16} />}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        onFetchMore={onFetchMore}
        containerStyle={{ maxHeight: isMobile ? '100vh' : '396px' }}
      >
        {({ inputProps, inputRef, toggle }) => (
          <Label
            readOnly
            ref={inputRef}
            {...inputProps}
            label={label}
            value={value}
            rightIcon={
              loading ? (
                <>
                  <Spacer width={16} />
                  <Spinner />
                </>
              ) : (
                <PickerRightIcon
                  name="chevron_down_m"
                  isOpen={isOpen}
                  size={16}
                  onClick={toggle}
                  color="--icon-input-neutral-default"
                />
              )
            }
          />
        )}
      </Dropdown>
    </TimezonePickerWrapper>
  );
};
