import { useState } from 'react';
import { Dropdown } from '@/components/Dropdown';
import { DropDownIcon } from '@/features/events/styles/DropDownIcon';

import { type EventPickerProps } from './types';
import { Option, Content, Capitalize, OptionLabel } from './styles';

export const EventPicker = <T,>({
  value,
  options,
  children,
  inputStyle,
  placeholder,
  selectedLabel,
  onOptionChange,
  ...props
}: EventPickerProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      hideIcons
      closeOnSelect
      usePortal
      usePopStyle
      inputValue={value}
      multiselect={false}
      placement="bottom-end"
      options={options || []}
      isAnimation={false}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      optionsRenderer={(availableOptions, handleSelectOption) => (
        <Content vertical scrollbarWidth={5}>
          {availableOptions.map(
            (option) =>
              option.type === 'value' && (
                <Option
                  align="center"
                  key={option.key}
                  data-testid="dd-option"
                  onClick={() => {
                    onOptionChange(option);
                    handleSelectOption(option);
                  }}
                >
                  <OptionLabel
                    font="body-m-bold"
                    colorToken="--text-tablecell-header-neutral-highlighted"
                  >
                    {option.label}
                  </OptionLabel>
                </Option>
              ),
          )}
        </Content>
      )}
      {...props}
    >
      {(renderProps) =>
        children ? (
          children(renderProps)
        ) : (
          <Capitalize
            readOnly
            style={inputStyle}
            ref={renderProps.inputRef}
            {...renderProps.inputProps}
            value={selectedLabel?.toLowerCase()}
            placeholder={placeholder}
            {...props}
            rightIcon={
              <DropDownIcon
                name="chevron_down_m"
                isOpen={isOpen}
                size={16}
                onClick={renderProps.toggle}
                color="--icon-input-neutral-default"
              />
            }
          />
        )
      }
    </Dropdown>
  );
};
