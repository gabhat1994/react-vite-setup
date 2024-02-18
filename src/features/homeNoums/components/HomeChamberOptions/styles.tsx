import styled from 'styled-components';
import { ellipsisText } from '@/common/globalStyles';
import { Button } from '@/components/Button';
import { xsHidden } from '@/components/Header/styles';
import { TSpan } from '@/components/Typography';
import { type SingleOptionHeaderProps } from './types';

export const HomeChamberOptionsWrapper = styled.div<{
  isContianerWidth?: boolean;
}>`
  display: grid;
  grid-gap: ${({ isContianerWidth }) => (isContianerWidth ? ' 0' : ' 16px')};
  padding: ${({ isContianerWidth }) =>
    isContianerWidth ? '0' : '0 16px 16px 16px'};
`;

export const SingleOptionWrapper = styled.div<{
  isOverLap?: boolean;
  isContianerWidth?: boolean;
}>`
  box-sizing: border-box;
  width: 100%;
  background: var(--bg-card-neutral-alt-default);
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: ${({ isContianerWidth }) =>
    isContianerWidth ? ' 0' : ' 8px'};
  position: relative;
  max-height: 100%;
  ${({ isOverLap }) =>
    isOverLap &&
    `
    max-height: 250px;
    overflow-y: hidden;
    -webkit-box-shadow: 0 8px 6px -6px var(--bg-card-neutral-alt-default);
    -moz-box-shadow: 0 8px 6px -6px var(--bg-card-neutral-alt-default);
    box-shadow: 0 8px 6px -6px var(--bg-card-neutral-alt-default);
    &:after {
      bottom: 0;
      background: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.2));
    }
  `}
`;

export const SingleOptionHeader = styled.div<SingleOptionHeaderProps>`
  display: grid;
  height: 48px;
  justify-content: center;
  align-items: center;
  grid-template-columns: ${({ isEditMode }) =>
    isEditMode ? '1fr 28px 50px' : '1fr 36px'};
  cursor: pointer;
`;

export const TextHeader = styled(TSpan)`
  margin: 0;
  padding: 12px;
  width: 96%;
  ${ellipsisText}
`;

export const ChamberEditButton = styled(Button)`
  padding: 8px;
  margin-left: 8px;
  background: none;
  &:hover {
    background: none;
  }
`;

export const ChamberDeleteButton = styled(Button)`
  padding: 8px;
  margin-left: 8px;
  background: none;
  &:hover {
    background: none;
  }
`;
export const IconWrapper = styled.div<{
  disabled?: boolean;
  isMobile?: boolean;
}>`
  cursor: pointer;
  opacity: ${(p) => (p.disabled ? '0.2' : '1')};
  ${({ isMobile }) => isMobile && `align-self: center;`}
  &.xs-hidden {
    ${xsHidden}
  }
`;

export const ShowMoreWrapper = styled.div`
  background: var(--gradient-base-overlay-default);
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
`;

export const ShowMoreButton = styled.button`
  border: 1px solid var(--bg-separator-neutral-default);
  border-radius: 12px 12px 0px 0px;
  background: var(--bg-button-neutral-alt-default);
  padding: 16px;
  color: var(--text-button-brand-primary-default);
  font-weight: 600;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`;
