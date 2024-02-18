import styled from 'styled-components';
import { bodyTypography } from '@/components/Typography';
import { sizes } from '@/constants/devices';
import { Card } from '@/components/Card';
import { Stack } from '@/layout';
import { InsertDirection } from '@/features/noums/noumEditor/components';
import { type PlaceholderProps } from './types';

export const DropZone = styled.div<{
  isDraggingOver: boolean;
  isDraggingFrom: boolean;
}>`
  position: relative;
  width: 100%;
  @media (max-width: ${sizes.TABLET_L}) {
    width: 100%;
    margin: auto;
  }
`;

export const DropZoneColumn = styled.div<{
  isDraggingOver: boolean;
  isDraggingFrom: boolean;
  isBackground?: boolean;
}>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  background: ${({ isBackground }) =>
    isBackground ? 'var(--bg-card-neutral-alt-default)' : 'none'};
`;

export const DNDContainer = styled.div<{ isDragging?: boolean }>`
  padding: 8px 0;
  &:first-child {
    padding-top: 0px;
  }
`;

export const StoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 60px 0px;
  align-items: center;
  background-color: var(--bg-body-neutral-alt-highlighted);
  width: 100%;
`;
export const StoryWrapperContent = styled.div`
  width: 783px;
  @media (max-width: ${sizes.MOBILE_L}) {
    width: min-content;
  }
`;

export const StoryDescription = styled.span`
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding: 24px;
  text-align: center;
  color: var(--text-card-brand-primary-default);
  ${bodyTypography.bodyXLargeBold};
`;

export const DraggingElement = styled(Card)`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
`;

export const DNDElementContainer = styled.div<{
  isDragging?: boolean;
  insertDirection?: InsertDirection;
}>`
  display: flex;
  transition: all 0.1s ease-in-out;
  flex-direction: ${({ insertDirection }) =>
    insertDirection === InsertDirection.Below ? 'column-reverse' : 'column'};
  gap: 16px;
  margin-bottom: 12px;
`;

export const DroppableElement = styled.div<{
  placeholderProps?: PlaceholderProps;
}>`
  border: 1px solid var(--border-section-picker-brand-secondary-default);
  background: var(--bg-section-picker-brand-secondary-default);
  border-radius: 8px;
  position: absolute;
  width: 100%;
  height: 40px;
  ${({ placeholderProps }) =>
    placeholderProps && `top: ${placeholderProps.dragY}px;`}
`;

export const ElementWrapper = styled(Card)<{
  isBackground?: boolean;
  isDragging?: boolean;
  isSkillOrNetwork?: boolean;
}>`
  position: relative;
  ${({ isDragging }) => isDragging && ' margin-top: 12px;'};
  ${({ isBackground }) => isBackground && 'background: none'};
  ${({ isSkillOrNetwork }) =>
    isSkillOrNetwork ? 'padding: 16px;' : 'padding: 0'};
`;

export const ColumnContainer = styled(Stack)<{ isBackground?: boolean }>`
  position: relative;
  transition: all 0.1s ease-in-out;
  border-radius: 16px;
  padding: ${({ isBackground }) => (isBackground ? '12px 24px' : '0')};
  background: ${({ isBackground }) =>
    isBackground ? 'var(--bg-card-neutral-alt-default)' : 'none'};
`;

export const EditColumnContainer = styled.div<{ height?: number }>`
  position: relative;
  transition: all 0.1s ease-in-out;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  min-height: 106px;
`;
