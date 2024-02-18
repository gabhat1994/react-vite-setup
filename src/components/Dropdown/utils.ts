import { type DropdownItemType, type DropdownValueType } from './types';

export function isValueType<Key extends string, Data extends unknown = Key>(
  option: DropdownItemType<Data, Key>,
): option is DropdownValueType<Data, Key> {
  return option.type === 'value';
}
