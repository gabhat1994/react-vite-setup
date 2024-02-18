import { useState } from 'react';
import { t } from 'i18next';

import {
  RichTextEditor,
  type ReactQuillChangeResult,
} from '@/features/richTextEditor';
import { TextField } from '@/components/TextField';

import { type EditElementProps } from './types';
import { ContentContainer, StyledTabWrapper } from './styles';

export const EditElement = ({
  title,
  content,
  handleChangeTitle,
  handleChangeContent,
  basicToolbar = false,
}: EditElementProps) => {
  const [initialValue] = useState(content);

  return (
    <StyledTabWrapper data-testid="EditElementWrapper" fullWidth>
      <TextField
        placeholder={t('noumena.chamber_edit.add_experience.title')}
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeTitle(e.target.value)
        }
      />
      <ContentContainer>
        <RichTextEditor
          placeholder={t('noumena.chamber_edit.add_experience.placeholder')}
          initialValue={initialValue}
          onContentChange={(res: ReactQuillChangeResult) => {
            handleChangeContent(res.value ?? '');
          }}
          basicToolbar={basicToolbar}
          minHeight="100%"
          width="calc(100% - 2px)"
          inModal
          editEnabled
        />
      </ContentContainer>
    </StyledTabWrapper>
  );
};
