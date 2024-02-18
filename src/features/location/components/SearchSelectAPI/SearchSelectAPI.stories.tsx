import { type Meta } from '@storybook/react';
import {
  constant,
  constantFrom,
  lorem,
  record,
  sample,
  uniqueArray,
} from 'fast-check';
import generate from 'uniqid';
import { type DropdownValueType } from '@/components/Dropdown';
import { SearchSelectAPI } from './SearchSelectAPI';

export default {
  title: 'Atoms/SearchSelectAPI',
  component: SearchSelectAPI,
} as Meta<typeof SearchSelectAPI>;

const optionsArbitary = uniqueArray(lorem(), {
  comparator: 'IsStrictlyEqual',
  minLength: 5,
  maxLength: 20,
}).chain((strs) => {
  const label = constantFrom(...strs);
  return record({
    key: constant(generate()),
    label,
    type: constant('value' as const),
    value: label,
    description: constant('Explanation' as const),
  });
});

const options: DropdownValueType<string>[] = sample(optionsArbitary, 30);

export const Primary = () => (
  <SearchSelectAPI options={options} label="Search" />
);
