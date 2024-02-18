import { t } from 'i18next';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { Radiobox } from '@/components/Radiobox';
import { TSpan } from '@/components/Typography';
import {
  DropdownItemLayout,
  DropDownLabel,
} from '@/components/Dropdown/styles';
import { ConversationType } from '@/features/conversation/types';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import { type Placement } from '@popperjs/core';
import { MessageElementContext } from '../contexts/MessageElementProvider';

const filterOptions: DropdownValueType<ConversationType>[] = [
  {
    label: t(`noumena.message.my_conversations`),
    key: 'myconversation',
    type: 'value',
    value: ConversationType.PROJECT_OWNER,
  },
  {
    label: t(`noumena.message.other_users_conversation`),
    key: 'othersconversation',
    type: 'value',
    value: ConversationType.PROJECT_OWNER_OTHERS,
  },
];

type FilterDropDownProps = {
  placement?: Placement;
};

export default function FilterDropDown({ placement }: FilterDropDownProps) {
  const { isNewConversation, isOthersConversations, setIsOthersConversations } =
    useContext(MessageElementContext);
  const { setActiveConversationSid } = useContext(ActiveConversationContext);
  const [selectedValue, selectValue] = useState<ConversationType>(
    ConversationType.PROJECT_OWNER,
  );

  useEffect(() => {
    const value = isOthersConversations
      ? ConversationType.PROJECT_OWNER_OTHERS
      : ConversationType.PROJECT_OWNER;
    selectValue(value);
  }, [isOthersConversations]);

  const onSelect = useCallback(
    (value: ConversationType) => {
      if (value === ConversationType.PROJECT_OWNER_OTHERS) {
        setIsOthersConversations(true);
      } else {
        setIsOthersConversations(false);
      }
      setActiveConversationSid('');

      selectValue(value);
    },
    [setActiveConversationSid, setIsOthersConversations],
  );

  return (
    <Dropdown
      hideIcons
      placement={placement || 'bottom-end'}
      options={filterOptions}
      usePopStyle={true}
      isAnimation={false}
      containerStyle={{
        minHeight: '97px',
        padding: 0,
        maxWidth: '250px',
      }}
      onSelectOption={({ value }) => onSelect(value)}
      optionsRenderer={(_, handleSelectOption) =>
        filterOptions.map((option) => (
          <DropdownItemLayout
            isBottomBorder
            onClick={() => handleSelectOption(option)}
            key={option.key}
          >
            <DropDownLabel>
              <TSpan
                font="body-m-bold"
                colorToken="--text-tablecell-header-neutral-highlighted"
              >
                {option.label}
              </TSpan>
            </DropDownLabel>
            <Radiobox
              icon={
                <Icon
                  name="radio_btn_m"
                  size={12}
                  color={
                    option.value === selectedValue
                      ? '--icon-radiobutton-brand-primary-default'
                      : '--icon-radiobutton-inactive-default'
                  }
                />
              }
              isChecked={option.value === selectedValue}
            />
          </DropdownItemLayout>
        ))
      }
    >
      {({ targetRef, toggle }: DropdownTargetProps<HTMLButtonElement>) => (
        <Button
          tertiary
          size="small"
          icon={
            <Icon
              name="filters_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
          onClick={toggle}
          ref={targetRef}
          disabled={isNewConversation}
        />
      )}
    </Dropdown>
  );
}
