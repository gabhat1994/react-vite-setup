import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

export const UploadContainer = styled.div<{
  disabled: boolean;
  isDraggingOver: boolean;
  isHidden?: boolean;
  marginTop?: number;
  error?: boolean;
}>`
  border-radius: 8px;
  background-color: var(--bg-dragdrop-neutral-default);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 94px;
  flex-direction: column;
  cursor: ${({ disabled }) => (!disabled ? 'pointer' : 'not-allowed')};
  margin-top: ${({ marginTop }) =>
    marginTop !== undefined ? marginTop : 16}px;
  border: ${({ isDraggingOver }) =>
    isDraggingOver
      ? '2px dashed var(--border-dragdrop-brand-primary-focused)'
      : '2px solid transparent'};
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver
      ? 'var(--bg-dragdrop-brand-secondary-active)'
      : 'var(--bg-dragdrop-neutral-default)'};
  ${({ isHidden }) => isHidden && 'display: none;'}

  ${({ error }) =>
    error
      ? `
    border: dashed 2px var(--border-dragdrop-danger-primary-default);
    background-color: var(--bg-dragdrop-danger-secondary-default);
  `
      : ''}
`;

export const UploadDescription = styled(TSpan)<{ error?: boolean }>`
  color: var(--text-dragdrop-neutral-default);

  ${({ error }) =>
    error
      ? `
      color: var(--text-dragdrop-danger-primary-default);
  `
      : ''}
`;

export const DragDropText = styled(TSpan).attrs({
  font: 'body-l-bold',
  colorToken: '--text-dragdrop-header-neutral-default',
})`
  display: flex;
  align-items: center;
  white-space: break-spaces;
`;
