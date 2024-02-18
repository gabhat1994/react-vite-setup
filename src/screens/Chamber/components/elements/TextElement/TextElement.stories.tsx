import { type Meta } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';

import TextElement from './TextElement';

const Wrapper = styled.div`
  padding: 24px;
  background-color: var(--bg-card-neutral-default);
`;

export default {
  title: 'UI/Chambers/TextElement',
  component: TextElement,
  args: {
    value: '<p>test</p><p>test</p><p>test</p><p>test</p><p>test</p>',
    placeholder: 'Enter some text here...',
    isEditMode: false,
    currentTitle: 'Text',
  },
} as Meta<typeof TextElement>;

export const Primary = ({ ...args }) => {
  const [value, setValue] = useState<string>(args?.value);
  return (
    <Wrapper>
      <TextElement
        spaceId=""
        element={{
          __typename: undefined,
          _id: undefined,
          bodyContent: undefined,
          bodyContentJson: undefined,
          bodyContentType: undefined,
          draft: undefined,
          elementType: undefined,
          headerContent: undefined,
          percentCompleted: undefined,
          position: undefined,
          status: undefined,
          tempStatus: undefined,
          unSaved: undefined,
          viewOnly: undefined,
        }}
        {...args}
        isEditing={args?.isEditMode}
        textEditor={{
          initialValue: value,
          placeholder: args?.placeholder,
          editEnabled: args?.isEditMode,
          onContentChange: (next) => {
            setValue(next.value ?? '');
          },
        }}
      />
    </Wrapper>
  );
};
