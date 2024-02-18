import { useMemo, useState } from 'react';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { Spacer } from '@/layout';
import { DropdownLabelWrapper, LabelIconWrapper } from './styles';
import { type MediaDropdownProps } from './types';

export const MediaDropdown = ({
  options,
  onSelect,
  disabled,
  children,
  selectedId,
  prefixIcon,
  emptyText,
}: MediaDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const minHeight = useMemo(() => `${options.length * 50}px`, [options]);
  const iconName = useMemo(
    () => (isOpen ? 'chevron_small_up_m' : 'chevron_small_down_m'),
    [isOpen],
  );

  const selectedLabel = useMemo(
    () => options.find(({ value }) => value === selectedId)?.label,
    [options, selectedId],
  );

  const onOpenHandler = () => setIsOpen(!!options.length);

  const ddIconColor = useMemo(
    () =>
      options.length
        ? '--icon-input-neutral-default'
        : '--icon-input-neutral-disabled',
    [options],
  );

  return (
    <Dropdown
      isOpen={isOpen}
      hideIcons={true}
      options={options}
      usePortal={true}
      disabled={disabled}
      closeOnSelect={true}
      minHeight={minHeight}
      inputValue={selectedId}
      observerMinHeight="1px"
      onOpen={onOpenHandler}
      onClose={() => setIsOpen(false)}
      noAvailableOptionsText={emptyText}
      onSelectOption={(option) => onSelect(option.key)}
    >
      {({ toggle, targetRef }: DropdownTargetProps<HTMLButtonElement>) => (
        <Button ref={targetRef} size="full_small" textOnly onClick={toggle}>
          <DropdownLabelWrapper>
            <LabelIconWrapper>
              <Icon
                name={prefixIcon}
                size={24}
                color="--icon-input-neutral-default"
              />
              <Spacer width={8} />
              {selectedLabel ? (
                <TSpan overflow="ellipsis" font="body-m">
                  {selectedLabel}
                </TSpan>
              ) : (
                <TSpan
                  colorToken="--text-input-neutral-disabled"
                  overflow="ellipsis"
                  font="body-m"
                >
                  {emptyText}
                </TSpan>
              )}
            </LabelIconWrapper>
            <Spacer width={16} />
            <Icon size={24} color={ddIconColor} name={iconName} />
          </DropdownLabelWrapper>
          {children}
        </Button>
      )}
    </Dropdown>
  );
};
