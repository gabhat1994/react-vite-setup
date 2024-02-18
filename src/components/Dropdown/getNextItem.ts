import { type DropdownValueType } from './types';

export default function getNextItem<T, Key extends string = string>(
  options: DropdownValueType<T, Key>[],
  current: null | DropdownValueType<T, Key>,
  direction: 'up' | 'down',
): DropdownValueType<T, Key> | null {
  if (!options.length) return null;

  const maxIndex = options.length - 1;

  if (current === null) {
    switch (direction) {
      case 'down':
        return options[0];
      case 'up':
        return options[maxIndex];
    }
  }
  const currIndex = options.findIndex((item) => item.key === current.key);

  let option = null;
  switch (direction) {
    case 'down':
      option = currIndex === maxIndex ? options[0] : options[currIndex + 1];
      break;

    case 'up':
      option = currIndex === 0 ? options[maxIndex] : options[currIndex - 1];
      break;

    default:
      option = null;
  }
  return option;
}
