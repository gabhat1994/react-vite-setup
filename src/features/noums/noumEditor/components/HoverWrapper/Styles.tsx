import styled, { css } from 'styled-components';
import { Stack } from '@/layout';
import { TSpan, systemInfoSmallTypography } from '@/components/Typography';
import { mediaSizesForNoumLayout } from '@/constants/devices';
import { ToolbuttonEdge } from './types';

const HoverWrapperElements = css`
  position: absolute;
  top: -28px;
  display: none;
`;

export const ChildWrapper = styled.div<{
  isDragging?: boolean;
  isSectionBackground?: boolean;
  isColumnBackground?: boolean;
}>`
  box-sizing: border-box;
  border: ${({ isSectionBackground, isColumnBackground }) =>
    isColumnBackground && isSectionBackground
      ? '1px solid var(--bg-card-neutral-alt-default)'
      : '1px solid var(--border-card-neutral-default)'};
  border-radius: 16px;
  width: ${({ isDragging }) => (isDragging ? '303px' : '100%')};
`;

export const ToolContainer = styled.div<{ isTool: boolean }>`
  background: ${({ isTool }) =>
    isTool
      ? 'var(--bg-tool-toolbox-brand-primary-default)'
      : 'var(--bg-section-toolbox-default)'};
  border-radius: 6px 6px 0px 0px;
  padding: 5px 8px;
  left: ${({ isTool }) => (isTool ? '16px' : '24px')};
  ${HoverWrapperElements}
  ${({ isTool }) =>
    isTool &&
    css`
      max-width: 25%;
      @media (min-width: ${mediaSizesForNoumLayout.LAPTOP_M_MIN}) {
        max-width: 30%;
      }
      @media (min-width: ${mediaSizesForNoumLayout.LAPTOP_L_MIN}) {
        max-width: 35%;
      }
    `}
`;

export const ToolNameContainer = styled(TSpan)`
  text-overflow: ellipsis;
  display: block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
`;

export const PlusWrapper = styled.div<{ isBottom?: boolean }>`
  left: calc(50% - 15px);
  ${({ isBottom }) => isBottom && 'top: unset !important; bottom: -28px '};
  z-index: 10;
  ${HoverWrapperElements}
`;

export const StackElements = styled(Stack)<{ isTool?: boolean }>`
  right: ${({ isTool }) => (isTool ? '16px' : '24px')};
  ${HoverWrapperElements}
`;

export const HoverWrapperContainer = styled.div<{
  isChild: boolean;
  isActive: boolean;
  isDragging?: boolean;
  isElementDragging?: boolean;
  isHoverNotActive?: boolean;
  isMoveTool?: boolean;
}>`
  position: relative;
  width: ${({ isDragging }) => (isDragging ? '303px' : '100%')};
  ${({ isActive }) =>
    isActive
      ? css`
          & .parent {
            display: flex;
          }
          .parent-wrapper {
            border: 1px solid var(--bg-section-toolbox-default);
          }
        `
      : css`
          &:hover:not(:has(.element-container:hover, .child:hover)) .parent {
            display: flex;
          }
          &:hover:not(:has(.element-container:hover, .child:hover))
            .parent-wrapper,
          .parent-wrapper:hover:not(:has(.child-wrapper, .child-wrapper:hover)) {
            border: 1px dashed var(--bg-section-toolbox-default);
          }
        `}

  ${({
    isChild,
    isActive,
    isDragging,
    isElementDragging,
    isHoverNotActive,
    isMoveTool,
  }) =>
    isChild && (isActive || isDragging)
      ? css`
          &:has(.element-container, .child) .child,
          .child {
            display: ${isHoverNotActive ? 'none' : 'flex'};
          }
          .child-wrapper {
            border: 1px ${isDragging ? 'dashed' : 'solid'}
              var(--bg-tool-toolbox-brand-primary-default);
            height: ${isMoveTool ? '75px' : ''};
          }
        `
      : isChild &&
        !isElementDragging &&
        css`
          &:hover:has(.element-container:hover, .child) .child,
          .child:hover {
            display: flex;
          }
          &:hover .child-wrapper,
          .child-wrapper:hover {
            border: 1px dashed var(--bg-tool-toolbox-brand-primary-default);
          }
        `}
`;

export const WrapperIcon = styled.div<{ disabled?: boolean; isEdge?: string }>`
  border-right: ${({ isEdge }) =>
    isEdge === 'right'
      ? ''
      : `1px solid var(--color-base-background-transparent)`};
  padding: 0 6px;
  opacity: ${(p) => (p.disabled ? '0.2' : '1')};
`;

export const ControlPanelIcon = styled.div<{
  bgColor?: string;
  cursorAllowed?: boolean;
  hoverColor?: string;
  isEdge?: string;
  isSectionBackground?: boolean;
  isVisibilityIcon?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 19px;
  background-color: ${({ bgColor }) =>
    bgColor ?? 'var(--bg-button-neutral-default)'};
  border-radius: ${({ isEdge }) =>
    isEdge === ToolbuttonEdge.topLeft
      ? '8px 0px 0px 0px'
      : isEdge === ToolbuttonEdge.topRight
      ? '0px 8px 0px 0px'
      : isEdge === ToolbuttonEdge.bothBottom
      ? '0px 0px 8px 8px'
      : isEdge === ToolbuttonEdge.bothTop
      ? '8px 8px 0px 0px'
      : ''};
  cursor: ${({ cursorAllowed }) =>
    !cursorAllowed ? 'not-allowed' : 'pointer'};
  padding: 5px 0px;
  svg {
    ${({ cursorAllowed }) =>
      !cursorAllowed &&
      `
      opacity: 0.3;
    `}
  }

  &[data-title]:hover::after {
    content: attr(data-title);
    position: absolute;
    background-color: var(--bg-tooltip-neutral-default);
    color: var(--text-tooltip-neutral-alt-default);
    padding: 6px 8px;
    border-radius: 4px;
    white-space: nowrap;
    top: -28px;
    ${({ isSectionBackground, cursorAllowed, isEdge }) =>
      !isSectionBackground &&
      !cursorAllowed &&
      isEdge !== ToolbuttonEdge.topRight
        ? 'right:-55px'
        : !cursorAllowed &&
          isEdge === ToolbuttonEdge.topRight &&
          'right:-25px'};
    z-index: 999999999;
    ${systemInfoSmallTypography.systemInfoSmall};
  }
  :hover {
    background-color: ${({ hoverColor }) =>
      hoverColor ?? 'var(--bg-button-neutral-alt-hover)'};
  }
`;
