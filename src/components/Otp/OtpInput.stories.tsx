import { type Meta } from '@storybook/react';
import { useState } from 'react';
import { LabelGroup, LabelWrap } from '@/components/StorybookHelpers/LabelWrap';
import { OtpInput } from './OtpInput';

import { type OtpProps } from './types';

export default {
  title: 'UI/OtpInput',
  argTypes: {
    numInputs: {
      options: [1, 2, 3, 4, 5],
      control: { type: 'select' },
    },
    isDisabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof OtpInput>;

const PrimaryWithHooks = (props: OtpProps) => {
  const [value1, setValue1] = useState<string | undefined>();

  return (
    <OtpInput {...props} value={value1} onChange={(val) => setValue1(val)} />
  );
};

export const Primary = {
  render: PrimaryWithHooks,
};

export const All = () => (
  <>
    <LabelGroup columns={2} style={{ width: '800px' }}>
      <LabelWrap label="With Values">
        <OtpInput value="1234" onChange={() => 1} />
      </LabelWrap>
      <LabelWrap label="Without Values">
        <OtpInput value="" onChange={() => 1} />
      </LabelWrap>
    </LabelGroup>

    <LabelGroup columns={1} style={{ width: '800px' }}>
      <LabelWrap label="Disabled">
        <OtpInput value="1234" isDisabled={true} onChange={() => 1} />
      </LabelWrap>
    </LabelGroup>
  </>
);
