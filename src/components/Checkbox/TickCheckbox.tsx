import { type ComponentProps } from 'react';
import { Icon } from '@/components/Icon';
import { Checkbox } from './Checkbox';

type TickCheckboxProps = Pick<
  ComponentProps<typeof Checkbox>,
  'isChecked' | 'onChange' | 'size' | 'hasError' | 'captureClickEvent'
> & {
  isIndeterminate?: boolean;
  disabled?: boolean;
};

export function TickCheckbox({
  isChecked,
  size = 24,
  isIndeterminate,
  disabled,
  onChange,
  ...checkboxProps
}: TickCheckboxProps) {
  return (
    <Checkbox
      {...checkboxProps}
      size={size}
      isChecked={isIndeterminate || isChecked}
      disableClick={disabled}
      icon={
        <Icon
          name={isIndeterminate ? 'minus_xs' : 'tick_m'}
          size={size}
          color={
            disabled
              ? '--icon-checkbox-neutral-disabled'
              : isChecked || isIndeterminate
              ? '--icon-checkbox-neutral-alt-default'
              : '--icon-checkbox-neutral-alt-hidden'
          }
        />
      }
      onChange={onChange}
    />
  );
}
