import styled, { css } from 'styled-components';
import { TSpan } from '../Typography';

export const TooltipBase = styled.div`
  position: relative;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const IconBase = styled.div``;

export const MessageBase = styled.div<{
  top: number;
  left: number;
  width?: number;
}>`
  position: absolute;
  z-index: 100000000;
  width: auto;

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}

  ${({ top }) =>
    top &&
    css`
      top: ${top}px;
    `}
  ${({ left }) =>
    left &&
    css`
      left: ${left}px;
    `}
 
  background-color: var(--bg-tooltip-neutral-default);
  padding: 4px 8px;
  border-radius: 4px;
  opacity: 0.95;
  display: flex;
  align-items: flex-start;
`;

export const TooltipMessageContainer = styled.div`
  max-width: 300px;
  width: max-content;

  span {
    visibility: visible;
    padding: 0;
  }
`;

export const TooltipMessage = styled(TSpan).attrs(() => ({
  font: 'footnote',
  colorToken: '--text-tooltip-neutral-alt-default',
}))``;
