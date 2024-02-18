import styled from 'styled-components';
import { type EditPreUploadProps, type EditUploadingProps } from './types';

export const EditUploadingContainer = styled.div<Partial<EditUploadingProps>>`
  width: 100%;

  ${({ isUploadComplete }) =>
    isUploadComplete
      ? `padding: 0px;`
      : `padding: 16px;
        border: 1px solid var(--border-card-neutral-highlighted);
      `}

  background: ${({ isBackground }) =>
    isBackground ? `none` : 'var(--bg-card-neutral-alt-default)'};
  box-sizing: border-box;
  border-radius: 8px;
`;

export const VerticalCenterWrapper = styled.div<Partial<EditUploadingProps>>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${({ isUploadComplete }) =>
    isUploadComplete
      ? `
          padding-left: 16px;
          padding-right: 16px;
        `
      : ''}
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
`;

export const ProgressErrorWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const EditPreUploadContainer = styled.div<Partial<EditPreUploadProps>>`
  height: 94px;
  width: 100%;
  background: var(--bg-dragdrop-neutral-default);
  border: 2px dashed var(--border-dragdrop-neutral-default);
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${({ isDraggingOver }) =>
    isDraggingOver
      ? `
      background: var(--bg-dragdrop-brand-secondary-active);
      border: 2px dashed var(--border-dragdrop-brand-primary-active);
      box-sizing: border-box;
      border-radius: 8px;
      `
      : ''}

  ${({ error }) =>
    error
      ? `
      background: var(--bg-dragdrop-danger-secondary-default);
      border: 2px dashed var(--border-dragdrop-danger-primary-default);
      box-sizing: border-box;
      border-radius: 8px;
      `
      : ''}
`;
