import { set, constantFrom, record, constant, lorem, sample } from 'fast-check';
import generate from 'uniqid';
import { type DropdownValueType } from '@/components/Dropdown';
import { SearchSkill } from './SearchSkill';

export default {
  title: 'Atoms/SearchSkill',
  component: SearchSkill,
};

const optionsArbitary = set(lorem(), { minLength: 5, maxLength: 20 }).chain(
  (strs) => {
    const label = constantFrom(...strs);
    return record({
      key: constant(generate()),
      label,
      type: constant('value' as const),
      value: label,
      description: constant('Explanation' as const),
    });
  },
);

const options: DropdownValueType<string>[] = sample(optionsArbitary, 30);

export const Primary = () => <SearchSkill options={options} label="Search" />;
