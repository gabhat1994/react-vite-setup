import { useCallback, useMemo, useRef, useLayoutEffect, useState } from 'react';
import { t } from 'i18next';

import { Icon } from '@/components/Icon';
import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import { type AttendingButtonProps, type EventAttendingOption } from './types';
import {
  AttendingButtonWrapper,
  AttendingOptionWrapper,
  AttendingSelectedOptionWrapper,
  AttendingOptionIcon,
  AttendingLabel,
  SpinnerContainer,
} from './styles';

export const AttendingButton = ({
  isAttending,
  width,
  flex,
  loading,
  onAttending,
  onNotAttending,
  isColumnBreakPoint,
}: AttendingButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<string>('100%');

  useLayoutEffect(() => {
    setContainerWidth(`${containerRef.current?.scrollWidth ?? 0}px`);
  }, []);

  const options: DropdownValueType<EventAttendingOption>[] = useMemo(
    () => [
      {
        key: 'event_attending',
        label: t('noumena.event.button.attending'),
        type: 'value',
        value: 'attending',
        selected: !!isAttending,
      },
      {
        key: 'event_not_attending',
        label: t('noumena.event.button.not_attending'),
        type: 'value',
        value: 'not_attending',
        selected: !isAttending,
      },
    ],
    [isAttending],
  );

  const onSelect = useCallback(
    (v: string) => {
      if (v === 'attending') onAttending();
      else if (v === 'not_attending') onNotAttending();
    },
    [onAttending, onNotAttending],
  );

  const tooltipContent = useMemo(() => {
    let content;
    if (isColumnBreakPoint) {
      if (isAttending) {
        content = t('noumena.event.button.attending');
      } else {
        content = t('noumena.event.button.not_attending');
      }
    } else {
      content = undefined;
    }
    return content;
  }, [isAttending, isColumnBreakPoint]);

  return (
    <AttendingButtonWrapper
      data-title={tooltipContent}
      ref={containerRef}
      data-testid="attending-button-wrapper"
      width={width}
      flex={flex}
      isAttending={isAttending}
      disabled={Boolean(loading)}
    >
      <Dropdown
        hideIcons
        closeOnSelect
        disabled={Boolean(loading)}
        placement="bottom-end"
        options={options}
        usePortal
        usePopStyle
        containerWidth="auto"
        containerStyle={{
          minHeight: '97px',
          minWidth: containerWidth,
          padding: 0,
        }}
        onSelectOption={({ value }) => onSelect(value)}
        optionsRenderer={(_, handleSelectOption) =>
          options.map((o) => (
            <AttendingOptionWrapper
              key={o.key}
              neutral
              size="full"
              leftIcon={<AttendingOptionIcon selected={o.selected} />}
              onClick={() => handleSelectOption(o)}
            >
              <TSpan font="body-m-bold">{o.label}</TSpan>
            </AttendingOptionWrapper>
          ))
        }
      >
        {({ targetProps, targetRef }: DropdownTargetProps<HTMLDivElement>) => (
          <AttendingSelectedOptionWrapper
            ref={targetRef}
            {...targetProps}
            data-testid="attending-button"
          >
            {loading ? (
              <SpinnerContainer>
                <Spinner />
              </SpinnerContainer>
            ) : isAttending ? (
              <Icon
                name="notification_filled_m"
                size={24}
                color="--icon-skillbadge-brand-primary-selected"
              />
            ) : (
              <Icon name="notification_off_m" size={20} />
            )}
            <AttendingLabel
              data-testid="attending-label"
              font="button-m"
              colorToken="--text-button-brand-secondary-default"
            >
              {isColumnBreakPoint
                ? ''
                : isAttending
                ? t('noumena.event.button.attending')
                : t('noumena.event.button.not_attending')}
            </AttendingLabel>
          </AttendingSelectedOptionWrapper>
        )}
      </Dropdown>
    </AttendingButtonWrapper>
  );
};

export default AttendingButton;
