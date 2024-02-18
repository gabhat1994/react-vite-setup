import { faker } from '@faker-js/faker';
import * as fc from 'fast-check';
import { useState } from 'react';
import styled from 'styled-components';
import generate from 'uniqid';
import { type DropdownValueType } from '../Dropdown';
import { Avatar } from '../Avatar/Avatar';
import { MultiselectField, type MultiselectValue } from './MultiselectField';

export default {
  title: 'Atoms/MultiselectField',
  component: MultiselectField,
};

const Container = styled.div`
  width: 100%;
`;

const optionsArbitary = fc
  .uniqueArray(fc.lorem(), { minLength: 5, maxLength: 20 })
  .chain((strs) => {
    const label = fc.constantFrom(...strs);
    return fc.record({
      key: fc.constant(generate()),
      label,
      type: fc.constant('value' as const),
      value: label,
      description: fc.constant('Explanation' as const),
    });
  });

const options: DropdownValueType<string>[] = fc.sample(optionsArbitary, 5);

export const Basic = () => {
  const [value, setValue] = useState<MultiselectValue<string>>(() =>
    options.map((option) => option.key),
  );
  return (
    <Container>
      <MultiselectField<string, string>
        options={options}
        value={value}
        onChange={setValue}
      />
    </Container>
  );
};

const optionsWithAvatars: DropdownValueType<string>[] = options.map(
  (option) => ({
    ...option,
    icon: <Avatar url={faker.image.avatar()} size="M" />,
  }),
);

export const WithAvatars = () => {
  const [value, setValue] = useState<MultiselectValue<string>>(() =>
    optionsWithAvatars.map((option) => option.key),
  );
  return (
    <Container>
      <MultiselectField<string, string>
        options={optionsWithAvatars}
        value={value}
        onChange={setValue}
        hideIcons={false}
      />
    </Container>
  );
};
