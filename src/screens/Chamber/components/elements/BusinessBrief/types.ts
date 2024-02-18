import { type HTMLAttributes } from 'react';

import { type Maybe } from '@/common/types';
import { type Scalars } from '@/apollo/generated/types';
import { type RichTextEditorProps } from '@/features/richTextEditor';
import { type IWrapper } from '../../ElementWrapper/types';

export type BusinessBriefProps = {
  wrapperProps: HTMLAttributes<HTMLDivElement> & IWrapper;
  isBorder: boolean;
  currentTitle?: string | undefined;
  elementId: Maybe<Scalars['ID']>;
  elementPosition?: Maybe<Scalars['Int']>;
  spaceId: string;
  isEditing?: boolean;
  textEditor?: RichTextEditorProps;
  basicToolbar?: boolean;
};
