import React, { useLayoutEffect, useRef, useState } from 'react';
import { useWindowDimensions } from '@/hooks';
import {
  Dropdown,
  type DropdownProps,
  type DropdownValueType,
} from '../Dropdown';
import { type ITextField } from '../TextField/types';
import S from './styles';

export type SelectFieldProps<
  Key extends string,
  Data extends unknown = Key,
> = Omit<DropdownProps<Data, HTMLInputElement, string, Key>, 'children'> &
  Pick<
    ITextField,
    'inputSize' | 'error' | 'helperText' | 'label' | 'disabledIconColor'
  > & {
    value: Key | undefined;
    onChange: (option: DropdownValueType<Data, Key>) => void;
  } & {
    inputRightElement?: React.ReactNode;
    noChevron?: boolean;
    searchable?: boolean;
  };

export function SelectField<
  Key extends string = string,
  Data extends unknown = Key,
>({
  options,
  label,
  value,
  onChange,
  inputSize,
  disabled,
  leftIcon,
  hideIcons = true,
  error,
  helperText,
  inputRightElement,
  noChevron = false,
  disabledIconColor,
  searchable = true,
  inputValue,
  ...dropdownProps
}: SelectFieldProps<Key, Data>) {
  const dimensions = useWindowDimensions();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = value
    ? (options.find(
        (_option) => _option.type === 'value' && _option.key === value,
      ) as DropdownValueType<Data, Key> | null)
    : null;

  useLayoutEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.clientWidth);
    }
  }, [containerRef, dimensions]);

  const displayedInputValue =
    inputValue ||
    (selectedOption &&
      typeof selectedOption.label === 'string' &&
      selectedOption.label) ||
    '';

  return (
    <S.Container ref={containerRef}>
      <Dropdown
        {...dropdownProps}
        hideIcons={hideIcons}
        inputValue={displayedInputValue}
        options={options}
        usePortal={false}
        containerWidth={`${width}px`}
        disabled={disabled}
        onSelectOption={onChange}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        {({ inputProps, inputRef, toggle }) => (
          <S.TextField
            ref={inputRef}
            {...inputProps}
            $searchable={searchable}
            inputSize={inputSize}
            disabled={disabled}
            label={label}
            leftIcon={selectedOption?.icon ?? leftIcon}
            helperText={helperText}
            error={!!error}
            readOnly={!searchable}
            rightIcon={
              <S.InputRightElements>
                {inputRightElement}
                {disabled || noChevron ? null : (
                  <S.RightIcon
                    name="chevron_down_m"
                    isOpen={isOpen}
                    onClick={toggle}
                  />
                )}
              </S.InputRightElements>
            }
            disabledIconColor={disabledIconColor}
          />
        )}
      </Dropdown>
    </S.Container>
  );
}
