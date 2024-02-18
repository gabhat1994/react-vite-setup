import { Stack } from '@/layout';
import { type OptionSelectorOption, type OptionSelectorSize } from './types';
import OptionSelectorItem from './OptionSelectorItem';

interface OptionSelectorProps<T extends string> {
  size?: OptionSelectorSize;
  options: OptionSelectorOption<T>[];
  value: T;
  onChange(value: T): void;
}

export function OptionSelector<T extends string>({
  size = 'large',
  options,
  value,
  onChange,
}: OptionSelectorProps<T>) {
  return (
    <Stack gap={16} align="stretch" justify="stretch" fullWidth>
      {options.map((option) => (
        <OptionSelectorItem
          key={option.value}
          size={size}
          {...option}
          isSelected={value === option.value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </Stack>
  );
}

export default OptionSelector;
