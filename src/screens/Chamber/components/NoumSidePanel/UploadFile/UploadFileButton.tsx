import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { StyledButton } from './styles';
import { type UploadFileButtonProps } from './types';

export const UploadFileButton = ({ onClick }: UploadFileButtonProps) => (
  <StyledButton data-testid="avatarEditButton" onClick={onClick}>
    <TSpan font="footnote" colorToken="--bg-button-brand-primary-default">
      {t(`noumena.noum_editor.edit_tool.button.replace`)}
    </TSpan>
  </StyledButton>
);
