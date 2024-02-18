import { Button, Icon } from '@/components';
import { DatePicker } from '@/components/DatePicker';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { TextField } from '@/components/TextField';
import { Stack } from '@/layout';
import React, { useMemo, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { type Maybe } from '@/common/types';
import { useBreakpoints } from '@/hooks';
import { type StatsDateType } from './types';
import { MembersStatsDateUtils } from './utils';

interface MembersStatsDateProps {
  defaultType?: StatsDateType;
  selectedDate: Maybe<DateRange>;
  onChange: (value: Maybe<DateRange>) => void;
}

export const MembersStatsDate: React.FC<MembersStatsDateProps> = ({
  defaultType = 'weekly',
  selectedDate,
  onChange,
}) => {
  const { isMobile } = useBreakpoints();
  const [selectedType, setSelectedType] = useState<StatsDateType>(defaultType);

  const selectedOption = useMemo(
    () =>
      MembersStatsDateUtils.dropdownOptions.find(
        (option) => option.value === selectedType,
      ),
    [selectedType],
  );

  const handleSelectType = (value: StatsDateType) => {
    if (value === 'custom') {
      onChange(null);
    } else {
      onChange(
        MembersStatsDateUtils.getPrevDate(
          {
            from: new Date(),
            to: new Date(),
          },
          value,
        ),
      );
    }

    setSelectedType(value);
  };

  const handlePressLeft = () => {
    onChange(MembersStatsDateUtils.getPrevDate(selectedDate, selectedType));
  };

  const handlePressRight = () => {
    onChange(MembersStatsDateUtils.getNextDate(selectedDate, selectedType));
  };

  return (
    <Stack gap={16} vertical={isMobile} fullWidth={isMobile}>
      <Stack fullWidth={isMobile}>
        <Dropdown
          hideIcons
          containerWidth="280px"
          onSelectOption={(option) => handleSelectType(option.value)}
          options={MembersStatsDateUtils.dropdownOptions}
          renderContainerFromBottom={isMobile}
        >
          {({ targetRef, toggle }: DropdownTargetProps<HTMLButtonElement>) => (
            <Button
              ref={targetRef}
              size={isMobile ? 'full_small' : 'small'}
              tertiary
              rightIcon={
                <Icon
                  name="chevron_down_m"
                  size={16}
                  color="--icon-input-neutral-default"
                />
              }
              onClick={toggle}
            >
              {selectedOption?.label}
            </Button>
          )}
        </Dropdown>
      </Stack>

      <Stack fullWidth={isMobile}>
        {selectedType !== 'custom' ? (
          <Stack gap={8} fullWidth={isMobile}>
            <Button
              size="small"
              icon={
                <Icon
                  name="chevron_left_m"
                  size={16}
                  color="--icon-button-neutral-default"
                />
              }
              onClick={handlePressLeft}
            />

            <TextField
              value={MembersStatsDateUtils.formatDateRange(selectedDate)}
              inputSize="small"
              readOnly
            />

            <Button
              size="small"
              icon={
                <Icon
                  name="chevron_right_m"
                  size={16}
                  color="--icon-button-neutral-default"
                />
              }
              onClick={handlePressRight}
            />
          </Stack>
        ) : (
          <DatePicker
            minWidth="240px"
            minPopperWidth="320px"
            size="small"
            placement="bottom-end"
            fullSize={isMobile}
            label=""
            placeholder="Select Date"
            onChangeRange={onChange}
            rangeValue={selectedDate ?? undefined}
            mode="range"
            layout="buttons"
          />
        )}
      </Stack>
    </Stack>
  );
};
