import styled, { css } from 'styled-components';

import { Icon } from '@/components/Icon';
import { type AccordionContainerProps } from './types';

export const AccordionContainer = styled.div<AccordionContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 3px;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  transition: margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  ${({ borders }) =>
    (borders || []).map(
      (border) => css`
    border-${border}-color: var(--bg-separator-neutral-default);
    border-${border}-width: 1px;
    border-${border}-style: solid;
  `,
    )}
  ${({ shadowOnExpand, expanded, expandedOffsetBottom, offsetBottom }) =>
    expanded &&
    shadowOnExpand &&
    css`
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 2px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
      ${!expandedOffsetBottom &&
      !offsetBottom &&
      `margin-bottom: 5px !important;`}
    `}
  margin-bottom: ${({ expanded, expandedOffsetBottom, offsetBottom }) =>
    expanded
      ? `${
          expandedOffsetBottom !== undefined
            ? expandedOffsetBottom
            : offsetBottom || 0
        }px`
      : `${offsetBottom || 0}px`};
  margin-top: ${({ expanded, expandedOffsetTop, offsetTop }) =>
    expanded
      ? `${
          expandedOffsetTop !== undefined ? expandedOffsetTop : offsetTop || 0
        }px`
      : `${offsetTop || 0}px`};
`;

export const AccordionHeaderContainer = styled.div<{
  disabled?: boolean;
  expanded?: boolean;
  gap?: number;
  padding?: string;
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: ${({ gap }) => `${gap || 10}px`};
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  transition: padding-top 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  padding: ${({ padding }) => padding || '20px 16px'};
  user-select: none;
  background-color: ${({ disabled }) =>
    disabled
      ? 'var(--bg-tablecell-neutral-alt-disabled)'
      : 'var(--bg-tablecell-neutral-alt-default)'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const AccordionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  flex: 1;
  gap: 3px;
  overflow: hidden;
`;

export const AccordionRightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const AccordionRightIcon = styled.div``;

export const AccordionDropDownIcon = styled(Icon)<{
  expanded?: boolean;
  color?: string;
}>`
  transition: transform 0.3s;
  ${({ expanded }) => expanded && 'transform: rotate(180deg)'};
  ${({ color }) => color && `color: ${color}`};
`;

export const AccordionContent = styled.div<{
  maxHeight: string;
  expanded?: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow: hidden;
  box-sizing: border-box;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  ${({ maxHeight, expanded }) => css`
    max-height: ${expanded ? maxHeight : 0};
    height: ${expanded ? maxHeight : 0};
  `}
`;
