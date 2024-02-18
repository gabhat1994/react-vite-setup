import React, { useMemo, useRef, useState } from 'react';
import { intersection } from 'lodash';
import { MultiselectUtil } from '@/utils/multiselect';
import { useElementDimensions } from '@/hooks';
import { cleanList } from '@/utils/list';
import { TickCheckbox } from '../Checkbox';
import {
  Dropdown,
  type DropdownProps,
  type DropdownValueType,
  isValueType,
} from '../Dropdown';
import { type ITextField } from '../TextField/types';
import S from './styles';

const ALL_VALUE = 'ALL_VALUE';
type AllValueSelectionState = 'all' | 'some' | 'empty';
type AllValueSelectionStrategy = 'empty-means-all' | 'empty-means-none';
export type MultiselectValue<Key extends string> = Key[];

export type MultiselectFieldProps<
  Key extends string,
  Data extends unknown = Key,
> = Omit<
  DropdownProps<Data, HTMLInputElement, string, Key>,
  'children' | 'options'
> &
  Pick<
    ITextField,
    'inputSize' | 'error' | 'helperText' | 'label' | 'disabledIconColor'
  > & {
    options: DropdownValueType<Data, Key>[];
    value: MultiselectValue<Key>;
    onChange: (selectedOptions: MultiselectValue<Key>) => void;
    inputRightElement?: React.ReactNode;
    allOptionLabel?: string;
    allSelectionStrategy?: AllValueSelectionStrategy;
    hideAllOption?: boolean;
  };

export function MultiselectField<
  Key extends string = string,
  Data extends unknown = Key,
>({
  options,
  value,
  onChange,
  disabled,
  inputRightElement,
  allOptionLabel = 'All',
  leftIcon,
  hideIcons = true,
  inputSize,
  error,
  helperText,
  label,
  disabledIconColor,
  isLoading,
  hideAllOption,
  allSelectionStrategy = 'empty-means-none',
  ...dropdownProps
}: MultiselectFieldProps<Key, Data>) {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const {
    size: { width },
  } = useElementDimensions(containerRef);

  const valueOptions = useMemo(() => options.filter(isValueType), [options]);

  const selectedValues = useMemo(() => {
    const allValueOptionKeys = valueOptions.map((option) => option.key);

    return allSelectionStrategy === 'empty-means-all' && value.length === 0
      ? allValueOptionKeys
      : // If we have more selected values than available, just get the intersection.
        intersection(allValueOptionKeys, value);
  }, [allSelectionStrategy, value, valueOptions]);
  const allSelectionState: AllValueSelectionState =
    selectedValues.length === 0
      ? 'empty'
      : selectedValues.length === valueOptions.length
      ? 'all'
      : 'some';

  const selectedOptions = useMemo(
    () => valueOptions.filter((option) => selectedValues.includes(option.key)),
    [selectedValues, valueOptions],
  );

  const calculatedOptions = useMemo<DropdownValueType<Data, Key>[]>(
    () =>
      cleanList([
        hideAllOption
          ? null
          : {
              type: 'value',
              key: ALL_VALUE as Key,
              label: allOptionLabel,
              value: ALL_VALUE as Data,
              rightIcon: (
                <TickCheckbox
                  isChecked={allSelectionState === 'all'}
                  isIndeterminate={allSelectionState === 'some'}
                  captureClickEvent={false}
                />
              ),
              hideIconPlace: true,
            },
        ...options.map((option) => ({
          ...option,
          rightIcon: (
            <TickCheckbox
              isChecked={selectedOptions.includes(option)}
              captureClickEvent={false}
            />
          ),
        })),
      ]),
    [
      allOptionLabel,
      allSelectionState,
      hideAllOption,
      options,
      selectedOptions,
    ],
  );

  const handleChange = (item: DropdownValueType<Data, Key>) => {
    let newValue: Key[] = [];
    if (item.key === ALL_VALUE) {
      newValue =
        allSelectionState === 'all'
          ? allSelectionStrategy === 'empty-means-all'
            ? selectedValues
            : []
          : valueOptions.map((option) => option.key);
    } else {
      newValue = MultiselectUtil.toggleOne(selectedValues, item.key);
    }
    onChange(newValue);
  };

  return (
    <S.Container ref={containerRef}>
      <Dropdown
        hideIcons={hideIcons}
        inputValue={
          allSelectionState === 'all'
            ? allOptionLabel
            : selectedOptions.map((option) => option.label).join(', ')
        }
        isLoading={isLoading}
        options={isLoading ? [] : calculatedOptions}
        usePortal={false}
        containerWidth={`${width}px`}
        disabled={disabled}
        onSelectOption={handleChange}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        closeOnSelect={false}
        {...dropdownProps}
      >
        {({ inputProps, inputRef, toggle }) => (
          <S.TextField
            ref={inputRef}
            {...inputProps}
            readOnly
            inputSize={inputSize}
            disabled={disabled}
            label={label}
            leftIcon={leftIcon}
            helperText={helperText}
            error={!!error}
            rightIcon={
              <S.InputRightElements>
                {inputRightElement}
                {disabled ? null : (
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
