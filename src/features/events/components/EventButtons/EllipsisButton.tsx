import { type Maybe } from '@/apollo/generated/types';
import { type EventFragment } from '@/apollo/graphql';
import { Button } from '@/components/Button';
import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { useClickOutside } from '@/hooks';
import { type EventCardButtonType } from '@/utils/eventCardTypes';
import { t } from 'i18next';
import { useCallback, useMemo, useRef, useState } from 'react';
import { AddToCalendarButton } from './AddToCalendarButton';
import { options } from './constants';
import { EllipsisItems } from './styles';
import { type EventItemProps } from '../EventItem/types';

type EllipsbuttonProps = {
  event: EventFragment;
  onCopyLink?: () => void;
  onEditEvent?: () => void;
  eventCardButtonType?: Maybe<EventCardButtonType>;
  type: EventItemProps['type'];
};

export const EllipsisButton = ({
  event,
  onCopyLink,
  onEditEvent,
  eventCardButtonType,
  type,
}: EllipsbuttonProps) => {
  const dropDownRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  useClickOutside(dropDownRef, true, () => setIsFocused(false));

  const updateOptions = useMemo(() => {
    let filterUpdateoptions: DropdownValueType<string, string>[];
    switch (eventCardButtonType) {
      case 'ATTENDING':
      case 'ATTEND_EVENT':
      case 'INVITED':
        filterUpdateoptions = [];
        break;
      case 'JOIN_EVENT':
      case 'ALREADY_JOINED':
        filterUpdateoptions = options.filter((item) => item.label !== 'Edit');
        break;
      default:
        filterUpdateoptions = options;
        break;
    }
    return filterUpdateoptions;
  }, [eventCardButtonType]);

  const updatePrivacy = useCallback(
    async (option) => {
      setIsFocused(false);
      switch (option) {
        case 'Edit':
          onEditEvent?.();
          break;
        case 'Copy Link':
          onCopyLink?.();
          break;
      }
    },
    [onCopyLink, onEditEvent],
  );
  return (
    <div ref={dropDownRef}>
      <Dropdown
        closeOnSelect
        options={updateOptions}
        isAnimation={false}
        containerWidth="212px"
        onSelectOption={({ value }) => updatePrivacy(value)}
        observerMinHeight="0"
        usePortal={false}
        isOpen={isFocused}
        isShowEmptyText={false}
        optionsRenderer={() => (
          <>
            {updateOptions.map((item) => (
              <EllipsisItems
                key={item.key}
                padding="13px"
                borderBottom
                align="center"
                gap={20}
                onClick={() => updatePrivacy(item.value)}
              >
                {item.icon}
                <TSpan font="body-m-bold">{item.label}</TSpan>
              </EllipsisItems>
            ))}
            <AddToCalendarButton event={event} type={type} />
          </>
        )}
      >
        {({
          targetProps,
          targetRef,
        }: DropdownTargetProps<HTMLButtonElement>) => (
          <Button
            {...targetProps}
            tooltipText={t('noumena.editor.event_more_tool_tip')}
            tooltipPosition="top-center"
            ref={targetRef}
            neutral
            size="small"
            onClick={() => setIsFocused(!isFocused)}
          >
            <Icon
              size={24}
              name="more_m"
              color="--icon-button-neutral-default"
            />
          </Button>
        )}
      </Dropdown>
    </div>
  );
};
