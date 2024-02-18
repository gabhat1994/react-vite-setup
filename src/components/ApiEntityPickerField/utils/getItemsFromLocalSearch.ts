import { type DropdownItemType } from '@/components/Dropdown';

function getItemsFromLocalSearch<
  Key extends string,
  Data extends unknown = Key,
>(options: DropdownItemType<Data, Key>[], searchValue: string) {
  if (searchValue === '') {
    return options;
  }

  // ? filter out the values that match the search value
  const newOptions = options.filter((option) => {
    if (option.type !== 'value') {
      return true;
    }
    if (
      option.type === 'value' &&
      String(option.label).toLowerCase().includes(searchValue)
    ) {
      return true;
    }
    return false;
  });

  // ? remove headers if there's no value under that
  const filteredNewOptions = newOptions.filter((option, index) => {
    if (option.type === 'header' && index === newOptions.length - 1) {
      return false;
    }
    if (option.type === 'header' && newOptions[index + 1].type === 'header') {
      return false;
    }

    return true;
  });

  return filteredNewOptions;
}

export default getItemsFromLocalSearch;
