import { t } from 'i18next';
import { useState } from 'react';
import {
  Dropdown,
  type DropdownItemType,
  type DropdownTargetProps,
  type DropdownValueType,
  isValueType,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { SearchField } from './styles';
import { type ApiEntityPickerFieldProps } from './types';

function ApiEntityPickerField<Key extends string, Data extends unknown = Key>({
  options,
  placeholderText,
  value,
  onChange,
  stickyHeaderOptions,
  inputValue,
  onInputChange,
  inputSize,
  label,
  disabled,
  leftIcon,
  rightIcon,
  fullWidth,
  renderSelectionPreviewComponent,
  isLoading,
  autoFocus,
  hideLeftIconPlace,
  preselectedOption,
  error,
  helperText,
  readOnly,
  ...dropdownProps
}: ApiEntityPickerFieldProps<Key, Data>) {
  const [isFocused, setIsFocused] = useState(false);
  const shouldShowNoResults = !options?.length;

  const selectedOption =
    (options.find(
      (opt: DropdownItemType) => isValueType(opt) && opt.key === value,
    ) as DropdownValueType<Data, Key> | undefined) ?? preselectedOption;

  if (renderSelectionPreviewComponent && selectedOption) {
    return renderSelectionPreviewComponent({
      onChange,
      selectedOption,
      disabled,
      fullWidth,
      inputSize,
    });
  }

  return (
    <Dropdown
      noSearchOptionsText={t('noumena.global_search.no_results')}
      {...dropdownProps}
      isLoading={isLoading}
      isShowEmptyText={shouldShowNoResults}
      stickyHeaderOptions={stickyHeaderOptions}
      onSelectOption={onChange}
      isOpen={isFocused}
      options={options}
      calRefTop={false}
    >
      {({ inputRef }: DropdownTargetProps<HTMLDivElement>) => (
        <>
          <SearchField
            autoFocus={autoFocus}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            inputSize={inputSize}
            placeholder={placeholderText}
            hideLeftIconPlace={hideLeftIconPlace}
            ref={inputRef}
            readOnly={readOnly}
            leftIcon={
              leftIcon ?? (
                <Icon
                  name="search_m"
                  size={24}
                  color="--icon-input-neutral-default"
                />
              )
            }
            rightIcon={
              rightIcon ||
              (!!inputValue && (
                <Icon
                  onClick={() => onInputChange?.('')}
                  name="clear_m"
                  size={24}
                  color="--icon-input-neutral-default"
                />
              ))
            }
            rightIconColor="var(--icon-input-brand-primary-default)"
            value={inputValue}
            onChange={(e) => onInputChange?.(e.currentTarget.value)}
            data-testid="global-search-input"
            label={label}
            disabled={disabled}
            error={error}
            helperText={helperText}
          />
        </>
      )}
    </Dropdown>
  );
}

export default ApiEntityPickerField;
