import { type Meta } from '@storybook/react';
import { useState } from 'react';

import { RichTextEditor } from './RichTextEditor';

import {
  type ReactQuillChangeResult,
  type RichTextEditorProps,
} from '../../types';

const Wrapper = (props: RichTextEditorProps) => {
  const [value, setValue] = useState(props.initialValue);
  return (
    <RichTextEditor
      {...props}
      initialValue={value}
      onContentChange={(res: ReactQuillChangeResult) => {
        setValue(res.value);
      }}
    />
  );
};

export default {
  title: 'UI/RichTextEditor',
  component: Wrapper,
} as Meta<typeof RichTextEditor>;

export const Primary = {
  args: {
    editEnabled: true,
    basicToolbar: false,
    inModal: false,
    placeholder: '',
    value: 'test',
    minHeight: '300px',
  },
};
